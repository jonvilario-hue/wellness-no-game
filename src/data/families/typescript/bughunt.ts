
import { DrillTemplateFamily } from '@/types/drills';

export const tsBugHuntFamily: DrillTemplateFamily = {
  id: 'ts-strict-null',
  language: 'typescript',
  lane: 'Read',
  type: 'Bug Hunt',
  concept: 'null-safety',
  conceptTags: ['compiler-options'],
  difficulty: 2,
  slots: [
    { id: 'METHOD', kind: 'identifier', values: ['find', 'get'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Under strictNullChecks, identify the line that will cause a compiler error.",
  generateCode: (ctx) => {
    if (ctx.values.METHOD === 'find') {
      return `1: const arr = [1, 2, 3];
2: const found = arr.find(x => x > 10);
3: console.log(found.toFixed(0));`;
    }
    return `1: const m = new Map<string, number>();
2: const val = m.get("missing");
3: console.log(val + 1);`;
  },
  generateAnswer: () => ({
    mode: 'exact',
    correct: '3'
  })
};
