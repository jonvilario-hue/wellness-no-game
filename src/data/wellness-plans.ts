
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
];
