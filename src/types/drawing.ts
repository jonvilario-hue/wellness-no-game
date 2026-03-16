import { LucideIcon } from "lucide-react";

export type DrawingDiscipline = 
  | 'Line Control'
  | 'Gesture'
  | 'Observation'
  | 'Proportion'
  | 'Perspective'
  | 'Value'
  | 'Form'
  | 'Composition'
  | 'Construction'; // Added for Drawabox later lessons

export type DrawingDifficulty = 'Foundation' | 'Developing' | 'Advanced';
export type DrawingMedium = 'Pencil' | 'Pen' | 'Charcoal' | 'Digital' | 'Other';

export interface DrawingLog {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: string;
  discipline: DrawingDiscipline;
  drillName: string;
  difficulty: DrawingDifficulty;
  durationMinutes: number;
  focusRating: number; // 1-5
  difficultyFelt: 'Too Easy' | 'Just Right' | 'Too Hard';
  medium: DrawingMedium;
  notes?: string;
  photoUrl?: string; // local blob/data uri
}

export interface DrawingDrill {
  id: string;
  name: string;
  discipline: DrawingDiscipline;
  description: string;
  brief: string[];
  referenceCategory: 'Still Life' | 'Figure' | 'Environment' | 'Abstract' | 'None';
  displayMode: 'Static' | 'Timed Flash' | 'Hidden';
  defaultTimerSeconds?: number;
  lesson?: number;
  isWarmup?: boolean;
}

export interface DrawingJourneyPlan {
  id: string;
  title: string;
  tagline: string;
  description: string;
  durationDays: number;
  steps: {
    day: number;
    title: string;
    discipline: DrawingDiscipline;
    drillId: string;
    estimatedMinutes: number;
  }[];
}

export interface DrawingAchievement {
  discipline: DrawingDiscipline;
  totalMinutes: number;
  sessions: number;
  lastPracticed?: string;
}
