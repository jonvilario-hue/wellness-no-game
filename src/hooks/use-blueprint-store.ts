
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Blueprint, Milestone, Task, BlueprintTemplate, ReflectionEntry } from '@/types/blueprint';

type BlueprintState = {
  projects: Blueprint[];
  templates: BlueprintTemplate[];
  addProject: (project: Omit<Blueprint, 'id' | 'milestones' | 'status'>) => void;
  updateProject: (id: string, updates: Partial<Blueprint>) => void;
  deleteProject: (id: string) => void;
  
  // A1 & A4
  cloneBlueprint: (id: string, options: { asTemplate?: boolean, asV2?: boolean }) => void;
  saveAsTemplate: (blueprint: Blueprint) => void;
  useTemplate: (templateId: string) => void;

  addMilestone: (projectId: string, milestone: Omit<Milestone, 'id'>) => void;
  updateMilestoneDetails: (projectId: string, milestoneId: string, updates: Partial<Milestone>) => void;
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: Milestone['status']) => void;
  deleteMilestone: (projectId: string, milestoneId: string) => void;

  // A3
  addReflection: (projectId: string, milestoneId: string, entry: Omit<ReflectionEntry, 'id' | 'createdAt'>) => void;

  addTask: (projectId: string, milestoneId: string, task: Omit<Task, 'id' | 'completed'>) => void;
  updateTask: (projectId: string, milestoneId: string, taskId: string, updates: Partial<Task>) => void;
  toggleTask: (projectId: string, milestoneId: string, taskId: string) => void;
  deleteTask: (projectId: string, milestoneId: string, taskId: string) => void;
};

const initialTemplates: BlueprintTemplate[] = [
  {
    id: 't-biz-1',
    name: 'Launch a Business',
    description: 'A structured roadmap for validating an idea and launching a MVP.',
    category: 'Business',
    estimatedDuration: '3-6 Months',
    suggestedStrategies: ['OKRs', 'SMART Goals', 'Obstacle Pre-Mortem'],
    isSystemTemplate: true,
    milestones: [
      { title: 'Market Validation', description: 'Interview 10 potential customers.', tasks: ['Define target persona', 'Draft interview script', 'Conduct interviews'] },
      { title: 'Prototype/MVP Build', description: 'Build the core value proposition.', tasks: ['Select tech stack', 'Design wireframes', 'Core feature implementation'] },
      { title: 'Public Launch', description: 'Go live and get first users.', tasks: ['Set up analytics', 'Product Hunt launch', 'Social media announcement'] }
    ]
  },
  {
    id: 't-learn-1',
    name: 'Learn a Language',
    description: 'Fluency-focused blueprint using immersion and consistency.',
    category: 'Learning',
    estimatedDuration: '6-12 Months',
    suggestedStrategies: ['Identity-Based Goals', 'Gamified Progress'],
    isSystemTemplate: true,
    milestones: [
      { title: 'Foundational Vocab', description: 'First 500 words.', tasks: ['Complete Duolingo unit 1', 'Flashcards for daily items', 'Learn basic grammar'] },
      { title: 'Immersion Phase', description: 'Start consuming media.', tasks: ['Watch 1 movie with subtitles', 'Listen to 5 podcasts', 'Write daily journal entry'] }
    ]
  }
];

export const useBlueprintStore = create<BlueprintState>()(
  persist(
    immer((set, get) => ({
      projects: [],
      templates: initialTemplates,

      addProject: (project) => {
        const newProject: Blueprint = {
          ...project,
          id: crypto.randomUUID(),
          milestones: [],
          status: 'Active',
          createdAt: new Date().toISOString(),
          versionNumber: 1,
        };
        set((state) => {
          state.projects.unshift(newProject);
        });
      },

      cloneBlueprint: (id, options) => {
        const original = get().projects.find(p => p.id === id);
        if (!original) return;

        if (options.asTemplate) {
          get().saveAsTemplate(original);
          return;
        }

        const newId = crypto.randomUUID();
        const newBlueprint: Blueprint = {
          ...original,
          id: newId,
          title: options.asV2 ? original.title : `${original.title} (Copy)`,
          status: 'Active',
          versionNumber: options.asV2 ? (original.versionNumber || 1) + 1 : 1,
          previousVersionId: options.asV2 ? original.id : undefined,
          lessonsFromV1: options.asV2 ? original.milestones.map(m => m.reflection).filter(Boolean).join('\n---\n') : undefined,
          milestones: original.milestones.map(m => ({
            ...m,
            id: crypto.randomUUID(),
            status: 'Not Started',
            reflection: '',
            reflections: [],
            tasks: m.tasks.map(t => ({ ...t, id: crypto.randomUUID(), completed: false }))
          })),
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          state.projects.unshift(newBlueprint);
        });
      },

      saveAsTemplate: (bp) => {
        const template: BlueprintTemplate = {
          id: crypto.randomUUID(),
          name: bp.title,
          description: bp.description || '',
          category: 'Personal',
          estimatedDuration: 'Variable',
          suggestedStrategies: [],
          isSystemTemplate: false,
          milestones: bp.milestones.map(m => ({
            title: m.title,
            description: m.description,
            tasks: m.tasks.map(t => t.title)
          }))
        };
        set((state) => {
          state.templates.unshift(template);
        });
      },

      useTemplate: (templateId) => {
        const template = get().templates.find(t => t.id === templateId);
        if (!template) return;

        const newProject: Blueprint = {
          id: crypto.randomUUID(),
          title: template.name,
          description: template.description,
          status: 'Active',
          tags: [template.category.toUpperCase()],
          createdAt: new Date().toISOString(),
          versionNumber: 1,
          milestones: template.milestones.map(m => ({
            id: crypto.randomUUID(),
            title: m.title,
            description: m.description,
            status: 'Not Started',
            tasks: m.tasks.map(t => ({ id: crypto.randomUUID(), title: t, completed: false }))
          }))
        };
        set((state) => {
          state.projects.unshift(newProject);
        });
      },

      updateProject: (id, updates) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === id);
          if (project) Object.assign(project, updates);
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
          reflections: [],
          dependsOn: [],
        };
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) project.milestones.push(newMilestone);
        });
      },

      updateMilestoneDetails: (projectId, milestoneId, updates) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) Object.assign(milestone, updates);
          }
        });
      },

      updateMilestoneStatus: (projectId, milestoneId, status) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) milestone.status = status;
          }
        });
      },

      addReflection: (projectId, milestoneId, entry) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) {
              const newReflection: ReflectionEntry = {
                ...entry,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
              };
              if (!milestone.reflections) milestone.reflections = [];
              milestone.reflections.unshift(newReflection);
              milestone.reflection = entry.content; // Keep sync with current
            }
          }
        });
      },

      addTask: (projectId, milestoneId, taskData) => {
        const newTask: Task = { ...taskData, id: crypto.randomUUID(), completed: false };
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) milestone.tasks.push(newTask);
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
              if (task) Object.assign(task, updates);
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
              if (task) task.completed = !task.completed;
            }
          }
        });
      },

      deleteTask: (projectId, milestoneId, taskId) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (project) {
            const milestone = project.milestones.find((m) => m.id === milestoneId);
            if (milestone) milestone.tasks = milestone.tasks.filter((t) => t.id !== taskId);
          }
        });
      },
    })),
    {
      name: 'architecture-store-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
