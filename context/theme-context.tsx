"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Set a consistent default for SSR/Initial Render
  // We will default to 'dark' on the server and load the true theme later.
  const [theme, setTheme] = useState<Theme>('dark');
  // State to track if the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage ONLY on the client after mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme as Theme);
    } else {
      // Optional: Set system preference as default if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    setMounted(true); // Mark as mounted once we've read client storage
  }, []);


  // This useEffect handles applying the class to the <html> tag and saving to localStorage
  useEffect(() => {
    if (!mounted) return; // Prevent running before the theme is loaded from storage

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Prevent rendering children on the server with the incorrect theme
  // Render nothing or a fallback until the actual theme is loaded on the client
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>; // Render structure but hide until theme is set
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  // ... (rest of the hook is fine)
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}