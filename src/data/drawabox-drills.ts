import { DrawingDrill } from '@/types/drawing';

export const drawaboxDrills: DrawingDrill[] = [
  // --- Lesson 1: Lines, Ellipses, Boxes ---
  {
    id: 'db-l1-superimposed-lines',
    name: 'Superimposed Lines',
    discipline: 'Line Control',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Draw over the same line repeatedly to build confidence.',
    brief: [
      'Place your pen at the start of a line and ghost the motion.',
      'Execute a single, confident stroke.',
      'Superimpose 8 more lines on top of the first.',
      'Focus on keeping the starting points perfectly aligned; let the ends fray.',
      'Draw from your shoulder, not your wrist.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 480,
    lesson: 1,
    isWarmup: true
  },
  {
    id: 'db-l1-ghosted-lines',
    name: 'Ghosted Lines',
    discipline: 'Line Control',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Plan each line by ghosting the motion before committing.',
    brief: [
      'Place two dots on the paper.',
      'Ghost the motion between the dots several times to find the angle.',
      'Commit to the line in one clean stroke.',
      'Do not worry about missing the second dot; prioritize a straight, confident line.',
      'Repeat until you have filled a page.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 600,
    lesson: 1,
    isWarmup: true
  },
  {
    id: 'db-l1-ghosted-planes',
    name: 'Ghosted Planes',
    discipline: 'Line Control',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Connect ghosted lines into flat quadrilaterals.',
    brief: [
      'Plot four dots to define a quadrilateral.',
      'Connect them using ghosted lines.',
      'Find the center of the plane by connecting diagonals.',
      'Draw vertical and horizontal axes through the center.',
      'Focus on the planning phase (ghosting) before each stroke.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 600,
    lesson: 1,
    isWarmup: true
  },
  {
    id: 'db-l1-tables-ellipses',
    name: 'Tables of Ellipses',
    discipline: 'Line Control',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Fill frames with ellipses drawn from the shoulder.',
    brief: [
      'Draw several rectangular frames on your page.',
      'Fill each frame with rows of ellipses.',
      'Ensure each ellipse touches its neighbors and the frame edges.',
      'Draw through every ellipse twice (two full rotations) to build confidence.',
      'Maintain a consistent angle within each frame.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 600,
    lesson: 1,
    isWarmup: true
  },
  {
    id: 'db-l1-ellipses-planes',
    name: 'Ellipses in Planes',
    discipline: 'Line Control',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Fit ellipses inside ghosted planes.',
    brief: [
      'Draw a page of ghosted planes.',
      'Fit an ellipse inside each plane, touching all four edges.',
      'Draw through the ellipse twice.',
      'Focus on the deformation of the circle as it fits the perspective of the plane.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 600,
    lesson: 1,
    isWarmup: true
  },
  {
    id: 'db-l1-funnels',
    name: 'Funnels',
    discipline: 'Line Control',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Draw ellipses nested inside funnel shapes.',
    brief: [
      'Draw a funnel shape consisting of two arcs and a central minor axis line.',
      'Fill the funnel with ellipses.',
      'Each ellipse must be bisected by the minor axis into two identical halves.',
      'Each ellipse must touch the outer arcs of the funnel.',
      'Draw through each ellipse twice.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 600,
    lesson: 1,
    isWarmup: true
  },
  {
    id: 'db-l1-plotted-perspective',
    name: 'Plotted Perspective',
    discipline: 'Perspective',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Construct boxes using vanishing points and a ruler.',
    brief: [
      'Draw a horizon line and two vanishing points.',
      'Use a ruler to construct 3D boxes.',
      'Ensure all depth lines converge exactly at the vanishing points.',
      'This drill establishes the mathematical reality of 3D space.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 720,
    lesson: 1
  },
  {
    id: 'db-l1-rough-perspective',
    name: 'Rough Perspective',
    discipline: 'Perspective',
    originTag: 'Drawabox',
    useCaseTag: 'Warm-Up',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Freehand boxes converging to a single vanishing point.',
    brief: [
      'Draw a horizon line and a single central vanishing point.',
      'Freehand several boxes.',
      'After finishing a box, use a colored pen to extend its depth lines back to the horizon.',
      'Identify where your perspective failed and adjust your next box accordingly.',
      'Prioritize confident, straight lines over perfect convergence.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 900,
    lesson: 1,
    isWarmup: true
  },
  {
    id: 'db-l1-rotated-boxes',
    name: 'Rotated Boxes',
    discipline: 'Perspective',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Draw a grid of boxes that rotate in 3D space.',
    brief: [
      'Start with a central box.',
      'Construct neighboring boxes that share vertices but rotate slightly.',
      'Use the existing edges of previous boxes as guides for the next.',
      'The goal is to create a sphere-like mass of rotating cubes.',
      'This is an advanced exercise in spatial reasoning.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 2700,
    lesson: 1
  },
  {
    id: 'db-l1-organic-perspective',
    name: 'Organic Perspective',
    discipline: 'Perspective',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Scatter boxes in space to imply depth.',
    brief: [
      'Draw a 3D frame.',
      'Draw boxes of varying sizes floating within the frame.',
      'Larger boxes appear closer; smaller boxes appear farther away.',
      'Focus on the relative scale and overlapping to create a sense of depth.',
      'Do not use vanishing points on the page.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 900,
    lesson: 1
  },

  // --- Lesson 2: Contour, Texture, Construction ---
  {
    id: 'db-l2-organic-contour-lines',
    name: 'Organic Forms with Contour Lines',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Wrap ellipses around sausage-like forms.',
    brief: [
      'Draw simple "sausage" forms (cylinders with rounded ends).',
      'Draw ellipses wrapping around the forms at intervals.',
      'Ensure the ellipses define the volume and orientation of the sausage.',
      'The degree of the ellipse should change as the form turns away from the viewer.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 600,
    lesson: 2
  },
  {
    id: 'db-l2-organic-contour-curves',
    name: 'Organic Forms with Contour Curves',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Use contour curves instead of full ellipses.',
    brief: [
      'Draw sausage forms.',
      'Instead of full ellipses, draw partial curves that hook over the edge of the form.',
      'Focus on the "hook" at the end of the curve to imply three-dimensionality.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 600,
    lesson: 2
  },
  {
    id: 'db-l2-texture-analysis',
    name: 'Texture Analysis',
    discipline: 'Observation',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Observe and draw cast shadows of textures.',
    brief: [
      'Select a high-detail texture reference.',
      'Observe the cast shadows created by the surface bumps.',
      'Fill a small square with ONLY those cast shadow shapes.',
      'Do not draw the object itself, only the shadows it creates.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 900,
    lesson: 2
  },
  {
    id: 'db-l2-dissections',
    name: 'Dissections',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Apply observed textures to organic forms.',
    brief: [
      'Draw a complex organic form.',
      'Wrap a specific texture around the surface of the form.',
      'Ensure the texture warps correctly according to the contour of the form.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 1200,
    lesson: 2
  },
  {
    id: 'db-l2-form-intersections',
    name: 'Form Intersections',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Draw clusters of intersecting 3D primitives.',
    brief: [
      'Draw boxes, cylinders, and spheres together.',
      'Ensure they appear to occupy the same 3D space.',
      'Focus on the lines where the forms intersect.',
      'This drill builds an understanding of 3D volumes rather than 2D shapes.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 1500,
    lesson: 2
  },
  {
    id: 'db-l2-organic-intersections',
    name: 'Organic Intersections',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Pile organic forms with believable gravity.',
    brief: [
      'Draw multiple sausage forms overlapping.',
      'The forms should appear to sag and wrap around each other due to weight.',
      'Use cast shadows to define where one form rests on another.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 1200,
    lesson: 2
  },

  // --- Lesson 3: Plants ---
  {
    id: 'db-l3-arrows',
    name: 'Arrows in Space',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Foundation',
    description: 'Draw ribboning arrows to practice flow.',
    brief: [
      'Draw a long flowing line.',
      'Turn the line into a ribboning arrow that moves through space.',
      'Use overlapping and scale changes to imply 3D depth.',
      'This drill trains the "flow" required for organic drawing.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 600,
    lesson: 3
  },
  {
    id: 'db-l3-leaves',
    name: 'Leaves',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Construct leaf forms from flow lines.',
    brief: [
      'Start with a single flow line.',
      'Build the outer boundaries of the leaf around that line.',
      'Use overlapping to show where the leaf folds or twists.',
      'Focus on the underlying 3D structure, not the serrated edges.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 900,
    lesson: 3
  },
  {
    id: 'db-l3-branches',
    name: 'Branches',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Construct branches using overlapping cylinders.',
    brief: [
      'Draw a central axis for the branch.',
      'Build the branch using overlapping cylinder segments.',
      'Ensure each segment wraps around the previous one.',
      'Keep the edges clean and focus on the transitions.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 900,
    lesson: 3
  },
  {
    id: 'db-l3-plant-constructions',
    name: 'Plant Constructions',
    discipline: 'Construction',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Full plant drawings built from simple forms.',
    brief: [
      'Find a plant reference.',
      'Break the plant down into arrows, leaves, and branch segments.',
      'Build the drawing from these foundational components.',
      'Focus on construction first; add detail only at the very end.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 1800,
    lesson: 3
  },

  // --- Lesson 4: Insects ---
  {
    id: 'db-l4-insect-constructions',
    name: 'Insect Constructions',
    discipline: 'Construction',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Developing',
    description: 'Build insects from sausage forms.',
    brief: [
      'Observe an insect reference.',
      'Define the major body masses (head, thorax, abdomen) as 3D forms.',
      'Construct legs using sausage forms connected at joints.',
      'Focus on the 3D volume of each segment.',
      'Ignore textures and patterns until the structure is solid.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 1800,
    lesson: 4
  },

  // --- Lesson 5: Animals ---
  {
    id: 'db-l5-animal-constructions',
    name: 'Animal Constructions',
    discipline: 'Construction',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Advanced',
    description: 'Build animals using organic masses.',
    brief: [
      'Find an animal reference.',
      'Construct the torso using a "sausage" method for the core mass.',
      'Add organic masses for muscles and limbs on top of the skeleton.',
      'Ensure the weight of the masses feels believable.',
      'Focus on the silhouette and volume of the underlying structure.'
    ],
    referenceCategory: 'Figure',
    displayMode: 'Static',
    defaultTimerSeconds: 1800,
    lesson: 5
  },

  // --- Lesson 6: Objects ---
  {
    id: 'db-l6-intersections-revisited',
    name: 'Form Intersections (Revisited)',
    discipline: 'Form',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Advanced',
    description: 'Advanced primitive intersections with higher precision.',
    brief: [
      'Draw complex clusters of intersecting forms.',
      'Focus on the precision of the intersection lines.',
      'Ensure all forms align to a consistent perspective system.',
      'This is an audit of your spatial reasoning before moving to complex objects.'
    ],
    referenceCategory: 'None',
    displayMode: 'Static',
    defaultTimerSeconds: 1500,
    lesson: 6
  },
  {
    id: 'db-l6-object-constructions',
    name: 'Object Constructions',
    discipline: 'Construction',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Advanced',
    description: 'Construct everyday objects using box scaffolding.',
    brief: [
      'Find an everyday object (stapler, kettle, controller).',
      'Start by drawing a box that defines the overall proportions.',
      'Subdivide the box to find the sub-masses of the object.',
      'Use straight scaffolding to build curved surfaces.',
      'Maintain extreme precision throughout the construction.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 1800,
    lesson: 6
  },

  // --- Lesson 7: Vehicles ---
  {
    id: 'db-l7-vehicle-constructions',
    name: 'Vehicle Constructions',
    discipline: 'Construction',
    originTag: 'Drawabox',
    useCaseTag: 'Study',
    inputTag: 'Static',
    difficulty: 'Advanced',
    description: 'Construct vehicles from subdivided boxes.',
    brief: [
      'Find a vehicle reference.',
      'Build a complex proportional grid using boxes.',
      'Construct the vehicle by removing and adding mass to this grid.',
      'Focus on the symmetry and alignment of wheels and structural lines.',
      'This is the culmination of the construction methodology.'
    ],
    referenceCategory: 'Still Life',
    displayMode: 'Static',
    defaultTimerSeconds: 2700,
    lesson: 7
  }
];
