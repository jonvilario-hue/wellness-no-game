
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

export interface LaneProgress {
  lane: CodingLane;
  level: number;
  avgAccuracy: number;
  avgSpeed: number;
  totalSessions: number;
  lastPracticed?: string;
}

export interface CodingDrill {
  id: string;
  type: CodingDrillType;
  lane: CodingLane;
  language: CodingLanguage;
  difficulty: number;
  title: string;
  content: string; // The code snippet or problem spec
  explanation: string; // The "Why" behind the correct answer
  patternToNotice: string; // The repeatable idiom or pitfall to recognize
  expectedOutput?: string;
  tableInput?: string; // Specific for SQL prediction
  bugs?: Array<{ line: number; type: BugCategory }>;
  testCases?: Array<{ input: any; output: any }>;
  description?: string;
  studyTimeSeconds?: number;
  concurrencyRelevant?: boolean;
}

export interface CodingLoopStep {
  lane: CodingLane;
  type: CodingDrillType;
}

export interface ActiveLoop {
  active: boolean;
  currentStep: number;
  steps: CodingLoopStep[];
  startTime: number;
  results: Array<{
    lane: CodingLane;
    type: CodingDrillType;
    accuracy: number;
    speed: number;
  }>;
}
