import { DrillTemplateFamily } from '@/types/drills';

export const goBuildStructFamily: DrillTemplateFamily = {
  id: 'go-build-struct',
  language: 'go',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'structs',
  conceptTags: ['initialization'],
  difficulty: 2,
  slots: [
    { id: 'NAME', kind: 'identifier', values: ['User', 'Admin', 'Guest'] },
    { id: 'FIELD', kind: 'identifier', values: ['ID', 'Email', 'Active'] },
    { id: 'TYPE', kind: 'keyword', values: ['int', 'string', 'bool'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Define a struct '${ctx.values.NAME}' with a field '${ctx.values.FIELD}' of type '${ctx.values.TYPE}'.`,
  generateCode: () => `type _____ struct {\n    _____\n}`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: [ctx.values.NAME as string, ctx.values.FIELD as string, ctx.values.TYPE as string]
  })
};
