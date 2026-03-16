
import { DrillTemplateFamily } from '@/types/drills';

export const sqlBuildFamily: DrillTemplateFamily = {
  id: 'sql-build-update',
  language: 'sql',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'dml',
  conceptTags: ['update'],
  difficulty: 2,
  slots: [
    { id: 'STATUS', kind: 'literal', values: ['archived', 'deleted'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Update all 'posts' to status ${ctx.render(ctx.values.STATUS)} where 'id' is in (1, 2, 3).`,
  generateCode: () => `-- Write query here`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['UPDATE', 'posts', 'SET', 'status', ctx.render(ctx.values.STATUS), 'WHERE', 'id', 'IN']
  })
};
