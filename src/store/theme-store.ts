'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (resolvedTheme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system' as Theme,
      resolvedTheme: 'light' as 'light' | 'dark',
      setTheme: (theme: Theme) => set({ theme }),
      setResolvedTheme: (resolvedTheme: 'light' | 'dark') => set({ resolvedTheme }),
    }),
    { name: 'theme-storage' }
  )
); 