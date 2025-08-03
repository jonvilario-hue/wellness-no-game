
export type PlanStep = {
  type: "Movement" | "Stillness";
  title: string;
  duration: string;
};

export type WellnessPlan = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  steps: PlanStep[];
};

export const wellnessPlans: WellnessPlan[] = [
  {
    id: "desk-detox",
    title: "Desk Detox",
    tagline: "Undo the desk. Recharge the brain.",
    description: "A quick, daily reset for desk-bound workers to release tension and restore focus.",
    steps: [
      { type: "Movement", title: "Seated Neck Rolls", duration: "1 min" },
      { type: "Movement", title: "Shoulder Shrugs + Wrist Rolls", duration: "2 min" },
      { type: "Stillness", title: "Box Breathing", duration: "1 min" },
      { type: "Stillness", title: "5-Second Posture Reset", duration: "30 sec" },
      { type: "Stillness", title: "Gratitude Prompt (journaling)", duration: "2 min" },
    ],
  },
  {
    id: "de-stress-in-5-days",
    title: "De-Stress in 5 Days",
    tagline: "Five days to feel again.",
    description: "A low-effort, high-impact week of short daily micro-practices to regulate stress and teach nervous system recovery.",
    steps: [
      { type: "Movement", title: "Spinal Twist (Day 1)", duration: "2 min" },
      { type: "Stillness", title: "5-4-3-2-1 Grounding (Day 1)", duration: "3 min" },
      { type: "Movement", title: "Standing Shoulder Rolls (Day 2)", duration: "1 min" },
      { type: "Stillness", title: "Coherent Breathing (Day 2)", duration: "4 min" },
      { type: "Movement", title: "Slow Standing March (Day 3)", duration: "2 min" },
      { type: "Stillness", title: "2-Minute Body Scan (Day 3)", duration: "2 min" },
      { type: "Movement", title: "Cat-Cow Stretch (Day 4)", duration: "2 min" },
      { type: "Stillness", title: "4-7-8 Breathing (Day 4)", duration: "3 min" },
      { type: "Movement", title: "Light Shakeout Flow (Day 5)", duration: "1 min" },
      { type: "Stillness", title: "Gratitude Visualization (Day 5)", duration: "4 min" },
    ],
  },
  {
    id: "sleep-support-kit",
    title: "Sleep Support Kit",
    tagline: "Exhale the day. Drift with intention.",
    description: "Help users wind down with body and breath, easing into parasympathetic mode before bed.",
    steps: [
      { type: "Movement", title: "Supine Hamstring Stretch", duration: "2 min" },
      { type: "Movement", title: "Reclining Spinal Twist", duration: "1 min" },
      { type: "Stillness", title: "Heart-Focused Breathing", duration: "2 min" },
      { type: "Stillness", title: "Self-Compassion Mantra", duration: "1 min" },
    ],
  },
  {
    id: "regulate-reclaim",
    title: "Regulate & Reclaim",
    tagline: "A 3-day emotional reset.",
    description: "Help users restore emotional equilibrium with structured practices.",
    steps: [
        { type: "Movement", title: "Chair Twist + Wrist Rolls (Day 1)", duration: "3 min" },
        { type: "Stillness", title: "5-4-3-2-1 Grounding (Day 1)", duration: "2 min" },
        { type: "Movement", title: "Shoulder Taps + Shakeout (Day 2)", duration: "2 min" },
        { type: "Stillness", title: "Box Breathing + Calm Mantra (Day 2)", duration: "3 min" },
        { type: "Movement", title: "Gentle March + Reach (Day 3)", duration: "2 min" },
        { type: "Stillness", title: "Gratitude Reflection (Day 3)", duration: "3 min" },
    ],
  },
  {
    id: "morning-momentum",
    title: "Morning Momentum Builder",
    tagline: "A 5-day plan to start with intention.",
    description: "Start days with intention, energy, and clarity.",
     steps: [
        { type: "Movement", title: "Shoulder Circles + Side Bend (Day 1)", duration: "2 min" },
        { type: "Stillness", title: "Deep Breath Check-In (Day 1)", duration: "1 min" },
        { type: "Movement", title: "March-in-Place (Day 2)", duration: "1 min" },
        { type: "Stillness", title: "Visualization Prompt (Day 2)", duration: "2 min" },
        { type: "Movement", title: "Light Jump or Squat Pulse (Day 3)", duration: "1 min" },
        { type: "Stillness", title: "Box Breathing (Day 3)", duration: "2 min" },
        { type: "Movement", title: "Standing Stretch (Day 4)", duration: "1 min" },
        { type: "Stillness", title: "'3 Wins' Reflection (Day 4)", duration: "3 min" },
        { type: "Movement", title: "Seated Mobility (Day 5)", duration: "2 min" },
        { type: "Stillness", title: "4-7-8 Breathing (Day 5)", duration: "2 min" },
    ],
  },
  {
    id: "sleep-recovery",
    title: "Sleep Recovery Protocol",
    tagline: "A 3-day wind-down flow.",
    description: "Improve night sleep quality with somatic + breath rituals.",
    steps: [
        { type: "Movement", title: "Supine Hip Circles (Day 1)", duration: "2 min" },
        { type: "Stillness", title: "Heart Coherence Breathing (Day 1)", duration: "3 min" },
        { type: "Movement", title: "Cat-Cow + Child’s Pose (Day 2)", duration: "3 min" },
        { type: "Stillness", title: "Gratitude Reflection (Day 2)", duration: "2 min" },
        { type: "Movement", title: "Reclining Twist (Day 3)", duration: "2 min" },
        { type: "Stillness", title: "Mantra: 'I Am Safe to Rest' (Day 3)", duration: "1 min" },
    ],
  },
];
