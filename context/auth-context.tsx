// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: { email: string } | null;
  setUser: Dispatch<SetStateAction<{ email: string } | null>>;
  signout: () => Promise<void>;
  refreshSession: () => Promise<void>; // NEW
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const refreshSession = async () => {
    try {
      const res = await fetch('/api/auth/session', { cache: 'no-store' });
      if (!res.ok) throw new Error('session fetch failed');
      const data: { token: string | null; email: string | null } = await res.json();

      if (data?.token) {
        setIsAuthenticated(true);
        setUser(data?.email ? { email: data.email } : null);
      } else {
        setIsAuthenticated(false);
        setUser(data?.email ? { email: data.email } : null); // tolerate decoded email case
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await refreshSession();
    })();

    // listen for any auth changes from the AccessGate
    const onAuthUpdated = () => refreshSession();
    window.addEventListener('auth-updated', onAuthUpdated);

    return () => {
      mounted = false;
      window.removeEventListener('auth-updated', onAuthUpdated);
    };
  }, []);

  const signout = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      // also let anyone else know
      window.dispatchEvent(new CustomEvent('auth-updated'));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, signout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
