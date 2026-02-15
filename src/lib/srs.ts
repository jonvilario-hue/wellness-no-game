
import type { Card, DeckSettings } from '@/types/flashcards';

const MIN_EASE_FACTOR = 1.3;

export function applySpacedRepetition(
  card: Card,
  rating: 'again' | 'hard' | 'good' | 'easy',
  settings: DeckSettings
): Card {
  let { interval, easeFactor, repetitions, lapses, suspended } = card;

  // Handle Again (Lapse or Reset)
  if (rating === 'again') {
    lapses = (lapses || 0) + 1;
    repetitions = 0;
    
    // In Anki, a lapse sets the interval to a percentage or minimum.
    // We use the minimum lapse interval provided in settings.
    interval = Math.max(1, settings.minimumLapseIntervalDays); 
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.20);
    
    // Leech check
    if (lapses >= settings.leechThreshold) {
        if (settings.leechAction === 'suspend') {
            suspended = true;
        }
    }
  } else {
    // New Card Graduation logic
    if (repetitions === 0) {
        if (rating === 'easy') {
            interval = settings.easyIntervalDays;
            repetitions = 1; // Graduate immediately
        } else if (rating === 'good') {
            interval = settings.graduatingIntervalDays;
            repetitions = 1; // Graduate after steps
        } else if (rating === 'hard') {
            interval = 1; // Stay in learning
            repetitions = 0;
        }
    } else {
        // Review Card (SM-2 with modifiers)
        repetitions += 1;
        
        if (rating === 'hard') {
            interval = Math.floor(interval * settings.hardIntervalModifier * settings.intervalModifier);
            easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15);
        } else if (rating === 'good') {
            interval = Math.floor(interval * easeFactor * settings.intervalModifier);
        } else if (rating === 'easy') {
            interval = Math.floor(interval * easeFactor * settings.easyBonus * settings.intervalModifier);
            easeFactor += 0.15;
        }
    }
  }
  
  // Clamp to Max Interval
  interval = Math.min(interval, settings.maximumIntervalDays);
  if (interval < 1) interval = 1;
  
  const now = new Date();
  const dueDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000).toISOString();

  return {
    ...card,
    interval,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    repetitions,
    lapses,
    suspended,
    dueDate,
  };
}
