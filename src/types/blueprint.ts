
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  dueDate?: string;
  notes?: string;
  isOptional?: boolean;
  estimatedMinutes?: number | null;
  linkedHabitId?: string | null;
  linkedMetricId?: string | null;
  difficultyRating?: number; // 1-5
  energyType?: 'creative' | 'analytical' | 'social' | 'mechanical';
};

export type ReflectionEntry = {
  id: string;
  content: string;
  promptUsed?: string;
  createdAt: string;
  milestoneStatus: Milestone['status'];
  difficultyRating?: number;
  satisfactionRating?: number;
  lessonLearned?: string;
};

export type ImplementationIntention = {
  id: string;
  trigger: string;
  action: string;
};

export type SmallWinCheckpoint = {
  percent: number;
  description: string;
  achieved?: boolean;
};

export type Milestone = {
  id: string;
  title: string;
  description: string;
  weekStart: number;
  weekEnd: number;
  status: 'Not Started' | 'In Progress' | 'Paused' | 'Completed' | 'Locked';
  tasks: Task[];
  dependsOn: string[];
  isOptional: boolean;
  reflectionPrompts?: string[];
  dueDate?: string;
  startDate?: string;
  reflection?: string;
  reflections?: ReflectionEntry[];
  celebrationRitual?: string;
  smallWinsBreakdown?: SmallWinCheckpoint[];
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
  frequency: string; // "daily" | "weekly" | "3x/week" | "5x/week"
  linkedMilestoneId: string | null;
  activeFrom: string | null;
  activeUntil: string | null;
  minimumViableVersion?: string;
  habitStack?: string; // "After I [routine], I will [this habit]"
  temptationBundle?: string; // "Pair with [activity]"
  energyType?: 'creative' | 'analytical' | 'social' | 'mechanical';
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
    timeline: Record<'ultraSprint' | 'sprint' | 'marathon' | 'lifelong', AdaptiveVariation>;
    intensity: Record<'hobby' | 'committed' | 'professional', { label: string; description: string }>;
    skillLevel: Record<'beginner' | 'intermediate' | 'advanced', { label: string; description: string }>;
  };
  createdBy: 'system' | string;
  isPublic: boolean;
};

export type WeeklySnapshot = {
  weekOf: string;
  tasksCompleted: number;
  tasksTotal: number;
  momentumScore: number;
  habitCompletionRate: number;
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

export type PreMortem = {
  potentialFailures: string[];
  preventionStrategies: string[];
};

export type AccountabilityPartner = {
  name: string;
  email: string;
  notifyFrequency: 'weekly' | 'never';
};

export type Blueprint = {
  id: string;
  templateId?: string;
  title: string;
  description?: string;
  tags: string[];
  identityGoal?: string;
  identityStatement?: string; // New field
  milestones: Milestone[];
  status: 'active' | 'paused' | 'completed' | 'abandoned' | 'Archived';
  activatedAt: string;
  selectedVariation: TemplateVariationSettings;
  versionNumber?: number;
  lessonsFromV1?: string;
  
  // Advanced Achievement Fields
  premortem?: PreMortem;
  accountabilityPartner?: AccountabilityPartner;
  implementationIntentions?: ImplementationIntention[];

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
};
