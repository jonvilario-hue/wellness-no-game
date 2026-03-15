
export type CodingLanguage = 'Python' | 'JavaScript' | 'TypeScript' | 'Java' | 'C++' | 'Rust' | 'SQL' | 'Bash' | 'Swift' | 'Go';
export type CodingDrillType = 'Syntax Sprints' | 'Output Prediction' | 'Bug Hunt' | 'Code Reconstruction' | 'Timed Implementation';
export type CodingLane = 'Write' | 'Read' | 'Build';
export type BugCategory = 'Syntax' | 'Logic' | 'Off-by-One' | 'Scope' | 'Type' | 'Missing Return' | 'Concurrency' | 'Memory' | 'Ownership' | 'Database' | 'Borrow Checker';
export type CodingTrack = 'Foundation' | 'Specialist';

export interface CodingDrillLog {
  id: string;
  timestamp: string;
  date: string; // YYYY-MM-DD
  type: CodingDrillType;
  lane: CodingLane;
  language: CodingLanguage;
  difficulty: number;
  durationSeconds: number;
  accuracy: number; // 0-100
  speedMetric: number; 
  userDifficultyRating: number;
  userFocusRating: number;
  concept?: string; // e.g. "closures", "concurrency"
}

export interface LanguageProgress {
  language: CodingLanguage;
  level: number;
  consecutiveSuccesses: number;
  consecutiveFailures: number;
  avgAccuracy: number;
  avgSpeed: number;
  conceptWeaknesses: Record<string, number>; // concept -> failCount
}

export interface LaneProgress {
  lane: CodingLane;
  level: number;
  avgAccuracy: number;
  avgSpeed: number;
  totalSessions: number;
  lastPracticed?: string;
}

export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface CodingDrill {
  id: string;
  type: CodingDrillType;
  lane: CodingLane;
  language: CodingLanguage;
  difficulty: number;
  title: string;
  content: string; 
  explanation: string; 
  patternToNotice: string; 
  concept: string;
  expectedOutput?: string;
  tableInput?: string; 
  requiredTokens?: string[]; 
  testCases?: TestCase[];
  bugs?: Array<{ line: number; type: BugCategory }>;
  concurrencyRelevant?: boolean;
}

export interface ActiveLoop {
  active: boolean;
  currentStep: number;
  steps: Array<{ lane: CodingLane; type: CodingDrillType }>;
  startTime: number;
  results: Array<{
    lane: CodingLane;
    type: CodingDrillType;
    accuracy: number;
    speed: number;
  }>;
}
