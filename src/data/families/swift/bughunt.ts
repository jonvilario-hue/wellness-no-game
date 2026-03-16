
import { DrillTemplateFamily } from '@/types/drills';

export const swiftBugHuntFamily: DrillTemplateFamily = {
  id: 'swift-force-unwrap',
  language: 'swift',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'safety',
  conceptTags: ['optionals', 'runtime'],
  difficulty: 2,
  slots: [
    { id: 'VAL', kind: 'literal', values: ['nil', '"hi"'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Will this code crash at runtime?",
  generateCode: (ctx) => {
    return `let x: String? = ${ctx.render(ctx.values.VAL)}\nprint(x!)`;
  },
  generateAnswer: (ctx) => ({
    mode: 'exact',
    correct: ctx.values.VAL === 'nil' ? 'yes' : 'no'
  })
};
