
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
  reflections?: ReflectionEntry[]; // A3: Subcollection history
  dependsOn?: string[]; // A2: Milestone IDs
  startDate?: string; // For Gantt
};

export type Blueprint = {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  identityGoal?: string;
  milestones: Milestone[];
  status: 'Active' | 'Completed' | 'Archived';
  previousVersionId?: string; // A4
  versionNumber?: number; // A4
  lessonsFromV1?: string; // A4
  createdAt?: string;
  lastProgressAt?: string;
};

export type BlueprintTemplate = {
  id: string;
  name: string;
  description: string;
  category: 'Career' | 'Creative' | 'Health' | 'Learning' | 'Business' | 'Personal';
  milestones: Omit<Milestone, 'id' | 'status' | 'reflections' | 'tasks'> & { tasks: string[] }[];
  suggestedStrategies: string[];
  estimatedDuration: string;
  isSystemTemplate: boolean;
};
