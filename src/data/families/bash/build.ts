
import { DrillTemplateFamily } from '@/types/drills';

export const bashBuildFamily: DrillTemplateFamily = {
  id: 'bash-build-loop',
  language: 'bash',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'loops',
  conceptTags: ['io'],
  difficulty: 2,
  slots: [
    { id: 'EXT', kind: 'literal', values: ['log', 'tmp', 'bak'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Write a loop that removes all files ending in '.${ctx.values.EXT}'.`,
  generateCode: () => `# Write loop here`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['for', 'in', '*.' + ctx.values.EXT, 'do', 'rm', 'done']
  })
};
