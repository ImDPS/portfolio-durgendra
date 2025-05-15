'use client';

import { ReactNode, useEffect } from 'react';
import { useThemeStore } from '@/store/theme-store';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setResolvedTheme } = useThemeStore();
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    } else {
      root.classList.add(theme);
      setResolvedTheme(theme);
    }
    
    // Listen for changes in system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        setResolvedTheme(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setResolvedTheme]);
  
  return <>{children}</>;
} 