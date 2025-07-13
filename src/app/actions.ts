'use server';
import { weakAreaRecommendation, adaptDifficulty, getTrainingRecommendation } from '@/ai/flows';
import type { WeakAreaRecommendationInput, AdaptDifficultyInput, TrainingRecommendationInput } from '@/ai/flows';

export async function getWeakAreaRecommendationsAction() {
  // Mock performance data to simulate a real user
  const performanceData: WeakAreaRecommendationInput['performanceData'] = [
    { domain: 'Gf', score: 65, sessions: 10 },
    { domain: 'Gc', score: 80, sessions: 15 },
    { domain: 'Gwm', score: 55, sessions: 12 },
    { domain: 'Gs', score: 70, sessions: 8 },
    { domain: 'Gv', score: 60, sessions: 11 },
    { domain: 'Ga', score: 75, sessions: 5 },
    { domain: 'Glr', score: 85, sessions: 20 },
    { domain: 'EF', score: 50, sessions: 18 },
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
   // Mock performance data to simulate a real user
  const performanceData: TrainingRecommendationInput['performanceData'] = [
    { domain: 'Gf', score: 65, trend: -3 },
    { domain: 'Gc', score: 80, trend: 5 },
    { domain: 'Gwm', score: 55, trend: 2 },
    { domain: 'Gs', score: 70, trend: 1 },
    { domain: 'Gv', score: 90, trend: 8 },
    { domain: 'Ga', score: 75, trend: -1 },
    { domain: 'Glr', score: 85, trend: 4 },
    { domain: 'EF', score: 48, trend: -5 },
  ];

  const input: TrainingRecommendationInput = {
    performanceData,
    sessionStreak: 0,
    hoursSinceLastSession: 30,
    timeOfDay: 'morning',
    recentFailures: 3,
  };

  try {
    return await getTrainingRecommendation(input);
  } catch (error) {
    console.error('Error getting training recommendation:', error);
    return null;
  }
}
