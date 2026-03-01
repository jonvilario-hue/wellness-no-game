
export type MiniKit = {
    id: string;
    title: string;
    emoji: string;
    description: string;
    practices: { type: "Movement" | "Stillness"; title: string }[];
    exerciseIds: string[];
    estimatedMinutes: number;
    whenToUse: string;
    whyItWorks: string;
    howToUse: string;
    tags: string[];
};

export const kits: MiniKit[] = [
  {
    id: "kit-body-jumpstart-kit",
    title: "Body Jumpstart Kit",
    emoji: "⚡",
    description: "Wake up your body and shake off inertia.",
    whenToUse: "You’ve been sitting too long or feel physically sluggish.",
    whyItWorks: "Gentle movement boosts blood flow and dopamine.",
    howToUse: "Follow these steps in order for a quick physical reset.",
    exerciseIds: ['energizer_high_knees', 'strength_balance'],
    estimatedMinutes: 3,
    practices: [
      { type: "Movement", title: "1-Min High Knees" },
      { type: "Movement", title: "Single-Leg Balance" }
    ],
    tags: ["energy", "morning", "quick"]
  },
  {
    id: "kit-brain-warm-up-kit",
    title: "Brain Warm-Up Kit",
    emoji: "🧠",
    description: "Clear mental fog and prime your focus.",
    whenToUse: "When you feel groggy or stuck in a cognitive loop.",
    whyItWorks: "CO2 clearing through breathwork increases oxygenation to the prefrontal cortex.",
    howToUse: "Use the box breath to center, then the focus reset to clear noise.",
    exerciseIds: ['breath_box', 'focus_reset'],
    estimatedMinutes: 5,
    practices: [
      { type: "Stillness", title: "Box Breathing" },
      { type: "Stillness", title: "Two-Minute Reset" }
    ],
    tags: ["focus", "clarity"]
  },
  {
    id: "kit-momentum-builder-kit",
    title: "Momentum Builder Kit",
    emoji: "🚀",
    description: "Break the 'freeze' response and start your day.",
    whenToUse: "When you're procrastinating or feeling overwhelmed by a task list.",
    whyItWorks: "Completing small, guaranteed wins triggers a dopamine release, lowering the barrier to entry for harder tasks.",
    howToUse: "Perform the high knees to get energy up, then immediately name 3 wins.",
    exerciseIds: ['energizer_high_knees', 'focus_wins'],
    estimatedMinutes: 3,
    practices: [
      { type: "Movement", title: "1-Min High Knees" },
      { type: "Stillness", title: "Name 3 Wins" }
    ],
    tags: ["momentum", "productivity"]
  },
  {
    id: "kit-stress-shakeoff",
    title: "Stress Shakeoff Protocol",
    emoji: "🥊",
    description: "Physically discharge stress and adrenaline.",
    whenToUse: "When you feel 'wired' or agitated after a tense interaction.",
    whyItWorks: "Shadow boxing provides a safe physical outlet for the 'fight or flight' response.",
    howToUse: "Box vigorously for 2 minutes, then immediately drop into the 4-7-8 calming breath.",
    exerciseIds: ['energizer_shadow_boxing', 'breath_478'],
    estimatedMinutes: 4,
    practices: [
      { type: "Movement", title: "Shadow Boxing" },
      { type: "Stillness", title: "4-7-8 Breath" }
    ],
    tags: ["stress", "anxiety", "relief"]
  },
  {
    id: "kit-emotional-recovery-kit",
    title: "Emotional Recovery Sequence",
    emoji: "🌱",
    description: "Return to center after an emotional overload.",
    whenToUse: "After a setback or when the 'inner critic' is dominant.",
    whyItWorks: "Combines the 5-4-3-2-1 sensory anchor with self-compassion to stop emotional spiraling.",
    howToUse: "Ground yourself in the room, then use the gentle inner voice mantra.",
    exerciseIds: ['grounding_54321', 'compassion_mantra'],
    estimatedMinutes: 5,
    practices: [
      { type: "Stillness", title: "5-4-3-2-1 Senses" },
      { type: "Stillness", title: "Gentle Inner Voice" }
    ],
    tags: ["recovery", "compassion", "calm"]
  },
  {
    id: "kit-evening-soft-landing",
    title: "Evening Soft Landing",
    emoji: "🌙",
    description: "Downshift your metabolic rate for recovery.",
    whenToUse: "30 minutes before you intend to sleep.",
    whyItWorks: "Signals the transition to the parasympathetic state by releasing physical tension.",
    howToUse: "Perform the pre-bedtime stretch, followed by resonant breathing.",
    exerciseIds: ['wind_down_stretch', 'breath_resonant'],
    estimatedMinutes: 9,
    practices: [
      { type: "Movement", title: "Pre-Bedtime Stretch" },
      { type: "Stillness", title: "Resonant Breathing" }
    ],
    tags: ["sleep", "recovery", "evening"]
  },
  {
    id: "kit-dopamine-ladder-kit",
    title: "Dopamine Ladder Kit",
    emoji: "🪜",
    description: "Rebuild capacity after a tiring day.",
    whenToUse: "When you have low battery but still want to make intentional progress.",
    whyItWorks: "Uses low-friction sensory focus to rebuild attention span without strain.",
    howToUse: "Focus on a tactile object, then record a 'What do I need?' prompt.",
    exerciseIds: ['grounding_tactile', 'compassion_journal'],
    estimatedMinutes: 5,
    practices: [
      { type: "Stillness", title: "Tactile Object Focus" },
      { type: "Stillness", title: "“What do I need?” Prompt" }
    ],
    tags: ["energy", "recovery"]
  },
  {
    id: "kit-unfreeze-toolkit",
    title: "Unfreeze Toolkit",
    emoji: "🧊",
    description: "Break out of numbness or boredom.",
    whenToUse: "When you feel disconnected or 'spaced out'.",
    whyItWorks: "Engages the vestibular and proprioceptive systems to 'wake up' the brain's internal map.",
    howToUse: "Release your neck tension, then do the 5-4-3-2-1 senses check.",
    exerciseIds: ['stretch_neck', 'grounding_54321'],
    estimatedMinutes: 5,
    practices: [
      { type: "Movement", title: "Neck & Shoulder Release" },
      { type: "Stillness", title: "5-4-3-2-1 Senses" }
    ],
    tags: ["unfreeze", "awareness"]
  },
  {
    id: "kit-music-move-kit",
    title: "Music & Move Kit",
    emoji: "🎵",
    description: "Leverage rhythm to change your internal state.",
    whenToUse: "When you need a quick mood or energy boost.",
    whyItWorks: "Rhythmic movement paired with upbeat audio increases endorphin release.",
    howToUse: "Put on an upbeat track and do 1 minute of high knees followed by shadow boxing.",
    exerciseIds: ['energizer_high_knees', 'energizer_shadow_boxing'],
    estimatedMinutes: 3,
    practices: [
      { type: "Movement", title: "1-Min High Knees" },
      { type: "Movement", title: "Shadow Boxing" }
    ],
    tags: ["mood", "energy", "music"]
  },
  {
    id: "kit-creative-flow-primer",
    title: "Creative Flow Primer",
    emoji: "🎨",
    description: "Prime the brain for lateral thinking.",
    whenToUse: "Before a creative session or brainstorming.",
    whyItWorks: "Uses open-monitoring visualization to allow for diverse neural associations.",
    howToUse: "Use nature visualization to open the mind, then name 3 recent creative wins.",
    exerciseIds: ['grounding_nature', 'focus_wins'],
    estimatedMinutes: 7,
    practices: [
      { type: "Stillness", title: "Nature Visualization" },
      { type: "Stillness", title: "Name 3 Wins" }
    ],
    tags: ["creativity", "flow"]
  },
  {
    id: "kit-focus-reboot-pack",
    title: "Focus Reboot Protocol",
    emoji: "🔄",
    description: "Hard-reset your executive function.",
    whenToUse: "When you're multitasking and losing efficiency.",
    whyItWorks: "Core activation provides a physical anchor while the reset pause clears attention residue.",
    howToUse: "Hold a core plank, then immediately do the 2-minute reset.",
    exerciseIds: ['strength_core', 'focus_reset'],
    estimatedMinutes: 4,
    practices: [
      { type: "Movement", title: "Core Awakening" },
      { type: "Stillness", title: "Two-Minute Reset" }
    ],
    tags: ["focus", "reset"]
  },
  {
    id: "kit-self-talk-reset",
    title: "Self-Talk Reset Kit",
    emoji: "🗣️",
    description: "Swap uncertainty for structured support.",
    whenToUse: "When you're doubting your ability or next steps.",
    whyItWorks: "Replaces chaotic internal dialogue with a structured, kind mantra.",
    howToUse: "Practice the gentle inner voice, then name 3 wins to prove it.",
    exerciseIds: ['compassion_mantra', 'focus_wins'],
    estimatedMinutes: 4,
    practices: [
      { type: "Stillness", title: "Gentle Inner Voice" },
      { type: "Stillness", title: "Name 3 Wins" }
    ],
    tags: ["confidence", "self-talk"]
  },
  {
    id: "kit-desk-reboot",
    title: "Desk Reboot Kit",
    emoji: "🎯",
    description: "Reset focus and posture during long work sessions.",
    whenToUse: "You’re feeling stiff, distracted, or in a mental fog.",
    whyItWorks: "Combines movement to release tension with breathwork to focus attention.",
    howToUse: "Step through these 3 actions sequentially.",
    exerciseIds: ['stretch_neck', 'stretch_spine', 'breath_box'],
    estimatedMinutes: 6,
    practices: [
      { type: "Movement", title: "Neck & Shoulder Release" },
      { type: "Movement", title: "Thoracic Spine Rotations" },
      { type: "Stillness", title: "Box Breathing" }
    ],
    tags: ["desk", "neck", "low-back", "focus"]
  }
];
