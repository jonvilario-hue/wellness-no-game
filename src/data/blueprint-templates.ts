
import type { BlueprintTemplate } from '@/types/blueprint';

export const systemTemplates: BlueprintTemplate[] = [
  // --- CREATIVE ---
  {
    id: 'st-creative-novel',
    name: 'Write a Novel',
    category: 'Creative',
    subcategory: 'Writing',
    description: 'A structured path from premise to a completed 70k+ word first draft.',
    defaultIdentityStatement: 'I am becoming a published novelist who finishes what they start.',
    baseTimelineWeeks: 24,
    milestones: [
      {
        title: 'Premise & Character Architecture',
        description: 'Define your core conflict and protagonist depth.',
        suggestedDurationWeeks: 2,
        tasks: [
          { title: 'Write logline', description: 'One sentence hook.' },
          { title: 'Protagonist profile', description: 'Internal vs external goals.' },
          { title: 'The Antagonist force', description: 'What stands in the way?' }
        ]
      },
      {
        title: 'Outline & Beat Sheet',
        description: 'Structure the 3-act journey.',
        suggestedDurationWeeks: 3,
        tasks: [
          { title: 'Map Act 1 Beats', description: 'Inciting incident to first turn.' },
          { title: 'Define Midpoint Climax', description: 'The point of no return.' },
          { title: 'Climax & Resolution', description: 'The final showdown.' }
        ]
      },
      {
        title: 'The "Vomit" Draft (Act 1)',
        description: 'Get the words down without judging.',
        suggestedDurationWeeks: 6,
        tasks: [
          { title: 'Reach 20k words', description: 'Focus on momentum.' },
          { title: 'Weekly word count audit', description: 'Maintain consistency.' }
        ]
      },
      {
        title: 'The Middle Muddle (Act 2)',
        description: 'Keep the tension rising.',
        suggestedDurationWeeks: 8,
        tasks: [
          { title: 'Reach 50k words', description: 'Push through the dip.' },
          { title: 'Deepen subplots', description: 'Secondary character arcs.' }
        ]
      },
      {
        title: 'Resolution (Act 3)',
        description: 'Tie up loose ends.',
        suggestedDurationWeeks: 5,
        tasks: [
          { title: 'Reach 70k words', description: 'Final sprint.' },
          { title: 'Draft final chapter', description: 'The "The End" moment.' }
        ]
      }
    ],
    adaptiveSettings: {
      supportsTimeline: true,
      supportsIntensity: true,
      supportsSkillLevel: true,
      supportsLearningStyle: false,
      supportsAccountability: true
    },
    suggestedStrategies: ['Backcasting', 'Identity-Based Goals', 'Obstacle Pre-Mortem'],
    createdBy: 'system',
    isPublic: true,
    isSystemTemplate: true
  },
  {
    id: 'st-tech-saas',
    name: 'Build a SaaS Product',
    category: 'Technical',
    subcategory: 'Coding',
    description: 'Launch an MVP and acquire your first 100 users.',
    defaultIdentityStatement: 'I am becoming an entrepreneurial engineer who builds scalable value.',
    baseTimelineWeeks: 12,
    milestones: [
      {
        title: 'Problem Validation',
        description: 'Verify the pain point exists.',
        suggestedDurationWeeks: 2,
        tasks: [
          { title: 'Define target persona', description: 'Who is this for?' },
          { title: '10 Discovery interviews', description: 'Talk to real potential users.' },
          { title: 'Landing page test', description: 'Track email signups.' }
        ]
      },
      {
        title: 'Core MVP Development',
        description: 'Build the absolute minimum required to solve the problem.',
        suggestedDurationWeeks: 6,
        tasks: [
          { title: 'Architecture design', description: 'Database schema and tech stack.' },
          { title: 'Auth & Onboarding', description: 'User entry flow.' },
          { title: 'Core value feature', description: 'The one thing that matters.' }
        ]
      },
      {
        title: 'Beta Launch',
        description: 'Get real usage data.',
        suggestedDurationWeeks: 2,
        tasks: [
          { title: 'Set up error tracking', description: 'Sentry or similar.' },
          { title: 'Invite 20 beta users', description: 'Monitor feedback loops.' }
        ]
      },
      {
        title: 'Public Growth',
        description: 'Scale to 100 users.',
        suggestedDurationWeeks: 2,
        tasks: [
          { title: 'Product Hunt launch', description: 'Community exposure.' },
          { title: 'Implement referral loop', description: 'Viral coefficient check.' }
        ]
      }
    ],
    adaptiveSettings: {
      supportsTimeline: true,
      supportsIntensity: true,
      supportsSkillLevel: true,
      supportsLearningStyle: true,
      supportsAccountability: true
    },
    suggestedStrategies: ['OKRs', 'SMART Goals', 'Weekly Review Loop'],
    createdBy: 'system',
    isPublic: true,
    isSystemTemplate: true
  },
  {
    id: 'st-career-pivot',
    name: 'Career Pivot',
    category: 'Career',
    description: 'Transition from your current role to a new industry or discipline.',
    defaultIdentityStatement: 'I am becoming a recognized expert in my new field.',
    baseTimelineWeeks: 16,
    milestones: [
      {
        title: 'Skill Gap Analysis',
        description: 'Map existing skills to target requirements.',
        suggestedDurationWeeks: 2,
        tasks: [
          { title: 'Research 10 job descriptions', description: 'Find common keywords.' },
          { title: 'Identify top 3 gap skills', description: 'What do I need to learn?' }
        ]
      },
      {
        title: 'Skill Acquisition',
        description: 'Aggressive learning phase.',
        suggestedDurationWeeks: 6,
        tasks: [
          { title: 'Complete intensive course', description: 'Foundational certificate.' },
          { title: 'Build proof-of-work project', description: 'Tangible skill evidence.' }
        ]
      },
      {
        title: 'Personal Branding',
        description: 'Update your professional narrative.',
        suggestedDurationWeeks: 2,
        tasks: [
          { title: 'Rewrite LinkedIn profile', description: 'Focus on new identity.' },
          { title: 'Optimize resume', description: 'Highlight transferable wins.' }
        ]
      },
      {
        title: 'Networking & Outreach',
        description: 'Get in front of decision makers.',
        suggestedDurationWeeks: 6,
        tasks: [
          { title: '10 informational interviews', description: 'Learn from insiders.' },
          { title: 'Apply to 20 curated roles', description: 'Quality over quantity.' }
        ]
      }
    ],
    adaptiveSettings: {
      supportsTimeline: true,
      supportsIntensity: true,
      supportsSkillLevel: false,
      supportsLearningStyle: true,
      supportsAccountability: true
    },
    suggestedStrategies: ['Backcasting', 'Identity-Based Goals', 'Energy Mapping'],
    createdBy: 'system',
    isPublic: true,
    isSystemTemplate: true
  },
  {
    id: 'st-health-habit',
    name: 'Sustainable Exercise Habit',
    category: 'Health',
    description: 'Establish a lasting workout routine that fits your lifestyle.',
    defaultIdentityStatement: 'I am becoming an athlete who prioritizes physical vitality.',
    baseTimelineWeeks: 12,
    milestones: [
      {
        title: 'Environment Setup',
        description: 'Reduce friction to starting.',
        suggestedDurationWeeks: 1,
        tasks: [
          { title: 'Join gym or buy home gear', description: 'The physical anchor.' },
          { title: 'Set workout uniform', description: 'Reduce decision fatigue.' }
        ]
      },
      {
        title: 'Consistency Phase',
        description: 'Focus on showing up, not intensity.',
        suggestedDurationWeeks: 4,
        tasks: [
          { title: '3 workouts per week', description: 'Any intensity counts.' },
          { title: 'Daily log check-in', description: 'Streak protection.' }
        ]
      },
      {
        title: 'Progressive Overload',
        description: 'Start tracking performance gains.',
        suggestedDurationWeeks: 4,
        tasks: [
          { title: 'Increase weights/time by 5%', description: 'Steady growth.' },
          { title: 'Track heart rate recovery', description: 'Internal health metric.' }
        ]
      },
      {
        title: 'Integration',
        description: 'Make it a part of your self-image.',
        suggestedDurationWeeks: 3,
        tasks: [
          { title: 'Set a fitness milestone', description: 'e.g., 5k run or 100lb lift.' },
          { title: 'Social exercise event', description: 'Connect with community.' }
        ]
      }
    ],
    adaptiveSettings: {
      supportsTimeline: true,
      supportsIntensity: true,
      supportsSkillLevel: true,
      supportsLearningStyle: false,
      supportsAccountability: true
    },
    suggestedStrategies: ['Gamified Progress', 'Identity-Based Goals', 'WOOP'],
    createdBy: 'system',
    isPublic: true,
    isSystemTemplate: true
  }
];
