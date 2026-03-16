import { DrillTemplateFamily } from '@/types/drills';

export const pyComprehensionFamily: DrillTemplateFamily = {
  id: 'py-list-comp-filter',
  language: 'python',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'comprehensions',
  conceptTags: ['functional', 'filtering'],
  difficulty: 2,
  slots: [
    { id: 'THRESHOLD', kind: 'literal', values: [2, 5, 8] },
    { id: 'OPERATOR', kind: 'operator', values: ['>', '<', '>='] },
    { id: 'RANGE_END', kind: 'literal', values: [5, 10] }
  ],
  validate: (ctx) => {
    const end = ctx.values.RANGE_END as number;
    const thr = ctx.values.THRESHOLD as number;
    // Ensure the filter actually catches some but not all values
    if (ctx.values.OPERATOR === '>' && thr >= end) return { ok: false, reasons: ['Empty result'] };
    return { ok: true, reasons: [] };
  },
  generatePrompt: () => "Predict the output of this list comprehension.",
  generateCode: (ctx) => {
    return `nums = [x for x in range(${ctx.values.RANGE_END}) if x ${ctx.values.OPERATOR} ${ctx.values.THRESHOLD}]\nprint(nums)`;
  },
  generateAnswer: (ctx) => {
    const end = ctx.values.RANGE_END as number;
    const thr = ctx.values.THRESHOLD as number;
    const op = ctx.values.OPERATOR as string;
    
    const result: number[] = [];
    for (let x = 0; x < end; x++) {
      let match = false;
      if (op === '>') match = x > thr;
      else if (op === '<') match = x < thr;
      else if (op === '>=') match = x >= thr;
      if (match) result.push(x);
    }

    const correct = `[${result.join(', ')}]`;
    return {
      mode: 'multipleChoice',
      correct,
      options: [
        correct,
        `[${result.map(x => x + 1).join(', ')}]`,
        `[]`,
        `[${result.slice(0, -1).join(', ')}]`
      ].sort(() => Math.random() - 0.5)
    };
  }
};
