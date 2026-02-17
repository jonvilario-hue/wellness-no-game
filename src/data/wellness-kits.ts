
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
    id: "kit-body-jumpstart",
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
