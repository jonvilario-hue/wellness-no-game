
export type PlanStep = {
  type: "Movement" | "Stillness" | "Communication" | "Speed Reading";
  title: string;
};

export type DailyStep = {
    day: number;
    title: string;
    practices: PlanStep[];
};

export type WellnessPlan = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Movement" | "Stillness" | "Communication" | "Speed Reading";
  steps: DailyStep[];
};

export const wellnessPlans: WellnessPlan[] = [
  // --- MOVEMENT PLANS ---
  {
    id: "desk-detox",
    title: "Desk Detox",
    category: "Movement",
    tagline: "Undo the desk. Recharge the brain.",
    description: "A quick, daily reset for desk-bound workers to release tension and restore focus.",
    steps: [
        { day: 1, title: "Phase 1: Release Tension", practices: [{ type: "Movement", title: "Thoracic Spine Rotations" }, { type: "Movement", title: "Neck & Shoulder Release" }] },
        { day: 2, title: "Phase 1: Spinal Alignment", practices: [{ type: "Movement", title: "Yoga Cat-Cow" }] },
        { day: 3, title: "Phase 2: Core Stability", practices: [{ type: "Movement", title: "Core Awakening" }, { type: "Movement", title: "Wall Push-ups" }] },
        { day: 4, title: "Phase 2: Full Body Mobility", practices: [{ type: "Movement", title: "Morning Mobility Flow" }] },
        { day: 5, title: "Phase 3: Vitality Reset", practices: [{ type: "Movement", title: "Breath & Squat Pulses" }, { type: "Movement", title: "5-Minute Morning Flow" }] },
    ],
  },
  {
    id: "morning-momentum",
    title: "Morning Momentum Builder",
    category: "Movement",
    tagline: "Start with high octane.",
    description: "A 5-day ramp to build morning physical energy.",
    steps: [
        { day: 1, title: "Phase 1: Activation", practices: [{ type: "Movement", title: "1-Min High Knees" }] },
        { day: 2, title: "Phase 1: Balance", practices: [{ type: "Movement", title: "Tree Pose Balance" }] },
        { day: 3, title: "Phase 2: Dynamic Power", practices: [{ type: "Movement", title: "Front Kick Cardio Series" }] },
        { day: 4, title: "Phase 2: Total Body", practices: [{ type: "Movement", title: "Morning Sun Salutation" }] },
        { day: 5, title: "Phase 3: High Intensity", practices: [{ type: "Movement", title: "Shadow Boxing Combo" }] },
    ]
  },

  // --- STILLNESS PLANS ---
  {
    id: "de-stress-in-5-days",
    title: "De-Stress Protocol",
    category: "Stillness",
    tagline: "Five days to feel again.",
    description: "A low-effort ramp to regulate stress and teach nervous system recovery.",
    steps: [
        { day: 1, title: "Phase 1: Physiological Anchor", practices: [{ type: "Stillness", title: "Box Breathing" }] },
        { day: 2, title: "Phase 1: Sensory Grounding", practices: [{ type: "Stillness", title: "Tactile Object Focus" }] },
        { day: 3, title: "Phase 2: Emotional Warmth", practices: [{ type: "Stillness", title: "Loving-Kindness Meditation" }] },
        { day: 4, title: "Phase 2: Cognitive Clearance", practices: [{ type: "Stillness", title: "Two-Minute Reset" }] },
        { day: 5, title: "Phase 3: Deep Regulation", practices: [{ type: "Stillness", title: "Resonant Breathing" }, { type: "Stillness", title: "Gentle Inner Voice" }] },
    ],
  },
  {
    id: "sleep-recovery",
    title: "Sleep Recovery Protocol",
    category: "Stillness",
    tagline: "Exhale the day.",
    description: "Improve night sleep quality with somatic + breath rituals.",
    steps: [
        { day: 1, title: "Phase 1: The Downshift", practices: [{ type: "Stillness", title: "4-7-8 Breath" }] },
        { day: 2, title: "Phase 2: Mental Release", practices: [{ type: "Stillness", title: "Nature Visualization" }] },
        { day: 3, title: "Phase 3: Total Surrender", practices: [{ type: "Stillness", title: "Resonant Breathing" }, { type: "Stillness", title: "Body Scan Meditation" }] },
    ],
  },

  // --- COMMUNICATION PLANS ---
  {
    id: "7-day-confident-speaker",
    title: "Confident Speaker Launch",
    category: "Communication",
    tagline: "Command the room.",
    description: "A structured daily path to improve your tone, resonance, and delivery.",
    steps: [
      { day: 1, title: "Phase 1: Power Source", practices: [{ type: "Communication", title: "Diaphragmatic Breathing for Voice" }] },
      { day: 2, title: "Phase 1: Resonance", practices: [{ type: "Communication", title: "Optimal Pitch Finding" }] },
      { day: 3, title: "Phase 2: Precision", practices: [{ type: "Communication", title: "Articulation Drill" }] },
      { day: 4, title: "Phase 2: The Pause", practices: [{ type: "Communication", title: "Strategic Pause Practice" }] },
      { day: 5, title: "Phase 3: Presence", practices: [{ type: "Communication", title: "Power Posing Before Speaking" }] },
    ]
  },

  // --- SPEED READING PLANS ---
  {
    id: "7-day-literacy-launch",
    title: "Literacy Velocity Launch",
    category: "Speed Reading",
    tagline: "Read faster, retain more.",
    description: "A fundamental sequence to break subvocalization and expand peripheral span.",
    steps: [
      { day: 1, title: "Phase 1: Suppression", practices: [{ type: "Speed Reading", title: "Pacer Drills" }] },
      { day: 2, title: "Phase 1: Expansion", practices: [{ type: "Speed Reading", title: "Peripheral Expansion" }] },
      { day: 3, title: "Phase 2: Chunking", practices: [{ type: "Speed Reading", title: "Chunk Training" }] },
      { day: 4, title: "Phase 2: Momentum", practices: [{ type: "Speed Reading", title: "Regression Eliminator" }] },
      { day: 5, title: "Phase 3: Flow", practices: [{ type: "Speed Reading", title: "Chunk Training" }] },
    ]
  }
];
