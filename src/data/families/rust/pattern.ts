import { DrillTemplateFamily } from '@/types/drills';

export const rsPatternFamily: DrillTemplateFamily = {
  id: 'rs-match-pattern',
  language: 'rust',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'pattern-matching',
  conceptTags: ['enums', 'control-flow'],
  difficulty: 2,
  slots: [
    { id: 'VARIANT', kind: 'literal', values: ['Some', 'None'] },
    { id: 'VAL', kind: 'literal', values: [5, 10] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Predict the output of this match expression.",
  generateCode: (ctx) => {
    const inner = ctx.values.VARIANT === 'Some' ? `(${ctx.values.VAL})` : '';
    return `let x = ${ctx.values.VARIANT}${inner};\nmatch x {\n    Some(v) => println!("{}", v),\n    None => println!("empty"),\n}`;
  },
  generateAnswer: (ctx) => {
    const correct = ctx.values.VARIANT === 'Some' ? String(ctx.values.VAL) : 'empty';
    return {
      mode: 'multipleChoice',
      correct,
      options: [correct, 'None', '0', 'error'].sort(() => Math.random() - 0.5)
    };
  }
};
