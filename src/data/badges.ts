
import { Award, Flame, Shuffle, Repeat, TrendingUp, ShieldCheck, Gem, Compass, Brain, Zap, MemoryStick, Eye, BookOpen, Ear, Goal, Swords, Rocket, Map, Target, HeartHandshake, ShieldAlert, Anchor, Trophy, Lightbulb, UserCheck, Star, Sparkles, FolderSync, Group, Layers, Droplets } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Badge = {
  icon: LucideIcon;
  title: string;
  description: string;
  locked: boolean;
};

export const badges: Badge[] = [
  // Habits & Consistency
  { icon: Flame, title: 'Neurogrit', description: 'Trained daily for 7 days in a row.', locked: false },
  { icon: Anchor, title: 'Flow Seeker', description: 'Completed 3+ sessions in the optimal challenge zone.', locked: true },
  { icon: HeartHandshake, title: 'Recovery Badge', description: 'Returned to training after a break.', locked: false },
  { icon: FolderSync, title: 'Resilience Reset', description: 'Recovered a training streak after missing several days.', locked: true },
  { icon: Target, title: 'Focus Anchor', description: 'Completed 3+ executive function tasks in one day.', locked: false },

  // Cross-Domain Mastery & Transfer
  { icon: Shuffle, title: 'Cognitive Flexer', description: 'Trained in 3+ different domains in a single day.', locked: false },
  { icon: Award, title: 'Balanced Brain', description: 'Maintained growth across 4+ domains this month.', locked: true },
  { icon: Layers, title: 'Strategy Shifter', description: 'Successfully changed strategies mid-task.', locked: true },
  
  // Puzzle-Type Mastery
  { icon: Brain, title: 'Logic Architect', description: 'Mastered Gf-style reasoning puzzles.', locked: false },
  { icon: MemoryStick, title: 'Memory Builder', description: 'Mastered Gwm memory span tasks.', locked: true },
  { icon: Zap, title: 'Symbol Slayer', description: 'Mastered Gs speed/symbol tasks (Processing Speed).', locked: false },
  { icon: Eye, title: 'Spatial Strategist', description: 'Mastered Gv spatial rotation puzzles.', locked: true },
  { icon: Ear, title: 'Sound Decoder', description: 'Mastered Ga auditory discrimination tasks.', locked: true },
  
  // Progress & Meta-Cognition
  { icon: TrendingUp, title: 'Plateau Breaker', description: 'Achieved a new personal best after a performance plateau.', locked: false },
  { icon: Map, title: 'Cognitive Cartographer', description: 'Explored all 8 CHC domains.', locked: false },
  { icon: Rocket, title: 'Growth Mapper', description: 'Set and achieved a personal goal in any domain.', locked: true },
  { icon: Lightbulb, title: 'Blindspot Breaker', description: 'Improved most in your weakest domain.', locked: true },
  
  // Resilience & Error Management
  { icon: ShieldCheck, title: 'Mistake Tamer', description: 'Recovered to a high score after 5+ early errors.', locked: true },
  { icon: Repeat, title: 'Retry Rebel', description: 'Replayed and improved on a previously challenging task.', locked: true },
  { icon: ShieldAlert, title: 'Comeback Badge', description: 'Recovered from a temporary drop in a domain score.', locked: true },

  // Real-World Transfer & Identity
  { icon: UserCheck, title: 'Focus Hero', description: 'Noticed improved attention in everyday life.', locked: true },
  { icon: Star, title: 'Memory Upgrade', description: 'Applied memory skills to a real-world task.', locked: false },
  { icon: Group, title: 'Mental Multitasker', description: 'Performed well in a life-simulated multitasking scenario.', locked: true },

  // Exploration & Autonomy
  { icon: Compass, title: 'Curious Explorer', description: 'Tried every CHC domain at least once.', locked: false },
  { icon: Droplets, title: 'Self-Guided Learner', description: 'Chose a focus domain and trained consistently.', locked: true },
];
