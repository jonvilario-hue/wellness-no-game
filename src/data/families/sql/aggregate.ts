
import { DrillTemplateFamily } from '@/types/drills';

export const sqlAggregateFamily: DrillTemplateFamily = {
  id: 'sql-agg-nulls',
  language: 'sql',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'aggregation',
  conceptTags: ['nulls'],
  difficulty: 2,
  slots: [
    { id: 'FUNC', kind: 'keyword', values: ['COUNT(*)', 'COUNT(id)', 'SUM(id)'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is the result of the aggregate function?",
  generateCode: (ctx) => {
    return `-- Data: ids [1, 2, NULL]
SELECT ${ctx.values.FUNC} FROM users;`;
  },
  generateAnswer: (ctx) => {
    let correct = '0';
    if (ctx.values.FUNC === 'COUNT(*)') correct = '3';
    if (ctx.values.FUNC === 'COUNT(id)') correct = '2';
    if (ctx.values.FUNC === 'SUM(id)') correct = '3';
    
    return {
      mode: 'multipleChoice',
      correct,
      options: ['0', '1', '2', '3', 'NULL'].sort(() => Math.random() - 0.5)
    };
  }
};
