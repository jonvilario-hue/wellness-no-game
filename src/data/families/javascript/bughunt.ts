import { DrillTemplateFamily } from '@/types/drills';

export const jsBugHuntFamily: DrillTemplateFamily = {
  id: 'js-bug-hunt',
  language: 'javascript',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'pitfalls',
  conceptTags: ['debugging', 'scoping'],
  difficulty: 2,
  slots: [
    { id: 'BUG_TYPE', kind: 'literal', values: ['var-hoisting', 'missing-return'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Identify the line number with the logical or syntax error.",
  generateCode: (ctx) => {
    if (ctx.values.BUG_TYPE === 'var-hoisting') {
      return `1: function test() {
2:   console.log(x);
3:   var x = 5;
4: }`;
    }
    return `1: function add(a, b) {
2:   a + b;
3: }`;
  },
  generateAnswer: (ctx) => ({
    mode: 'exact',
    correct: ctx.values.BUG_TYPE === 'var-hoisting' ? '2' : '2'
  })
};
