
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

// Helper to convert hex to HSL string
const hexToHslString = (hex: string): string | null => {
  if (!hex.startsWith('#')) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `${h} ${s}% ${l}%`;
};


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
    return themes.find(t => t.key === defaultThemeKey) || defaultInitialTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('dark', 'light');
    root.classList.add(theme.colorScheme.isDark ? 'dark' : 'light');

    const backgroundHsl = hexToHslString(theme.colorScheme.background);
    const textHsl = hexToHslString(theme.colorScheme.successProgressText);

    if (backgroundHsl) {
        root.style.setProperty('--background-hsl', backgroundHsl);
        root.style.setProperty('--card-hsl', backgroundHsl);
        root.style.setProperty('--popover-hsl', backgroundHsl);
    }
    if (textHsl) {
        root.style.setProperty('--foreground-hsl', textHsl);
        root.style.setProperty('--card-foreground-hsl', textHsl);
        root.style.setProperty('--popover-foreground-hsl', textHsl);
        root.style.setProperty('--primary-hsl', textHsl);
        root.style.setProperty('--ring-hsl', textHsl);
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
