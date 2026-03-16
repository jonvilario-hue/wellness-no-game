import { DrillTemplateFamily } from '@/types/drills';

export const pyBugHuntFamily: DrillTemplateFamily = {
  id: 'py-bug-patterns',
  language: 'python',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'syntax',
  conceptTags: ['pitfalls', 'blocks'],
  difficulty: 2,
  slots: [
    { id: 'BUG', kind: 'literal', values: ['colon', 'indent', 'outside-loop', 'mutable-default'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Identify the structural or semantic error in this snippet.",
  generateCode: (ctx) => {
    switch (ctx.values.BUG) {
      case 'colon': return `if x > 10\n    print("big")`;
      case 'indent': return `def f(x):\nreturn x * 2`;
      case 'outside-loop': return `for i in range(5):\n    pass\nprint(i)\nbreak`;
      case 'mutable-default': return `def add(val, l=[]):\n    l.append(val)\n    return l`;
      default: return '';
    }
  },
  generateAnswer: (ctx) => {
    let correct = '';
    switch (ctx.values.BUG) {
      case 'colon': correct = 'missing colon'; break;
      case 'indent': correct = 'bad indentation'; break;
      case 'outside-loop': correct = 'break outside loop'; break;
      case 'mutable-default': correct = 'mutable default argument'; break;
    }
    return { mode: 'exact', correct };
  }
};

export const pyLogicBugFamily: DrillTemplateFamily = {
  id: 'py-logic-pitfalls',
  language: 'python',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'logic',
  conceptTags: ['comparison', 'truthiness'],
  difficulty: 2,
  slots: [
    { id: 'VAL', kind: 'literal', values: [[], {}, 0, ""] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Identify the logic error in checking if the input is empty.`,
  generateCode: (ctx) => `data = ${ctx.render(ctx.values.VAL)}\nif data == None:\n    print("empty")`,
  generateAnswer: () => ({
    mode: 'exact',
    correct: 'use truthiness or len(), not None check',
    accepted: ['is not None', 'equality check with None']
  })
};
