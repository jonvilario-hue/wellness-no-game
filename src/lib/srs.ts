
import type { Card } from '@/types/flashcards';

const MIN_EASE_FACTOR = 1.3;

export function applySpacedRepetition(
  card: Card,
  rating: 'again' | 'hard' | 'good' | 'easy'
): Card {
  let { interval, easeFactor, repetitions } = card;

  if (rating === 'again') {
    repetitions = 0;
    interval = 1; // Show again in 1 day
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.20);
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1; // First successful repetition
    } else if (repetitions === 2) {
      interval = 6; // Second successful repetition
    } else {
      interval = Math.round(interval * easeFactor);
    }
    
    if (rating === 'hard') {
      easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15);
    } else if (rating === 'easy') {
      easeFactor += 0.15;
    }
    // No change for 'good'
  }
  
  const now = new Date();
  const dueDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000).toISOString();

  return {
    ...card,
    interval,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    repetitions,
    dueDate,
  };
}
