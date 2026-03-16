
import { DrillTemplateFamily } from '@/types/drills';

export const bashExitFamily: DrillTemplateFamily = {
  id: 'bash-pipe-exit',
  language: 'bash',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'exit-codes',
  conceptTags: ['pipelines'],
  difficulty: 3,
  slots: [
    { id: 'PIPEFAIL', kind: 'literal', values: [true, false] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is the exit code ($?) of the pipeline?",
  generateCode: (ctx) => {
    const set = ctx.values.PIPEFAIL ? 'set -o pipefail\n' : '';
    return `${set}false | true\necho $?`;
  },
  generateAnswer: (ctx) => ({
    mode: 'exact',
    correct: ctx.values.PIPEFAIL ? '1' : '0'
  })
};
