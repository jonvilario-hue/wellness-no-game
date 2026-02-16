
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Blueprint, Milestone, Task, BlueprintTemplate, ReflectionEntry, TemplateVariationSettings } from '@/types/blueprint';
import { systemTemplates } from '@/data/blueprint-templates';

type BlueprintState = {
  projects: Blueprint[];
  templates: BlueprintTemplate[];
  addProject: (project: Omit<Blueprint, 'id' | 'milestones' | 'status'>) => void;
  updateProject: (id: string, updates: Partial<Blueprint>) => void;
  deleteProject: (id: string) => void;
  
  cloneBlueprint: (id: string, options: { asTemplate?: boolean, asV2?: boolean }) => void;
  saveAsTemplate: (blueprint: Blueprint, metadata: { category: string, description: string, isPublic: boolean }) => void;
  useTemplate: (templateId: string, settings: TemplateVariationSettings) => void;

  addMilestone: (projectId: string, milestone: Omit<Milestone, 'id'>) => void;
  updateMilestoneDetails: (projectId: string, milestoneId: string, updates: Partial<Milestone>) => void;
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: Milestone['status']) => void;
  deleteMilestone: (projectId: string, milestoneId: string) => void;

  addReflection: (projectId: string, milestoneId: string, entry: Omit<ReflectionEntry, 'id' | 'createdAt'>) => void;

  addTask: (projectId: string, milestoneId: string, task: Omit<Task, 'id' | 'completed'>) => void;
  updateTask: (projectId: string, milestoneId: string, taskId: string, updates: Partial<Task>) => void;
  toggleTask: (projectId: string, milestoneId: string, taskId: string) => void;
  deleteTask: (projectId: string, milestoneId: string, taskId: string) => void;
};

export const useBlueprintStore = create<BlueprintState>()(
  persist(
    immer((set, get) => ({
      projects: [],
      templates: systemTemplates,

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

      saveAsTemplate: (bp, meta) => {
        const template: BlueprintTemplate = {
          id: crypto.randomUUID(),
          name: bp.title,
          description: meta.description,
          category: meta.category as any,
          defaultIdentityStatement: bp.identityGoal || '',
          baseTimelineWeeks: 12,
          milestones: bp.milestones.map(m => ({
            title: m.title,
            description: m.description || '',
            suggestedDurationWeeks: 2,
            tasks: m.tasks.map(t => ({ title: t.title, description: t.notes || '' }))
          })),
          adaptiveSettings: {
            supportsTimeline: false,
            supportsIntensity: false,
            supportsSkillLevel: false,
            supportsLearningStyle: false,
            supportsAccountability: false
          },
          suggestedStrategies: [],
          createdBy: 'user',
          isPublic: meta.isPublic,
          isSystemTemplate: false
        };
        set((state) => {
          state.templates.unshift(template);
        });
      },

      useTemplate: (templateId, settings) => {
        const template = get().templates.find(t => t.id === templateId);
        if (!template) return;

        let multiplier = 1.0;
        if (settings.timeline === 'ultraSprint') multiplier = 0.5;
        if (settings.timeline === 'marathon') multiplier = 2.5;

        const newMilestones: Milestone[] = template.milestones.map((m, idx) => ({
          id: crypto.randomUUID(),
          title: m.title,
          description: m.description,
          status: 'Not Started',
          dependsOn: m.dependencies?.map(dIdx => `m-${dIdx}`),
          tasks: m.tasks.map(t => ({
            id: crypto.randomUUID(),
            title: t.title,
            notes: t.description,
            completed: false
          }))
        }));

        // Apply Intensity: Professional adds review loops
        if (settings.intensity === 'professional') {
          newMilestones.forEach(m => {
            m.tasks.push({
              id: crypto.randomUUID(),
              title: 'Weekly Contingency Audit',
              notes: 'Professional Intensity: Identify risks and blockers for this phase.',
              completed: false
            });
          });
        }

        // Apply Skill Level: Beginner adds foundational milestone
        if (settings.skillLevel === 'beginner') {
          newMilestones.unshift({
            id: crypto.randomUUID(),
            title: 'Foundational Knowledge Setup',
            description: 'Beginner Mode: Establishing core concepts and basic tools.',
            status: 'Not Started',
            tasks: [{ id: crypto.randomUUID(), title: 'Glossary of terms', notes: 'Master basic vocabulary.', completed: false }]
          });
        }

        // Apply Accountability
        if (settings.accountability !== 'solo') {
          newMilestones.push({
            id: crypto.randomUUID(),
            title: 'Accountability & Feedback Loop',
            description: `${settings.accountability === 'buddy' ? 'Buddy' : 'Public'} Mode active.`,
            status: 'Not Started',
            tasks: [{ id: crypto.randomUUID(), title: 'Share progress with partner/network', notes: 'Build public commitment.', completed: false }]
          });
        }

        const newProject: Blueprint = {
          id: crypto.randomUUID(),
          templateId: template.id,
          title: template.name,
          description: template.description,
          status: 'Active',
          tags: [template.category.toUpperCase()],
          identityGoal: template.defaultIdentityStatement,
          createdAt: new Date().toISOString(),
          versionNumber: 1,
          milestones: newMilestones
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
              milestone.reflection = entry.content;
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
      name: 'architecture-store-v3',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
