
export type CodingLanguage = 'Python' | 'JavaScript' | 'TypeScript' | 'Java' | 'C++';
export type CodingDrillType = 'Syntax Sprints' | 'Output Prediction' | 'Bug Hunt' | 'Code Reconstruction' | 'Timed Implementation';
export type BugCategory = 'Syntax' | 'Logic' | 'Off-by-One' | 'Scope' | 'Type' | 'Missing Return';

export interface CodingDrillLog {
  id: string;
  timestamp: string;
  date: string; // YYYY-MM-DD
  type: CodingDrillType;
  language: CodingLanguage;
  difficulty: number;
  durationSeconds: number;
  accuracy: number; // 0-100
  speedMetric: number; // CPM for syntax, seconds for others
  userDifficultyRating: number; // 1-5
  userFocusRating: number; // 1-5
}

export interface LanguageProgress {
  language: CodingLanguage;
  level: number;
  consecutiveSuccesses: number;
  consecutiveFailures: number;
  avgAccuracy: number;
  avgSpeed: number;
}

export interface CodingDrill {
  id: string;
  type: CodingDrillType;
  language: CodingLanguage;
  difficulty: number;
  title: string;
  content: string; // The code snippet
  expectedOutput?: string;
  bugs?: Array<{ line: number; type: BugCategory }>;
  testCases?: Array<{ input: any; output: any }>;
  description?: string;
  studyTimeSeconds?: number;
}
