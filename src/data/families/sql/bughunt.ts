
import { DrillTemplateFamily } from '@/types/drills';

export const sqlBugHuntFamily: DrillTemplateFamily = {
  id: 'sql-group-by-bug',
  language: 'sql',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'syntax',
  conceptTags: ['grouping'],
  difficulty: 3,
  slots: [
    { id: 'COL', kind: 'identifier', values: ['name', 'category'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Identify why this query will fail in standard SQL.",
  generateCode: (ctx) => {
    return `SELECT id, ${ctx.values.COL}, COUNT(*) 
FROM products 
GROUP BY ${ctx.values.COL};`;
  },
  generateAnswer: () => ({
    mode: 'exact',
    correct: 'id missing from group by',
    accepted: ['invalid grouping', 'column id not in group by']
  })
};
