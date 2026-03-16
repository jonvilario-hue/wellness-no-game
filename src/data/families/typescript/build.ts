
import { DrillTemplateFamily } from '@/types/drills';

export const tsBuildFamily: DrillTemplateFamily = {
  id: 'ts-build-generic',
  language: 'typescript',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'generics',
  conceptTags: ['constraints'],
  difficulty: 2,
  slots: [
    { id: 'TYPE', kind: 'keyword', values: ['string', 'number'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Define a generic interface 'Wrapper' where T is constrained to '${ctx.values.TYPE}'.`,
  generateCode: () => `// Define interface here`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['interface', 'Wrapper', '<', 'extends', ctx.values.TYPE as string, '>']
  })
};
