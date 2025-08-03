
export type MiniKit = {
    title: string;
    emoji: string;
    description: string;
    practices: { type: "Movement" | "Stillness"; title: string }[];
};

export const kits: MiniKit[] = [
  {
    title: "Emotional First Aid",
    emoji: "🌪️",
    description: "For when you’re overwhelmed, upset, or in a storm of feelings.",
    practices: [
      { type: "Stillness", title: "5-4-3-2-1 Grounding" },
      { type: "Movement", title: "Shakeout + Spinal Twist" },
      { type: "Stillness", title: "4-7-8 Breathing" },
      { type: "Stillness", title: "Self-Compassion Prompt" },
    ],
  },
  {
    title: "Morning Activation",
    emoji: "🌞",
    description: "Clear mental fog and wake up your body with intention.",
    practices: [
      { type: "Movement", title: "Full-Body Reach & Shoulder Rolls" },
      { type: "Movement", title: "Standing Core Taps" },
      { type: "Stillness", title: "Box Breathing" },
      { type: "Stillness", title: "3-Minute Visualization" },
    ],
  },
  {
    title: "Unfreeze Toolkit",
    emoji: "🧊",
    description: "For when you feel emotionally numb, disconnected, or dissociated.",
    practices: [
      { type: "Movement", title: "Cold Object Hold + Stomp" },
      { type: "Stillness", title: "Coherent Breathing" },
      { type: "Stillness", title: "Tactile Self-Check" },
      { type: "Movement", title: "Light Rocking or March-in-Place" },
    ],
  },
  {
    title: "Evening Soft Landing",
    emoji: "🌙",
    description: "Wind down your body and nervous system before bed.",
    practices: [
      { type: "Stillness", title: "Heart-Focused Breathing" },
      { type: "Movement", title: "Reclined Spinal Twist" },
      { type: "Stillness", title: "Gratitude Reflection" },
    ],
  },
  {
    title: "Calm & Clarity Reset",
    emoji: "🧘‍♀️",
    description: "A midday reset for focus and emotional regulation.",
    practices: [
      { type: "Movement", title: "Seated Neck Rolls" },
      { type: "Stillness", title: "Alternate Nostril Breathing" },
      { type: "Stillness", title: "“3 Things I Can Control” Prompt" },
    ],
  },
  {
    title: "Focus Reboot Pack",
    emoji: "🎯",
    description: "For midday distractions and mental fog.",
    practices: [
        { type: "Stillness", title: "2-Minute Breath Focus" },
        { type: "Movement", title: "Seated Core Twists" },
        { type: "Stillness", title: "'3 Wins' Prompt" },
    ],
  },
  {
    title: "Emotional Recovery Kit",
    emoji: "❤️‍🩹",
    description: "For after emotional conflict, grief, or burnout.",
    practices: [
        { type: "Stillness", title: "Loving-Kindness Meditation" },
        { type: "Movement", title: "Gentle Cat-Cow" },
        { type: "Stillness", title: "Self-Compassion Journal Prompt" },
    ],
  },
  {
    title: "Stress Shakeoff",
    emoji: "💥",
    description: "For when stress is peaking physically.",
    practices: [
        { type: "Movement", title: "Jumping Jacks or Shakeout" },
        { type: "Stillness", title: "Box Breathing" },
        { type: "Stillness", title: "'Drop Your Shoulders' Mind Cue" },
    ],
  },
  {
    title: "Creative Flow Primer",
    emoji: "🎨",
    description: "For before creative work or brainstorming.",
    practices: [
        { type: "Movement", title: "Breath-Squat Sync" },
        { type: "Stillness", title: "Alternate Nostril Breathing" },
        { type: "Stillness", title: "Visualization: 'Creative Doorway'" },
    ],
  },
  {
    title: "Boundaries Booster",
    emoji: "🧱",
    description: "For before difficult conversations or when feeling drained.",
    practices: [
        { type: "Movement", title: "Power Pose + Grounded Feet" },
        { type: "Stillness", title: "Breath-into-the-Belly Practice" },
        { type: "Stillness", title: "'What I Will & Won’t Accept' Prompt" },
    ],
  },
  {
    title: "Inner Calm SOS",
    emoji: "🕊️",
    description: "For acute anxiety or sensory overwhelm.",
    practices: [
        { type: "Stillness", title: "5-Second Gaze Fix (visual anchor)" },
        { type: "Stillness", title: "Coherent Breathing (6 sec in/out)" },
        { type: "Movement", title: "Gentle Self-Hold or Rocking" },
    ],
  },
  {
    title: "Self-Talk Reset",
    emoji: "💬",
    description: "For when you're stuck in a critical loop or inner judgment.",
    practices: [
        { type: "Stillness", title: "Heart-Focused Breath" },
        { type: "Stillness", title: "Mirror Mantra: 'I’m learning'" },
        { type: "Stillness", title: "Journaling: 'What would I say to a friend?'" },
    ],
  },
  {
    title: "Screen Fatigue Recovery",
    emoji: "📱",
    description: "For after long screen exposure or digital overload.",
    practices: [
        { type: "Movement", title: "Wrist Rolls + Palming Eyes" },
        { type: "Stillness", title: "Distance Gaze Reset (20-20-20 Rule)" },
        { type: "Stillness", title: "2-Minute Breath Check-In" },
    ],
  },
];
