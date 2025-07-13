
export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export const chcDomains: { 
  key: CHCDomain; 
  name: string; 
  description: string; 
  gameTitle: string;
  tasks: string[];
  supportsMath: boolean;
}[] = [
  { key: 'Gf', name: '(Gf) Fluid Reasoning', description: 'Solve new problems', gameTitle: 'Pattern Matrix', tasks: ['pattern_matrix'], supportsMath: true },
  { key: 'Gc', name: '(Gc) Crystallized Intelligence', description: 'Use learned knowledge', gameTitle: 'Verbal Inference Builder', tasks: ['verbal_inference'], supportsMath: true },
  { key: 'Gwm', name: '(Gwm) Working Memory', description: 'Hold and use info', gameTitle: 'Dynamic Sequence Transformer', tasks: ['sequence_transform'], supportsMath: true },
  { key: 'Gs', name: '(Gs) Processing Speed', description: 'Work fast and accurately', gameTitle: 'Rapid Code Match', tasks: ['code_match'], supportsMath: false },
  { key: 'Gv', name: '(Gv) Visual Processing', description: 'Visualize and rotate objects', gameTitle: 'Mental Rotation Lab', tasks: ['mental_rotation'], supportsMath: false },
  { key: 'Ga', name: '(Ga) Auditory Processing', description: 'Process and distinguish sounds', gameTitle: 'Tone Grid Challenge', tasks: ['tone_grid'], supportsMath: false },
  { key: 'Glr', name: '(Glr) Long-Term Retrieval', description: 'Store and recall ideas', gameTitle: 'Semantic Fluency Storm', tasks: ['semantic_fluency'], supportsMath: true },
  { key: 'EF', name: '(EF) Executive Function', description: 'Focus, switch, control tasks', gameTitle: 'Focus Switch Reactor', tasks: ['focus_switch'], supportsMath: true },
];
