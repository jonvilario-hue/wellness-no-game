
export type GameState = 'idle' | 'playing' | 'reviewing' | 'complete' | 'paused';

export type DifficultyTier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master' | 'Elite';

export interface RoundResult {
  roundNumber: number;
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
  responseTimeMs: number;
  pointsEarned: number;
}

export interface GameSession {
  gameName: string;
  difficulty: DifficultyTier;
  startTime: number;
  rounds: RoundResult[];
  totalScore: number;
  currentStreak: number;
  maxStreak: number;
}
