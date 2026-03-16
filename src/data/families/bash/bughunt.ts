
import { DrillTemplateFamily } from '@/types/drills';

export const bashBugHuntFamily: DrillTemplateFamily = {
  id: 'bash-syntax-pitfalls',
  language: 'bash',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'syntax',
  conceptTags: ['pitfalls'],
  difficulty: 2,
  slots: [
    { id: 'BUG', kind: 'literal', values: ['space-assign', 'bracket-space'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Identify the syntax error in this script.",
  generateCode: (ctx) => {
    if (ctx.values.BUG === 'space-assign') return `VAR = "value"`;
    return `if [$x == "hi" ]; then`;
  },
  generateAnswer: (ctx) => ({
    mode: 'exact',
    correct: ctx.values.BUG === 'space-assign' ? 'space around equals' : 'missing space after bracket'
  })
};
