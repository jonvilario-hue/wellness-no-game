import { DrillTemplateFamily } from '@/types/drills';

export const rsTraitFamily: DrillTemplateFamily = {
  id: 'rs-impl-trait',
  language: 'rust',
  lane: 'Write',
  type: 'Syntax Sprints',
  concept: 'traits',
  conceptTags: ['abstraction', 'interfaces'],
  difficulty: 2,
  slots: [
    { id: 'TRAIT', kind: 'keyword', values: ['Display', 'Debug', 'Clone'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Write the start of the block to implement '${ctx.values.TRAIT}' for struct 'User'.`,
  generateCode: () => `struct User { id: u32 }\n\n_____ User { ... }`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['impl', ctx.values.TRAIT as string, 'for']
  })
};
