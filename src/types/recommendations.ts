
export type RecommendationType = 
  | 'recovery' 
  | 'momentum_booster' 
  | 'streak_saver' 
  | 'milestone_nudge' 
  | 'learning' 
  | 'celebration' 
  | 'planning' 
  | 'energy_management';

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  actionLabel: string;
  actionLink: string;
  priority: number; // 0-100
  metadata?: Record<string, any>;
}

export interface RecommendationHistory {
  shown: Array<{
    id: string;
    type: RecommendationType;
    shownAt: string;
    dismissed: boolean;
    acted: boolean;
    actedAt?: string;
  }>;
  preferences: {
    enabledCategories: RecommendationType[];
    quietHoursStart: string; // HH:mm
    quietHoursEnd: string; // HH:mm
    maxPerDay: number;
  };
}
