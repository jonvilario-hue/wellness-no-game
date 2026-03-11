
'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { themes, type Theme } from '@/data/themes';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  organicGrowth: boolean;
  setOrganicGrowth: (enabled: boolean) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
};

const defaultInitialTheme = themes.find((t) => t.key === 'focus') || themes[0];
const UI_SETTINGS_KEY = 'polymath-lab-ui-settings';

const initialState: ThemeProviderState = {
  theme: defaultInitialTheme,
  setTheme: () => null,
  organicGrowth: true,
  setOrganicGrowth: () => null,
  highContrast: false,
  setHighContrast: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultInitialTheme);
  const [organicGrowth, setOrganicGrowthState] = useState(true);
  const [highContrast, setHighContrastState] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = window.localStorage.getItem(UI_SETTINGS_KEY);
      if (savedSettings) {
        const { themeKey, growthEnabled, highContrastEnabled } = JSON.parse(savedSettings);
        const foundTheme = themes.find((t) => t.key === themeKey) || defaultInitialTheme;
        setThemeState(foundTheme);
        setOrganicGrowthState(typeof growthEnabled === 'boolean' ? growthEnabled : true);
        setHighContrastState(typeof highContrastEnabled === 'boolean' ? highContrastEnabled : false);
      }
    } catch (e) {
      console.error("Failed to load UI settings from localStorage", e);
    }
  }, []);

  const saveSettings = (updates: any) => {
    try {
      const currentSettings = JSON.parse(window.localStorage.getItem(UI_SETTINGS_KEY) || '{}');
      const newSettings = { ...currentSettings, ...updates };
      window.localStorage.setItem(UI_SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
        console.error("Failed to save UI settings", e);
    }
  };

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    saveSettings({ themeKey: newTheme.key });
  }, []);
  
  const setOrganicGrowth = useCallback((enabled: boolean) => {
    setOrganicGrowthState(enabled);
    saveSettings({ growthEnabled: enabled });
  }, []);

  const setHighContrast = useCallback((enabled: boolean) => {
    setHighContrastState(enabled);
    saveSettings({ highContrastEnabled: enabled });
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('dark', 'light', 'high-contrast');
    root.classList.add(theme.colorScheme.isDark ? 'dark' : 'light');
    if (highContrast) root.classList.add('high-contrast');

    // Base palette
    const scheme = theme.colorScheme;
    
    // Accessibility Logic: Meet WCAG AAA (7:1) if highContrast is enabled
    const foreground = highContrast 
      ? (scheme.isDark ? '0 0% 100%' : '0 0% 0%')
      : scheme.textPrimary;
    const background = highContrast
      ? (scheme.isDark ? '0 0% 0%' : '0 0% 100%')
      : scheme.background;
    const mutedForeground = highContrast
      ? (scheme.isDark ? '0 0% 80%' : '0 0% 20%')
      : scheme.textSecondary;
    const panels = highContrast
      ? (scheme.isDark ? '0 0% 5%' : '0 0% 98%')
      : scheme.panels;
    const primary = highContrast
      ? (scheme.isDark ? '0 0% 100%' : '0 0% 0%')
      : scheme.accent;

    const themeColors = {
        '--background': background,
        '--foreground': foreground,
        '--card': panels,
        '--card-foreground': foreground,
        '--popover': panels,
        '--popover-foreground': foreground,
        '--primary': primary,
        '--primary-foreground': highContrast ? (scheme.isDark ? '0 0% 0%' : '0 0% 100%') : scheme.accentForeground,
        '--secondary': highContrast ? (scheme.isDark ? '0 0% 15%' : '0 0% 92%') : scheme.tertiary,
        '--secondary-foreground': foreground,
        '--muted': highContrast ? (scheme.isDark ? '0 0% 10%' : '0 0% 95%') : scheme.tertiary,
        '--muted-foreground': mutedForeground,
        '--accent': scheme.tertiary,
        '--accent-foreground': foreground,
        '--destructive': scheme.destructive,
        '--destructive-foreground': '0 0% 100%',
        '--border': foreground + ' / 0.2',
        '--input': foreground + ' / 0.2',
        '--ring': primary,
        '--success': scheme.success,
        '--warning': scheme.warning,
    };
    
    for (const [key, value] of Object.entries(themeColors)) {
        if (value) {
            root.style.setProperty(key, value);
        }
    }
    
  }, [theme, highContrast]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    organicGrowth,
    setOrganicGrowth,
    highContrast,
    setHighContrast,
  }), [theme, setTheme, organicGrowth, setOrganicGrowth, highContrast, setHighContrast]);

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
