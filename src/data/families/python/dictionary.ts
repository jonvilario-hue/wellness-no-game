import { DrillTemplateFamily } from '@/types/drills';

export const pyDictFamily: DrillTemplateFamily = {
  id: 'py-dict-methods',
  language: 'python',
  lane: 'Write',
  type: 'Code Reconstruction',
  concept: 'dictionaries',
  conceptTags: ['data-structures', 'methods'],
  difficulty: 2,
  slots: [
    { id: 'METHOD', kind: 'keyword', values: ['get', 'pop', 'setdefault'] },
    { id: 'DEFAULT', kind: 'literal', values: [0, 'N/A', null] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Use the ${ctx.values.METHOD} method to access key "val" with fallback ${ctx.render(ctx.values.DEFAULT)}.`,
  generateCode: () => `data = {"id": 1}\nresult = data._____("val", _____)`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: [ctx.values.METHOD as string, ctx.render(ctx.values.DEFAULT)]
  })
};
