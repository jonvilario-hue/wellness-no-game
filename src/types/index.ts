
export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export const chcDomains: { 
  key: CHCDomain; 
  name: string; 
  description: string; 
  gameTitle: string;
  tasks: string[];
}[] = [
  { key: 'Gf', name: '(Gf) Fluid Reasoning', description: '(Gf) Solve new problems', gameTitle: 'Pattern Matrix', tasks: ['pattern_matrix'] },
  { key: 'Gc', name: '(Gc) Crystallized Intelligence', description: '(Gc) Use learned knowledge', gameTitle: 'Verbal Inference Builder', tasks: ['verbal_inference'] },
  { key: 'Gwm', name: '(Gwm) Working Memory', description: '(Gwm) Hold and use info', gameTitle: 'Dynamic Sequence Transformer', tasks: ['sequence_transform'] },
  { key: 'Gs', name: '(Gs) Processing Speed', description: '(Gs) Work fast and accurately', gameTitle: 'Rapid Code Match', tasks: ['code_match'] },
  { key: 'Gv', name: '(Gv) Visual Processing', description: '(Gv) Visualize and rotate objects', gameTitle: 'Mental Rotation Lab', tasks: ['mental_rotation'] },
  { key: 'Ga', name: '(Ga) Auditory Processing', description: '(Ga) Process and distinguish sounds', gameTitle: 'Tone Grid Challenge', tasks: ['tone_grid'] },
  { key: 'Glr', name: '(Glr) Long-Term Retrieval', description: '(Glr) Store and recall ideas', gameTitle: 'Semantic Fluency Storm', tasks: ['semantic_fluency'] },
  { key: 'EF', name: '(EF) Executive Function', description: '(EF) Focus, switch, control tasks', gameTitle: 'Focus Switch Reactor', tasks: ['focus_switch'] },
];
