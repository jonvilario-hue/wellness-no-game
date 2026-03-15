
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
  content: string; 
  explanation: string; 
  patternToNotice: string; 
  expectedOutput?: string;
  tableInput?: string; 
  bugs?: Array<{ line: number; type: BugCategory }>;
  requiredTokens?: string[]; 
  testCases?: Array<{ input: any; output: any }>;
  logicSteps?: string[]; 
  description?: string;
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
