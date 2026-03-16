
import { DrillTemplateFamily } from '@/types/drills';

export const sqlRewriteFamily: DrillTemplateFamily = {
  id: 'sql-cte-rewrite',
  language: 'sql',
  lane: 'Write',
  type: 'Code Reconstruction',
  concept: 'ctes',
  conceptTags: ['readability'],
  difficulty: 2,
  slots: [
    { id: 'NAME', kind: 'identifier', values: ['filtered_data', 'temp_results'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Rewrite the subquery as a Common Table Expression (CTE) named '${ctx.values.NAME}'.`,
  generateCode: () => `SELECT * FROM (SELECT id FROM x) AS sub;`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['WITH', ctx.values.NAME as string, 'AS', '(', 'SELECT']
  })
};
