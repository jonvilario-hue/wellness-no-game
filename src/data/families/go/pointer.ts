import { DrillTemplateFamily } from '@/types/drills';

export const goPointerFamily: DrillTemplateFamily = {
  id: 'go-pointer-receiver',
  language: 'go',
  lane: 'Write',
  type: 'Code Reconstruction',
  concept: 'methods',
  conceptTags: ['pointers', 'mutability'],
  difficulty: 2,
  slots: [
    { id: 'FIELD', kind: 'identifier', values: ['Count', 'Value'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Implement a method 'Inc' that increments '${ctx.values.FIELD}' on the struct.`,
  generateCode: (ctx) => `type Counter struct { ${ctx.values.FIELD} int }\n\nfunc (c _____) Inc() {\n    _____\n}`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['*Counter', 'c.' + (ctx.values.FIELD as string), '++']
  })
};
