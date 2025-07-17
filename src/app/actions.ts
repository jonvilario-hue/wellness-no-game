
'use server';

import { weakAreaRecommendation, adaptDifficulty, getTrainingRecommendation, getDailyCircuit } from '@/ai/flows';
import type { AdaptDifficultyInput, TrainingRecommendationInput } from '@/ai/flows';
import { usePerformanceStore } from '@/hooks/use-performance-store';

export async function getWeakAreaRecommendationsAction() {
  const performanceData = usePerformanceStore.getState().performance;
  const flatPerformanceData = Object.entries(performanceData).map(([domain, data]) => ({
      domain,
      score: data.neutral.score,
      sessions: data.neutral.sessions,
  })) as any; // Cast as any to satisfy the input type
  
  try {
    return await weakAreaRecommendation({ performanceData: flatPerformanceData });
  } catch (error)
  {
    console.error(error);
    return null;
  }
}

export async function getAdaptiveDifficultyAction(input: AdaptDifficultyInput) {
  try {
    return await adaptDifficulty(input);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTrainingRecommendationAction() {
   const performanceData = usePerformanceStore.getState().performance;
   const flatPerformanceData = Object.entries(performanceData).map(([domain, data]) => ({
      domain,
      score: data.neutral.score,
      trend: data.neutral.trend,
   })) as any;

  // This input will trigger the "Performance Insight" for morning training.
  const input: TrainingRecommendationInput = {
    performanceData: flatPerformanceData,
    sessionStreak: 5,
    hoursSinceLastSession: 12,
    timeOfDay: 'morning', 
    recentFailures: 0,
  };

  try {
    const result = await getTrainingRecommendation(input);
    if (!result.performanceData) {
      result.performanceData = flatPerformanceData;
    }
    return result;
  } catch (error) {
    console.error('Error getting training recommendation:', error);
    return null;
  }
}

export async function getDailyCircuitAction() {
  try {
    const result = await getDailyCircuit();
    return result;
  } catch (error) {
    console.error('Error getting daily circuit:', error);
    return null;
  }
}
