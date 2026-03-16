import { DrillTemplateFamily } from '@/types/drills';

export const rsIteratorFamily: DrillTemplateFamily = {
  id: 'rs-iter-chain',
  language: 'rust',
  lane: 'Write',
  type: 'Code Reconstruction',
  concept: 'iterators',
  conceptTags: ['functional', 'collections'],
  difficulty: 2,
  slots: [
    { id: 'VAL', kind: 'literal', values: [5, 10] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Filter values greater than ${ctx.values.VAL} and collect into a Vec.`,
  generateCode: () => `let v = vec![1, 20, 30];\nlet res: Vec<_> = v.into_iter()._____(|x| x > _____)._____();`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['filter', String(ctx.values.VAL), 'collect'],
    requiredSequences: [['filter', 'collect']]
  })
};
