
export type CardType = 'basic' | 'cloze';

export type Card = {
  id: string;
  deckId: string;
  front: string;
  back: string;
  type: CardType;
  // SRS data
  interval: number; // in days
  easeFactor: number;
  repetitions: number;
  dueDate: string; // ISO string
};

export type Deck = {
  id: string;
  name: string;
  description?: string;
};
