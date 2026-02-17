
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
  ImplementationIntention,
  PreMortem,
  AccountabilityPartner,
  WeeklySnapshot
} from '@/types/blueprint';
import { systemTemplates } from '@/data/system-templates';
import { format, startOfDay, isSameDay, subDays, isBefore } from 'date-fns';

type BlueprintState = {
  projects: Blueprint[];
  templates: BlueprintTemplate[];
  
  // Actions
  addProject: (template: BlueprintTemplate, settings: TemplateVariationSettings) => void;
  updateProject: (id: string, updates: Partial<Blueprint>) => void;
  deleteProject: (id: string) => void;
  cloneBlueprint: (id: string, options: { asTemplate?: boolean; asV2?: boolean }) => void;
  
  logMetric: (id: string, metricId: string, value: number) => void;
  toggleHabit: (id: string, habitId: string) => void;
  logBlocker: (id: string, description: string, milestoneId?: string) => void;
  resolveBlocker: (id: string, blockerId: string) => void;
  
  completeMilestone: (id: string, milestoneId: string, reflection: Omit<ReflectionEntry, 'id' | 'createdAt'>) => void;
  toggleTask: (projectId: string, milestoneId: string, taskId: string) => void;
  addReflection: (projectId: string, milestoneId: string, reflection: { content: string; milestoneStatus: Milestone['status'] }) => void;
  
  addImplementationIntention: (projectId: string, intention: Omit<ImplementationIntention, 'id'>) => void;
  updatePreMortem: (projectId: string, premortem: PreMortem) => void;
  setAccountabilityPartner: (projectId: string, partner: AccountabilityPartner) => void;
  createWeeklySnapshot: (projectId: string) => void;

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
        
        const metricValues: Record<string, number> = {};
        template.customMetrics.forEach(m => {
          metricValues[m.id] = m.startingValue;
        });

        let milestones = template.milestones.map(m => ({
          ...m,
          status: m.dependsOn.length === 0 ? 'Not Started' : 'Locked' as Milestone['status'],
          tasks: m.tasks.map(t => ({ ...t, completed: false })),
          smallWinsBreakdown: [
            { percent: 10, description: "Initial setup & core concept validated." },
            { percent: 25, description: "Momentum established. First quarter complete." },
            { percent: 50, description: "The heavy lift. Halfway through the architecture." },
            { percent: 75, description: "Final stretch. Polish and refine." }
          ]
        }));

        if (settings.intensity === 'professional') {
          milestones.forEach(m => {
            m.tasks.push({
              id: `review-${m.id}`,
              title: "Weekly Contingency Review",
              description: "Audit risks and blockers for this phase.",
              completed: false,
              energyType: 'analytical'
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
          identityStatement: `I am becoming a person who ${template.title.toLowerCase()}`,
          activatedAt: now,
          status: 'Active',
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
          milestones: milestones as Milestone[],
          implementationIntentions: [],
          premortem: { potentialFailures: [], preventionStrategies: [] },
          accountabilityPartner: { name: '', email: '', notifyFrequency: 'never' }
        };

        set(state => {
          state.projects.unshift(newProject);
        });
      },

      logMetric: (id, metricId, value) => {
        set(state => {
          const bp = state.projects.find(p => p.id === id);
          if (!bp) return;
          
          const oldValue = bp.metricValues[metricId] || 0;
          const delta = value - oldValue;
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

      toggleTask: (projectId, milestoneId, taskId) => {
        set(state => {
          const bp = state.projects.find(p => p.id === projectId);
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
              createdAt: new Date().toISOString()
            };
            
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

      addReflection: (projectId, milestoneId, reflection) => {
        set(state => {
          const project = state.projects.find(p => p.id === projectId);
          if (!project) return;
          const milestone = project.milestones.find(m => m.id === milestoneId);
          if (!milestone) return;
          
          const newEntry: ReflectionEntry = {
            id: crypto.randomUUID(),
            content: reflection.content,
            milestoneStatus: reflection.milestoneStatus,
            createdAt: new Date().toISOString(),
          };
          
          if (!milestone.reflections) milestone.reflections = [];
          milestone.reflections.push(newEntry);
          milestone.reflection = reflection.content;
        });
      },

      addImplementationIntention: (projectId, intention) => {
        set(state => {
          const bp = state.projects.find(p => p.id === projectId);
          if (bp) {
            if (!bp.implementationIntentions) bp.implementationIntentions = [];
            bp.implementationIntentions.push({ ...intention, id: crypto.randomUUID() });
          }
        });
      },

      updatePreMortem: (projectId, premortem) => {
        set(state => {
          const bp = state.projects.find(p => p.id === projectId);
          if (bp) bp.premortem = premortem;
        });
      },

      setAccountabilityPartner: (projectId, partner) => {
        set(state => {
          const bp = state.projects.find(p => p.id === projectId);
          if (bp) bp.accountabilityPartner = partner;
        });
      },

      createWeeklySnapshot: (projectId) => {
        set(state => {
          const bp = state.projects.find(p => p.id === projectId);
          if (!bp) return;
          
          const tasks = bp.milestones.flatMap(m => m.tasks);
          const snapshot: WeeklySnapshot = {
            weekOf: format(new Date(), 'yyyy-MM-dd'),
            tasksCompleted: tasks.filter(t => t.completed).length,
            tasksTotal: tasks.length,
            momentumScore: bp.momentumScore,
            habitCompletionRate: 0, // Simplified for MVP
            autoSummary: `Weekly momentum reached ${bp.momentumScore}%`
          };
          
          if (!bp.weeklySnapshots) bp.weeklySnapshots = [];
          bp.weeklySnapshots.push(snapshot);
        });
      },

      cloneBlueprint: (id, options) => {
        set(state => {
          const source = state.projects.find(p => p.id === id);
          if (!source) return;

          if (options.asTemplate) {
            const newTemplate: BlueprintTemplate = {
              id: crypto.randomUUID(),
              title: source.title,
              description: source.description || '',
              category: 'creative',
              defaultIdentityStatement: source.identityGoal || '',
              icon: '📋',
              baseTimeline: 12,
              milestones: source.milestones.map(m => ({ ...m, status: 'Not Started', reflections: [], reflection: '' })),
              customMetrics: [],
              habits: [],
              celebrationTriggers: [],
              resourcePack: [],
              adaptiveSettings: {
                timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true,
                canAddCustomMilestones: true, canRemoveOptionalMilestones: true
              },
              variations: {
                timeline: {} as any, intensity: {} as any, skillLevel: {} as any
              },
              createdBy: 'user',
              isPublic: false
            };
            state.templates.unshift(newTemplate);
          } else {
            const newProject: Blueprint = {
              ...source,
              id: crypto.randomUUID(),
              activatedAt: new Date().toISOString(),
              status: 'Active',
              milestones: source.milestones.map(m => ({ ...m, status: 'Not Started', reflections: [], reflection: '', tasks: m.tasks.map(t => ({ ...t, completed: false })) })),
              momentumScore: 0,
              streaks: { currentStreak: 0, longestStreak: 0, lastActivityDate: null, weeklyTarget: 5, thisWeekCount: 0 },
              versionNumber: options.asV2 ? (source.versionNumber || 1) + 1 : 1,
              lessonsFromV1: options.asV2 ? source.milestones.map(m => m.reflection).filter(Boolean).join('\n\n') : undefined
            };
            state.projects.unshift(newProject);
          }
        });
      },

      calculateMomentum: (bp) => {
        const tasks = bp.milestones.flatMap(m => m.tasks);
        if (tasks.length === 0) return 0;
        const completionRate = tasks.filter(t => t.completed).length / tasks.length;
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
      name: 'blueprint-store-local-vachievement-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
