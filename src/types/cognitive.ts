
import type { CHCDomain } from './index';

export type AdaptDifficultyOutput = {
  adjustedDifficulty: 'Easy' | 'Medium' | 'Hard';
  reasoning: string;
};

export type AdaptDifficultyInput = {
  chcDomain: CHCDomain;
  userSkillLevel: number;
};

export type WeakAreaRecommendationOutput = {
  recommendations: Array<{
    domain: CHCDomain;
    exercise: string;
    reason: string;
  }>;
  message?: string;
};

export type TrainingRecommendationOutput = {
  recommendationType: 'weakArea' | 'performanceInsight' | 'momentumStarter';
  title: string;
  description: string;
  domain: CHCDomain;
};

export type DailyCircuitOutput = {
  circuitTitle: string;
  segments: Array<{
    domain: CHCDomain;
    title: string;
    gameTitle: string;
    transferAnchor: string;
  }>;
};
