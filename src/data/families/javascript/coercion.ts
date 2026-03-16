import { DrillTemplateFamily } from '@/types/drills';

export const jsCoercionFamily: DrillTemplateFamily = {
  id: 'js-coercion-trap',
  language: 'javascript',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'coercion',
  conceptTags: ['types', 'logic'],
  difficulty: 2,
  slots: [
    { id: 'VAL_A', kind: 'literal', values: ["5", 5, true, null, undefined, 0, ""] },
    { id: 'VAL_B', kind: 'literal', values: ["5", 5, false, 0, "0"] },
    { id: 'OP', kind: 'operator', values: ["==", "===", "+"] }
  ],
  validate: (ctx) => {
    if (ctx.values.OP === '+' && typeof ctx.values.VAL_A === 'number' && typeof ctx.values.VAL_B === 'number') {
      return { ok: false, reasons: ["Too trivial"] };
    }
    return { ok: true, reasons: [] };
  },
  generatePrompt: () => "What is the result of this expression?",
  generateCode: (ctx) => {
    const a = ctx.render(ctx.values.VAL_A);
    const b = ctx.render(ctx.values.VAL_B);
    return `console.log(${a} ${ctx.values.OP} ${b});`;
  },
  generateAnswer: (ctx) => {
    const a = ctx.values.VAL_A;
    const b = ctx.values.VAL_B;
    const op = ctx.values.OP;
    
    let result: any;
    if (op === '==') result = (a == b);
    else if (op === '===') result = (a === b);
    else result = (a as any) + (b as any);

    const correct = String(result);
    return {
      mode: 'multipleChoice',
      correct,
      options: [
        correct,
        correct === 'true' ? 'false' : correct === 'false' ? 'true' : 'NaN',
        'undefined',
        'TypeError'
      ].sort(() => Math.random() - 0.5)
    };
  }
};
