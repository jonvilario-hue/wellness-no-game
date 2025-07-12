export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export const chcDomains: { key: CHCDomain; name: string; description: string; gameTitle: string }[] = [
  { key: 'Gf', name: 'Fluid Reasoning', description: 'Problem-solving and logical thinking.', gameTitle: 'Pattern Matrix' },
  { key: 'Gc', name: 'Crystallized Intelligence', description: 'Acquired knowledge and vocabulary.', gameTitle: 'Verbal Inference Builder' },
  { key: 'Gwm', name: 'Working Memory', description: 'Holding and manipulating information.', gameTitle: 'Dynamic Sequence Transformer' },
  { key: 'Gs', name: 'Processing Speed', description: 'Speed of performing simple tasks.', gameTitle: 'Rapid Code Match' },
  { key: 'Gv', name: 'Visual Processing', description: 'Analyzing and synthesizing visual stimuli.', gameTitle: 'Mental Rotation Lab' },
  { key: 'Ga', name: 'Auditory Processing', description: 'Analyzing and synthesizing auditory stimuli.', gameTitle: 'Tone Grid Challenge' },
  { key: 'Glr', name: 'Long-Term Retrieval', description: 'Storing and retrieving information.', gameTitle: 'Semantic Fluency Storm' },
  { key: 'EF', name: 'Executive Functioning', description: 'Higher-order cognitive processes.', gameTitle: 'Focus Switch Reactor' },
];
