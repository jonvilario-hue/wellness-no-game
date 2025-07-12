'use server';
import { weakAreaRecommendation, adaptDifficulty } from '@/ai/flows';
import type { WeakAreaRecommendationInput, AdaptDifficultyInput } from '@/ai/flows';

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
  } catch (error) {
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
