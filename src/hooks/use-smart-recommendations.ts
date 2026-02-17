
'use client';

import { useMemo } from 'react';
import { useBlueprintStore } from './use-blueprint-store';
import { useWellnessData } from './use-wellness-data';
import { useHydratedJournalStore as useJournal } from './use-journal';
import { useRecommendationsStore } from './use-recommendations-store';
import { generateSmartRecommendations } from '@/lib/recommendation-engine';
import type { Recommendation } from '@/types/recommendations';

export function useSmartRecommendations() {
  const { projects: blueprints } = useBlueprintStore();
  const { movementLogs, stillnessLogs } = useWellnessData();
  const { completedHabits, hasHydrated: journalHydrated } = useJournal();
  const { preferences, isDismissed, logShown } = useRecommendationsStore();

  const activeRecommendations = useMemo(() => {
    if (!journalHydrated) return [];

    const allRecs = generateSmartRecommendations({
      blueprints,
      movementLogs,
      stillnessLogs,
      habits: completedHabits,
      preferences
    });

    // Filter out dismissed ones and limit to maxPerDay
    const filtered = allRecs
      .filter(r => !isDismissed(r.id))
      .slice(0, preferences.maxPerDay);

    return filtered;
  }, [blueprints, movementLogs, stillnessLogs, completedHabits, journalHydrated, preferences, isDismissed]);

  return {
    recommendations: activeRecommendations,
    logShown
  };
}
