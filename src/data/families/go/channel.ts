import { DrillTemplateFamily } from '@/types/drills';

export const goChannelFamily: DrillTemplateFamily = {
  id: 'go-chan-sync',
  language: 'go',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'channels',
  conceptTags: ['concurrency', 'synchronization'],
  difficulty: 2,
  slots: [
    { id: 'MSG', kind: 'literal', values: ['ping', 'hello'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is printed by this synchronous channel operation?",
  generateCode: (ctx) => {
    return `ch := make(chan string, 1)
ch <- "${ctx.values.MSG}"
fmt.Print(<-ch)`;
  },
  generateAnswer: (ctx) => ({
    mode: 'multipleChoice',
    correct: ctx.values.MSG as string,
    options: [ctx.values.MSG as string, 'deadlock', 'nil', 'error'].sort(() => Math.random() - 0.5)
  })
};
