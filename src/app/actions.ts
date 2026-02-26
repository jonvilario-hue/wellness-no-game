
'use server';

import * as Engine from '@/lib/cognitive-engine';
import type { CHCDomain } from '@/types';
import { generateNutritionPlan as aiGenerateNutritionPlan, type NutritionArchitectInput } from '@/ai/flows/nutrition-architect-flow';

export async function getWeakAreaRecommendationsAction(performanceData: { domain: string; score: number; sessions: number }[]) {
  // Procedural: Uses local logic to identify lowest scoring domains
  return Engine.getWeakAreaRecommendation(performanceData as any);
}

export async function getAdaptiveDifficultyAction(input: { chcDomain: string; userSkillLevel: number }) {
  // Procedural: Uses deterministic scaling based on skill thresholds
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
  // Procedural: Logic-based recommendation system
  return Engine.getSmartTrainingRecommendation(input);
}

export async function getDailyCircuitAction() {
  // Procedural: Date-based deterministic rotation
  return Engine.getLocalDailyCircuit();
}

export async function generateQuizAction(input: { notes: string }) {
  // Procedural: Uses pattern-matching and sentence parsing to generate quizzes without LLM calls
  return Engine.generateScriptedQuiz(input.notes);
}

export async function generateAIPanAction(input: NutritionArchitectInput) {
  return aiGenerateNutritionPlan(input);
}
