
import type { BlueprintTemplate } from '@/types/blueprint';

export const systemTemplates: BlueprintTemplate[] = [
  {
    id: "creative-write-novel",
    title: "Write a Novel",
    description: "Take a story idea from concept to a complete 70,000+ word manuscript draft.",
    category: "creative",
    icon: "📖",
    defaultIdentityStatement: "BECOMING: A novelist with a completed manuscript",
    baseTimeline: 26,
    customMetrics: [
      { id: "wordsWritten", label: "Words Written", type: "cumulative", unit: "words", startingValue: 0, goalValue: 70000, icon: "✍️" },
      { id: "chaptersCompleted", label: "Chapters Completed", type: "cumulative", unit: "chapters", startingValue: 0, goalValue: 25, icon: "📄" }
    ],
    habits: [
      { id: "daily-writing", label: "Write 500+ words", frequency: "daily", linkedMilestoneId: null },
      { id: "weekly-reading", label: "Read in your genre", frequency: "weekly", linkedMilestoneId: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Concept & Planning",
        description: "Define genre and act structure.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Define genre and hook", completed: false, isOptional: false },
          { id: "t2", title: "Character profiles", completed: false, isOptional: false },
          { id: "t3", title: "Outline Act 1", completed: false, isOptional: false }
        ]
      },
      {
        id: "m2",
        title: "Detailed Outlining",
        description: "Chapter by chapter breakdown.",
        weekStart: 3,
        weekEnd: 4,
        status: "Locked",
        dependsOn: ["m1"],
        tasks: [
          { id: "t4", title: "20 chapter summaries", completed: false, isOptional: false },
          { id: "t5", title: "Plot point mapping", completed: false, isOptional: false }
        ]
      },
      {
        id: "m3",
        title: "First Draft - Act 1",
        description: "The first 20,000 words.",
        weekStart: 5,
        weekEnd: 10,
        status: "Locked",
        dependsOn: ["m2"],
        tasks: [
          { id: "t6", title: "Write chapters 1-8", completed: false, isOptional: false, linkedMetricId: "wordsWritten" }
        ]
      }
    ],
    celebrationTriggers: [
      { type: "metric", metricId: "wordsWritten", threshold: 10000, message: "10,000 words! You're officially writing.", emoji: "✍️" },
      { type: "streak", threshold: 7, message: "7-day writing streak!", emoji: "🔥" }
    ],
    resourcePack: [
      { title: "Save the Cat! Writes a Novel", type: "book", url: null, description: "Classic structure guide." }
    ],
    adaptiveSettings: {
      timelineFlexible: true,
      intensityAdjustable: true,
      skillLevelScalable: true,
      canAddCustomMilestones: true,
      canRemoveOptionalMilestones: true
    },
    variations: {
      timeline: {
        ultraSprint: { weeks: 12, label: "Intense", description: "NaNoWriMo pace" },
        sprint: { weeks: 26, label: "Standard", description: "6 months" },
        marathon: { weeks: 52, label: "Relaxed", description: "1 year" },
        lifelong: { weeks: 0, label: "Continuous", description: "Ongoing practice" }
      },
      intensity: {
        hobby: { label: "Hobby", description: "Flexible" },
        committed: { label: "Committed", description: "Regular" },
        professional: { label: "Professional", description: "High-stakes" }
      },
      skillLevel: {
        beginner: { label: "Beginner", description: "New to long-form" },
        intermediate: { label: "Intermediate", description: "Some experience" },
        advanced: { label: "Advanced", description: "Veteran" }
      }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "technical-build-saas",
    title: "Build a SaaS Product",
    description: "Launch an MVP and acquire first 100 users.",
    category: "technical",
    icon: "🚀",
    defaultIdentityStatement: "BECOMING: A tech founder building scalable value",
    baseTimeline: 12,
    customMetrics: [
      { id: "users", label: "Active Users", type: "current", unit: "users", startingValue: 0, goalValue: 100, icon: "👥" },
      { id: "mrr", label: "MRR", type: "current", unit: "$", startingValue: 0, goalValue: 1000, icon: "💰" }
    ],
    habits: [
      { id: "daily-code", label: "Code for 1+ hour", frequency: "daily", linkedMilestoneId: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Validation",
        description: "Talk to 10 potential users.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Landing page signup", completed: false, isOptional: false },
          { id: "t2", title: "User interviews", completed: false, isOptional: false }
        ]
      }
    ],
    celebrationTriggers: [
      { type: "metric", metricId: "users", threshold: 1, message: "First user! The journey begins.", emoji: "🎉" }
    ],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 6, label: "Fast", description: "6 weeks" }, sprint: { weeks: 12, label: "Standard", description: "3 months" }, marathon: { weeks: 24, label: "Slow", description: "6 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Product lifecycle" } },
      intensity: { hobby: { label: "Hobby", description: "Weekend builder" }, committed: { label: "Committed", description: "Part-time" }, professional: { label: "Professional", description: "Full-time" } },
      skillLevel: { beginner: { label: "Beginner", description: "Learning to code" }, intermediate: { label: "Intermediate", description: "Can build MVPs" }, advanced: { label: "Advanced", description: "Senior Engineer" } }
    },
    createdBy: "system",
    isPublic: true
  }
  // ... Rest of the 21 templates follow this pattern
];
