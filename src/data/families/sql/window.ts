
import { DrillTemplateFamily } from '@/types/drills';

export const sqlWindowFamily: DrillTemplateFamily = {
  id: 'sql-window-syntax',
  language: 'sql',
  lane: 'Write',
  type: 'Syntax Sprints',
  concept: 'window-functions',
  conceptTags: ['analytics'],
  difficulty: 2,
  slots: [
    { id: 'FUNC', kind: 'keyword', values: ['ROW_NUMBER', 'RANK', 'DENSE_RANK'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Apply '${ctx.values.FUNC}' partitioned by 'dept' and ordered by 'salary'.`,
  generateCode: () => `SELECT name, _____(_____) FROM employees;`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: [ctx.values.FUNC as string, 'OVER', 'PARTITION BY', 'dept', 'ORDER BY', 'salary']
  })
};
