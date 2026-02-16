
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  notes?: string;
  isOptional?: boolean;
  estimatedMinutes?: number | null;
  linkedHabitId?: string | null;
  linkedMetricId?: string | null;
  difficultyRating?: number; // 1-5
};

export type ReflectionEntry = {
  id: string;
  content: string;
  promptUsed?: string;
  createdAt: string;
  milestoneStatus: Milestone['status'];
  difficultyRating?: number;
  satisfactionRating?: number;
};

export type Milestone = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'Not Started' | 'In Progress' | 'Paused' | 'Completed' | 'Locked';
  tasks: Task[];
  reflection?: string;
  reflections?: ReflectionEntry[];
  dependsOn?: string[];
  startDate?: string;
  weekStart?: number;
  weekEnd?: number;
  isOptional?: boolean;
};

export type CustomMetric = {
  id: string;
  label: string;
  type: 'cumulative' | 'current';
  unit: string;
  startingValue: number;
  goalValue: number | null;
  icon: string;
};

export type RecurringHabit = {
  id: string;
  label: string;
  frequency: string; // "daily" | "weekly" | "3x/week"
  linkedMilestoneId: string | null;
  activeFrom?: string | null;
  activeUntil?: string | null;
};

export type CelebrationTrigger = {
  type: 'milestone_complete' | 'streak' | 'metric' | 'halfway' | 'complete';
  milestoneId?: string | null;
  threshold?: number | null;
  metricId?: string | null;
  message: string;
  emoji: string;
  fired?: boolean;
};

export type ResourceLink = {
  title: string;
  type: 'book' | 'video' | 'tool' | 'community' | 'course' | 'article';
  url: string | null;
  description: string;
};

export type AdaptiveVariation = {
  weeks: number;
  label: string;
  description: string;
  durationMultiplier?: number;
  taskDensity?: 'high' | 'standard' | 'relaxed' | 'cyclical';
};

export type TemplateVariationSettings = {
  timeline: 'ultraSprint' | 'sprint' | 'marathon' | 'lifelong';
  intensity: 'hobby' | 'committed' | 'professional';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  accountability: 'solo' | 'buddy' | 'public';
};

export type BlueprintTemplate = {
  id: string;
  title: string;
  description: string;
  category: 'creative' | 'technical' | 'academic' | 'career' | 'health' | 'financial';
  subcategory?: string;
  defaultIdentityStatement: string;
  icon: string;
  baseTimeline: number;
  milestones: Milestone[];
  customMetrics: CustomMetric[];
  habits: RecurringHabit[];
  celebrationTriggers: CelebrationTrigger[];
  resourcePack: ResourceLink[];
  adaptiveSettings: {
    timelineFlexible: boolean;
    intensityAdjustable: boolean;
    skillLevelScalable: boolean;
    canAddCustomMilestones: boolean;
    canRemoveOptionalMilestones: boolean;
  };
  variations: {
    timeline: Record<TemplateVariationSettings['timeline'], AdaptiveVariation>;
    intensity: Record<TemplateVariationSettings['intensity'], { label: string; description: string }>;
    skillLevel: Record<TemplateVariationSettings['skillLevel'], { label: string; description: string }>;
  };
  createdBy: 'system' | string;
  isPublic: boolean;
};

export type WeeklySnapshot = {
  weekOf: string;
  tasksCompleted: number;
  tasksTotal: number;
  momentumScore: number;
  autoSummary: string;
};

export type Blocker = {
  id: string;
  loggedAt: string;
  description: string;
  linkedMilestoneId?: string | null;
  status: 'active' | 'resolved';
  resolvedAt?: string | null;
  aiSuggestion?: string | null;
};

export type Blueprint = {
  id: string;
  templateId?: string;
  title: string;
  description?: string;
  tags: string[];
  identityGoal?: string;
  milestones: Milestone[];
  status: 'active' | 'paused' | 'completed' | 'abandoned' | 'Archived';
  activatedAt: string;
  selectedVariation: TemplateVariationSettings;
  
  // Tracking
  metricValues: Record<string, number>;
  metricLog: { metricId: string; value: number; delta: number; loggedAt: string }[];
  streaks: {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string | null;
    weeklyTarget: number;
    thisWeekCount: number;
  };
  momentumScore: number;
  habitLog: { habitId: string; completedAt: string }[];
  milestoneReflections: Record<string, ReflectionEntry>;
  blockers: Blocker[];
  weeklySnapshots: WeeklySnapshot[];
  versionNumber?: number;
  lessonsFromV1?: string;
};
