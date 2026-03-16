
import { DrillTemplateFamily } from '@/types/drills';

export const tsAssertionFamily: DrillTemplateFamily = {
  id: 'ts-type-assertion',
  language: 'typescript',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'assertions',
  conceptTags: ['safety'],
  difficulty: 2,
  slots: [
    { id: 'METHOD', kind: 'keyword', values: ['as', 'satisfies'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Does this line prevent a runtime error or just a compile-time error?",
  generateCode: (ctx) => {
    return `const x = "123" ${ctx.values.METHOD} unknown as number;
console.log(x + 1);`;
  },
  generateAnswer: () => ({
    mode: 'multipleChoice',
    correct: 'compile-time only',
    options: ['compile-time only', 'runtime only', 'both', 'neither']
  })
};
