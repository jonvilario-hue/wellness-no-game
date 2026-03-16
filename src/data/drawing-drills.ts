
import type { DrawingDrill } from '@/types/drawing';

export const drawingDrills: DrawingDrill[] = [
  // --- Line Control ---
  {
    id: 'line-ghosting',
    name: 'Ghosting Lines',
    discipline: 'Line Control',
    description: 'Build confidence and accuracy in your straight marks.',
    brief: [
      'Place two dots on your paper about 4-6 inches apart.',
      'Ghost the stroke (move your arm without touching the paper) between the dots 3 times.',
      'Commit to the line in one single, confident stroke.',
      'Connect 20 pairs of dots using your shoulder, not your wrist.'
    ],
    referenceCategory: 'Abstract',
    displayMode: 'Static'
  },
  {
    id: 'line-ellipses',
    name: 'Funnelling Ellipses',
    discipline: 'Line Control',
    description: 'Control circles and ellipses in spatial perspective.',
    brief: [
      'Draw a long horizontal line.',
      'Draw a series of ellipses that fit exactly inside a tapering funnel shape.',
      'Focus on keeping the ellipses symmetrical and the edges clean.',
      'Repeat 5 times with different funnel widths.'
    ],
    referenceCategory: 'Abstract',
    displayMode: 'Static'
  },

  // --- Gesture ---
  {
    id: 'gesture-30s',
    name: '30s Gesture',
    discipline: 'Gesture',
    description: 'Capture essential energy and the "line of action."',
    brief: [
      'Identify the longest curved line from the head to the feet.',
      'Do not draw outlines. Draw the movement.',
      'Use fast, sweeping strokes.',
      'Ignore all details like fingers, faces, or muscle definitions.'
    ],
    referenceCategory: 'Figure',
    displayMode: 'Static',
    defaultTimerSeconds: 30
  },
  {
    id: 'gesture-2m',
    name: '2m Construction',
    discipline: 'Gesture',
    description: 'Move from energy to basic anatomical masses.',
    brief: [
      'First 30s: Line of action.',
      'Next 60s: Add basic boxes for torso and hips.',
      'Final 30s: Connect limbs with simple lines.',
      'Balance the weight over the center of gravity.'
    ],
    referenceCategory: 'Figure',
    displayMode: 'Static',
    defaultTimerSeconds: 120
  },

  // --- Observation ---
  {
    id: 'contour-blind',
    name: 'Blind Contour',
    discipline: 'Observation',
    description: 'Synchronize your eye and hand without the filter of symbols.',
    brief: [
      'DO NOT LOOK AT YOUR PAPER. Not even once.',
      'Fix your eyes on one edge of the reference.',
      'Move your hand at the exact same speed as your eye follows the edge.',
      'Focus on every tiny bump and change in direction.',
      'Speed does not matter. The connection matters.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static'
  },
  {
    id: 'contour-modified',
    name: 'Modified Contour',
    discipline: 'Observation',
    description: 'Balance intense observation with occasional spatial checks.',
    brief: [
      'Spend 90% of the time looking at the reference.',
      'Spend 10% checking your paper only for placement.',
      'Use slow, continuous lines.',
      'Imagine your pencil is actually touching the surface of the object.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static'
  },

  // --- Value ---
  {
    id: 'value-mapping',
    name: 'Shadow Mapping',
    discipline: 'Value',
    description: 'Simplify complex lighting into light and dark shapes.',
    brief: [
      'Squint at the reference until details disappear.',
      'Identify the boundary between light and shadow (the Terminator).',
      'Outline the shadow shapes only.',
      'Fill in all shadow shapes with a flat, mid-gray value.',
      'Leave everything else white.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static'
  }
];
