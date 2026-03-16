
import type { DrawingJourneyPlan } from '@/types/drawing';

export const drawingPlans: DrawingJourneyPlan[] = [
  {
    id: 'plan-seeing-reset',
    title: '14-Day Seeing Reset',
    tagline: 'Retrain your eyes to see the world as it is.',
    description: 'Based on the principles of "Drawing on the Right Side of the Brain," this program kills the habit of drawing mental symbols.',
    durationDays: 14,
    steps: [
      { day: 1, title: 'Upside-Down Drawing', discipline: 'Contour & Observation', drillId: 'contour-blind', estimatedMinutes: 15 },
      { day: 2, title: 'Blind Contour: The Hand', discipline: 'Contour & Observation', drillId: 'contour-blind', estimatedMinutes: 10 },
      { day: 3, title: 'Negative Space Basics', discipline: 'Composition & Thumbnails', drillId: 'contour-modified', estimatedMinutes: 15 }
    ]
  },
  {
    id: 'plan-line-confidence',
    title: '7-Day Line Confidence',
    tagline: 'Kill the "hairy" line and draw with authority.',
    description: 'A mechanical boot camp for your shoulder and arm to build professional mark-making skills.',
    durationDays: 7,
    steps: [
      { day: 1, title: 'The Shoulder Pivot', discipline: 'Line Control', drillId: 'line-ghosting', estimatedMinutes: 10 },
      { day: 2, title: 'Precision Ghosting', discipline: 'Line Control', drillId: 'line-ghosting', estimatedMinutes: 10 },
      { day: 3, title: 'Controlled Ellipses', discipline: 'Line Control', drillId: 'line-ellipses', estimatedMinutes: 15 }
    ]
  },
  {
    id: 'plan-figure-foundations',
    title: '21-Day Figure Fundamentals',
    tagline: 'Master the dynamic human form.',
    description: 'Progressive program from fast gestures to full anatomical construction.',
    durationDays: 21,
    steps: [
      { day: 1, title: 'Line of Action', discipline: 'Gesture & Movement', drillId: 'gesture-30s', estimatedMinutes: 15 },
      { day: 2, title: 'The Torso Bean', discipline: 'Gesture & Movement', drillId: 'gesture-2m', estimatedMinutes: 15 },
      { day: 3, title: 'Proportion Landmarks', discipline: 'Proportion & Measurement', drillId: 'gesture-2m', estimatedMinutes: 20 }
    ]
  }
];
