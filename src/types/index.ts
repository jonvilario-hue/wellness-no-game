export type CHCDomain = 'Gf' | 'Gc' | 'Gwm' | 'Gs' | 'Gv' | 'Ga' | 'Glr' | 'EF';

export const chcDomains: { key: CHCDomain; name: string; description: string }[] = [
  { key: 'Gf', name: 'Fluid Reasoning', description: 'Problem-solving and logical thinking.' },
  { key: 'Gc', name: 'Crystallized Intelligence', description: 'Acquired knowledge and vocabulary.' },
  { key: 'Gwm', name: 'Working Memory', description: 'Holding and manipulating information.' },
  { key: 'Gs', name: 'Processing Speed', description: 'Speed of performing simple tasks.' },
  { key: 'Gv', name: 'Visual Processing', description: 'Analyzing and synthesizing visual stimuli.' },
  { key: 'Ga', name: 'Auditory Processing', description: 'Analyzing and synthesizing auditory stimuli.' },
  { key: 'Glr', name: 'Long-Term Retrieval', description: 'Storing and retrieving information.' },
  { key: 'EF', name: 'Executive Functioning', description: 'Higher-order cognitive processes.' },
];
