
import type { Card, DeckSettings } from '@/types/flashcards';

const MIN_EASE_FACTOR = 1.3;

/**
 * Applies SM-2 algorithm with enhancements.
 * FSRS is currently a placeholder logic using SM-2 fallback.
 */
export function applySpacedRepetition(
  card: Card,
  rating: 'again' | 'hard' | 'good' | 'easy',
  settings: DeckSettings
): Card {
  // If FSRS is enabled, we'd use a different formula here.
  // For MVP, we stick to enhanced SM-2.
  
  let { interval, easeFactor, repetitions, lapses, suspended } = card;

  // ── AGAIN (Lapse) ──────────────────────────────────────────────────────────
  if (rating === 'again') {
    lapses = (lapses || 0) + 1;
    repetitions = 0;
    
    // Anki logic: new interval = current interval * lapse multiplier
    const lapseMultiplier = settings.newIntervalAfterLapsePercent / 100;
    interval = Math.max(settings.minimumLapseIntervalDays, Math.floor(interval * lapseMultiplier));
    
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.20);
    
    // Leech check
    if (lapses >= settings.leechThreshold) {
        if (settings.leechAction === 'suspend') {
            suspended = true;
        }
    }
  } 
  // ── LEARNING PHASE ────────────────────────────────────────────────────────
  else if (repetitions === 0) {
    if (rating === 'easy') {
        interval = settings.easyIntervalDays;
        repetitions = 1; 
    } else if (rating === 'good') {
        interval = settings.graduatingIntervalDays;
        repetitions = 1;
    } else if (rating === 'hard') {
        interval = Math.max(settings.minimumIntervalDays, 1);
        repetitions = 0;
    }
  } 
  // ── REVIEW PHASE ──────────────────────────────────────────────────────────
  else {
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
  
  // ── FINAL ADJUSTMENTS ─────────────────────────────────────────────────────
  
  // Apply Fuzz (randomness to prevent clustering)
  if (settings.fuzzFactorEnabled && interval > 2) {
    const fuzz = 0.95 + Math.random() * 0.1; // +/- 5%
    interval = Math.round(interval * fuzz);
  }

  // Clamp to bounds
  interval = Math.max(settings.minimumIntervalDays, interval);
  interval = Math.min(interval, settings.maximumIntervalDays);
  
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
    lastReviewDate: now.toISOString()
  };
}
