
import { LucideIcon } from "lucide-react";

export type DrawingDiscipline = 
  | 'Line Control'
  | 'Gesture & Movement'
  | 'Contour & Observation'
  | 'Proportion & Measurement'
  | 'Perspective & Space'
  | 'Value & Light'
  | 'Form & Construction'
  | 'Composition & Thumbnails';

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
  satisfactionRating: number; // 1-5
  focusRating: number; // 1-5
  difficultyFelt: 'Too Easy' | 'Just Right' | 'Too Hard';
  medium: DrawingMedium;
  photoUrl?: string; // local blob/data uri
}

export interface DrawingDrill {
  id: string;
  name: string;
  discipline: DrawingDiscipline;
  description: string;
  brief: string[];
  referenceCategory: 'Still Life' | 'Figure' | 'Environment' | 'Abstract';
  displayMode: 'Static' | 'Timed Flash' | 'Hidden';
  defaultTimerSeconds?: number;
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
  bestSatisfaction: number;
}
