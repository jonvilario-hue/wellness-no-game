// types/stats.ts

// Data for a single study session
export type StudySession = {
  date: string; // ISO date string
  deckName: string;
  cardsStudied: number;
  correct: number;
  total: number;
  duration: number; // in minutes
};

// Raw data for a single card review event
export type ReviewEvent = {
  cardId: string;
  deckId: string;
  tag?: string;
  timestamp: string; // ISO date string
  rating: 'again' | 'hard' | 'good' | 'easy';
  ease: number;
  interval: number; // in days
  lapses: number;
};

// Aggregated stats for review feedback quality
export type ReviewStats = {
  again: number;
  hard: number;
  good: number;
  easy: number;
};

// Data for the retention curve chart
export type RetentionData = {
  days: number[];
  retention: number[];
};

// Engagement stats for a single deck
export type DeckEngagementStats = {
  deck: string;
  sessions: number;
  lastUsed: string;
  accuracy: number;
};

// Difficulty stats for a single card
export type CardDifficulty = {
  front: string;
  ease: number;
  lapses: number;
};

// Data for the progress timeline chart
export type ProgressPoint = {
  date: string;
  learned: number;
};

// Streak information
export type StreakStats = {
  streak: number;
  longest: number;
};

// Performance stats for a single tag
export type TagPerformanceData = {
  tag: string;
  accuracy: number;
  lapses: number;
  reviews: number;
};
