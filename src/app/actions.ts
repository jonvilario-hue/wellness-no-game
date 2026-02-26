
'use server';

import * as Engine from '@/lib/cognitive-engine';
import type { CHCDomain } from '@/types';
import type { 
  WeakAreaRecommendationOutput, 
  AdaptDifficultyOutput, 
  TrainingRecommendationOutput, 
  DailyCircuitOutput 
} from '@/types/cognitive';

/**
 * These actions are powered by deterministic local engines in @/lib/cognitive-engine.
 * No AI models or third-party token-based services are used.
 */

export async function getWeakAreaRecommendationsAction(performanceData: { domain: string; score: number; sessions: number }[]): Promise<WeakAreaRecommendationOutput> {
  return Engine.getWeakAreaRecommendation(performanceData as any);
}

export async function getAdaptiveDifficultyAction(input: { chcDomain: string; userSkillLevel: number }): Promise<AdaptDifficultyOutput> {
  return Engine.calculateAdaptiveDifficulty(input.chcDomain as CHCDomain, input.userSkillLevel);
}

export async function getTrainingRecommendationAction(performanceData: any[]): Promise<TrainingRecommendationOutput> {
  const input = {
    performanceData,
    sessionStreak: 5,
    hoursSinceLastSession: 12,
    timeOfDay: 'morning' as const, 
    recentFailures: 0,
  };
  return Engine.getSmartTrainingRecommendation(input);
}

export async function getDailyCircuitAction(): Promise<DailyCircuitOutput> {
  return Engine.getLocalDailyCircuit();
}
