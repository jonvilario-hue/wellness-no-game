import { DrillTemplateFamily } from '@/types/drills';

export const goInterfaceFamily: DrillTemplateFamily = {
  id: 'go-interface-impl',
  language: 'go',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'interfaces',
  conceptTags: ['polymorphism', 'types'],
  difficulty: 3,
  slots: [
    { id: 'NAME', kind: 'identifier', values: ['Sizer', 'Stringer'] },
    { id: 'METHOD', kind: 'identifier', values: ['Size', 'String'] },
    { id: 'RET', kind: 'keyword', values: ['int', 'string'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Define an interface '${ctx.values.NAME}' with a method '${ctx.values.METHOD}' returning '${ctx.values.RET}'.`,
  generateCode: () => `type _____ interface {\n    _____\n}`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: [ctx.values.NAME as string, ctx.values.METHOD as string, ctx.values.RET as string]
  })
};
