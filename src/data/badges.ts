import type { LucideIcon } from 'lucide-react';
import { Award, Flame, Shuffle, Repeat, TrendingUp, ShieldCheck, Gem, Compass, Brain, Zap, MemoryStick, Eye, BookOpen, Ear, Goal, Swords, Rocket, Map, Target, HeartHandshake, ShieldAlert, Anchor, Trophy, Lightbulb, UserCheck, Star, Sparkles, FolderSync, Group, Layers, Droplets, FlaskConical, BatteryCharging, Sunrise, Moon, Clock, Telescope, PackageCheck } from 'lucide-react';


export type Badge = {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  locked: boolean;
};

export const badges: Badge[] = [
  // Top 8 for Homepage
  { key: 'neurogrit', icon: Flame, title: 'Neurogrit', description: 'Trained daily for 7 days in a row.', locked: false },
  { key: 'cognitive-flexer', icon: Shuffle, title: 'Cognitive Flexer', description: 'Trained in 3+ CHC domains in a single day.', locked: false },
  { key: 'blindspot-breaker', icon: Gem, title: 'Blindspot Breaker', description: 'Improved most in your weakest domain.', locked: true },
  { key: 'growth-mapper', icon: Rocket, title: 'Growth Mapper', description: 'Set and achieved a personal goal in one domain.', locked: true },
  { key: 'mistake-tamer', icon: ShieldCheck, title: 'Mistake Tamer', description: 'Recovered to a high score after 5+ early errors.', locked: true },
  { key: 'focus-hero', icon: Target, title: 'Focus Hero', description: 'Noticed improved attention in everyday life.', locked: false },
  { key: 'flow-seeker', icon: Droplets, title: 'Flow Seeker', description: 'Completed 3 sessions at optimal challenge level.', locked: true },
  { key: 'curious-explorer', icon: Compass, title: 'Curious Explorer', description: 'Tried every CHC domain at least once.', locked: false },
  
  // --- Remaining Badges ---

  // Cross-Domain Mastery & Transfer
  { key: 'transfer-titan', icon: Group, title: 'Transfer Titan', description: 'Improved on a real-world simulation.', locked: true },
  { key: 'balanced-brain', icon: Award, title: 'Balanced Brain', description: 'Maintained growth in 4+ domains over a month.', locked: true },
  { key: 'strategy-shifter', icon: Layers, title: 'Strategy Shifter', description: 'Successfully changed strategies mid-task.', locked: true },
  
  // Puzzle-Type Mastery
  { key: 'logic-architect', icon: Brain, title: 'Logic Architect', description: 'Mastered Gf-style reasoning puzzles.', locked: false },
  { key: 'memory-builder', icon: MemoryStick, title: 'Memory Builder', description: 'Mastered working memory span tasks.', locked: true },
  { key: 'symbol-slayer', icon: Zap, title: 'Symbol Slayer', description: 'Mastered Gs speed/symbol puzzles.', locked: false },
  { key: 'spatial-strategist', icon: Eye, title: 'Spatial Strategist', description: 'Mastered Gv spatial rotation puzzles.', locked: true },
  { key: 'sound-decoder', icon: Ear, title: 'Sound Decoder', description: 'Mastered auditory discrimination tasks.', locked: true },
  
  // Progress & Meta-Cognition
  { key: 'self-scientist', icon: FlaskConical, title: 'Self-Scientist', description: 'Completed a pre/post training challenge.', locked: true },
  { key: 'cognitive-cartographer', icon: Map, title: 'Cognitive Cartographer', description: 'Explored all 8 CHC domains.', locked: false },
  { key: 'plateau-breaker', icon: TrendingUp, title: 'Plateau Breaker', description: 'Broke through a performance plateau.', locked: false },

  // Habits & Consistency
  { key: 'neurogrit-14', icon: Flame, title: 'Neurogrit II', description: 'Trained daily for 14 days.', locked: true },
  { key: 'neurogrit-30', icon: Flame, title: 'Neurogrit III', description: 'Trained daily for 30 days.', locked: true },
  { key: 'recovery-badge', icon: HeartHandshake, title: 'Recovery Badge', description: 'Returned to training after a break.', locked: false },
  { key: 'resilience-reset', icon: FolderSync, title: 'Resilience Reset', description: 'Recovered a training streak after missing days.', locked: true },
  { key: 'focus-anchor', icon: Anchor, title: 'Focus Anchor', description: 'Completed 3 executive function tasks in a day.', locked: false },

  // Resilience & Error Management
  { key: 'retry-rebel', icon: Repeat, title: 'Retry Rebel', description: 'Replayed and improved on a previously weak puzzle.', locked: true },
  { key: 'fatigue-fighter', icon: BatteryCharging, title: 'Fatigue Fighter', description: 'Trained through cognitive fatigue.', locked: true },
  { key: 'comeback-badge', icon: ShieldAlert, title: 'Comeback Badge', description: 'Recovered from a domain score dip.', locked: true },

  // Real-World Transfer & Identity
  { key: 'memory-upgrade', icon: Star, title: 'Memory Upgrade', description: 'Used memory techniques in real-world tasks.', locked: false },
  { key: 'mental-multitasker', icon: Swords, title: 'Mental Multitasker', description: 'Completed a complex multitasking simulation.', locked: true },
  { key: 'life-application', icon: Lightbulb, title: 'Life Application', description: 'Reported applying a cognitive skill IRL.', locked: true },

  // Exploration & Autonomy
  { key: 'modular-master', icon: Trophy, title: 'Modular Master', description: 'Completed all puzzle types in one domain.', locked: true },
  { key: 'self-guided-learner', icon: UserCheck, title: 'Self-Guided Learner', description: 'Trained consistently in a self-chosen domain.', locked: true },
  { key: 'theme-builder', icon: Sparkles, title: 'Theme Builder', description: 'Customized app visuals or content layer.', locked: true },

  // Timing & Commitment
  { key: 'night-owl', icon: Moon, title: 'Night Owl', description: 'Trained late at night 3+ times.', locked: true },
  { key: 'early-bird', icon: Sunrise, title: 'Early Bird', description: 'Trained early morning 3+ times.', locked: true },
  { key: 'session-sentinel', icon: Clock, title: 'Session Sentinel', description: 'Trained at the same hour 5+ times.', locked: true },

  // Novelty & First-Time Success
  { key: 'first-try-finisher', icon: PackageCheck, title: 'First Try Finisher', description: 'Solved a new puzzle with high accuracy.', locked: true },
  { key: 'novelty-seeker', icon: Telescope, title: 'Novelty Seeker', description: 'Tried 3+ new puzzle types in one week.', locked: true },

  // Mystery / Discovery Badges
  { key: 'hidden-mastery', icon: Gem, title: '?????', description: 'A secret awaits the truly masterful...', locked: true },
  { key: 'easter-egg', icon: Compass, title: '?????', description: 'Some things are found only by looking where others don\'t.', locked: true },
];
