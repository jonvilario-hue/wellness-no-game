
export type CardType = 'basic' | 'cloze';

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
};

export type DeckSettings = {
  // New Cards
  newCardsPerDay: number;
  learningSteps: number[]; // in minutes
  graduatingIntervalDays: number;
  easyIntervalDays: number;
  insertionOrder: 'sequential' | 'random';

  // Reviews
  maxReviewsPerDay: number;
  startingEase: number;
  easyBonus: number;
  intervalModifier: number;
  hardIntervalModifier: number;
  maximumIntervalDays: number;

  // Lapses
  relearningSteps: number[];
  minimumLapseIntervalDays: number;
  leechThreshold: number;
  leechAction: 'suspend' | 'tag';
};

export type Deck = {
  id: string;
  name: string;
  description?: string;
  settings: DeckSettings;
};
