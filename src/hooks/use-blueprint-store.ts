
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface Task {
  id: string;
  name: string;
  done: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate?: string; // Storing as ISO string
  tasks: Task[];
  notes: string;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  milestones: Milestone[];
  archived: boolean;
}

type BlueprintState = {
  projects: Project[];
  addProject: (title: string) => void;
  updateProject: (id: string, updates: Partial<Pick<Project, 'title' | 'tags' | 'archived'>>) => void;
  deleteProject: (id: string) => void;

  addMilestone: (projectId: string, title: string) => void;
  updateMilestone: (projectId: string, milestoneId: string, updates: Partial<Pick<Milestone, 'title' | 'dueDate' | 'notes'>>) => void;
  deleteMilestone: (projectId: string, milestoneId: string) => void;

  addTask: (projectId: string, milestoneId: string, name: string) => void;
  updateTask: (projectId: string, milestoneId: string, taskId: string, updates: Partial<Pick<Task, 'name' | 'done'>>) => void;
  deleteTask: (projectId: string, milestoneId: string, taskId: string) => void;
};

export const useBlueprintStore = create<BlueprintState>()(
  persist(
    immer((set) => ({
      projects: [],

      // Project Actions
      addProject: (title) => {
        const newProject: Project = {
          id: crypto.randomUUID(),
          title,
          tags: [],
          milestones: [],
          archived: false,
        };
        set((state) => {
          state.projects.push(newProject);
        });
      },
      updateProject: (id, updates) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === id);
          if (project) {
            Object.assign(project, updates);
          }
        });
      },
      deleteProject: (id) => {
        set((state) => {
          state.projects = state.projects.filter((p) => p.id !== id);
        });
      },

      // Milestone Actions
      addMilestone: (projectId, title) => {
        const newMilestone: Milestone = {
          id: crypto.randomUUID(),
          title,
          tasks: [],
          notes: '',
        };
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            project.milestones.push(newMilestone);
          }
        });
      },
      updateMilestone: (projectId, milestoneId, updates) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) {
              Object.assign(milestone, updates);
            }
          }
        });
      },
      deleteMilestone: (projectId, milestoneId) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            project.milestones = project.milestones.filter((m) => m.id !== milestoneId);
          }
        });
      },

      // Task Actions
      addTask: (projectId, milestoneId, name) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          name,
          done: false,
        };
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) {
              milestone.tasks.push(newTask);
            }
          }
        });
      },
      updateTask: (projectId, milestoneId, taskId, updates) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) {
              const task = milestone.tasks.find((t) => t.id === taskId);
              if (task) {
                Object.assign(task, updates);
              }
            }
          }
        });
      },
      deleteTask: (projectId, milestoneId, taskId) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) {
              milestone.tasks = milestone.tasks.filter((t) => t.id !== taskId);
            }
          }
        });
      },
    })),
    {
      name: 'blueprint-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
