
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  notes?: string;
  recurring?: 'None' | 'Weekly' | 'Monthly' | 'Quarterly';
};

export type ReflectionEntry = {
  id: string;
  content: string;
  promptUsed?: string;
  createdAt: string;
  milestoneStatus: Milestone['status'];
};

export type Milestone = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'Not Started' | 'In Progress' | 'Paused' | 'Completed';
  tasks: Task[];
  reflection?: string;
  reflections?: ReflectionEntry[];
  dependsOn?: string[];
  startDate?: string;
};

export type AdaptiveVariation = {
  durationMultiplier?: number;
  taskDensity?: 'high' | 'standard' | 'relaxed' | 'cyclical';
  addFoundationalMilestones?: boolean;
  removeIntroSteps?: boolean;
  addOptimizationMilestones?: boolean;
  addCheckInMilestones?: boolean;
  addContingencyPlanning?: boolean;
  reorderMilestones?: 'buildThenLearn' | 'learnThenBuild' | 'studyThenRecreate';
};

export type TemplateVariationSettings = {
  timeline: 'ultraSprint' | 'sprint' | 'marathon' | 'lifelong';
  intensity: 'hobby' | 'committed' | 'professional';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  learningStyle?: 'projectFirst' | 'theoryFirst' | 'reverseEngineer';
  accountability: 'solo' | 'buddy' | 'public';
};

export type BlueprintTemplate = {
  id: string;
  name: string;
  description: string;
  category: 'Creative' | 'Technical' | 'Academic' | 'Career' | 'Health' | 'Financial' | 'Business' | 'Personal';
  subcategory?: string;
  defaultIdentityStatement: string;
  baseTimelineWeeks: number;
  milestones: {
    title: string;
    description: string;
    suggestedDurationWeeks: number;
    tasks: { title: string; description: string }[];
    reflectionPrompts?: string[];
    dependencies?: number[];
  }[];
  adaptiveSettings: {
    supportsTimeline: boolean;
    supportsIntensity: boolean;
    supportsSkillLevel: boolean;
    supportsLearningStyle: boolean;
    supportsAccountability: boolean;
  };
  resourcePack?: { title: string; url: string; type: 'article' | 'tool' | 'course' | 'community' }[];
  suggestedStrategies: string[];
  usageStats?: {
    timesUsed: number;
    completionRate: number;
  };
  createdBy: 'system' | string;
  isPublic: boolean;
  isSystemTemplate: boolean;
};

export type Blueprint = {
  id: string;
  templateId?: string;
  title: string;
  description?: string;
  tags: string[];
  identityGoal?: string;
  milestones: Milestone[];
  status: 'Active' | 'Completed' | 'Archived';
  previousVersionId?: string;
  versionNumber?: number;
  lessonsFromV1?: string;
  createdAt?: string;
  lastProgressAt?: string;
};
