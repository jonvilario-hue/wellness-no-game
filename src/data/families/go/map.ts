import { DrillTemplateFamily } from '@/types/drills';

export const goMapFamily: DrillTemplateFamily = {
  id: 'go-map-panic',
  language: 'go',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'maps',
  conceptTags: ['initialization', 'pitfalls'],
  difficulty: 2,
  slots: [
    { id: 'INIT', kind: 'literal', values: ['make', 'nil'] },
    { id: 'VAL', kind: 'literal', values: [42, 100] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is the result of this operation?",
  generateCode: (ctx) => {
    if (ctx.values.INIT === 'nil') {
      return `var m map[string]int\nm["key"] = ${ctx.values.VAL}`;
    }
    return `m := make(map[string]int)\nm["key"] = ${ctx.values.VAL}\nfmt.Print(m["key"])`;
  },
  generateAnswer: (ctx) => {
    const correct = ctx.values.INIT === 'nil' ? 'panic' : String(ctx.values.VAL);
    return {
      mode: 'multipleChoice',
      correct,
      options: [correct, '0', 'nil', 'error'].sort(() => Math.random() - 0.5)
    };
  }
};
