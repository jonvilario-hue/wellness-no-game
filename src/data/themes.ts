
import type { LucideIcon } from 'lucide-react';
import { Target, Zap, Waves, MemoryStick, Shield, Sword } from 'lucide-react';

export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export interface Theme {
  key: 'focus' | 'energize' | 'reflect' | 'memory' | 'confidence' | 'challenge';
  name: string;
  icon: LucideIcon;
  idealFor: string;
  chcDomains: CHCDomain[];
  scientificRationale: string;
  colorScheme: {
    background: string;
    accentBars: string;
    successProgressText: string;
    isDark: boolean;
  };
  uxFeatures: string[];
}

export const themes: Theme[] = [
  {
    key: 'focus',
    name: 'Focus Mode',
    icon: Target,
    idealFor: 'Users easily distracted or training attention control.',
    chcDomains: ['EF', 'Gs'],
    scientificRationale: 'Uses a low-arousal, dark background with cool, soft highlights (blue/teal) to minimize cognitive interference and reduce visual strain. This follows the principle of attentional filtering, where reducing irrelevant sensory input enhances focus on the primary task.',
    colorScheme: {
      background: '#1A202C', // Dark Slate
      accentBars: '#00A79D', // Soft Teal
      successProgressText: '#4FD1C5', // Light Teal
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
    idealFor: 'Users needing alertness or training processing speed.',
    chcDomains: ['Gs', 'Gwm'],
    scientificRationale: 'Employs a high-contrast light theme with bright, warm colors (yellow/orange) to increase arousal and alertness, based on color psychology principles that associate these hues with energy and attention. Quick, sharp feedback enhances the feeling of speed.',
    colorScheme: {
      background: '#F7FAFC', // Very Light Gray
      accentBars: 'linear-gradient(90deg, #F59E0B, #F97316)', // Orange-Yellow Gradient
      successProgressText: '#16A34A', // Strong Green
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
      accentBars: '#A0AEC0', // Cool Silver/Gray
      successProgressText: '#2B6CB0', // Deep Blue
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
    chcDomains: ['Glr', 'Gwm'],
    scientificRationale: 'Utilizes a palette of purple, lavender, and cyan, colors often linked to creativity and imagination. This encourages associative thinking, which is critical for long-term memory encoding (Glr) and creating rich mental contexts.',
    colorScheme: {
      background: '#241b3a', // Deep Purple
      accentBars: '#A78BFA', // Lavender
      successProgressText: '#67E8F9', // Bright Cyan
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
    idealFor: 'Users with low motivation or confidence.',
    chcDomains: ['EF', 'Gwm'],
    scientificRationale: 'Based on principles of psychological safety and reinforcement theory. Soft, warm, and positive colors (blush, gold, mint) create a non-threatening environment. The focus is on effort and progress, not just performance, to build self-efficacy.',
    colorScheme: {
      background: '#FFFBF5', // Soft Cream
      accentBars: '#FBBF24', // Warm Gold
      successProgressText: '#34D399', // Mint Green
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
    idealFor: 'Competitive, high-achieving users wanting challenge.',
    chcDomains: ['Gf', 'EF'],
    scientificRationale: 'Designed to induce a state of high focus and intensity (flow state). The high-contrast, jet-black background minimizes all distractions, while sharp, high-energy crimson and platinum accents signal importance and achievement, tapping into competitive drive.',
    colorScheme: {
      background: '#000000', // Jet Black
      accentBars: '#DC2626', // Crimson Red
      successProgressText: '#E5E7EB', // Platinum/Light Gray
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
