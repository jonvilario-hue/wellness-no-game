
import type { Card, Rating, DeckSettings, DailyProgress, CardState } from '@/types/srs-types';

export const DEFAULT_SETTINGS: DeckSettings = {
  newCardsPerDay: 20,
  reviewsPerDay: 200,
  graduatingInterval: 1,
  easyInterval: 4,
  startingEase: 2.5,
  intervalModifier: 1.0,
  leechThreshold: 8,
  learningSteps: [1, 10],
};

export function getEffectiveSettings(global: DeckSettings, deck: Partial<DeckSettings>): DeckSettings {
  return { ...global, ...deck };
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMinutes(date: Date, minutes: number): Date {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

export function scheduleCard(card: Card, rating: Rating, settings: DeckSettings): Card {
  const now = new Date();
  let nextState: CardState = card.state;
  let nextInterval = card.interval;
  let nextEase = card.ease;
  let nextDue = now;
  let nextStepIndex = card.stepIndex;

  const steps = settings.learningSteps.length > 0 ? settings.learningSteps : [1, 10];

  if (card.state === 'new' || card.state === 'learning' || card.state === 'relearning') {
    if (rating === 'again') {
      nextStepIndex = 0;
      nextDue = addMinutes(now, steps[0]);
      nextState = card.state === 'review' ? 'relearning' : 'learning';
    } else if (rating === 'hard') {
      // Hard keeps current step but adds a bit more delay
      nextDue = addMinutes(now, steps[nextStepIndex] * 1.5);
    } else if (rating === 'good') {
      nextStepIndex++;
      if (nextStepIndex >= steps.length) {
        nextState = 'review';
        nextInterval = settings.graduatingInterval;
        nextDue = addDays(now, nextInterval);
      } else {
        nextDue = addMinutes(now, steps[nextStepIndex]);
      }
    } else if (rating === 'easy') {
      nextState = 'review';
      nextInterval = settings.easyInterval;
      nextDue = addDays(now, nextInterval);
    }
  } else {
    // Review state (SM-2 logic)
    if (rating === 'again') {
      nextState = 'relearning';
      nextStepIndex = 0;
      nextInterval = 1;
      nextEase = Math.max(1.3, nextEase - 0.2);
      nextDue = addMinutes(now, steps[0]);
    } else {
      if (rating === 'hard') {
        nextInterval = Math.max(1, Math.floor(nextInterval * 1.2 * settings.intervalModifier));
        nextEase = Math.max(1.3, nextEase - 0.15);
      } else if (rating === 'good') {
        nextInterval = Math.max(1, Math.floor(nextInterval * nextEase * settings.intervalModifier));
      } else if (rating === 'easy') {
        nextInterval = Math.max(1, Math.floor(nextInterval * nextEase * 1.3 * settings.intervalModifier));
        nextEase += 0.15;
      }
      nextDue = addDays(now, nextInterval);
    }
  }

  return {
    ...card,
    state: nextState,
    interval: nextInterval,
    ease: nextEase,
    due: nextDue.toISOString(),
    stepIndex: nextStepIndex,
    reps: card.reps + 1,
    lapses: rating === 'again' ? card.lapses + 1 : card.lapses,
    updatedAt: now.toISOString(),
  };
}

export function getDueCards(
  cards: Card[],
  deckId: string,
  settings: DeckSettings,
  progress?: DailyProgress
) {
  const now = new Date();
  const deckCards = cards.filter(c => c.deckId === deckId);

  const learningCards = deckCards.filter(c => 
    (c.state === 'learning' || c.state === 'relearning') && new Date(c.due) <= now
  );

  const newLimit = Math.max(0, settings.newCardsPerDay - (progress?.newReviewed || 0));
  const newCards = deckCards.filter(c => c.state === 'new').slice(0, newLimit);

  const reviewLimit = Math.max(0, settings.reviewsPerDay - (progress?.reviewsDone || 0));
  const reviewCards = deckCards.filter(c => 
    c.state === 'review' && new Date(c.due) <= now
  ).slice(0, reviewLimit);

  return { learningCards, newCards, reviewCards };
}

export function getPreviewIntervals(card: Card, settings: DeckSettings): Record<Rating, string> {
  const steps = settings.learningSteps.length > 0 ? settings.learningSteps : [1, 10];
  
  if (card.state === 'new') {
    return { 
      again: `${steps[0]}m`, 
      hard: `${Math.round(steps[0] * 1.5)}m`, 
      good: `${steps[1] || 10}m`, 
      easy: `${settings.easyInterval}d` 
    };
  }
  
  if (card.state === 'review') {
    return {
      again: `${steps[0]}m`,
      hard: '1.2x',
      good: `${card.ease.toFixed(1)}x`,
      easy: `${(card.ease * 1.3).toFixed(1)}x`
    };
  }

  return { again: '1m', hard: '1.5m', good: '10m', easy: '4d' };
}
