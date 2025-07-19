
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Blueprint, Milestone, Task } from '@/types/blueprint';

type BlueprintState = {
  projects: Blueprint[];
  addProject: (project: Omit<Blueprint, 'id' | 'milestones' | 'archived'>) => void;
  updateProject: (id: string, updates: Partial<Blueprint>) => void;
  deleteProject: (id: string) => void;

  addMilestone: (projectId: string, milestone: Omit<Milestone, 'id'>) => void;
  updateMilestone: (projectId: string, milestoneId: string, updates: Partial<Milestone>) => void;
  deleteMilestone: (projectId: string, milestoneId: string) => void;

  addTask: (projectId: string, milestoneId: string, title: string) => void;
  updateTask: (projectId: string, milestoneId: string, taskId: string, updates: Partial<Task>) => void;
  toggleTask: (projectId: string, milestoneId: string, taskId: string) => void;
  deleteTask: (projectId: string, milestoneId: string, taskId: string) => void;
};

export const useBlueprintStore = create<BlueprintState>()(
  persist(
    immer((set) => ({
      projects: [],

      addProject: (project) => {
        const newProject: Blueprint = {
          ...project,
          id: crypto.randomUUID(),
          milestones: [],
          archived: false,
        };
        set((state) => {
          state.projects.unshift(newProject);
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

      addMilestone: (projectId, milestoneData) => {
        const newMilestone: Milestone = {
          ...milestoneData,
          id: crypto.randomUUID(),
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

      addTask: (projectId, milestoneId, title) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          completed: false,
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
      toggleTask: (projectId, milestoneId, taskId) => {
        set((state) => {
            const project = state.projects.find((p) => p.id === projectId);
            if (project) {
              const milestone = project.milestones.find((m) => m.id === milestoneId);
              if (milestone) {
                const task = milestone.tasks.find((t) => t.id === taskId);
                if (task) {
                  task.completed = !task.completed;
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
      name: 'blueprint-store-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
