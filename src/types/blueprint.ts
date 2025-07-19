
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  recurring?: boolean;
};

export type Milestone = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'Not Started' | 'In Progress' | 'Paused' | 'Completed';
  tasks: Task[];
  reflection?: string;
};

export type Blueprint = {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  identityGoal?: string;
  milestones: Milestone[];
  archived?: boolean;
};
