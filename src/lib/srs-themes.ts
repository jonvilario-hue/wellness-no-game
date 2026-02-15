
import type { ThemeName } from '@/types/srs-types';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  card: string;
  border: string;
}

export const SRS_THEMES: Record<ThemeName, ThemeColors> = {
  midnight: {
    background: '222 47% 11%',
    foreground: '210 40% 98%',
    primary: '217 91% 60%',
    secondary: '217 32% 17%',
    accent: '217 91% 60%',
    card: '222 47% 11%',
    border: '217 32% 17%',
  },
  forest: {
    background: '150 20% 6%',
    foreground: '150 20% 98%',
    primary: '142 71% 45%',
    secondary: '150 20% 12%',
    accent: '142 71% 45%',
    card: '150 20% 6%',
    border: '150 20% 12%',
  },
  ocean: {
    background: '200 30% 8%',
    foreground: '200 30% 98%',
    primary: '199 89% 48%',
    secondary: '200 30% 15%',
    accent: '199 89% 48%',
    card: '200 30% 8%',
    border: '200 30% 15%',
  },
  minimal: {
    background: '0 0% 100%',
    foreground: '0 0% 0%',
    primary: '0 0% 0%',
    secondary: '0 0% 96%',
    accent: '0 0% 40%',
    card: '0 0% 100%',
    border: '0 0% 89%',
  },
  crimson: {
    background: '0 20% 5%',
    foreground: '0 20% 98%',
    primary: '0 72% 51%',
    secondary: '0 20% 12%',
    accent: '0 72% 51%',
    card: '0 20% 5%',
    border: '0 20% 12%',
  },
};

export function applyTheme(themeName: ThemeName) {
  if (typeof document === 'undefined') return;
  const theme = SRS_THEMES[themeName];
  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--srs-${key}`, value);
  });
  
  if (themeName === 'minimal') {
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
  }
}
