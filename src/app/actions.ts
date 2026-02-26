'use server';

import * as Engine from '@/lib/cognitive-engine';
import type { CHCDomain } from '@/types';

export async function getWeakAreaRecommendationsAction(performanceData: { domain: string; score: number; sessions: number }[]) {
  return Engine.getWeakAreaRecommendation(performanceData as any);
}

export async function getAdaptiveDifficultyAction(input: { chcDomain: string; userSkillLevel: number }) {
  return Engine.calculateAdaptiveDifficulty(input.chcDomain as CHCDomain, input.userSkillLevel);
}

export async function getTrainingRecommendationAction(performanceData: any[]) {
  const input = {
    performanceData,
    sessionStreak: 5,
    hoursSinceLastSession: 12,
    timeOfDay: 'morning' as const, 
    recentFailures: 0,
  };
  return Engine.getSmartTrainingRecommendation(input);
}

export async function getDailyCircuitAction() {
  return Engine.getLocalDailyCircuit();
}
