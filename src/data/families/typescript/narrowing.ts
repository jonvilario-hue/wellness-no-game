
import { DrillTemplateFamily } from '@/types/drills';

export const tsNarrowingFamily: DrillTemplateFamily = {
  id: 'ts-narrowing-typeof',
  language: 'typescript',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'narrowing',
  conceptTags: ['types', 'flow'],
  difficulty: 2,
  slots: [
    { id: 'TYPE_A', kind: 'typeAnnotation', values: ['string', 'number'] },
    { id: 'TYPE_B', kind: 'typeAnnotation', values: ['null', 'undefined', 'boolean'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is the inferred type of 'val' inside the 'if' block?",
  generateCode: (ctx) => {
    return `function process(val: ${ctx.values.TYPE_A} | ${ctx.values.TYPE_B}) {
  if (typeof val === "${ctx.values.TYPE_A}") {
    // Inferred type here?
  }
}`;
  },
  generateAnswer: (ctx) => ({
    mode: 'exact',
    correct: ctx.values.TYPE_A as string
  })
};
