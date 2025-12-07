// src/contexts/AuthContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { decodeJwt } from 'jose';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: { email: string } | null;
  setUser: Dispatch<SetStateAction<{ email: string } | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  signout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refreshSession = async () => {
    try {
      const res = await fetch('/api/auth/session', { cache: 'no-store' });
      if (!res.ok) throw new Error('session fetch failed');

      const data: { token: string | null; email: string | null } =
        await res.json();

      if (data?.token) {
        setToken(data.token);
        setIsAuthenticated(true);

        // Prefer explicit email from API; fall back to decoding token
        if (data.email) {
          setUser({ email: data.email });
        } else {
          try {
            const claims = decodeJwt(data.token) as { email?: string };
            setUser(claims.email ? { email: claims.email } : null);
          } catch {
            setUser(null);
          }
        }
      } else {
        setToken(null);
        setIsAuthenticated(false);
        setUser(data?.email ? { email: data.email } : null);
      }
    } catch {
      setToken(null);
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
      setToken(null);
      window.dispatchEvent(new CustomEvent('auth-updated'));
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      token,
      setToken,
      signout,
      refreshSession,
    }),
    [isAuthenticated, user, token],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
