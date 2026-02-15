'use server';

import { generateQuiz } from '@/ai/flows';
import * as Engine from '@/lib/cognitive-engine';
import type { CHCDomain } from '@/types';

export async function getWeakAreaRecommendationsAction(performanceData: { domain: string; score: number; sessions: number }[]) {
  // Optimized: Uses local logic instead of server-side AI flow initialization
  return Engine.getWeakAreaRecommendation(performanceData as any);
}

export async function getAdaptiveDifficultyAction(input: { chcDomain: string; userSkillLevel: number }) {
  // Optimized: Deterministic logic is faster and cheaper
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
  // Optimized: Logic-based engine
  return Engine.getSmartTrainingRecommendation(input);
}

export async function getDailyCircuitAction() {
  // Optimized: Date-based deterministic rotation
  return Engine.getLocalDailyCircuit();
}

export async function generateQuizAction(input: { notes: string }) {
  try {
    // Primary: True AI for better questions
    return await generateQuiz(input);
  } catch (error) {
    console.error('AI Quiz failed, falling back to script:', error);
    // Fallback: Scripted regex-based quiz
    return Engine.generateScriptedQuiz(input.notes);
  }
}
