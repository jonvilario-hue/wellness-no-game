
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Blueprint, Milestone, Task } from '@/types/blueprint';

type BlueprintState = {
  projects: Blueprint[];
  addProject: (project: Omit<Blueprint, 'id' | 'milestones' | 'status'>) => void;
  updateProject: (id: string, updates: Partial<Blueprint>) => void;
  deleteProject: (id: string) => void;

  addMilestone: (projectId: string, milestone: Omit<Milestone, 'id'>) => void;
  updateMilestoneDetails: (projectId: string, milestoneId: string, updates: Partial<Milestone>) => void;
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: Milestone['status']) => void;
  deleteMilestone: (projectId: string, milestoneId: string) => void;

  addTask: (projectId: string, milestoneId: string, task: Omit<Task, 'id' | 'completed'>) => void;
  updateTask: (projectId: string, milestoneId: string, taskId: string, updates: Partial<Task>) => void;
  toggleTask: (projectId: string, milestoneId: string, taskId: string) => void;
  deleteTask: (projectId: string, milestoneId: string, taskId: string) => void;
};

const initialData: Blueprint[] = [
    {
      id: "vision-1",
      title: "Become a Published Author",
      description: "Write and publish a science fiction novel, exploring themes of AI and consciousness.",
      identityGoal: "A disciplined writer who shares complex ideas with clarity and creativity.",
      tags: ["creative", "writing", "career"],
      status: "Active",
      milestones: [
        {
          id: "m-1-1",
          title: "Complete First Draft (100k words)",
          description: "Focus on getting the story down from beginning to end without self-editing.",
          dueDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
          status: "In Progress",
          reflection: "The initial burst of creativity was fantastic, but maintaining momentum in the middle was tough.",
          tasks: [
            { id: "t-1-1-1", title: "Outline Act I", completed: true, recurring: 'None' },
            { id: "t-1-1-2", title: "Write Chapters 1-10", completed: true, recurring: 'None' },
            { id: "t-1-1-3", title: "Review Draft Progress", completed: false, recurring: 'Weekly', notes: 'Check word count vs goal.' },
          ],
        },
      ],
    },
];

export const useBlueprintStore = create<BlueprintState>()(
  persist(
    immer((set) => ({
      projects: initialData,

      addProject: (project) => {
        const newProject: Blueprint = {
          ...project,
          id: crypto.randomUUID(),
          milestones: [],
          status: 'Active',
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
      updateMilestoneDetails: (projectId, milestoneId, updates) => {
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
      updateMilestoneStatus: (projectId, milestoneId, status) => {
          set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) {
              milestone.status = status;
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

      addTask: (projectId, milestoneId, taskData) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
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
      name: 'architecture-store-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
