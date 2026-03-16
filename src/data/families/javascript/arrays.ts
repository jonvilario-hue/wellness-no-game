import { DrillTemplateFamily } from '@/types/drills';

export const jsArrayFamily: DrillTemplateFamily = {
  id: 'js-array-chain',
  language: 'javascript',
  lane: 'Write',
  type: 'Code Reconstruction',
  concept: 'arrays',
  conceptTags: ['functional', 'methods'],
  difficulty: 2,
  slots: [
    { id: 'METHOD', kind: 'keyword', values: ['filter', 'map'] },
    { id: 'THRESHOLD', kind: 'literal', values: [0, 5, 10, -1] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Complete the chain to ${ctx.values.METHOD === 'filter' ? 'keep numbers greater than' : 'multiply numbers by'} ${ctx.values.THRESHOLD}.`,
  generateCode: () => `const nums = [1, 2, 3, 15];\nconst result = nums._____(n => n ____);`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: [ctx.values.METHOD as string, String(ctx.values.THRESHOLD)],
    requiredSequences: [[ctx.values.METHOD as string, ctx.values.METHOD === 'filter' ? '>' : '*']]
  })
};
