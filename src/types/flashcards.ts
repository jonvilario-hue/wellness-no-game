
export type CardType = 'basic' | 'cloze' | 'basic-reversed' | 'image-occlusion' | 'type-in';

export type Card = {
  id: string;
  deckId: string;
  front: string;
  back: string;
  type: CardType;
  tags?: string[];
  // SRS data
  interval: number; // in days
  easeFactor: number;
  repetitions: number;
  lapses: number; // count of "again" ratings
  suspended?: boolean;
  dueDate: string; // ISO string
  // Advanced tracking
  lastReviewDate?: string;
  noteId?: string; // For sibling burying
};

export interface DeckSettings {
  // ── New Cards ──────────────────────────────────
  newCardsPerDay: number;            // default: 20
  learningSteps: number[];           // default: [1, 10] (minutes)
  graduatingIntervalDays: number;    // default: 1
  easyIntervalDays: number;          // default: 4
  insertionOrder: 'sequential' | 'random' | 'newest-first'; // default: 'sequential'

  // ── Reviews ────────────────────────────────────
  maxReviewsPerDay: number;          // default: 200
  startingEase: number;              // default: 2.5
  easyBonus: number;                 // default: 1.3
  intervalModifier: number;          // default: 1.0
  hardIntervalModifier: number;      // default: 1.2
  maximumIntervalDays: number;       // default: 36500
  minimumIntervalDays: number;       // default: 1
  fuzzFactorEnabled: boolean;        // default: true

  // ── Lapses ─────────────────────────────────────
  relearningSteps: number[];         // default: [10]
  newIntervalAfterLapsePercent: number; // default: 0 (0% = reset to 1 day)
  minimumLapseIntervalDays: number;  // default: 1
  leechThreshold: number;            // default: 8
  leechAction: 'suspend' | 'tag';    // default: 'suspend'

  // ── Display & Order ────────────────────────────
  reviewSortOrder: 'due-date' | 'random' | 'interval-asc' | 'interval-desc' | 'ease-asc' | 'ease-desc' | 'added-order';
  interdayLearningPriority: 'before-reviews' | 'after-reviews' | 'mixed';
  showAnswerTimer: boolean;
  showRemainingCount: boolean;
  autoplayAudio: boolean;

  // ── Burying & Siblings ──────────────────────────
  buryNewSiblings: boolean;
  buryReviewSiblings: boolean;
  buryInterdayLearningSiblings: boolean;

  // ── Advanced Algorithm ──────────────────────────
  algorithm: 'sm2' | 'fsrs';
  desiredRetention: number;          // default: 0.90
  fsrsParameters: number[];

  // ── Daily Limits ────────────────────────────────
  learnAheadLimitMinutes: number;    // default: 20
  dayBoundaryHour: number;           // default: 4 (4 AM)
}

export type Deck = {
  id: string;
  name: string;
  description?: string;
  settings: DeckSettings;
};
