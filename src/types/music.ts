
import { LucideIcon } from "lucide-react";

export type MusicDomain = 
  | 'Ear Training' 
  | 'Rhythm & Timing' 
  | 'Theory & Harmony' 
  | 'Sight Reading' 
  | 'Improvisation & Composition' 
  | 'Critical Listening';

export type MusicDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface MusicDrillLog {
  id: string;
  userId: string;
  domain: MusicDomain;
  drillName: string;
  difficulty: MusicDifficulty;
  difficultyMultiplier: number;
  focusLevel: number;
  score: number; // Correct out of 10
  har: number; // (score/10) * multiplier * 100
  averageResponseTime: number;
  effectivenessRating: number;
  context: 'Morning Fresh' | 'Midday' | 'Evening Wind-Down' | 'Post-Study' | 'Other';
  durationMinutes: number;
  timestamp: string;
  syncedToCalendar: boolean;
  questions: MusicDrillQuestion[];
}

export interface MusicDrillQuestion {
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  responseTimeMs: number;
}

export interface MusicAchievement {
  bestHAR: number;
  date: string;
}

export interface MusicJourneyPlan {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  steps: {
    day: number;
    title: string;
    domain: MusicDomain;
    drill: string;
    difficulty: MusicDifficulty;
    estimatedMinutes: number;
  }[];
}

export interface MusicReferenceEntry {
  id: string;
  title: string;
  summary: string;
  category: 'Practice Methods' | 'Vocal Techniques';
  icon: LucideIcon;
  metadata: {
    time: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
    bestFor: string;
  };
  drill: {
    tryThisNow: string;
    steps: string[];
  };
  theory: {
    what: string;
    mistakes: string[];
    when: string;
  };
  audioLabel?: string;
  visualLabel?: string;
  relatedModule?: {
    name: string;
    hub: string;
  };
}
