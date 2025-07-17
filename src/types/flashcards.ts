
export type CardType = "basic"; // | "cloze" | "image";

export type Card = {
  id: string;
  front: string;
  back: string;
  tags: string[];
  deckId: string;
  // SRS data
  interval: number; // in days
  easeFactor: number;
  repetitions: number;
  dueDate: string; // ISO string
  // Timestamps
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  type: CardType;
};

export type Deck = {
    id: string;
    name: string;
    description: string;
};

export type ReviewLog = {
    cardId: string;
    deckId: string;
    reviewedAt: string; // ISO String
    rating: 'again' | 'hard' | 'good' | 'easy'; // Corresponds to SM-2 ratings 1-4 (0 = again)
    previousInterval: number;
    newInterval: number;
    previousEaseFactor: number;
    newEaseFactor: number;
};
