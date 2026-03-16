
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
      'Speed does not matter. The connection between your eye and hand is the only goal.'
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

  // --- Proportion ---
  {
    id: 'prop-sight-sizing',
    name: 'Sight-Sizing Basics',
    discipline: 'Proportion',
    description: 'Compare relative sizes using a pencil at arm\'s length.',
    brief: [
      'Hold your pencil at arm’s length with your elbow locked.',
      'Use the tip of the pencil and your thumb to measure the height of the largest object.',
      'Compare this measurement to other objects in the reference.',
      'Mark these relative proportions on your paper before drawing any outlines.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 600
  },
  {
    id: 'prop-landmark-mapping',
    name: 'Landmark Mapping',
    discipline: 'Proportion',
    description: 'Identify and mark key midpoints and alignment lines.',
    brief: [
      'Identify the vertical and horizontal midpoints of the figure.',
      'Mark the alignment of major landmarks (shoulders, hips, knees).',
      'Check the width-to-height ratio of the overall pose.',
      'Draw a simplified "skeleton" using these landmarks as your guide.'
    ],
    referenceCategory: 'Figure',
    displayMode: 'Static',
    defaultTimerSeconds: 900
  },

  // --- Perspective ---
  {
    id: 'persp-one-point',
    name: 'One-Point Grid',
    discipline: 'Perspective',
    description: 'Construct a hallway or road using convergence lines.',
    brief: [
      'Draw a horizontal line across the center of your paper (Horizon Line).',
      'Place a single dot on that line (Vanishing Point).',
      'Draw 4-6 lines radiating out from that point to the edges of the paper.',
      'Construct a hallway or road using these lines as your floor and ceiling boundaries.'
    ],
    referenceCategory: 'Environment',
    displayMode: 'Static',
    defaultTimerSeconds: 600
  },
  {
    id: 'persp-two-point',
    name: 'Two-Point Room Sketch',
    discipline: 'Perspective',
    description: 'Construct a corner using two vanishing points.',
    brief: [
      'Place two vanishing points at opposite ends of your horizon line.',
      'Draw a vertical line to represent the closest corner of a building or room.',
      'Connect the top and bottom of that line to both vanishing points.',
      'Construct additional vertical lines to define the side planes of the structure.'
    ],
    referenceCategory: 'Environment',
    displayMode: 'Static',
    defaultTimerSeconds: 900
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
  },
  {
    id: 'value-five-step',
    name: 'Five-Value Scale Study',
    discipline: 'Value',
    description: 'Render form using a discrete 5-step scale.',
    brief: [
      'Draw 5 adjacent boxes and fill them from White (1) to Black (5).',
      'Pick a reference of a simple round object (sphere or egg).',
      'Map the light and shadow using ONLY those 5 discrete values.',
      'Do not blend the edges; focus on identifying the shape of each value zone.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 720
  },

  // --- Form ---
  {
    id: 'form-draw-through',
    name: 'Draw-Through Boxes',
    discipline: 'Form',
    description: 'Draw transparent 3D boxes from various angles.',
    brief: [
      'Draw a standard 3D box in perspective.',
      'Lightly draw the "hidden" edges that would be visible if the box were made of glass.',
      'Focus on ensuring the back corners align correctly with your vanishing points.',
      'Repeat from at least 5 different viewing angles.'
    ],
    referenceCategory: 'Abstract',
    displayMode: 'Static',
    defaultTimerSeconds: 600
  },
  {
    id: 'form-cylinder',
    name: 'Cylinder Construction',
    discipline: 'Form',
    description: 'Construct cylinders using ellipses and contours.',
    brief: [
      'Draw a central axis line for the cylinder.',
      'Construct a full ellipse at one end, ensuring it is perpendicular to the axis.',
      'Draw a second, matching ellipse at the other end of the axis.',
      'Connect the edges of the ellipses with clean contour lines to define the volume.'
    ],
    referenceCategory: 'Abstract',
    displayMode: 'Static',
    defaultTimerSeconds: 720
  },

  // --- Composition ---
  {
    id: 'comp-thumbnail-value',
    name: 'Thumbnail Value Sketch',
    discipline: 'Composition',
    description: 'Explore visual weight with small value-shape frames.',
    brief: [
      'Draw three small 2x3 inch rectangles on your paper.',
      'In each frame, arrange 3 simple shapes (circles or blocks).',
      'Assign each shape a value: Black, Gray, or White.',
      'Compare the "visual weight" of each arrangement to see which feels most balanced.'
    ],
    referenceCategory: 'Abstract',
    displayMode: 'Static',
    defaultTimerSeconds: 480
  },
  {
    id: 'comp-focal-point',
    name: 'Focal Point Placement',
    discipline: 'Composition',
    description: 'Control eye movement using the rule of thirds.',
    brief: [
      'Draw a "Rule of Thirds" grid (two vertical and two horizontal lines).',
      'Sketch a simple scene three times.',
      'Place the main subject at a different intersection point in each sketch.',
      'Notice how the story of the image changes based on the focal point’s position.'
    ],
    referenceCategory: 'Environment',
    displayMode: 'Static',
    defaultTimerSeconds: 600
  }
];
