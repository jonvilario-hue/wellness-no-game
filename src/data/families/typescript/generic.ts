
import { DrillTemplateFamily } from '@/types/drills';

export const tsGenericFamily: DrillTemplateFamily = {
  id: 'ts-generic-constraint',
  language: 'typescript',
  lane: 'Write',
  type: 'Syntax Sprints',
  concept: 'generics',
  conceptTags: ['constraints'],
  difficulty: 2,
  slots: [
    { id: 'BASE', kind: 'identifier', values: ['T', 'U', 'V'] },
    { id: 'BOUND', kind: 'keyword', values: ['string', 'number', 'object'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Write a generic function 'wrap' that constrains '${ctx.values.BASE}' to '${ctx.values.BOUND}'.`,
  generateCode: () => `function wrap<_____>(val: _____) { return val; }`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['<', ctx.values.BASE as string, 'extends', ctx.values.BOUND as string, '>']
  })
};
