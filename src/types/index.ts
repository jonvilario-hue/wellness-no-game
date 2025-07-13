

export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export const chcDomains: { 
  key: CHCDomain; 
  name: string; 
  description: string; 
  gameTitle: string;
  tasks: string[];
}[] = [
  { key: 'Gf', name: 'Fluid Reasoning', description: 'Solve new problems', gameTitle: 'Pattern Matrix', tasks: ['pattern_matrix'] },
  { key: 'Gc', name: 'Crystallized Intelligence', description: 'Use learned knowledge', gameTitle: 'Verbal Inference Builder', tasks: ['verbal_inference'] },
  { key: 'Gwm', name: 'Working Memory', description: 'Hold and use info', gameTitle: 'Dynamic Sequence Transformer', tasks: ['sequence_transform'] },
  { key: 'Gs', name: 'Processing Speed', description: 'Work fast and accurately', gameTitle: 'Rapid Code Match', tasks: ['code_match'] },
  { key: 'Gv', name: 'Visual Processing', description: 'Visualize and rotate objects', gameTitle: 'Mental Rotation Lab', tasks: ['mental_rotation'] },
  { key: 'Ga', name: 'Auditory Processing', description: 'Process and distinguish sounds', gameTitle: 'Tone Grid Challenge', tasks: ['tone_grid'] },
  { key: 'Glr', name: 'Long-Term Retrieval', description: 'Store and recall ideas', gameTitle: 'Semantic Fluency Storm', tasks: ['semantic_fluency'] },
  { key: 'EF', name: 'Executive Functioning', description: 'Focus, switch, control tasks', gameTitle: 'Focus Switch Reactor', tasks: ['focus_switch'] },
];
