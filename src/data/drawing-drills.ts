import type { DrawingDrill } from '@/types/drawing';

export const drawingDrills: DrawingDrill[] = [
  // --- Supplemental Group 1: Seeing & Motion ---
  {
    id: 'gesture-30s',
    name: '30s Gesture',
    discipline: 'Gesture',
    originTag: 'Gesture',
    useCaseTag: 'Warm-Up',
    inputTag: 'Timed',
    difficulty: 'Foundation',
    description: 'Capture essential energy and the "line of action."',
    brief: [
      'Identify the longest curved line from the head to the feet.',
      'Do not draw outlines. Draw the movement.',
      'Use fast, sweeping strokes.',
      'Ignore all details like fingers, faces, or muscle definitions.'
    ],
    referenceCategory: 'Figure',
    displayMode: 'Static',
    defaultTimerSeconds: 60
  },
  {
    id: 'gesture-2m',
    name: '2m Construction',
    discipline: 'Gesture',
    originTag: 'Gesture',
    useCaseTag: 'Warm-Up',
    inputTag: 'Timed',
    difficulty: 'Foundation',
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
  {
    id: 'line-ghosting-supp',
    name: 'Ghosting Lines',
    discipline: 'Line Control',
    originTag: 'Line Control',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
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
    id: 'line-ellipses-supp',
    name: 'Funnelling Ellipses',
    discipline: 'Line Control',
    originTag: 'Line Control',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
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
  {
    id: 'contour-blind',
    name: 'Blind Contour',
    discipline: 'Observation',
    originTag: 'Observation',
    useCaseTag: 'Session Drill',
    inputTag: 'Timed',
    difficulty: 'Developing',
    description: 'Synchronize your eye and hand without the filter of symbols.',
    brief: [
      'DO NOT LOOK AT YOUR PAPER. Not even once.',
      'Fix your eyes on one edge of the reference.',
      'Move your hand at the exact same speed as your eye follows the edge.',
      'Focus on every tiny bump and change in direction.',
      'Speed does not matter. The connection between your eye and hand is the only goal.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 600
  },
  {
    id: 'contour-modified',
    name: 'Modified Contour',
    discipline: 'Observation',
    originTag: 'Observation',
    useCaseTag: 'Session Drill',
    inputTag: 'Timed',
    difficulty: 'Developing',
    description: 'Balance intense observation with occasional spatial checks.',
    brief: [
      'Spend 90% of the time looking at the reference.',
      'Spend 10% checking your paper only for placement.',
      'Use slow, continuous lines.',
      'Imagine your pencil is actually touching the surface of the object.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 600
  },

  // --- Supplemental Group 2: Construction & Space ---
  {
    id: 'prop-sight-sizing',
    name: 'Sight-Sizing Basics',
    discipline: 'Proportion',
    originTag: 'Proportion',
    useCaseTag: 'Session Drill',
    inputTag: 'Reference Needed',
    difficulty: 'Foundation',
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
    originTag: 'Proportion',
    useCaseTag: 'Session Drill',
    inputTag: 'Reference Needed',
    difficulty: 'Foundation',
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
  {
    id: 'persp-one-point',
    name: 'One-Point Grid',
    discipline: 'Perspective',
    originTag: 'Perspective',
    useCaseTag: 'Session Drill',
    inputTag: 'Static',
    difficulty: 'Foundation',
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
    originTag: 'Perspective',
    useCaseTag: 'Session Drill',
    inputTag: 'Static',
    difficulty: 'Developing',
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
  {
    id: 'form-draw-through-supp',
    name: 'Draw-Through Boxes',
    discipline: 'Form',
    originTag: 'Form',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
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
    id: 'form-cylinder-supp',
    name: 'Cylinder Construction',
    discipline: 'Form',
    originTag: 'Form',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
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

  // --- Supplemental Group 3: Rendering & Design ---
  {
    id: 'value-mapping',
    name: 'Shadow Mapping',
    discipline: 'Value',
    originTag: 'Value',
    useCaseTag: 'Session Drill',
    inputTag: 'Reference Needed',
    difficulty: 'Foundation',
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
    originTag: 'Value',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
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
  {
    id: 'comp-thumbnail-value',
    name: 'Thumbnail Value Sketch',
    discipline: 'Composition',
    originTag: 'Composition',
    useCaseTag: 'Session Drill',
    inputTag: 'Static',
    difficulty: 'Developing',
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
    originTag: 'Composition',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
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
  },

  // --- DRAWABOX PROTOCOLS ---
  // LINES
  {
    id: 'db-superimposed-lines',
    name: 'Superimposed Lines',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Lines',
    isWarmup: true,
    description: 'Draw over the same line repeatedly to build arm confidence.',
    brief: ['Ghost the movement 3 times.', 'Draw a single confident stroke.', 'Repeat on top 8 times.']
  },
  {
    id: 'db-ghosted-lines',
    name: 'Ghosted Lines',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Lines',
    isWarmup: true,
    description: 'Ghost the motion before committing to each line.',
    brief: ['Plot two dots.', 'Ghost the line between them.', 'Commit in one stroke.']
  },
  {
    id: 'db-ghosted-planes',
    name: 'Ghosted Planes',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Lines',
    isWarmup: true,
    description: 'Connect ghosted lines into flat quadrilaterals.',
    brief: ['Plot four points.', 'Connect using ghosted lines.', 'Check for straightness.']
  },
  // ELLIPSES
  {
    id: 'db-tables-ellipses',
    name: 'Tables of Ellipses',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Ellipses',
    isWarmup: true,
    description: 'Fill framed rows with ellipses drawn from the shoulder.',
    brief: ['Draw a box frame.', 'Fill with tightly packed ellipses.', 'Draw through each twice.']
  },
  {
    id: 'db-ellipses-planes',
    name: 'Ellipses in Planes',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Ellipses',
    isWarmup: true,
    description: 'Fit ellipses inside ghosted planes.',
    brief: ['Draw a ghosted plane.', 'Fit an ellipse inside, touching all sides.', 'Draw through twice.']
  },
  {
    id: 'db-funnels',
    name: 'Funnels',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Ellipses',
    isWarmup: true,
    description: 'Nest ellipses inside funnels aligned to a minor axis.',
    brief: ['Draw a funnel shape.', 'Add a central minor axis.', 'Bisect ellipses perfectly.']
  },
  // BOXES
  {
    id: 'db-plotted-persp',
    name: 'Plotted Perspective',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Boxes',
    description: 'Construct boxes with a ruler and vanishing points.',
    brief: ['Plot two vanishing points.', 'Use a ruler for all lines.', 'Build perfect boxes.']
  },
  {
    id: 'db-rough-persp',
    name: 'Rough Perspective',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Session Drill',
    inputTag: 'Static',
    difficulty: 'Developing',
    dbGroup: 'Boxes',
    isWarmup: true,
    description: 'Freehand boxes converging to a single vanishing point.',
    brief: ['One VP on the horizon.', 'Freehand boxes.', 'Extend lines to check errors.']
  },
  {
    id: 'db-rotated-boxes',
    name: 'Rotated Boxes',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    dbGroup: 'Boxes',
    description: 'Draw a grid of boxes rotating in 3D using neighbor edges.',
    brief: ['Start with center box.', 'Rotate neighbors slightly.', 'Use adjacent vertices.']
  },
  {
    id: 'db-organic-persp',
    name: 'Organic Perspective',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    dbGroup: 'Boxes',
    description: 'Scatter boxes in space to imply depth without VP on page.',
    brief: ['Vary box size.', 'Overlap for depth.', 'Implied convergence.']
  },
  // CONTOUR & FORM
  {
    id: 'db-organic-contour-lines',
    name: 'Organic Forms — Contour Lines',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Contour & Form',
    description: 'Wrap ellipses around sausage forms to show volume.',
    brief: ['Draw a sausage form.', 'Add wrapping ellipses.', 'Mind the degree change.']
  },
  {
    id: 'db-organic-contour-curves',
    name: 'Organic Forms — Contour Curves',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Contour & Form',
    description: 'Same forms with partial contour curves instead.',
    brief: ['Draw a sausage form.', 'Add contour hooks.', 'Hook over the edge.']
  },
  {
    id: 'db-form-intersections',
    name: 'Form Intersections',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    dbGroup: 'Contour & Form',
    description: 'Draw clustered primitives occupying the same space.',
    brief: ['Draw 10+ primitives.', 'Show intersections.', 'Maintain consistent scale.']
  },
  {
    id: 'db-organic-intersections',
    name: 'Organic Intersections',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    dbGroup: 'Contour & Form',
    description: 'Pile sausage forms with gravity and cast shadow.',
    brief: ['Pile sausages.', 'Show weight.', 'Add cast shadows between forms.']
  },
  // TEXTURE
  {
    id: 'db-texture-analysis',
    name: 'Texture Analysis',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Developing',
    dbGroup: 'Texture',
    description: 'Observe reference and draw cast shadow shapes only.',
    brief: ['Observe small area.', 'Find shadow shapes.', 'Don\'t draw lines.']
  },
  {
    id: 'db-dissections',
    name: 'Dissections',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Developing',
    dbGroup: 'Texture',
    description: 'Apply observed textures to surfaces of organic forms.',
    brief: ['Draw a sausage.', 'Apply high-detail texture.', 'Warp texture to surface.']
  },
  // CONSTRUCTION
  {
    id: 'db-arrows',
    name: 'Arrows in Space',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
    dbGroup: 'Construction',
    description: 'Draw ribboning arrows to practice flow and compression.',
    brief: ['Flowing lines.', 'Add thickness.', 'Scale for depth.']
  },
  {
    id: 'db-leaves',
    name: 'Leaves',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Developing',
    dbGroup: 'Construction',
    description: 'Construct flat and bending leaf forms from flow lines.',
    brief: ['Flow line first.', 'Outer edges next.', 'Add detail last.']
  },
  {
    id: 'db-branches',
    name: 'Branches',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Developing',
    dbGroup: 'Construction',
    description: 'Build branches using overlapping cylinder segments.',
    brief: ['Chain cylinders.', 'Overlap joints.', 'Maintain center axis.']
  },
  {
    id: 'db-plants',
    name: 'Plant Constructions',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Developing',
    dbGroup: 'Construction',
    description: 'Full plant drawings built from construction with reference.',
    brief: ['Find a plant.', 'Simplify to forms.', 'Build complexity.']
  },
  {
    id: 'db-insects',
    name: 'Insect Constructions',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Developing',
    dbGroup: 'Construction',
    description: 'Build insects from sausage forms at joints. Use reference.',
    brief: ['Massive forms first.', 'Construct legs.', 'Joint logic.']
  },
  {
    id: 'db-animals',
    name: 'Animal Constructions',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Advanced',
    dbGroup: 'Construction',
    description: 'Build animals using sausage legs and organic masses.',
    brief: ['Ribcage & Pelvis.', 'Sausage legs.', 'Head construction.']
  },
  {
    id: 'db-objects',
    name: 'Object Constructions',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Advanced',
    dbGroup: 'Construction',
    description: 'Build everyday objects by subdividing boxes. Use reference.',
    brief: ['Box scaffolding.', 'Subdivide.', 'Curves from straight lines.']
  },
  {
    id: 'db-vehicles',
    name: 'Vehicle Constructions',
    discipline: 'Drawabox',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Reference Needed',
    difficulty: 'Advanced',
    dbGroup: 'Construction',
    description: 'Construct vehicles from subdivided boxes and grids.',
    brief: ['Perspective grid.', 'Wheel construction.', 'Compound forms.']
  }
];
