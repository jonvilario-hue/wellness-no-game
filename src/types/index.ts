export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export const chcDomains: { key: CHCDomain; name: string; description: string; gameTitle: string }[] = [
  { key: 'Gf', name: 'Fluid Reasoning', description: '(Gf) Problem-solving and logical thinking.', gameTitle: 'Pattern Matrix' },
  { key: 'Gc', name: 'Crystallized Intelligence', description: '(Gc) Acquired knowledge and vocabulary.', gameTitle: 'Verbal Inference Builder' },
  { key: 'Gwm', name: 'Working Memory', description: '(Gwm) Holding and manipulating information.', gameTitle: 'Dynamic Sequence Transformer' },
  { key: 'Gs', name: 'Processing Speed', description: '(Gs) Speed of performing simple tasks.', gameTitle: 'Rapid Code Match' },
  { key: 'Gv', name: 'Visual Processing', description: '(Gv) Analyzing and synthesizing visual stimuli.', gameTitle: 'Mental Rotation Lab' },
  { key: 'Ga', name: 'Auditory Processing', description: '(Ga) Analyzing and synthesizing auditory stimuli.', gameTitle: 'Tone Grid Challenge' },
  { key: 'Glr', name: 'Long-Term Retrieval', description: '(Glr) Storing and retrieving information.', gameTitle: 'Semantic Fluency Storm' },
  { key: 'EF', name: 'Executive Functioning', description: '(EF) Higher-order cognitive processes.', gameTitle: 'Focus Switch Reactor' },
];
