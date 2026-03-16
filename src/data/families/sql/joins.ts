
import { DrillTemplateFamily } from '@/types/drills';

export const sqlJoinFamily: DrillTemplateFamily = {
  id: 'sql-join-nulls',
  language: 'sql',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'joins',
  conceptTags: ['nulls'],
  difficulty: 2,
  slots: [
    { id: 'TYPE', kind: 'keyword', values: ['INNER', 'LEFT', 'RIGHT'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "How many rows are returned by this join?",
  generateCode: (ctx) => {
    return `-- Table A: [1], [2], [NULL]
-- Table B: [1], [3]
SELECT * FROM A ${ctx.values.TYPE} JOIN B ON A.id = B.id;`;
  },
  generateAnswer: (ctx) => {
    let correct = '0';
    if (ctx.values.TYPE === 'INNER') correct = '1';
    if (ctx.values.TYPE === 'LEFT') correct = '3';
    if (ctx.values.TYPE === 'RIGHT') correct = '2';
    
    return {
      mode: 'multipleChoice',
      correct,
      options: ['0', '1', '2', '3'].sort(() => Math.random() - 0.5)
    };
  }
};
