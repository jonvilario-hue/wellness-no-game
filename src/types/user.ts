
import type { DifficultyTier, RoundResult } from './game';

export interface GameSessionRecord {
  id?: number;
  gameName: string;
  date: string; // ISO
  score: number;
  accuracy: number;
  duration: number; // seconds
  difficulty: DifficultyTier;
  roundDetails: RoundResult[];
  maxStreak: number;
}

export interface SkillRating {
  skillName: string;
  gameName: string;
  currentRating: number; // 0-100
  history: { date: string; rating: number }[];
  lastPracticed: string;
  totalSessions: number;
}
