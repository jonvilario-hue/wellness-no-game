
export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export const chcDomains: { key: CHCDomain; name: string; description: string; gameTitle: string }[] = [
  { key: 'Gf', name: 'Fluid Reasoning', description: 'Gf – Solve new problems', gameTitle: 'Pattern Matrix' },
  { key: 'Gc', name: 'Crystallized Intelligence', description: 'Gc – Use learned knowledge', gameTitle: 'Verbal Inference Builder' },
  { key: 'Gwm', name: 'Working Memory', description: 'Gwm – Hold and use info', gameTitle: 'Dynamic Sequence Transformer' },
  { key: 'Gs', name: 'Processing Speed', description: 'Gs – Work fast and accurately', gameTitle: 'Rapid Code Match' },
  { key: 'Gv', name: 'Visual Processing', description: 'Gv – Visualize and rotate objects', gameTitle: 'Mental Rotation Lab' },
  { key: 'Ga', name: 'Auditory Processing', description: 'Ga – Process and distinguish sounds', gameTitle: 'Tone Grid Challenge' },
  { key: 'Glr', name: 'Long-Term Retrieval', description: 'Glr – Store and recall ideas', gameTitle: 'Semantic Fluency Storm' },
  { key: 'EF', name: 'Executive Functioning', description: 'EF/Attention – Focus, switch, control tasks', gameTitle: 'Focus Switch Reactor' },
];
