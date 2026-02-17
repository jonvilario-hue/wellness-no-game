import type { WellnessPlan } from './wellness-plans';

export const communicationPlans: WellnessPlan[] = [
  {
    id: "7-day-confident-speaker",
    title: "7-Day Confident Speaker",
    tagline: "Build vocal presence and clarity in one week.",
    description: "A structured daily path to improve your tone, resonance, and delivery speed.",
    steps: [
      { day: 1, title: "Foundation: Your Breath", practices: [{ type: "Movement", title: "Diaphragmatic Breathing" }] },
      { day: 2, title: "Find Your Voice", practices: [{ type: "Movement", title: "Optimal Pitch Finding" }] },
      { day: 3, title: "Sharpen Your Words", practices: [{ type: "Movement", title: "Articulation Drill" }] },
      { day: 4, title: "Control Your Pace", practices: [{ type: "Movement", title: "Rate Variation Exercise" }] },
      { day: 5, title: "Power of Silence", practices: [{ type: "Movement", title: "Strategic Pause Practice" }] },
      { day: 6, title: "Putting It Together", practices: [{ type: "Movement", title: "Quick Confidence Boost" }] },
      { day: 7, title: "Full Rehearsal", practices: [{ type: "Movement", title: "Presentation Ready" }] },
    ]
  },
  {
    id: "14-day-active-listening",
    title: "14-Day Active Listening Reset",
    tagline: "Transform how you listen and connect.",
    description: "Move from waiting-to-speak to truly understanding the depth of others' messages.",
    steps: [
      { day: 1, title: "Show You're Present", practices: [{ type: "Movement", title: "Minimal Encouragers Drill" }] },
      { day: 2, title: "The 3-Second Rule", practices: [{ type: "Movement", title: "Interruption Awareness" }] },
      { day: 3, title: "Mirror Their Words", practices: [{ type: "Movement", title: "Paraphrasing Practice" }] },
      { day: 4, title: "Mirror Their Feelings", practices: [{ type: "Movement", title: "Reflective Listening Exercise" }] },
      { day: 5, title: "Go Deeper", practices: [{ type: "Movement", title: "Clarifying Questions Practice" }] },
      { day: 6, title: "Tie It Together", practices: [{ type: "Movement", title: "Summarizing Exercise" }] },
      { day: 7, title: "Full Listening Flow", practices: [{ type: "Movement", title: "Better Listener" }] },
      { day: 8, title: "Name What You Hear", practices: [{ type: "Movement", title: "Emotion Labeling Exercise" }] },
      { day: 9, title: "Resist the Fix", practices: [{ type: "Movement", title: "Validation Before Advice" }] },
      { day: 10, title: "See Their Side", practices: [{ type: "Movement", title: "Perspective-Taking Drill" }] },
      { day: 11, title: "Listen With Your Body", practices: [{ type: "Movement", title: "Open Body Posture Check" }] },
      { day: 12, title: "Connect Without Words", practices: [{ type: "Movement", title: "Eye Contact Calibration" }] },
      { day: 13, title: "Stay Engaged", practices: [{ type: "Movement", title: "Note-Taking with Eye Contact" }] },
      { day: 14, title: "The Complete Listener", practices: [{ type: "Movement", title: "Better Listener" }] },
    ]
  }
];
