
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ReviewEvent } from '@/types/stats';

type StatsStore = {
  reviews: ReviewEvent[];
  addReview: (review: Omit<ReviewEvent, 'timestamp'>) => void;
};

export const useStatsStore = create<StatsStore>()(
  persist(
    (set) => ({
      reviews: [],
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
      name: 'stats-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
