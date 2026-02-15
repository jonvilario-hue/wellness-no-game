
export type CardState = 'new' | 'learning' | 'review' | 'relearning';
export type Rating = 'again' | 'hard' | 'good' | 'easy';
export type CardType = 'basic' | 'cloze';

export type ThemeName = 'midnight' | 'forest' | 'ocean' | 'minimal' | 'crimson';

export interface DeckSettings {
  newCardsPerDay: number;
  reviewsPerDay: number;
  graduatingInterval: number; // days
  easyInterval: number; // days
  startingEase: number;
  intervalModifier: number;
  leechThreshold: number;
  learningSteps: number[]; // in minutes
}

export interface Card {
  id: string;
  front: string;
  back: string;
  deckId: string;
  type: CardType;
  tags: string[];
  state: CardState;
  stepIndex: number;
  due: string; // ISO Date
  interval: number; // in days
  ease: number;
  reps: number;
  lapses: number;
  createdAt: string;
  updatedAt: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  settings: Partial<DeckSettings>;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryEntry {
  id: string;
  cardId: string;
  deckId: string;
  rating: Rating;
  previousState: CardState;
  newState: CardState;
  previousInterval: number;
  newInterval: number;
  timestamp: string;
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  newReviewed: number;
  reviewsDone: number;
  totalReviews: number;
  correctCount: number;
  againCount: number;
}

export interface WaitingRoomItem {
  cardId: string;
  availableAt: number;
}

export interface StudySession {
  deckId: string | null;
  queue: string[];
  waitingRoom: WaitingRoomItem[];
  currentIndex: number;
  isFlipped: boolean;
  sessionStartedAt: string | null;
  newStudied: number;
  reviewsStudied: number;
}
