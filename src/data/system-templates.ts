
import type { BlueprintTemplate } from '@/types/blueprint';

export const systemTemplates: BlueprintTemplate[] = [
  // --- CREATIVE (5) ---
  {
    id: "creative-write-novel",
    title: "Write a Novel",
    description: "Take a story idea from concept to a complete 70,000+ word manuscript draft.",
    category: "creative",
    icon: "📖",
    defaultIdentityStatement: "I am becoming a published novelist who finishes what they start.",
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
        title: "Concept & Character Architecture",
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
      },
      {
        id: "m3",
        title: "First Draft — Act 1",
        description: "Write the opening 25,000 words.",
        weekStart: 5,
        weekEnd: 10,
        status: "Locked",
        dependsOn: ["m2"],
        tasks: [
          { id: "t6", title: "Reach 10k words", completed: false, isOptional: false },
          { id: "t7", title: "Write inciting incident", completed: false, isOptional: false },
          { id: "t8", title: "Complete first plot point", completed: false, isOptional: false }
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
    id: "creative-launch-podcast",
    title: "Launch a Podcast",
    description: "Go from concept to 10 published episodes with a growing listener base.",
    category: "creative",
    icon: "🎙️",
    defaultIdentityStatement: "I am becoming a podcaster with a published show and growing audience.",
    baseTimeline: 16,
    customMetrics: [
      { id: "epsPublished", label: "Episodes Published", type: "cumulative", unit: "eps", startingValue: 0, goalValue: 10, icon: "🎧" },
      { id: "downloads", label: "Downloads", type: "current", unit: "total", startingValue: 0, goalValue: 1000, icon: "📊" }
    ],
    habits: [
      { id: "weekly-record", label: "Weekly Recording Session", frequency: "weekly", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Concept & Format",
        description: "Define your show's soul.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Define target listener", completed: false, isOptional: false },
          { id: "t2", title: "Choose show format (solo, interview, etc.)", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 8, label: "Fast", description: "8 weeks" }, sprint: { weeks: 16, label: "Standard", description: "4 months" }, marathon: { weeks: 32, label: "Relaxed", description: "8 months" }, lifelong: { weeks: 0, label: "Continuous", description: "Ongoing" } },
      intensity: { hobby: { label: "Hobby", description: "Casual" }, committed: { label: "Committed", description: "Regular" }, professional: { label: "Professional", description: "High production" } },
      skillLevel: { beginner: { label: "Beginner", description: "New to audio" }, intermediate: { label: "Intermediate", description: "Some tech skill" }, advanced: { label: "Advanced", description: "Pro editor" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "creative-digital-art",
    title: "Digital Art Skill Building",
    description: "Develop digital illustration skills from fundamentals to a polished portfolio.",
    category: "creative",
    icon: "🎨",
    defaultIdentityStatement: "I am becoming a digital artist with a distinctive style and a body of work.",
    baseTimeline: 20,
    customMetrics: [
      { id: "piecesDone", label: "Finished Pieces", type: "cumulative", unit: "pieces", startingValue: 0, goalValue: 12, icon: "🖼️" },
      { id: "hoursDrawn", label: "Hours Practiced", type: "cumulative", unit: "hours", startingValue: 0, goalValue: 200, icon: "⏱️" }
    ],
    habits: [
      { id: "daily-sketch", label: "30-min daily sketch", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Software & Hardware Mastery",
        description: "Set up your digital lab.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Set up drawing tablet/software", completed: false, isOptional: false },
          { id: "t2", title: "Master layers and masks", completed: false, isOptional: false }
        ],
        isOptional: false
      },
      {
        id: "m2",
        title: "Foundations: Form & Value",
        description: "Study the building blocks of light.",
        weekStart: 3,
        weekEnd: 6,
        status: "Locked",
        dependsOn: ["m1"],
        tasks: [
          { id: "t3", title: "5 grayscale value studies", completed: false, isOptional: false },
          { id: "t4", title: "3D primitive form practice", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [
      { type: "metric", metricId: "piecesDone", threshold: 1, message: "First digital piece completed!", emoji: "🎨" }
    ],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 10, label: "Fast", description: "Bootcamp" }, sprint: { weeks: 20, label: "Standard", description: "5 months" }, marathon: { weeks: 40, label: "Slow", description: "10 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Art life" } },
      intensity: { hobby: { label: "Hobby", description: "Fun sketches" }, committed: { label: "Committed", description: "Serious study" }, professional: { label: "Professional", description: "Portfolio ready" } },
      skillLevel: { beginner: { label: "Beginner", description: "New to art" }, intermediate: { label: "Intermediate", description: "Know drawing basics" }, advanced: { label: "Advanced", description: "Veteran artist" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "creative-dnd-campaign",
    title: "Write a D&D Campaign",
    description: "Build a complete homebrew world and adventure arc ready for players.",
    category: "creative",
    icon: "🐉",
    defaultIdentityStatement: "I am becoming a worldbuilder and DM with a campaign ready to run.",
    baseTimeline: 20,
    customMetrics: [
      { id: "sessionsWritten", label: "Sessions Planned", type: "cumulative", unit: "sessions", startingValue: 0, goalValue: 12, icon: "📜" },
      { id: "npcs", label: "NPCs Created", type: "cumulative", unit: "NPCs", startingValue: 0, goalValue: 20, icon: "🧙" }
    ],
    habits: [
      { id: "daily-lore", label: "20-min worldbuilding", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "The Pillars & The Pitch",
        description: "Define the tone and core conflict.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Write campaign elevator pitch", completed: false, isOptional: false },
          { id: "t2", title: "Define the central threat", completed: false, isOptional: false }
        ],
        isOptional: false
      },
      {
        id: "m2",
        title: "Geography & Factions",
        description: "Map the power dynamics.",
        weekStart: 3,
        weekEnd: 5,
        status: "Locked",
        dependsOn: ["m1"],
        tasks: [
          { id: "t3", title: "Draw regional map", completed: false, isOptional: false },
          { id: "t4", title: "Create 3 rival factions", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 8, label: "One-Shot", description: "Short arc" }, sprint: { weeks: 20, label: "Campaign", description: "Full arc" }, marathon: { weeks: 40, label: "Epic", description: "World deep-dive" }, lifelong: { weeks: 0, label: "Ongoing", description: "Forever DM" } },
      intensity: { hobby: { label: "Hobby", description: "Casual DM" }, committed: { label: "Committed", description: "Prepared DM" }, professional: { label: "Professional", description: "Publisher level" } },
      skillLevel: { beginner: { label: "Beginner", description: "New DM" }, intermediate: { label: "Intermediate", description: "Homebrew pro" }, advanced: { label: "Advanced", description: "Veteran DM" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "creative-portfolio",
    title: "Build a Portfolio Website",
    description: "Design and launch a professional portfolio showcasing your best work.",
    category: "creative",
    icon: "🌐",
    defaultIdentityStatement: "I am becoming a professional with a polished online presence.",
    baseTimeline: 8,
    customMetrics: [
      { id: "projects", label: "Projects Included", type: "cumulative", unit: "projects", startingValue: 0, goalValue: 6, icon: "📁" }
    ],
    habits: [],
    milestones: [
      {
        id: "m1",
        title: "Curation & Copy",
        description: "Pick your best work.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Select top 6 projects", completed: false, isOptional: false },
          { id: "t2", title: "Write 'About Me' section", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 4, label: "Sprint", description: "Quick launch" }, sprint: { weeks: 8, label: "Standard", description: "2 months" }, marathon: { weeks: 16, label: "Slow", description: "Deep polish" }, lifelong: { weeks: 0, label: "Evergreen", description: "Career hub" } },
      intensity: { hobby: { label: "Simple", description: "Basic template" }, committed: { label: "Professional", description: "Custom design" }, professional: { label: "Agency", description: "High-end polish" } },
      skillLevel: { beginner: { label: "Beginner", description: "First site" }, intermediate: { label: "Intermediate", description: "Know basic web" }, advanced: { label: "Advanced", description: "Senior Dev/Designer" } }
    },
    createdBy: "system",
    isPublic: true
  },

  // --- TECHNICAL (3) ---
  {
    id: "technical-build-saas",
    title: "Build a SaaS Product",
    description: "Launch an MVP and acquire your first 100 users.",
    category: "technical",
    icon: "🚀",
    defaultIdentityStatement: "I am becoming a tech founder building scalable value.",
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
        description: "Talk to potential users.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Landing page signup", completed: false, isOptional: false },
          { id: "t2", title: "10 User interviews", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 6, label: "Fast", description: "6 weeks" }, sprint: { weeks: 12, label: "Standard", description: "3 months" }, marathon: { weeks: 24, label: "Slow", description: "6 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Product life" } },
      intensity: { hobby: { label: "Hobby", description: "Weekend builder" }, committed: { label: "Committed", description: "Part-time" }, professional: { label: "Professional", description: "Full-time" } },
      skillLevel: { beginner: { label: "Beginner", description: "Learning to code" }, intermediate: { label: "Intermediate", description: "Can build MVPs" }, advanced: { label: "Advanced", description: "Senior Engineer" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "technical-open-source",
    title: "Contribute to Open Source",
    description: "Go from spectator to active contributor with 5+ merged pull requests.",
    category: "technical",
    icon: "🌿",
    defaultIdentityStatement: "I am becoming an open source contributor with a public track record.",
    baseTimeline: 12,
    customMetrics: [
      { id: "mergedPrs", label: "Merged PRs", type: "cumulative", unit: "PRs", startingValue: 0, goalValue: 5, icon: "✅" }
    ],
    habits: [],
    milestones: [
      {
        id: "m1",
        title: "Project Discovery",
        description: "Find your community.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Identify 3 candidate projects", completed: false, isOptional: false },
          { id: "t2", title: "Join project Discord/Slack", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 6, label: "Fast", description: "Short burst" }, sprint: { weeks: 12, label: "Standard", description: "3 months" }, marathon: { weeks: 24, label: "Slow", description: "6 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "OSS Mainstay" } },
      intensity: { hobby: { label: "Casual", description: "Small fixes" }, committed: { label: "Committed", description: "Feature work" }, professional: { label: "Maintainer", description: "Core contrib" } },
      skillLevel: { beginner: { label: "Beginner", description: "New to Git" }, intermediate: { label: "Intermediate", description: "Competent dev" }, advanced: { label: "Advanced", description: "Expert dev" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "technical-learn-language",
    title: "Learn a New Programming Language",
    description: "Go from zero to building real projects in a new programming language.",
    category: "technical",
    icon: "💻",
    defaultIdentityStatement: "I am becoming proficient in [Language] through real-world projects.",
    baseTimeline: 16,
    customMetrics: [
      { id: "exercises", label: "Exercises Done", type: "cumulative", unit: "problems", startingValue: 0, goalValue: 100, icon: "🏋️" }
    ],
    habits: [],
    milestones: [
      {
        id: "m1",
        title: "Syntax Foundations",
        description: "Master the basic grammar.",
        weekStart: 1,
        weekEnd: 3,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Complete core tutorial", completed: false, isOptional: false },
          { id: "t2", title: "Set up local dev environment", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 8, label: "Fast", description: "Immersive" }, sprint: { weeks: 16, label: "Standard", description: "4 months" }, marathon: { weeks: 32, label: "Slow", description: "8 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Language Pro" } },
      intensity: { hobby: { label: "Casual", description: "Light study" }, committed: { label: "Serious", description: "Daily practice" }, professional: { label: "Expert", description: "Mastery focus" } },
      skillLevel: { beginner: { label: "Beginner", description: "First language" }, intermediate: { label: "Intermediate", description: "Multi-lingual" }, advanced: { label: "Advanced", description: "Senior Polyglot" } }
    },
    createdBy: "system",
    isPublic: true
  },

  // --- ACADEMIC (4) ---
  {
    id: "academic-master-subject",
    title: "Master a Subject Self-Taught",
    description: "Go from beginner to teaching-level competency through structured self-study.",
    category: "academic",
    icon: "🎓",
    defaultIdentityStatement: "I am becoming a subject matter expert in [Subject].",
    baseTimeline: 20,
    customMetrics: [
      { id: "hoursStudied", label: "Study Hours", type: "cumulative", unit: "hrs", startingValue: 0, goalValue: 150, icon: "⏱️" }
    ],
    habits: [],
    milestones: [
      {
        id: "m1",
        title: "Curriculum Design",
        description: "Map the knowledge landscape.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Find top 3 textbooks/courses", completed: false, isOptional: false },
          { id: "t2", title: "Create week-by-week syllabus", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 10, label: "Fast", description: "Intense" }, sprint: { weeks: 20, label: "Standard", description: "5 months" }, marathon: { weeks: 40, label: "Slow", description: "10 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Scholar" } },
      intensity: { hobby: { label: "Casual", description: "Interest driven" }, committed: { label: "Serious", description: "Goal driven" }, professional: { label: "Expert", description: "Career critical" } },
      skillLevel: { beginner: { label: "Beginner", description: "New to topic" }, intermediate: { label: "Intermediate", description: "Know basics" }, advanced: { label: "Advanced", description: "Expert review" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "academic-certification-exam",
    title: "Prepare for Certification Exam",
    description: "Systematically prepare for and pass a professional certification exam.",
    category: "academic",
    icon: "📋",
    defaultIdentityStatement: "I am becoming a certified professional in [Field].",
    baseTimeline: 12,
    customMetrics: [
      { id: "practiceScore", label: "Practice Score", type: "current", unit: "%", startingValue: 0, goalValue: 90, icon: "📊" }
    ],
    habits: [],
    milestones: [
      {
        id: "m1",
        title: "Blueprint Analysis",
        description: "Understand the test structure.",
        weekStart: 1,
        weekEnd: 1,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Download exam blueprint", completed: false, isOptional: false },
          { id: "t2", title: "Take baseline practice test", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 4, label: "Cram", description: "1 month" }, sprint: { weeks: 12, label: "Standard", description: "3 months" }, marathon: { weeks: 24, label: "Steady", description: "6 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Continuous" } },
      intensity: { hobby: { label: "Light", description: "1 hr/day" }, committed: { label: "Serious", description: "2 hr/day" }, professional: { label: "Full-time", description: "4+ hr/day" } },
      skillLevel: { beginner: { label: "Beginner", description: "New to field" }, intermediate: { label: "Intermediate", description: "Experienced" }, advanced: { label: "Advanced", description: "Expert" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "academic-learn-spoken-language",
    title: "Learn a Language to Conversational Fluency",
    description: "Go from zero to holding 15-minute conversations in a new language.",
    category: "academic",
    icon: "🗣️",
    defaultIdentityStatement: "I am becoming conversationally fluent in [Language].",
    baseTimeline: 24,
    customMetrics: [
      { id: "vocab", label: "Vocab Words", type: "cumulative", unit: "words", startingValue: 0, goalValue: 2000, icon: "📝" }
    ],
    habits: [
      { id: "daily-listen", label: "Listen to target language", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "The First 100",
        description: "Functional basics.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Learn pronouns and 'to be'", completed: false, isOptional: false },
          { id: "t2", title: "Memorize top 50 verbs", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Fast", description: "Immersive" }, sprint: { weeks: 24, label: "Standard", description: "6 months" }, marathon: { weeks: 48, label: "Slow", description: "1 year" }, lifelong: { weeks: 0, label: "Ongoing", description: "Fluent life" } },
      intensity: { hobby: { label: "Casual", description: "App based" }, committed: { label: "Serious", description: "Classes + apps" }, professional: { label: "Professional", description: "Full immersion" } },
      skillLevel: { beginner: { label: "Beginner", description: "First time" }, intermediate: { label: "Intermediate", description: "Know cognates" }, advanced: { label: "Advanced", description: "Polyglot" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "academic-book-reading",
    title: "Book Reading Challenge",
    description: "Read 12 books in a structured way with notes and reflections.",
    category: "academic",
    icon: "📚",
    defaultIdentityStatement: "I am becoming an intentional reader who absorbs and applies what I read.",
    baseTimeline: 24,
    customMetrics: [
      { id: "booksRead", label: "Books Read", type: "cumulative", unit: "books", startingValue: 0, goalValue: 12, icon: "📗" }
    ],
    habits: [
      { id: "daily-read", label: "Read 30 mins", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "The List",
        description: "Curate your shelf.",
        weekStart: 1,
        weekEnd: 1,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Select 12 core books", completed: false, isOptional: false },
          { id: "t2", title: "Set up note-taking system", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Sprint", description: "Book/week" }, sprint: { weeks: 24, label: "Standard", description: "2 books/month" }, marathon: { weeks: 52, label: "Slow", description: "1 book/month" }, lifelong: { weeks: 0, label: "Ongoing", description: "Daily reader" } },
      intensity: { hobby: { label: "Casual", description: "Enjoyment" }, committed: { label: "Committed", description: "Notes + reflection" }, professional: { label: "Academic", description: "Critical study" } },
      skillLevel: { beginner: { label: "Beginner", description: "New to reading" }, intermediate: { label: "Intermediate", description: "Occasional" }, advanced: { label: "Advanced", description: "Avid reader" } }
    },
    createdBy: "system",
    isPublic: true
  },

  // --- CAREER (3) ---
  {
    id: "career-transition",
    title: "Transition to a New Career",
    description: "Navigate a career change from skills gap analysis to landing your first role.",
    category: "career",
    icon: "💼",
    defaultIdentityStatement: "I am becoming a professional in [Target Field] with proven skills.",
    baseTimeline: 24,
    customMetrics: [
      { id: "apps", label: "Apps Sent", type: "cumulative", unit: "apps", startingValue: 0, goalValue: 50, icon: "📨" }
    ],
    habits: [
      { id: "daily-apply", label: "1 Application or Outreach", frequency: "daily", linkedMilestoneId: null, activeFrom: "m5", activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Gap Analysis",
        description: "Know what you lack.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Review 10 job descriptions", completed: false, isOptional: false },
          { id: "t2", title: "List top 3 missing skills", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Sprint", description: "Aggressive" }, sprint: { weeks: 24, label: "Standard", description: "6 months" }, marathon: { weeks: 48, label: "Slow", description: "1 year" }, lifelong: { weeks: 0, label: "Ongoing", description: "Career evolution" } },
      intensity: { hobby: { label: "Exploring", description: "Light research" }, committed: { label: "Committed", description: "Serious pursuit" }, professional: { label: "All-in", description: "Pivot focus" } },
      skillLevel: { beginner: { label: "Beginner", description: "Entry level" }, intermediate: { label: "Intermediate", description: "Transferable" }, advanced: { label: "Advanced", description: "Executive pivot" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "career-freelance",
    title: "Launch a Freelance Business",
    description: "Go from employee to independent freelancer with your first 5 paying clients.",
    category: "career",
    icon: "👔",
    defaultIdentityStatement: "I am becoming a thriving freelancer with consistent clients.",
    baseTimeline: 16,
    customMetrics: [
      { id: "clients", label: "Clients Landed", type: "cumulative", unit: "clients", startingValue: 0, goalValue: 5, icon: "🤝" }
    ],
    habits: [],
    milestones: [
      {
        id: "m1",
        title: "Niche & Offer",
        description: "What are you selling?",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Define core service", completed: false, isOptional: false },
          { id: "t2", title: "Set initial pricing", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 8, label: "Fast", description: "Quick launch" }, sprint: { weeks: 16, label: "Standard", description: "4 months" }, marathon: { weeks: 32, label: "Slow", description: "8 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Business life" } },
      intensity: { hobby: { label: "Side-hustle", description: "Part-time" }, committed: { label: "Full-time", description: "Core income" }, professional: { label: "Agency", description: "Scale focus" } },
      skillLevel: { beginner: { label: "Beginner", description: "First business" }, intermediate: { label: "Intermediate", description: "Previous exp" }, advanced: { label: "Advanced", description: "Senior expert" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "career-get-promoted",
    title: "Get Promoted at Work",
    description: "Strategically position yourself for a promotion through visibility and impact.",
    category: "career",
    icon: "📈",
    defaultIdentityStatement: "I am becoming a recognized leader in my organization.",
    baseTimeline: 20,
    customMetrics: [
      { id: "wins", label: "Visibility Wins", type: "cumulative", unit: "wins", startingValue: 0, goalValue: 10, icon: "🔦" }
    ],
    habits: [],
    milestones: [
      {
        id: "m1",
        title: "Benchmark",
        description: "Know what's required.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Read promo requirements", completed: false, isOptional: false },
          { id: "t2", title: "Review with manager", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Fast", description: "Promo cycle" }, sprint: { weeks: 20, label: "Standard", description: "Targeted" }, marathon: { weeks: 40, label: "Slow", description: "Long game" }, lifelong: { weeks: 0, label: "Ongoing", description: "Leadership" } },
      intensity: { hobby: { label: "Passive", description: "Low pressure" }, committed: { label: "Active", description: "Standard" }, professional: { label: "Aggressive", description: "Fast track" } },
      skillLevel: { beginner: { label: "Junior", description: "Mid-level target" }, intermediate: { label: "Mid-level", description: "Senior target" }, advanced: { label: "Senior", description: "Leadership target" } }
    },
    createdBy: "system",
    isPublic: true
  },

  // --- HEALTH (3) ---
  {
    id: "health-exercise-habit",
    title: "Build a Sustainable Exercise Habit",
    description: "Go from inconsistent to 6 months of regular exercise that feels automatic.",
    category: "health",
    icon: "💪",
    defaultIdentityStatement: "I am becoming someone who exercises consistently because it's part of who I am.",
    baseTimeline: 26,
    customMetrics: [
      { id: "workouts", label: "Workouts", type: "cumulative", unit: "done", startingValue: 0, goalValue: 100, icon: "🏋️" }
    ],
    habits: [
      { id: "daily-move", label: "Move for 20 mins", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Show Up",
        description: "Focus on the start.",
        weekStart: 1,
        weekEnd: 4,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Join gym or prep gear", completed: false, isOptional: false },
          { id: "t2", title: "First 10 workouts", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Sprint", description: "Fast habit" }, sprint: { weeks: 26, label: "Standard", description: "6 months" }, marathon: { weeks: 52, label: "Year", description: "Lifestyle" }, lifelong: { weeks: 0, label: "Ongoing", description: "Forever" } },
      intensity: { hobby: { label: "Casual", description: "Easy" }, committed: { label: "Active", description: "Moderate" }, professional: { label: "Athlete", description: "High" } },
      skillLevel: { beginner: { label: "Beginner", description: "Newbie" }, intermediate: { label: "Intermediate", description: "Know basic" }, advanced: { label: "Advanced", description: "Athlete" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "health-marathon",
    title: "Train for a Marathon",
    description: "Go from current fitness to 26.2 miles in 20 weeks.",
    category: "health",
    icon: "🏃",
    defaultIdentityStatement: "I am becoming a marathon finisher with endurance and discipline.",
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
        description: "Build the aerobic foundation.",
        weekStart: 1,
        weekEnd: 4,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Buy proper shoes", completed: false, isOptional: false },
          { id: "t2", title: "Run 10 miles/week", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Sprint", description: "Advanced only" }, sprint: { weeks: 20, label: "Standard", description: "5 months" }, marathon: { weeks: 30, label: "Slow", description: "Safe build" }, lifelong: { weeks: 0, label: "Runner", description: "Ongoing" } },
      intensity: { hobby: { label: "Finish", description: "Goal: Finish" }, committed: { label: "Sub-4", description: "Goal: Pace" }, professional: { label: "Boston", description: "Goal: BQ" } },
      skillLevel: { beginner: { label: "Beginner", description: "First time" }, intermediate: { label: "Intermediate", description: "Run 5ks" }, advanced: { label: "Advanced", description: "Marathoner" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "health-morning-routine",
    title: "Establish a Morning Routine",
    description: "Design and lock in a powerful morning routine for daily success.",
    category: "health",
    icon: "🌅",
    defaultIdentityStatement: "I am becoming someone who starts every day with intention and energy.",
    baseTimeline: 12,
    customMetrics: [
      { id: "routineWins", label: "Routine Wins", type: "cumulative", unit: "days", startingValue: 0, goalValue: 60, icon: "✅" }
    ],
    habits: [
      { id: "morning-flow", label: "Complete morning routine", frequency: "daily", linkedMilestoneId: null, activeFrom: "m2", activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Audit & Design",
        description: "Plan the flow.",
        weekStart: 1,
        weekEnd: 1,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Identify 3 core morning habits", completed: false, isOptional: false },
          { id: "t2", title: "Map the first 15 mins", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 4, label: "Fast", description: "1 month" }, sprint: { weeks: 12, label: "Standard", description: "3 months" }, marathon: { weeks: 24, label: "Slow", description: "6 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Lifestyle" } },
      intensity: { hobby: { label: "Simple", description: "Basic flow" }, committed: { label: "Serene", description: "Full stack" }, professional: { label: "Titan", description: "Deep focus" } },
      skillLevel: { beginner: { label: "Beginner", description: "Groggy" }, intermediate: { label: "Intermediate", description: "Regular" }, advanced: { label: "Advanced", description: "Early bird" } }
    },
    createdBy: "system",
    isPublic: true
  },

  // --- FINANCIAL (3) ---
  {
    id: "financial-save-purchase",
    title: "Save for a Major Purchase",
    description: "Systematically save for a big goal (home, car, trip) with tracking.",
    category: "financial",
    icon: "🏦",
    defaultIdentityStatement: "I am becoming someone who achieves big goals through discipline.",
    baseTimeline: 26,
    customMetrics: [
      { id: "totalSaved", label: "Total Saved", type: "cumulative", unit: "$", startingValue: 0, goalValue: null, icon: "💰" }
    ],
    habits: [
      { id: "weekly-save", label: "Transfer to savings", frequency: "weekly", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Audit & Target",
        description: "Know the numbers.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Define exact target amount", completed: false, isOptional: false },
          { id: "t2", title: "Review last 3 months spending", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Aggressive", description: "Tight budget" }, sprint: { weeks: 26, label: "Standard", description: "6 months" }, marathon: { weeks: 52, label: "Steady", description: "1 year" }, lifelong: { weeks: 0, label: "Ongoing", description: "Wealth" } },
      intensity: { hobby: { label: "Casual", description: "Extra cash" }, committed: { label: "Serious", description: "Budget cuts" }, professional: { label: "Intense", description: "Income max" } },
      skillLevel: { beginner: { label: "Beginner", description: "First save" }, intermediate: { label: "Intermediate", description: "Savvy" }, advanced: { label: "Advanced", description: "Pro" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "financial-investment-portfolio",
    title: "Build an Investment Portfolio",
    description: "Go from zero investing knowledge to an automated, diversified portfolio.",
    category: "financial",
    icon: "💹",
    defaultIdentityStatement: "I am becoming an informed investor with an automated portfolio.",
    baseTimeline: 12,
    customMetrics: [
      { id: "invested", label: "Total Invested", type: "cumulative", unit: "$", startingValue: 0, goalValue: null, icon: "📈" }
    ],
    habits: [],
    milestones: [
      {
        id: "m1",
        title: "The Basics",
        description: "Learn the rules.",
        weekStart: 1,
        weekEnd: 3,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "Learn Index vs Active", completed: false, isOptional: false },
          { id: "t2", title: "Open brokerage account", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 6, label: "Fast", description: "Quick setup" }, sprint: { weeks: 12, label: "Standard", description: "3 months" }, marathon: { weeks: 24, label: "Steady", description: "6 months" }, lifelong: { weeks: 0, label: "Ongoing", description: "Legacy" } },
      intensity: { hobby: { label: "Casual", description: "Small sums" }, committed: { label: "Active", description: "Regular DCA" }, professional: { label: "Serious", description: "Aggressive" } },
      skillLevel: { beginner: { label: "Beginner", description: "Newbie" }, intermediate: { label: "Intermediate", description: "Savvy" }, advanced: { label: "Advanced", description: "Master" } }
    },
    createdBy: "system",
    isPublic: true
  },
  {
    id: "financial-pay-off-debt",
    title: "Pay Off Debt",
    description: "Create and execute a complete debt payoff plan using proven strategies.",
    category: "financial",
    icon: "🔓",
    defaultIdentityStatement: "I am becoming debt-free with the financial habits to stay that way.",
    baseTimeline: 26,
    customMetrics: [
      { id: "paid", label: "Debt Paid", type: "cumulative", unit: "$", startingValue: 0, goalValue: null, icon: "💸" }
    ],
    habits: [
      { id: "spending-check", label: "Daily budget check", frequency: "daily", linkedMilestoneId: null, activeFrom: null, activeUntil: null }
    ],
    milestones: [
      {
        id: "m1",
        title: "Face the Facts",
        description: "Audit the debt.",
        weekStart: 1,
        weekEnd: 2,
        status: "Not Started",
        dependsOn: [],
        tasks: [
          { id: "t1", title: "List every debt/rate", completed: false, isOptional: false },
          { id: "t2", title: "Choose Snowball or Avalanche", completed: false, isOptional: false }
        ],
        isOptional: false
      }
    ],
    celebrationTriggers: [],
    resourcePack: [],
    adaptiveSettings: { timelineFlexible: true, intensityAdjustable: true, skillLevelScalable: true, canAddCustomMilestones: true, canRemoveOptionalMilestones: true },
    variations: {
      timeline: { ultraSprint: { weeks: 12, label: "Aggressive", description: "Tight belt" }, sprint: { weeks: 26, label: "Standard", description: "6 months" }, marathon: { weeks: 52, label: "Steady", description: "1 year" }, lifelong: { weeks: 0, label: "Ongoing", description: "Wealth" } },
      intensity: { hobby: { label: "Soft", description: "Slow pay" }, committed: { label: "Committed", description: "Serious pay" }, professional: { label: "Extreme", description: "Total focus" } },
      skillLevel: { beginner: { label: "Beginner", description: "Newbie" }, intermediate: { label: "Intermediate", description: "Savvy" }, advanced: { label: "Advanced", description: "Pro" } }
    },
    createdBy: "system",
    isPublic: true
  }
];
