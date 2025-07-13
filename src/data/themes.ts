
import type { LucideIcon } from 'lucide-react';
import { Target, Zap, Waves, MemoryStick, Shield, Sword } from 'lucide-react';
import type { CHCDomain } from '@/types';

export interface Theme {
  key: 'focus' | 'energize' | 'reflect' | 'memory' | 'confidence' | 'challenge';
  name: string;
  icon: LucideIcon;
  idealFor: string;
  chcDomains: CHCDomain[];
  scientificRationale: string;
  colorScheme: {
    background: string; // Background of the entire "lab"
    panels: string; // The color of modular UI panels/cards
    textPrimary: string; // Primary text color
    textSecondary: string; // Muted/secondary text color
    accent: string; // The main interactive color for buttons, highlights
    accentForeground: string; // Text color on top of the accent color
    success: string; // Color for positive feedback/success states
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
    scientificRationale: 'Uses a low-arousal, dark background with cool, soft highlights (blue/teal) to minimize cognitive interference and reduce visual strain. This follows the principle of attentional filtering, where reducing irrelevant sensory input enhances focus on the primary task.',
    colorScheme: {
      background: '#1A202C', // Dark Slate Gray
      panels: '#2D3748',     // Darker Slate
      textPrimary: '#E2E8F0', // Light Gray
      textSecondary: '#A0AEC0',// Muted Gray
      accent: '#4FD1C5',      // Teal
      accentForeground: '#1A202C',
      success: '#68D391',     // Soft Green
      isDark: true,
    },
    uxFeatures: [
      'Subtle, slow-fade animations to avoid distraction.',
      'Minimalist UI with hidden secondary controls.',
      'Audio feedback is muted or uses low-frequency tones.',
      'Progress bars fill smoothly without strobing effects.'
    ]
  },
  {
    key: 'energize',
    name: 'Energize Mode',
    icon: Zap,
    idealFor: 'Users training processing speed or needing activation.',
    chcDomains: ['Gs', 'Gwm'],
    scientificRationale: 'Employs a high-contrast light theme with bright, warm colors (yellow/orange) to increase arousal and alertness, based on color psychology principles that associate these hues with energy and attention. Quick, sharp feedback enhances the feeling of speed.',
    colorScheme: {
      background: '#F7FAFC', // Very Light Gray
      panels: '#FFFFFF',     // White
      textPrimary: '#2D3748', // Dark Slate for text
      textSecondary: '#718096',// Medium Gray
      accent: '#F59E0B',      // Amber/Orange
      accentForeground: '#FFFFFF',
      success: '#38A169',     // Strong Green
      isDark: false,
    },
    uxFeatures: [
      'Fast, snappy UI transitions and feedback.',
      'Bright, electric green for success confirmations.',
      'Gamified score counters with rapid increments.',
      'High-energy, short sound effects for correct answers.'
    ]
  },
  {
    key: 'reflect',
    name: 'Reflect Mode',
    icon: Waves,
    idealFor: 'Analytical, logic-driven users working on reasoning tasks.',
    chcDomains: ['Gf', 'Gc'],
    scientificRationale: 'A low-stimulation, cool-toned environment supports deliberate, analytical thought (System 2 thinking). The blue and silver palette is calming and associated with clarity and intellect, reducing emotional arousal to favor logical processing.',
    colorScheme: {
      background: '#EBF4FF', // Pale Blue
      panels: '#FFFFFF',     // White
      textPrimary: '#2C5282', // Deep Blue
      textSecondary: '#718096',// Steel Gray
      accent: '#4299E1',      // Medium Blue
      accentForeground: '#FFFFFF',
      success: '#2B6CB0',     // Darker Blue for success
      isDark: false,
    },
    uxFeatures: [
      'Generous spacing and clean typography for readability.',
      'No time pressure indicators on logic puzzles.',
      'Feedback is explanatory and delayed to encourage self-correction.',
      'UI elements have sharp, geometric shapes to align with a logical mood.'
    ]
  },
  {
    key: 'memory',
    name: 'Memory Mode',
    icon: MemoryStick,
    idealFor: 'Associative thinkers, language learners, or memory boosters.',
    chcDomains: ['Gwm', 'Glr'],
    scientificRationale: 'Utilizes a palette of purple, lavender, and cyan, colors often linked to creativity and imagination. This encourages associative thinking, which is critical for long-term memory encoding (Glr) and creating rich mental contexts.',
    colorScheme: {
      background: '#241b3a', // Deep Purple
      panels: '#3c2c5c',     // Lighter Purple
      textPrimary: '#E9D8FD', // Lavender
      textSecondary: '#b39edb',// Muted Lavender
      accent: '#67E8F9',      // Bright Cyan
      accentForeground: '#1a202c',
      success: '#A78BFA',     // Lighter Purple for success
      isDark: true,
    },
    uxFeatures: [
      'Dreamlike, soft-glow effects on UI elements.',
      'Visual mnemonics or icons are paired with concepts.',
      'UI layout encourages spatial relationships between items.',
      'Allows for user-generated tags or notes on memory items.'
    ]
  },
  {
    key: 'confidence',
    name: 'Confidence Mode',
    icon: Shield,
    idealFor: 'Users with low motivation, new to cognitive training, or with low self-confidence.',
    chcDomains: ['EF', 'Gwm'],
    scientificRationale: 'Based on principles of psychological safety and reinforcement theory. Soft, warm, and positive colors (blush, gold, mint) create a non-threatening environment. The focus is on effort and progress, not just performance, to build self-efficacy.',
    colorScheme: {
      background: '#FFFBF5', // Soft Cream
      panels: '#FFFFFF',     // White
      textPrimary: '#5D4037', // Soft Brown
      textSecondary: '#A1887F',// Lighter Brown
      accent: '#FBBF24',      // Warm Gold
      accentForeground: '#5D4037',
      success: '#34D399',     // Mint Green
      isDark: false,
    },
    uxFeatures: [
      'Gentle, affirming feedback messages ("Good effort!", "Nice try!").',
      'Non-comparative progress tracking (focus on personal bests).',
      '"Mistake-forgiveness" mechanic where early errors have lower penalties.',
      'Progress is visualized as growth (e.g., a plant growing).'
    ]
  },
  {
    key: 'challenge',
    name: 'Challenge Mode',
    icon: Sword,
    idealFor: 'High-performing, competitive users who want clear feedback and intensity.',
    chcDomains: ['Gf', 'EF'],
    scientificRationale: 'Designed to induce a state of high focus and intensity (flow state). The high-contrast, jet-black background minimizes all distractions, while sharp, high-energy crimson and amber accents signal importance and achievement, tapping into competitive drive.',
    colorScheme: {
      background: '#000000', // Jet Black
      panels: '#111111',     // Near Black
      textPrimary: '#E5E7EB', // Platinum
      textSecondary: '#9CA3AF',// Muted Gray
      accent: '#FBBF24',      // Amber
      accentForeground: '#000000',
      success: '#3B82F6',     // Royal Blue
      isDark: true,
    },
    uxFeatures: [
      'High-glow, impactful feedback for correct answers.',
      'Visible leaderboards or performance percentile rankings.',
      'Achievements and stats are prominently displayed.',
      'Crisp, high-impact sound design.'
    ]
  }
];
