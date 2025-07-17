// components/stats/utils.ts
import type { ReviewEvent, StudySession, TagPerformanceData, ReviewStats, DeckEngagementStats, CardDifficulty, ProgressPoint, StreakStats } from "@/types/stats";
import type { Card, Deck } from "@/types/flashcards";

// --- Main Data Processing Function ---

export function processReviewData(reviews: ReviewEvent[], cards: Card[], decks: Deck[]) {
  const sessions = generateMockSessions(reviews, decks);
  const reviewQuality = getReviewQuality(reviews);
  const deckEngagement = getDeckEngagement(reviews, decks);
  const cardDifficulty = getCardDifficultyIndex(reviews, cards);
  const progressTimeline = getProgressTimeline(reviews);
  const streakSystem = getStreakSystem(reviews);
  const tagPerformance = getTagPerformance(reviews);
  const retentionCurve = { days: [1, 7, 14, 30, 60], retention: [95, 85, 80, 75, 70] }; // Mock retention data

  return {
    sessions,
    reviewQuality,
    deckEngagement,
    cardDifficulty,
    progressTimeline,
    streakSystem,
    tagPerformance,
    retentionCurve
  };
}


// --- Utility Functions ---

export function getStreak(dates: string[]): { current: number, longest: number } {
  if (dates.length === 0) return { current: 0, longest: 0 };

  const uniqueDates = [...new Set(dates.map(d => new Date(d).toDateString()))]
    .map(d => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());
  
  if (uniqueDates.length === 0) return { current: 0, longest: 0 };

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Check current streak from today
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  
  const firstDate = uniqueDates[0];
  if (firstDate.toDateString() === today.toDateString() || firstDate.toDateString() === yesterday.toDateString()) {
    currentStreak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
        const diff = uniqueDates[i].getTime() - uniqueDates[i+1].getTime();
        if (diff === 24 * 60 * 60 * 1000) {
            currentStreak++;
        } else {
            break;
        }
    }
  }

  // Calculate longest streak
  if (uniqueDates.length > 0) {
      tempStreak = 1;
      longestStreak = 1;
  }
  for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = uniqueDates[i].getTime() - uniqueDates[i+1].getTime();
      if (diff === 24 * 60 * 60 * 1000) {
          tempStreak++;
      } else {
          tempStreak = 1;
      }
      if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
      }
  }

  return { current: currentStreak, longest: longestStreak };
}

// --- Mock Data Generation and Processing ---

function generateMockSessions(reviews: ReviewEvent[], decks: Deck[]): StudySession[] {
    const sessionsByDay: Record<string, StudySession> = {};
    reviews.forEach(review => {
        const date = new Date(review.timestamp).toISOString().split('T')[0];
        const deckName = decks.find(d => d.id === review.deckId)?.name || 'Unknown Deck';
        if (!sessionsByDay[date]) {
            sessionsByDay[date] = { date, deckName, cardsStudied: 0, correct: 0, total: 0, duration: 0 };
        }
        sessionsByDay[date].cardsStudied++;
        sessionsByDay[date].total++;
        if (review.rating !== 'again') {
            sessionsByDay[date].correct++;
        }
    });

    return Object.values(sessionsByDay).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
}

function getReviewQuality(reviews: ReviewEvent[]): ReviewStats {
    return reviews.reduce((acc, review) => {
        acc[review.rating]++;
        return acc;
    }, { again: 0, hard: 0, good: 0, easy: 0 });
}

function getDeckEngagement(reviews: ReviewEvent[], decks: Deck[]): DeckEngagementStats[] {
    const engagement: Record<string, { deck: string, sessions: number, lastUsed: string, correct: number, total: number }> = {};
    decks.forEach(deck => {
        engagement[deck.id] = { deck: deck.name, sessions: 0, lastUsed: 'Never', correct: 0, total: 0 };
    });

    reviews.forEach(review => {
        const deckId = review.deckId;
        if(engagement[deckId]){
            engagement[deckId].total++;
            if(review.rating !== 'again') engagement[deckId].correct++;
            engagement[deckId].lastUsed = new Date(review.timestamp).toLocaleDateString();
        }
    });

    // Mock sessions count
    Object.keys(engagement).forEach(deckId => {
        engagement[deckId].sessions = Math.floor(engagement[deckId].total / 10) + 1;
    });

    return Object.values(engagement).map(d => ({ ...d, accuracy: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0 }));
}

function getCardDifficultyIndex(reviews: ReviewEvent[], cards: Card[]): CardDifficulty[] {
    return cards.map(card => {
        const cardReviews = reviews.filter(r => r.cardId === card.id);
        const lapses = cardReviews.filter(r => r.rating === 'again').length;
        return {
            front: card.front,
            ease: card.easeFactor,
            lapses: lapses,
        };
    }).sort((a, b) => a.ease - b.ease).slice(0, 5); // Top 5 most difficult
}

function getProgressTimeline(reviews: ReviewEvent[]): ProgressPoint[] {
    const learnedCards = new Set<string>();
    const timeline: Record<string, number> = {};

    reviews.sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).forEach(review => {
        const date = new Date(review.timestamp).toISOString().split('T')[0];
        if (!learnedCards.has(review.cardId)) {
            learnedCards.add(review.cardId);
            timeline[date] = (timeline[date] || 0) + 1;
        }
    });

    let cumulative = 0;
    return Object.entries(timeline).map(([date, learned]) => {
        cumulative += learned;
        return { date, learned: cumulative };
    }).slice(-30); // Last 30 learning days
}

function getStreakSystem(reviews: ReviewEvent[]): StreakStats {
    const studyDates = reviews.map(r => r.timestamp);
    const { current, longest } = getStreak(studyDates);
    return { streak: current, longest: longest };
}

function getTagPerformance(reviews: ReviewEvent[]): TagPerformanceData[] {
  const tags: Record<string, { correct: number, total: number, lapses: number }> = {};
  reviews.filter(r => r.tag).forEach(review => {
    if (!tags[review.tag!]) {
      tags[review.tag!] = { correct: 0, total: 0, lapses: 0 };
    }
    tags[review.tag!].total++;
    if (review.rating !== 'again') {
      tags[review.tag!].correct++;
    } else {
      tags[review.tag!].lapses++;
    }
  });

  return Object.entries(tags).map(([tag, data]) => ({
    tag,
    accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    lapses: data.lapses,
    reviews: data.total
  })).sort((a, b) => b.reviews - a.reviews);
}
