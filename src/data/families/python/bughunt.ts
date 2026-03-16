import { DrillTemplateFamily } from '@/types/drills';

export const pyBugHuntFamily: DrillTemplateFamily = {
  id: 'py-bug-hunt',
  language: 'python',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'syntax',
  conceptTags: ['indentation', 'blocks'],
  difficulty: 2,
  slots: [
    { id: 'BUG_TYPE', kind: 'literal', values: ['missing-colon', 'bad-indent'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Identify the logical or syntax error.",
  generateCode: (ctx) => {
    if (ctx.values.BUG_TYPE === 'missing-colon') {
      return `def greet(name)\n    print(f"Hello {name}")`;
    }
    return `def check(n):\nif n > 0:\n    return True`;
  },
  generateAnswer: (ctx) => ({
    mode: 'exact',
    correct: ctx.values.BUG_TYPE === 'missing-colon' ? 'missing colon' : 'indentation error',
    accepted: ['syntax error', 'colon', 'indentation']
  })
};
