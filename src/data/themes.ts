
import type { LucideIcon } from 'lucide-react';
import { Target, Zap, Waves, MemoryStick, Shield, Sword, Wind, Moon } from 'lucide-react';
import type { CHCDomain } from '@/types';

export interface Theme {
  key: 'focus' | 'energize' | 'reflect' | 'memory' | 'confidence' | 'challenge' | 'calm' | 'rest';
  name: string;
  icon: LucideIcon;
  idealFor: string;
  chcDomains: CHCDomain[];
  scientificRationale: string;
  colorScheme: {
    background: string; // HSL value string 'H S% L%'
    panels: string;     // HSL value string 'H S% L%'
    tertiary: string;   // HSL value string 'H S% L%'
    textPrimary: string;// HSL value string 'H S% L%'
    textSecondary: string; // HSL value string 'H S% L%'
    accent: string;     // HSL value string 'H S% L%'
    accentForeground: string; // HSL value string 'H S% L%'
    success: string;    // HSL value string 'H S% L%'
    warning: string;    // HSL value string 'H S% L%'
    destructive: string;// HSL value string 'H S% L%'
    isDark: boolean;
  };
  uxFeatures: string[];
}

export const themes: Theme[] = [
  {
    key: 'focus',
    name: 'Focus Mode',
    icon: Target,
    idealFor: 'Users easily distracted or with low sustained attention.',
    chcDomains: ['EF', 'Gs'],
    scientificRationale: 'Deep navy base with a single bright cyan accent minimizes peripheral distraction and reduces visual noise.',
    colorScheme: {
      background: '222 47% 11%',
      panels: '222 47% 15%',
      tertiary: '222 47% 20%',
      textPrimary: '210 40% 98%',
      textSecondary: '215 20% 65%',
      accent: '191 91% 50%',
      accentForeground: '222 47% 11%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      destructive: '0 84% 60%',
      isDark: true,
    },
    uxFeatures: [
      'Stripped-down UI components.',
      'Minimalist color variety.',
      'Soft-fade focus transitions.'
    ]
  },
  {
    key: 'energize',
    name: 'Energize Mode',
    icon: Zap,
    idealFor: 'High-speed processing tasks and morning sessions.',
    chcDomains: ['Gs', 'Gwm'],
    scientificRationale: 'Utilizes higher saturation and electric yellow-green accents to increase physiological arousal and alertness.',
    colorScheme: {
      background: '240 10% 4%',
      panels: '240 10% 8%',
      tertiary: '240 10% 12%',
      textPrimary: '0 0% 98%',
      textSecondary: '240 5% 65%',
      accent: '84 81% 44%',
      accentForeground: '240 10% 4%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      destructive: '0 84% 60%',
      isDark: true,
    },
    uxFeatures: [
      'Snappy, high-velocity animations.',
      'High-saturation status indicators.',
      'Rhythmic UI pulsing.'
    ]
  },
  {
    key: 'reflect',
    name: 'Reflect Mode',
    icon: Waves,
    idealFor: 'Analytical, logic-driven users working on reasoning tasks.',
    chcDomains: ['Gf', 'Gc'],
    scientificRationale: 'Cool gray base with soft indigo tones creates a spacious environment for deliberate, System 2 thinking.',
    colorScheme: {
      background: '210 15% 15%',
      panels: '210 15% 20%',
      tertiary: '210 15% 25%',
      textPrimary: '210 20% 95%',
      textSecondary: '210 10% 60%',
      accent: '226 70% 70%',
      accentForeground: '210 15% 10%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      destructive: '0 84% 60%',
      isDark: true,
    },
    uxFeatures: [
      'Spacious padding and layout.',
      'Soft steel-blue dividers.',
      'Delayed, thoughtful feedback animations.'
    ]
  },
  {
    key: 'memory',
    name: 'Memory Mode',
    icon: MemoryStick,
    idealFor: 'Associative thinkers and long-term encoding.',
    chcDomains: ['Gwm', 'Glr'],
    scientificRationale: 'Layered purple and warm amber accents stimulate associative neural pathways required for mnemonic forming.',
    colorScheme: {
      background: '260 25% 11%',
      panels: '260 25% 16%',
      tertiary: '260 25% 22%',
      textPrimary: '260 30% 95%',
      textSecondary: '260 15% 70%',
      accent: '38 92% 50%',
      accentForeground: '260 25% 11%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      destructive: '0 84% 60%',
      isDark: true,
    },
    uxFeatures: [
      'Depth-based shadow hierarchy.',
      'Associative icon sets.',
      'Muted lavender surfaces.'
    ]
  },
  {
    key: 'confidence',
    name: 'Confidence Mode',
    icon: Shield,
    idealFor: 'For building momentum when motivation is low.',
    chcDomains: ['EF', 'Gwm'],
    scientificRationale: 'Grounded warm gold and rich coral accents create an affirming environment that focuses on stability and small wins.',
    colorScheme: {
      background: '30 15% 10%',
      panels: '30 15% 15%',
      tertiary: '30 15% 20%',
      textPrimary: '30 20% 95%',
      textSecondary: '30 10% 65%',
      accent: '45 93% 47%',
      accentForeground: '30 15% 10%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      destructive: '15 80% 60%',
      isDark: true,
    },
    uxFeatures: [
      'Affirming, warm highlights.',
      'Grounded, high-contrast buttons.',
      'Achievement-focused UI elements.'
    ]
  },
  {
    key: 'challenge',
    name: 'Challenge Mode',
    icon: Sword,
    idealFor: 'High-performing users seeking maximum intensity.',
    chcDomains: ['Gf', 'EF'],
    scientificRationale: 'Near-black base with bold crimson accents induces a state of high-alert focus suitable for competitive training.',
    colorScheme: {
      background: '0 0% 2%',
      panels: '0 0% 6%',
      tertiary: '0 0% 10%',
      textPrimary: '0 0% 98%',
      textSecondary: '0 0% 60%',
      accent: '0 100% 50%',
      accentForeground: '0 0% 100%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      destructive: '0 100% 40%',
      isDark: true,
    },
    uxFeatures: [
      'Extreme contrast ratios.',
      'Sharp, high-impact indicators.',
      'Glow-effect primary actions.'
    ]
  },
  {
    key: 'calm',
    name: 'Calm Mode',
    icon: Wind,
    idealFor: 'For winding down, managing anxiety, or reducing overwhelm.',
    chcDomains: ['Ga', 'Stillness' as any],
    scientificRationale: 'Muted cool tones and low contrast levels reduce ocular and cognitive load, acting like a visual quiet room.',
    colorScheme: {
      background: '210 20% 96%',
      panels: '210 20% 98%',
      tertiary: '210 10% 94%',
      textPrimary: '210 20% 30%',
      textSecondary: '210 15% 50%',
      accent: '200 30% 60%',
      accentForeground: '210 20% 98%',
      success: '160 40% 50%',
      warning: '40 30% 60%',
      destructive: '0 30% 60%',
      isDark: false,
    },
    uxFeatures: [
      'Low-contrast borders.',
      'Desaturated accent palette.',
      'Ambient, slow-drift transitions.'
    ]
  },
  {
    key: 'rest',
    name: 'Rest Mode',
    icon: Moon,
    idealFor: 'For low-energy moments or late-night use.',
    chcDomains: ['Sleep' as any, 'Recovery' as any],
    scientificRationale: 'Warm charcoal foundations with firelight-inspired accents protect circadian rhythms by minimizing blue light exposure.',
    colorScheme: {
      background: '0 0% 8%',
      panels: '0 0% 12%',
      tertiary: '0 0% 16%',
      textPrimary: '40 30% 90%',
      textSecondary: '40 10% 60%',
      accent: '35 80% 60%',
      accentForeground: '0 0% 8%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      destructive: '0 84% 60%',
      isDark: true,
    },
    uxFeatures: [
      'Warm-spectrum highlights.',
      'Off-white cream typography.',
      'Minimal high-arousal motion.'
    ]
  }
];
