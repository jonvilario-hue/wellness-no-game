'use client';

export type ReadingTier = 'Casual' | 'Technical' | 'Dense Data' | 'Narrative';
export type ReadingDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type DrillType = 
  | 'Pacer' 
  | 'Peripheral Expansion';

export interface ComprehensionQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface ReadingPassage {
  id: string;
  title: string;
  author: string;
  content: string;
  wordCount: number;
  tier: ReadingTier;
  difficulty: ReadingDifficulty;
  quiz?: ComprehensionQuestion[];
  isCustom?: boolean;
}

export interface ReadingLog {
  id: string;
  date: string;
  timestamp: string;
  drillType: DrillType;
  passageId: string;
  tier: ReadingTier;
  difficulty: ReadingDifficulty;
  wpm: number;
  comprehensionScore: number; // 0-100
  err: number; // Effective Reading Rate: WPM * (Comp / 100)
  preFocus: number; // 1-5
  postFatigue: number; // 1-5
  durationSeconds: number;
  isCustomText?: boolean;
  isSelfAssessed?: boolean;
}

export interface SpeedReadingAchievement {
  highestWPM: number;
  highestERR: number;
  bestCompAtHighSpeed: number; // Best score when WPM > 400
  streak: number;
  lastDrillDate: string | null;
}
