
import type { CHCDomain } from './index';

export type StudyTask = {
  id: string;
  name: string;
  estimatedMinutes: number;
  date: string; // YYYY-MM-DD
  linkedDeckId: string | null;
  repeat: 'none' | 'daily' | 'weekly';
  completed: boolean;
  completedAt: string | null;
};

export type ExamDeadline = {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  linkedDeckIds: string[];
  createdAt: string;
};

export type DailyActivity = {
  cardsReviewed: number;
  cardsLearned: number;
  cardsFailed: number;
  minutesStudied: number;
  tasksCompleted: number;
  decksStudied: Record<string, { reviewed: number; learned: number; failed: number }>;
};

export type ForecastDay = {
  date: string;
  reviews: number;
  newCards: number;
  tasks: number;
  estimatedMinutes: number;
};
