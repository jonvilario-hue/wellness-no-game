
import { DrillTemplateFamily } from '@/types/drills';

export const rsBuildFamily: DrillTemplateFamily = {
  id: 'rs-build-enum',
  language: 'rust',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'enums',
  conceptTags: ['dispatch'],
  difficulty: 2,
  slots: [
    { id: 'MSG', kind: 'identifier', values: ['Write', 'Move'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Implement an enum 'Message' with a '${ctx.values.MSG}' variant holding a String.`,
  generateCode: () => `// Define enum here`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['enum', 'Message', ctx.values.MSG as string, 'String']
  })
};
