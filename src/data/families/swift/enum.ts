
import { DrillTemplateFamily } from '@/types/drills';

export const swiftEnumFamily: DrillTemplateFamily = {
  id: 'swift-enum-assoc',
  language: 'swift',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'enums',
  conceptTags: ['associated-values'],
  difficulty: 3,
  slots: [
    { id: 'TYPE', kind: 'keyword', values: ['Int', 'String', 'Bool'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Define an enum 'Result' with cases 'success(${ctx.values.TYPE})' and 'failure(Error)'.`,
  generateCode: () => `enum Result {\n    _____\n    _____\n}`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['enum', 'Result', 'case', 'success', ctx.values.TYPE as string, 'failure', 'Error']
  })
};
