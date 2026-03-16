import { DrillTemplateFamily } from '@/types/drills';

export const pyDefaultsFamily: DrillTemplateFamily = {
  id: 'py-mutable-default',
  language: 'python',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'functions',
  conceptTags: ['pitfalls', 'mutability'],
  difficulty: 3,
  slots: [
    { id: 'VAL_1', kind: 'literal', values: [1, 'a'] },
    { id: 'VAL_2', kind: 'literal', values: [2, 'b'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is printed after the second call?",
  generateCode: (ctx) => {
    const v1 = ctx.render(ctx.values.VAL_1);
    const v2 = ctx.render(ctx.values.VAL_2);
    return `def add_to(item, target=[]):
    target.append(item)
    return target

add_to(${v1})
print(add_to(${v2}))`;
  },
  generateAnswer: (ctx) => {
    const v1 = ctx.values.VAL_1;
    const v2 = ctx.values.VAL_2;
    const correct = `[${typeof v1 === 'string' ? `'${v1}'` : v1}, ${typeof v2 === 'string' ? `'${v2}'` : v2}]`;
    return {
      mode: 'multipleChoice',
      correct,
      options: [
        correct,
        `[${typeof v2 === 'string' ? `'${v2}'` : v2}]`,
        `None`,
        `Error`
      ].sort(() => Math.random() - 0.5)
    };
  }
};
