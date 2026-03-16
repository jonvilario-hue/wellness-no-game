
import { DrillTemplateFamily } from '@/types/drills';

export const bashQuotingFamily: DrillTemplateFamily = {
  id: 'bash-quote-expansion',
  language: 'bash',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'quoting',
  conceptTags: ['expansion'],
  difficulty: 2,
  slots: [
    { id: 'QUOTE', kind: 'literal', values: ['single', 'double'] },
    { id: 'VAL', kind: 'literal', values: ['world', 'user'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is the output of the echo command?",
  generateCode: (ctx) => {
    const q = ctx.values.QUOTE === 'single' ? "'" : '"';
    return `VAR=${ctx.values.VAL}\necho ${q}hello $VAR${q}`;
  },
  generateAnswer: (ctx) => {
    const correct = ctx.values.QUOTE === 'single' ? 'hello $VAR' : `hello ${ctx.values.VAL}`;
    return {
      mode: 'multipleChoice',
      correct,
      options: [correct, `hello ${ctx.values.VAL}`, 'hello $VAR', 'error'].sort(() => Math.random() - 0.5)
    };
  }
};
