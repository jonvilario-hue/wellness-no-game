
'use server';

import * as Engine from '@/lib/cognitive-engine';
import type { CHCDomain } from '@/types';
import { generateNutritionPlan as aiGenerateNutritionPlan, type NutritionArchitectInput } from '@/ai/flows/nutrition-architect-flow';
import { generateQuiz as aiGenerateQuiz } from '@/ai/flows/quiz-flow';
import { generateWhyChain, generateStarterExample } from '@/ai/flows/scholar-flows';

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

/**
 * AI-Powered Quiz Generation
 */
export async function generateQuizAction(input: { notes: string }) {
  return aiGenerateQuiz(input);
}

/**
 * AI-Powered Nutritional Architecture
 */
export async function generateAIPanAction(input: NutritionArchitectInput) {
  return aiGenerateNutritionPlan(input);
}

/**
 * AI-Powered Elaborative Interrogation
 */
export async function generateWhyChainAction(topic: string) {
  return generateWhyChain({ topic });
}

/**
 * AI-Powered Concrete Example Generation
 */
export async function generateStarterExampleAction(concept: string) {
  return generateStarterExample({ concept });
}
