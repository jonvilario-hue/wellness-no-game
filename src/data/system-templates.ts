
import type { BlueprintTemplate } from '@/types/blueprint';

export const systemTemplates: BlueprintTemplate[] = [
  // --- CREATIVE ---
  {
    id: "creative-write-novel",
    title: "Write a Novel",
    description: "Take a story idea from concept to a complete 70,000+ word manuscript draft.",
    category: "creative",
    icon: "📖",
    defaultIdentityStatement: "BECOMING: A published novelist who finishes what they start.",
    baseTimeline: 26,
    customMetrics: [
      { id: "wordsWritten", label: "Words Written", type: "cumulative", unit: "words", startingValue: 0, goalValue: 70000, icon: "✍️" },
      { id: "chaptersCompleted", label: "Chapters Completed", type: "cumulative", unit: "chapters", startingValue: 0, goalValue: 25, icon: "📄" }
    ],
    habits: [
      { id: "daily-writing", label: "Write 500+ words", frequency: "daily", linkedMilestoneId: null, activeFrom: "m3", activeUntil: "m5" },
      { id: "weekly-reading", label: "Read in your genre", frequency: "weekly", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Concept & Character Planning",
        description: "Define genre and act structure.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Define genre and hook", completed: false, isOptional: false },
          { id: "t2", title: "Character profiles", completed: false, isOptional: false },
          { id: "t3", title: "Outline Act 1", completed: false, isOptional: false }
        ],
        isOptional: false
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
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [
      { type: "metric", metricId: "wordsWritten", threshold: 10000, message: "10,000 words! You're officially writing.", emoji: "✍️" },
      { type: "streak", threshold: 7, message: "7-day writing streak!", emoji: "🔥" }
    ],
    resourcePack: [],
    adaptiveSettings: {
      timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true,
      canAddCustomMilestones: true, canRemoveOptionalMilestones: true
    },
    variations: {
      timeline: {
        ultraSprint: { weeks: 12, label: "Fast", description: "NaNoWriMo pace" },
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
      { id: "users", label: "Active Users", type: "current", unit: "users", startingValue: 0, goalValue: 100, icon: "👥" }
    ],
    habits: [
      { id: "daily-code", label: "Code for 1+ hour", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
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
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 6, label: "Fast", description: "6 weeks" }, sprint: { weeks: 12, label: "Standard", description: "3 months" }, marathon: { weeks: 24, label: "Slow", description: "6 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Product lifecycle" } },
      intensity: { hobby: { label: "Hobby", description: "Weekend builder" }, committed: { label: "Committed", description: "Part-time" }, professional: { label: "Professional", description: "Full-time" } },
      skillLevel: { beginner: { label: "Beginner", description: "Learning to code" }, intermediate: { label: "Intermediate", description: "Can build MVPs" }, advanced: { label: "Advanced", description: "Senior Engineer" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "academic-cert-exam",
    title: "Pass Certification Exam",
    description: "Prepare for and pass a high-stakes professional exam.",
    category: "academic",
    icon: "🎓",
    defaultIdentityStatement: "BECOMING: A certified expert in my field.",
    baseTimeline: 12,
    customMetrics: [
      { id: "practiceScore", label: "Practice Score", type: "current", unit: "%", startingValue: 0, goalValue: 90, icon: "📊" }
    ],
    habits: [
      { id: "daily-study", label: "Study 45 mins", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Foundation",
        description: "Master the basic concepts.",
        weekStart: 1,
        weekEnd: 4,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Read core textbook", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 4, label: "Sprint", description: "Cramming" }, sprint: { weeks: 12, label: "Standard", description: "3 months" }, marathon: { weeks: 24, label: "Relaxed", description: "6 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Continuous learning" } },
      intensity: { hobby: { label: "Casual", description: "Light study" }, committed: { label: "Committed", description: "Daily focus" }, professional: { label: "Professional", description: "Career critical" } },
      skillLevel: { beginner: { label: "Beginner", description: "New to subject" }, intermediate: { label: "Intermediate", description: "Have basics" }, advanced: { label: "Advanced", description: "Review only" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "career-transition",
    title: "Career Transition",
    description: "Successfully move from your current role to a new industry.",
    category: "career",
    icon: "💼",
    defaultIdentityStatement: "BECOMING: A respected professional in my new industry.",
    baseTimeline: 24,
    customMetrics: [
      { id: "apps", label: "Applications", type: "cumulative", unit: "apps", startingValue: 0, goalValue: 50, icon: "📨" }
    ],
    habits: [
      { id: "networking", label: "Networking Coffee Chat", frequency: "weekly", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Gap Analysis",
        description: "Identify what you need to learn.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Review 10 job descriptions", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Fast", description: "Aggressive" }, sprint: { weeks: 24, label: "Standard", description: "6 months" }, marathon: { weeks: 52, label: "Slow", description: "1 year" }, lifelong: { weeks: 0, label: "Ongoing", description: "Career evolution" } },
      intensity: { hobby: { label: "Hobby", description: "Exploring" }, committed: { label: "Committed", description: "Part-time" }, professional: { label: "Professional", description: "Full-time pivot" } },
      skillLevel: { beginner: { label: "Entry Level", description: "New industry" }, intermediate: { label: "Lateral", description: "Transferable skills" }, advanced: { label: "Senior", description: "Executive pivot" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "health-marathon",
    title: "Train for a Marathon",
    description: "From 0 to 26.2 miles in 20 weeks.",
    category: "health",
    icon: "🏃",
    defaultIdentityStatement: "BECOMING: A marathon finisher with superior endurance.",
    baseTimeline: 20,
    customMetrics: [
      { id: "miles", label: "Total Miles", type: "cumulative", unit: "miles", startingValue: 0, goalValue: 500, icon: "📏" }
    ],
    habits: [
      { id: "run", label: "Complete scheduled run", frequency: "4x/week", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Base Building",
        description: "Establish a running habit.",
        weekStart: 1,
        weekEnd: 4,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Buy proper running shoes", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Fast", description: "Short base" }, sprint: { weeks: 20, label: "Standard", description: "5 months" }, marathon: { weeks: 30, label: "Slow", description: "Long build" }, lifelong: { weeks: 0, label: "Ongoing", description: "Running life" } },
      intensity: { hobby: { label: "Finish", description: "Just finish" }, committed: { label: "Goal Time", description: "Specific pace" }, professional: { label: "Elite", description: "High volume" } },
      skillLevel: { beginner: { label: "Beginner", description: "New runner" }, intermediate: { label: "Intermediate", description: "Run 5ks" }, advanced: { label: "Advanced", description: "Sub-4 target" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "financial-debt-payoff",
    title: "Debt Payoff Plan",
    description: "Systematically eliminate debt using the snowball or avalanche method.",
    category: "financial",
    icon: "💰",
    defaultIdentityStatement: "BECOMING: Debt-free and financially independent.",
    baseTimeline: 52,
    customMetrics: [
      { id: "paid", label: "Total Paid", type: "cumulative", unit: "$", startingValue: 0, goalValue: null, icon: "💸" }
    ],
    habits: [
      { id: "track", label: "Log all daily expenses", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Debt Audit",
        description: "Face the numbers.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "List all debts & rates", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 26, label: "Aggressive", description: "Budget cut" }, sprint: { weeks: 52, label: "Standard", description: "1 year" }, marathon: { weeks: 104, label: "Steady", description: "2 years" }, lifelong: { weeks: 0, label: "Continuous", description: "Wealth building" } },
      intensity: { hobby: { label: "Soft", description: "Extra payments" }, committed: { label: "Committed", description: "Snowball method" }, professional: { label: "Professional", description: "Total budget reset" } },
      skillLevel: { beginner: { label: "Newbie", description: "New to budgeting" }, intermediate: { label: "Savvy", description: "Have a budget" }, advanced: { label: "Advanced", description: "Optimizing rates" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "creative-podcast",
    title: "Launch a Podcast",
    description: "Concept to first 10 episodes.",
    category: "creative",
    icon: "🎙️",
    defaultIdentityStatement: "BECOMING: A podcaster with a consistent audience.",
    baseTimeline: 16,
    customMetrics: [
      { id: "episodes", label: "Episodes", type: "cumulative", unit: "eps", startingValue: 0, goalValue: 10, icon: "🎧" }
    ],
    habits: [
      { id: "recording", label: "Weekly recording session", frequency: "weekly", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Setup",
        description: "Equipment and branding.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Buy microphone", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 8, label: "Fast", description: "8 weeks" }, sprint: { weeks: 16, label: "Standard", description: "4 months" }, marathon: { weeks: 32, label: "Slow", description: "8 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Show life" } },
      intensity: { hobby: { label: "Casual", description: "Solo show" }, committed: { label: "Pro", description: "Interviews" }, professional: { label: "Studio", description: "High production" } },
      skillLevel: { beginner: { label: "Newbie", description: "No audio exp" }, intermediate: { label: "Vocal", description: "Public speaker" }, advanced: { label: "Editor", description: "Audio engineer" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "creative-album",
    title: "Compose an Album",
    description: "Write, record, and polish 10 tracks.",
    category: "creative",
    icon: "🎸",
    defaultIdentityStatement: "BECOMING: A musician with a completed album.",
    baseTimeline: 20,
    customMetrics: [
      { id: "tracks", label: "Tracks Done", type: "cumulative", unit: "tracks", startingValue: 0, goalValue: 10, icon: "🎵" }
    ],
    habits: [],
    milestones: [],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 10, label: "Fast", description: "EP pace" }, sprint: { weeks: 20, label: "Standard", description: "5 months" }, marathon: { weeks: 40, label: "Slow", description: "10 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Artist life" } },
      intensity: { hobby: { label: "Lo-fi", description: "Home recording" }, committed: { label: "Indie", description: "Polished" }, professional: { label: "Studio", description: "Pro master" } },
      skillLevel: { beginner: { label: "Newbie", description: "Learning DAW" }, intermediate: { label: "Artist", description: "Can play" }, advanced: { label: "Composer", description: "Expert" } }
    },
    createdBy: "system",
    isPublic: true
  }
];
