
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

export interface DeckSettings {
  // ── New Cards ──────────────────────────────────
  newCardsPerDay: number;            // default: 20
  learningSteps: number[];           // default: [1, 10] (minutes)
  graduatingIntervalDays: number;    // default: 1 — interval after all learning steps passed with "Good"
  easyIntervalDays: number;          // default: 4 — interval when "Easy" is pressed on a new/learning card
  insertionOrder: 'sequential' | 'random'; // default: 'sequential'

  // ── Reviews ────────────────────────────────────
  maxReviewsPerDay: number;          // default: 200
  startingEase: number;              // default: 2.5 (displayed as 250%)
  easyBonus: number;                 // default: 1.3 (displayed as 130%)
  intervalModifier: number;          // default: 1.0 (displayed as 100%)
  hardIntervalModifier: number;      // default: 1.2 (displayed as 120%)
  maximumIntervalDays: number;       // default: 36500 (≈100 years)

  // ── Lapses ─────────────────────────────────────
  relearningSteps: number[];         // default: [10] (minutes)
  minimumLapseIntervalDays: number;  // default: 1
  leechThreshold: number;            // default: 8 (number of times "Again" before leech)
  leechAction: 'suspend' | 'tag';    // default: 'suspend'
}

export type Deck = {
  id: string;
  name: string;
  description?: string;
  settings: DeckSettings;
};
