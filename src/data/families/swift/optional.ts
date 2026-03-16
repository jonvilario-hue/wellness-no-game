
import { DrillTemplateFamily } from '@/types/drills';

export const swiftOptionalFamily: DrillTemplateFamily = {
  id: 'swift-opt-chain',
  language: 'swift',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'optionals',
  conceptTags: ['chaining', 'null-safety'],
  difficulty: 2,
  slots: [
    { id: 'NIL_POS', kind: 'literal', values: [0, 1, 2] },
    { id: 'FALLBACK', kind: 'literal', values: [0, 42] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is the resulting value of 'id'?",
  generateCode: (ctx) => {
    const p1 = ctx.values.NIL_POS === 0 ? 'nil' : '{ id: 10 }';
    return `struct User { var id: Int }\nlet user: User? = ${p1}\nlet id = user?.id ?? ${ctx.values.FALLBACK}`;
  },
  generateAnswer: (ctx) => {
    const correct = ctx.values.NIL_POS === 0 ? String(ctx.values.FALLBACK) : '10';
    return {
      mode: 'multipleChoice',
      correct,
      options: [correct, 'nil', 'error', '0'].sort(() => Math.random() - 0.5)
    };
  }
};
