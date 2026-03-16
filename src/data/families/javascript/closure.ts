import { DrillTemplateFamily } from '@/types/drills';

export const jsClosureFamily: DrillTemplateFamily = {
  id: 'js-closure-inc',
  language: 'javascript',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'closures',
  conceptTags: ['scope', 'functions'],
  difficulty: 2,
  slots: [
    { id: 'START', kind: 'literal', values: [0, 1, -1, 10] },
    { id: 'STEP', kind: 'literal', values: [1, 2, -1, 5] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Predict the exact output of the two console.log calls.",
  generateCode: (ctx) => {
    const start = ctx.render(ctx.values.START);
    const step = ctx.render(ctx.values.STEP);
    return `function makeCounter() {
  let count = ${start};
  return () => {
    count += ${step};
    return count;
  };
}

const counter = makeCounter();
console.log(counter());
console.log(counter());`;
  },
  generateAnswer: (ctx) => {
    const start = ctx.values.START as number;
    const step = ctx.values.STEP as number;
    const ans1 = start + step;
    const ans2 = start + (2 * step);
    const correct = `${ans1} ${ans2}`;
    
    return {
      mode: 'multipleChoice',
      correct,
      options: [
        correct,
        `${ans1} ${ans1}`,
        `${ans1} ${ans2 + step}`,
        `${start} ${ans1}`
      ].sort(() => Math.random() - 0.5)
    };
  }
};
