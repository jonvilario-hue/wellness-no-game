import { DrillTemplateFamily } from '@/types/drills';

export const rsBugHuntFamily: DrillTemplateFamily = {
  id: 'rs-bug-borrow',
  language: 'rust',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'borrow-checker',
  conceptTags: ['pointers', 'safety'],
  difficulty: 3,
  slots: [
    { id: 'BUG', kind: 'literal', values: ['double-mut', 'mut-and-immut'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Identify the borrow checker violation.",
  generateCode: (ctx) => {
    if (ctx.values.BUG === 'double-mut') {
      return `let mut x = 5;\nlet y = &mut x;\nlet z = &mut x;\n*y += 1;`;
    }
    return `let mut x = 5;\nlet y = &x;\nlet z = &mut x;\nprintln!("{}", y);`;
  },
  generateAnswer: (ctx) => ({
    mode: 'exact',
    correct: ctx.values.BUG === 'double-mut' ? 'multiple mutable borrows' : 'mutable and immutable borrow',
    accepted: ['borrow checker error', 'aliasing violation']
  })
};
