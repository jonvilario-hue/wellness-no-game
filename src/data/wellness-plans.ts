
export type PlanStep = {
  type: "Movement" | "Stillness";
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
  steps: DailyStep[];
};

export const wellnessPlans: WellnessPlan[] = [
  {
    id: "desk-detox",
    title: "Desk Detox",
    tagline: "Undo the desk. Recharge the brain.",
    description: "A quick, daily reset for desk-bound workers to release tension and restore focus.",
    steps: [
        { day: 1, title: "Reset your spine", practices: [{ type: "Movement", title: "Thoracic Spine Rotations" }, { type: "Movement", title: "Wall Push-Ups" }] },
        { day: 2, title: "Break neck & shoulder tension", practices: [{ type: "Movement", title: "Neck & Shoulder Release" }, { type: "Stillness", title: "Box Breathing" }] },
        { day: 3, title: "Awaken your core", practices: [{ type: "Movement", title: "Core Awakening" }, { type: "Stillness", title: "Two-Minute Reset" }] },
        { day: 4, title: "Reconnect to presence", practices: [{ type: "Stillness", title: "5-4-3-2-1 Senses" }, { type: "Stillness", title: "Screen Fatigue Recovery (Mini)" }] },
        { day: 5, title: "Full body boost", practices: [{ type: "Movement", title: "Morning Mobility Flow" }, { type: "Stillness", title: "Name 3 Wins" }] },
    ],
  },
  {
    id: "de-stress-in-5-days",
    title: "De-Stress in 5 Days",
    tagline: "Five days to feel again.",
    description: "A low-effort, high-impact week of short daily micro-practices to regulate stress and teach nervous system recovery.",
    steps: [
        { day: 1, title: "Anchor into calm", practices: [{ type: "Stillness", title: "Box Breathing" }, { type: "Stillness", title: "Tactile Object Focus" }] },
        { day: 2, title: "Clear emotional static", practices: [{ type: "Movement", title: "Breath & Squat Pulses" }, { type: "Stillness", title: "“What do I need?” Prompt" }] },
        { day: 3, title: "Practice emotional warmth", practices: [{ type: "Stillness", title: "Loving-Kindness Meditation" }, { type: "Stillness", title: "Name 3 Wins" }] },
        { day: 4, title: "Reconnect with your body", practices: [{ type: "Movement", title: "Hip Openers" }, { type: "Stillness", title: "Nature Visualization" }] },
        { day: 5, title: "Build sustainable regulation", practices: [{ type: "Stillness", title: "Resonant Breathing" }, { type: "Stillness", title: "Gentle Inner Voice" }] },
    ],
  },
  {
    id: "sleep-support-kit",
    title: "Sleep Support Plan",
    tagline: "Exhale the day. Drift with intention.",
    description: "Help users wind down with body and breath, easing into parasympathetic mode before bed.",
    steps: [
        { day: 1, title: "Downshift", practices: [{ type: "Movement", title: "Pre-Bedtime Stretch" }, { type: "Stillness", title: "4-7-8 Breath" }] },
        { day: 2, title: "Relax the nervous system", practices: [{ type: "Stillness", title: "Resonant Breathing" }, { type: "Stillness", title: "Nature Visualization" }] },
        { day: 3, title: "Replace racing thoughts", practices: [{ type: "Stillness", title: "“What do I need?” Prompt" }, { type: "Stillness", title: "Gentle Inner Voice" }] },
        { day: 4, title: "Anchor into safety", practices: [{ type: "Stillness", title: "Tactile Object Focus" }, { type: "Stillness", title: "Loving-Kindness Meditation" }] },
        { day: 5, title: "Create a nightly flow", practices: [{ type: "Stillness", title: "Combine 2 favorite sleep practices" }] },
    ],
  },
  {
    id: "regulate-reclaim",
    title: "Regulate & Reclaim (3-Day Reset)",
    tagline: "A 3-day emotional reset.",
    description: "Help users restore emotional equilibrium after chaos or dysregulation.",
    steps: [
        { day: 1, title: "Rebuild safety", practices: [{ type: "Stillness", title: "5-4-3-2-1 Senses" }, { type: "Stillness", title: "Box Breathing" }] },
        { day: 2, title: "Create emotional room", practices: [{ type: "Stillness", title: "“What do I need?” Prompt" }, { type: "Stillness", title: "Two-Minute Reset" }] },
        { day: 3, title: "Move forward", practices: [{ type: "Stillness", title: "Gentle Inner Voice" }, { type: "Stillness", title: "Name 3 Wins" }] },
    ],
  },
  {
    id: "morning-momentum",
    title: "Morning Momentum Builder (5-Day)",
    tagline: "A 5-day plan to start with intention.",
    description: "Start days with intention, energy, and clarity.",
     steps: [
        { day: 1, title: "Spark movement", practices: [{ type: "Movement", title: "1-Minute High Knees" }, { type: "Stillness", title: "Focus Visualization" }] },
        { day: 2, title: "Clean start", practices: [{ type: "Movement", title: "Breath & Squat Pulses" }, { type: "Stillness", title: "Name 3 Wins" }] },
        { day: 3, title: "Stability + Direction", practices: [{ type: "Movement", title: "Core Awakening" }, { type: "Stillness", title: "“What do I need?” Prompt" }] },
        { day: 4, title: "Strengthen self-trust", practices: [{ type: "Stillness", title: "Focus Visualization" }, { type: "Stillness", title: "Gentle Inner Voice" }] },
        { day: 5, title: "Lock it in", practices: [{ type: "Stillness", title: "Do your favorite two practices" }, { type: "Stillness", title: "Write 1 sentence intention" }] },
    ],
  },
  {
    id: "sleep-recovery",
    title: "Sleep Recovery Protocol (3-Day)",
    tagline: "A 3-day wind-down flow.",
    description: "Improve night sleep quality with somatic + breath rituals.",
    steps: [
        { day: 1, title: "Reset nervous system", practices: [{ type: "Stillness", title: "Resonant Breathing" }, { type: "Movement", title: "Neck & Shoulder Release" }] },
        { day: 2, title: "Slow the brain", practices: [{ type: "Stillness", title: "Two-Minute Reset" }, { type: "Stillness", title: "Nature Visualization" }] },
        { day: 3, title: "Prepare to rest deeply", practices: [{ type: "Movement", title: "Pre-Bedtime Stretch" }, { type: "Stillness", title: "Loving-Kindness Meditation" }] },
    ],
  },
];
