export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export const chcDomains: { key: CHCDomain; name: string; description: string; gameTitle: string }[] = [
  { key: 'Gf', name: 'Fluid Reasoning', description: 'Supports novel problem-solving and logical decisions.', gameTitle: 'Pattern Matrix' },
  { key: 'Gc', name: 'Crystallized Intelligence', description: 'Improves vocabulary and general knowledge.', gameTitle: 'Verbal Inference Builder' },
  { key: 'Gwm', name: 'Working Memory', description: 'Boosts memory for learning and multitasking.', gameTitle: 'Dynamic Sequence Transformer' },
  { key: 'Gs', name: 'Processing Speed', description: 'Increases speed of mental tasks and reaction time.', gameTitle: 'Rapid Code Match' },
  { key: 'Gv', name: 'Visual Processing', description: 'Enhances ability to analyze visual patterns.', gameTitle: 'Mental Rotation Lab' },
  { key: 'Ga', name: 'Auditory Processing', description: 'Sharpens ability to differentiate sounds and tones.', gameTitle: 'Tone Grid Challenge' },
  { key: 'Glr', name: 'Long-Term Retrieval', description: 'Strengthens ability to recall information.', gameTitle: 'Semantic Fluency Storm' },
  { key: 'EF', name: 'Executive Functioning', description: 'Helps you stay focused and manage tasks.', gameTitle: 'Focus Switch Reactor' },
];
