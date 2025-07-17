
import type { Card } from '@/types/flashcards';

/**
 * Simplified SM-2 algorithm for spaced repetition.
 * @param card The card being reviewed.
 * @param rating The user's rating of how well they knew the card (1: again, 2: hard, 3: good, 4: easy).
 * @returns An object with the new interval, ease factor, repetitions, and if the answer was correct.
 */
export const sm2 = (
  card: Pick<Card, 'interval' | 'easeFactor' | 'repetitions'>,
  rating: 1 | 2 | 3 | 4
): { interval: number; easeFactor: number; repetitions: number; isCorrect: boolean } => {
  let { interval, easeFactor, repetitions } = { ...card };
  const isCorrect = rating >= 3;

  if (!isCorrect) {
    // If incorrect, reset repetitions and interval, don't change ease factor.
    repetitions = 0;
    interval = 1; // Show again tomorrow
  } else {
    // If correct, calculate new interval and ease factor.
    repetitions += 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    
    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    if (easeFactor < 1.3) {
      easeFactor = 1.3;
    }
  }

  return { interval, easeFactor: parseFloat(easeFactor.toFixed(2)), repetitions, isCorrect };
};
