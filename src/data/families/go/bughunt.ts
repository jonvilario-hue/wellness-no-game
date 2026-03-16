import { DrillTemplateFamily } from '@/types/drills';

export const goBugHuntFamily: DrillTemplateFamily = {
  id: 'go-bug-err',
  language: 'go',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'errors',
  conceptTags: ['idioms', 'handling'],
  difficulty: 2,
  slots: [
    { id: 'TYPE', kind: 'literal', values: ['file', 'parse'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Identify the missing idiomatic Go check.",
  generateCode: (ctx) => {
    if (ctx.values.TYPE === 'file') {
      return `f, err := os.Open("test.txt")\n// use f...`;
    }
    return `i, err := strconv.Atoi("123")\n// use i...`;
  },
  generateAnswer: (ctx) => ({
    mode: 'exact',
    correct: 'if err != nil',
    accepted: ['error check', 'checking error']
  })
};
