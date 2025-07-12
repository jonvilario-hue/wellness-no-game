
import { Award, Flame, Shuffle, Repeat, TrendingUp, ShieldCheck, Gem, Compass } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Badge = {
  icon: LucideIcon;
  title: string;
  description: string;
  locked: boolean;
};

export const badges: Badge[] = [
  { icon: Flame, title: 'Neurogrit', description: 'Trained daily for 7 days in a row.', locked: false },
  { icon: Shuffle, title: 'Cognitive Flexer', description: 'Trained in 3+ different domains in a single day.', locked: false },
  { icon: Repeat, title: 'Retry Rebel', description: 'Replayed and improved on a previously challenging task.', locked: true },
  { icon: TrendingUp, title: 'Plateau Breaker', description: 'Achieved a new personal best after a performance plateau.', locked: false },
  { icon: ShieldCheck, title: 'Mistake Tamer', description: 'Recovered to a high score after 3+ early errors.', locked: true },
  { icon: Gem, title: 'Symbol Slayer', description: 'Mastered 5 Gs (Processing Speed) challenges.', locked: false },
  { icon: Compass, title: 'Curious Explorer', description: 'Tried every CHC domain at least once.', locked: false },
  { icon: Award, title: 'Balanced Brain', description: 'Maintained growth across 4+ domains this month.', locked: true },
];
