
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { 
  Blueprint, 
  Milestone, 
  Task, 
  BlueprintTemplate, 
  ReflectionEntry, 
  TemplateVariationSettings,
  Blocker,
  CelebrationTrigger
} from '@/types/blueprint';
import { systemTemplates } from '@/data/system-templates';
import { format, startOfDay, isSameDay } from 'date-fns';

type BlueprintState = {
  projects: Blueprint[];
  templates: BlueprintTemplate[];
  
  // Actions
  addProject: (template: BlueprintTemplate, settings: TemplateVariationSettings) => void;
  updateProject: (id: string, updates: Partial<Blueprint>) => void;
  deleteProject: (id: string) => void;
  
  logMetric: (id: string, metricId: string, value: number) => void;
  toggleHabit: (id: string, habitId: string) => void;
  logBlocker: (id: string, description: string, milestoneId?: string) => void;
  resolveBlocker: (id: string, blockerId: string) => void;
  
  completeMilestone: (id: string, milestoneId: string, reflection: Omit<ReflectionEntry, 'id' | 'createdAt'>) => void;
  toggleTask: (id: string, milestoneId: string, taskId: string) => void;
  
  // Internal logic
  calculateMomentum: (blueprint: Blueprint) => number;
  updateStreaks: (blueprint: Blueprint) => void;
};

export const useBlueprintStore = create<BlueprintState>()(
  persist(
    immer((set, get) => ({
      projects: [],
      templates: systemTemplates,

      addProject: (template, settings) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        
        // Initialize metrics
        const metricValues: Record<string, number> = {};
        template.customMetrics.forEach(m => {
          metricValues[m.id] = m.startingValue;
        });

        // Adapt milestones based on variation
        let milestones = template.milestones.map(m => ({
          ...m,
          status: m.dependsOn.length === 0 ? 'Not Started' : 'Locked' as Milestone['status']
        }));

        // Intensity: Professional adds review tasks
        if (settings.intensity === 'professional') {
          milestones.forEach(m => {
            m.tasks.push({
              id: `review-${m.id}`,
              title: "Weekly Contingency Review",
              description: "Audit risks and blockers for this phase.",
              completed: false
            });
          });
        }

        const newProject: Blueprint = {
          id,
          templateId: template.id,
          title: template.title,
          description: template.description,
          tags: [template.category.toUpperCase()],
          identityGoal: template.defaultIdentityStatement,
          activatedAt: now,
          status: 'active',
          selectedVariation: settings,
          metricValues,
          metricLog: [],
          streaks: {
            currentStreak: 0,
            longestStreak: 0,
            lastActivityDate: null,
            weeklyTarget: 5,
            thisWeekCount: 0
          },
          momentumScore: 0,
          habitLog: [],
          milestoneReflections: {},
          blockers: [],
          weeklySnapshots: [],
          milestones: milestones as Milestone[]
        };

        set(state => {
          state.projects.unshift(newProject);
        });
      },

      logMetric: (id, metricId, value) => {
        set(state => {
          const bp = state.projects.find(p => p.id === id);
          if (!bp) return;
          
          const metric = bp.metricValues[metricId] || 0;
          const delta = value - metric;
          bp.metricValues[metricId] = value;
          bp.metricLog.push({ metricId, value, delta, loggedAt: new Date().toISOString() });
          
          state.updateStreaks(bp);
          bp.momentumScore = state.calculateMomentum(bp);
        });
      },

      toggleHabit: (id, habitId) => {
        set(state => {
          const bp = state.projects.find(p => p.id === id);
          if (!bp) return;
          
          bp.habitLog.push({ habitId, completedAt: new Date().toISOString() });
          state.updateStreaks(bp);
          bp.momentumScore = state.calculateMomentum(bp);
        });
      },

      logBlocker: (id, description, milestoneId) => {
        set(state => {
          const bp = state.projects.find(p => p.id === id);
          if (!bp) return;
          bp.blockers.push({
            id: crypto.randomUUID(),
            description,
            linkedMilestoneId: milestoneId,
            loggedAt: new Date().toISOString(),
            status: 'active'
          });
        });
      },

      resolveBlocker: (id, blockerId) => {
        set(state => {
          const bp = state.projects.find(p => p.id === id);
          if (!bp) return;
          const blocker = bp.blockers.find(b => b.id === blockerId);
          if (blocker) {
            blocker.status = 'resolved';
            blocker.resolvedAt = new Date().toISOString();
          }
        });
      },

      toggleTask: (id, milestoneId, taskId) => {
        set(state => {
          const bp = state.projects.find(p => p.id === id);
          if (!bp) return;
          const milestone = bp.milestones.find(m => m.id === milestoneId);
          const task = milestone?.tasks.find(t => t.id === taskId);
          if (task) {
            task.completed = !task.completed;
            state.updateStreaks(bp);
            bp.momentumScore = state.calculateMomentum(bp);
          }
        });
      },

      completeMilestone: (id, milestoneId, reflection) => {
        set(state => {
          const bp = state.projects.find(p => p.id === id);
          if (!bp) return;
          const milestone = bp.milestones.find(m => m.id === milestoneId);
          if (milestone) {
            milestone.status = 'Completed';
            bp.milestoneReflections[milestoneId] = {
              ...reflection,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              milestoneStatus: 'Completed'
            };
            
            // Unlock dependents
            bp.milestones.forEach(m => {
              if (m.status === 'Locked' && m.dependsOn?.includes(milestoneId)) {
                const allDepsMet = m.dependsOn.every(depId => 
                  bp.milestones.find(ms => ms.id === depId)?.status === 'Completed'
                );
                if (allDepsMet) m.status = 'Not Started';
              }
            });
          }
        });
      },

      calculateMomentum: (bp) => {
        const tasks = bp.milestones.flatMap(m => m.tasks);
        const completionRate = tasks.filter(t => t.completed).length / (tasks.length || 1);
        const streakBonus = bp.streaks.currentStreak > 0 ? Math.min(bp.streaks.currentStreak * 2, 30) : 0;
        return Math.min(100, Math.round(completionRate * 70 + streakBonus));
      },

      updateStreaks: (bp) => {
        const today = startOfDay(new Date());
        const last = bp.streaks.lastActivityDate ? startOfDay(new Date(bp.streaks.lastActivityDate)) : null;
        
        if (!last || !isSameDay(today, last)) {
          bp.streaks.currentStreak += 1;
          bp.streaks.lastActivityDate = today.toISOString();
          bp.streaks.thisWeekCount += 1;
          if (bp.streaks.currentStreak > bp.streaks.longestStreak) {
            bp.streaks.longestStreak = bp.streaks.currentStreak;
          }
        }
      },

      updateProject: (id, updates) => {
        set(state => {
          const project = state.projects.find(p => p.id === id);
          if (project) Object.assign(project, updates);
        });
      },

      deleteProject: (id) => {
        set(state => {
          state.projects = state.projects.filter(p => p.id !== id);
        });
      }
    })),
    {
      name: 'architecture-store-v4',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
