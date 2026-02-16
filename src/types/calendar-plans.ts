
import type { CHCDomain } from './index';

export type PlanCategory = 
  | 'Movement' 
  | 'Stillness' 
  | 'Nutrition' 
  | 'Finance' 
  | 'Journaling' 
  | 'Study/Learning' 
  | 'Custom';

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'custom';

export type PlanActivity = {
  id: string;
  name: string;
  category: PlanCategory;
  recurrence: RecurrenceType;
  customInterval?: number;
  timeOfDay?: string; // HH:mm format
  duration: number; // minutes
  reminderEnabled: boolean;
  linkedTracker?: string; // ID of guide or exercise
};

export type DurationType = 'ongoing' | 'fixed' | 'one-time';

export type CalendarPlan = {
  id: string;
  name: string;
  description: string;
  isPreset: boolean;
  isActive: boolean;
  durationType: DurationType;
  startDate: string; // ISO
  endDate?: string; // ISO
  categories: PlanCategory[];
  activities: PlanActivity[];
  color: string;
};

export type ActivityStatus = 'not-started' | 'completed' | 'skipped';

export type CalendarActivityInstance = {
  id: string;
  planId: string;
  activityId: string;
  date: string; // YYYY-MM-DD
  status: ActivityStatus;
  completedAt?: string;
  completedVia: 'calendar' | 'tracker-auto-sync';
};
