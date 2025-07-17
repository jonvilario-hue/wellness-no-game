
import type { Card } from '@/types/flashcards';

const MIN_EASE_FACTOR = 1.3;

export function applySpacedRepetition(
  card: Card,
  rating: 'again' | 'hard' | 'good' | 'easy'
): Card {
  let { interval, easeFactor, repetitions } = card;

  if (rating === 'again') {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  if (rating === 'hard') {
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15);
  } else if (rating === 'easy') {
    easeFactor += 0.15;
  } else if (rating === 'good') {
    // No change to ease factor
  } else if (rating === 'again') {
     easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
  }
  
  const now = new Date();
  const dueDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000).toISOString();

  return {
    ...card,
    interval,
    easeFactor,
    repetitions,
    dueDate,
  };
}
