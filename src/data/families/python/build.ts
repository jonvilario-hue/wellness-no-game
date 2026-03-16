
import { DrillTemplateFamily } from '@/types/drills';

export const pyBuildFamily: DrillTemplateFamily = {
  id: 'py-build-recursive',
  language: 'python',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'recursion',
  conceptTags: ['algorithms'],
  difficulty: 3,
  slots: [
    { id: 'FUNC', kind: 'identifier', values: ['factorial', 'fib'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Implement a recursive ${ctx.values.FUNC} function.`,
  generateCode: (ctx) => `def ${ctx.values.FUNC}(n):\n    # implementation here\n    pass`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: ['def', 'if', 'return', ctx.values.FUNC as string, '- 1']
  })
};
