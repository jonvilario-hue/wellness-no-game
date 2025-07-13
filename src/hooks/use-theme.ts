
'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { themes, type Theme } from '@/data/themes';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const defaultInitialTheme = themes.find((t) => t.key === 'focus') || themes[0];

const initialState: ThemeProviderState = {
  theme: defaultInitialTheme,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultThemeKey = 'focus',
  storageKey = 'vite-ui-theme',
}: {
  children: React.ReactNode;
  defaultThemeKey?: string;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultInitialTheme;
    }
    try {
      const item = window.localStorage.getItem(storageKey);
      if (item) {
        const foundTheme = themes.find((t) => t.key === item);
        if (foundTheme) return foundTheme;
      }
    } catch (e) {
      // Local storage not available
    }
    return defaultInitialTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(...themes.map(t => t.key));

    if (theme.key) {
      root.classList.add(theme.key);
    }
    
    if (theme.colorScheme.isDark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    try {
      window.localStorage.setItem(storageKey, theme.key);
    } catch (e) {
      // Local storage not available
    }
    
  }, [theme, storageKey]);

  const value = useMemo(() => ({
    theme,
    setTheme: setThemeState,
  }), [theme]);

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
