
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ReviewEvent } from '@/types/stats';

type StatsStore = {
  reviews: ReviewEvent[];
  addReview: (review: Omit<ReviewEvent, 'timestamp'>) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

const createInitialReviews = (): ReviewEvent[] => {
    const reviews: ReviewEvent[] = [];
    const now = new Date();
    const ratings: ReviewEvent['rating'][] = ['easy', 'good', 'good', 'hard', 'again', 'good'];

    for (let i = 0; i < 30; i++) { // Create 30 review events
        const reviewDate = new Date(now);
        reviewDate.setDate(now.getDate() - Math.floor(i / 5)); // 5 reviews per day for the last 6 days

        const cardId = `mockCard${(i % 5) + 1}`;
        const deckId = i % 2 === 0 ? 'default' : 'mockDeck1';
        const rating = ratings[i % ratings.length];

        reviews.push({
            cardId,
            deckId,
            tag: i % 3 === 0 ? 'biology' : 'chapter-1',
            timestamp: reviewDate.toISOString(),
            rating,
            ease: 2.5 + (Math.random() - 0.5) * 0.2,
            interval: Math.floor(Math.random() * 10) + 1,
            lapses: rating === 'again' ? 1 : 0,
        });
    }
    return reviews;
};


export const useStatsStore = create<StatsStore>()(
  persist(
    (set) => ({
      reviews: [],
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        });
      },
      addReview: (newReview) =>
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              ...newReview,
              timestamp: new Date().toISOString(),
            },
          ],
        })),
    }),
    {
      name: 'stats-storage-v2', // Use a new key to ensure fresh state with mock data
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
            // Seed with mock data only if the store is empty after rehydration
            if (state.reviews.length === 0) {
                state.reviews = createInitialReviews();
            }
            state.setHasHydrated(true);
        }
      }
    }
  )
);
