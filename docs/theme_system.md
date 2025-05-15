# Theme System

## Theme Configuration
- Complete color system for light and dark modes
- Theme-aware component designs
- System preference detection
- Persistent theme selection

## Theme Implementation

```typescript
// Theme store with Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      resolvedTheme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme-storage' }
  )
);
```

## Theme Integration
### With Tailwind

```tsx
// Theme provider component
export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme, resolvedTheme, setTheme } = useThemeStore();
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      set({ resolvedTheme: systemTheme });
    } else {
      root.classList.add(theme);
      set({ resolvedTheme: theme });
    }
  }, [theme, setTheme]);
  
  return <>{children}</>;
};
```

### With Three.js
- Dynamically update materials based on theme
- Different lighting setups for light/dark modes
- Adjust post-processing effects per theme
- Background color/environment changes

## Theme Toggle Component
- Animated sun/moon icon
- Smooth transition between states
- Visual feedback for current theme
- Optional system preference indicator

