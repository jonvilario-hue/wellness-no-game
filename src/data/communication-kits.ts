import type { MiniKit } from './wellness-kits';

export const communicationKits: MiniKit[] = [
  {
    id: "kit-pre-meeting-warmup",
    title: "Pre-Meeting Warmup",
    emoji: "🎯",
    description: "Align your voice and mindset before stepping into the room.",
    whenToUse: "5 minutes before an important call or meeting.",
    whyItWorks: "Breath regulation lowers heart rate while articulation drills prime the vocal motor cortex.",
    howToUse: "Step through the breathwork, then the pitch finding, then the signposting.",
    exerciseIds: ['vocal_diaphragmatic', 'vocal_pitch'],
    estimatedMinutes: 5,
    practices: [
      { type: "Movement", title: "Diaphragmatic Breathing" }, // Using "Movement" type for consistency with UI player
      { type: "Movement", title: "Optimal Pitch Finding" }
    ],
    tags: ["professional", "vocal", "confidence"]
  },
  {
    id: "kit-difficult-convo-prep",
    title: "Difficult Conversation Prep",
    emoji: "🤝",
    description: "Prepare to handle conflict with clarity and empathy.",
    whenToUse: "When you anticipate resistance or a high-stakes disagreement.",
    whyItWorks: "Moves you from reactive 'blame' mode into collaborative problem-solving.",
    howToUse: "Focus on the 'I' statement and the de-escalation technique specifically.",
    exerciseIds: ['conflict_i_statements', 'conflict_deescalation'],
    estimatedMinutes: 8,
    practices: [
      { type: "Movement", title: "I Statement Practice" },
      { type: "Movement", title: "De-Escalation Technique" }
    ],
    tags: ["conflict", "emotional-intelligence", "de-escalation"]
  },
  {
    id: "kit-quick-confidence-boost",
    title: "Quick Confidence Boost",
    emoji: "🔥",
    description: "A fast somatic and vocal reset for instant presence.",
    whenToUse: "Right before an interview, date, or presentation.",
    whyItWorks: "The power pose lowers cortisol while the breathwork anchors the nervous system.",
    howToUse: "Find a private space and execute the steps rapidly.",
    exerciseIds: ['speaking_power_pose', 'vocal_diaphragmatic', 'vocal_articulation'],
    estimatedMinutes: 4,
    practices: [
      { type: "Movement", title: "Power Pose" },
      { type: "Movement", title: "Articulation Drill" }
    ],
    tags: ["vocal", "confidence", "quick"]
  }
];
