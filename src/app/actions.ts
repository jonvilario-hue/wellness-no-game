
'use server';

import { weakAreaRecommendation, adaptDifficulty, getTrainingRecommendation, getDailyCircuit } from '@/ai/flows';
import type { WeakAreaRecommendationInput, AdaptDifficultyInput, TrainingRecommendationInput } from '@/ai/flows';

export async function getWeakAreaRecommendationsAction() {
  // In a real app, this data would be fetched from a DB.
  // For now, we simulate a user with some performance history.
  const performanceData: WeakAreaRecommendationInput['performanceData'] = [
    { domain: 'Gf', score: 65, sessions: 10 },
    { domain: 'Gc', score: 80, sessions: 15 },
    { domain: 'Gwm', score: 55, sessions: 12 },
    { domain: 'Gs', score: 70, sessions: 8 },
    { domain: 'Gv', score: 60, sessions: 11 },
    { domain: 'Ga', score: 75, sessions: 5 },
    { domain: 'Glr', score: 85, sessions: 20 },
    { domain: 'EF', score: 50, sessions: 18 }, // Clear weakest domain
  ];
  
  try {
    return await weakAreaRecommendation({ performanceData });
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
   // This mock data simulates a real user where a specific insight can be triggered.
  const performanceData: TrainingRecommendationInput['performanceData'] = [
    { domain: 'Gf', score: 70, trend: 2 },
    { domain: 'Gc', score: 80, trend: 5 },
    { domain: 'Gwm', score: 85, trend: 7 }, // High performing domain for "Momentum Starter"
    { domain: 'Gs', score: 75, trend: 1 },
    { domain: 'Gv', score: 90, trend: 8 },
    { domain: 'Ga', score: 75, trend: -1 },
    { domain: 'Glr', score: 85, trend: 4 },
    { domain: 'EF', score: 68, trend: 3 }, // EF score is not the lowest
  ];

  // This input will trigger the "Performance Insight" for morning training.
  const input: TrainingRecommendationInput = {
    performanceData,
    sessionStreak: 5,
    hoursSinceLastSession: 12,
    timeOfDay: 'morning', 
    recentFailures: 0,
  };

  try {
    const result = await getTrainingRecommendation(input);
    // Ensure performanceData is passed through if the flow doesn't add it.
    if (!result.performanceData) {
      result.performanceData = performanceData;
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
