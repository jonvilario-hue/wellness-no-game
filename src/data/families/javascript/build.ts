import { DrillTemplateFamily } from '@/types/drills';

export const jsBuildFamily: DrillTemplateFamily = {
  id: 'js-build-array',
  language: 'javascript',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'arrays',
  conceptTags: ['math'],
  difficulty: 2,
  slots: [
    { id: 'POWER', kind: 'literal', values: [2, 3] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Write a function that returns the sum of all elements raised to the power of ${ctx.values.POWER}.`,
  generateCode: () => `const sumPower = (arr) => {\n  // your code\n};`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['reduce', 'Math.pow', String(ctx.values.POWER)],
    accepted: ['** ' + ctx.values.POWER]
  })
};
