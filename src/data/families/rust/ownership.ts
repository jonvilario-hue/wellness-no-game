import { DrillTemplateFamily } from '@/types/drills';

export const rsOwnershipFamily: DrillTemplateFamily = {
  id: 'rs-ownership-move',
  language: 'rust',
  lane: 'Read',
  type: 'Output Prediction',
  concept: 'ownership',
  conceptTags: ['move', 'memory'],
  difficulty: 3,
  slots: [
    { id: 'TYPE', kind: 'literal', values: ['String', 'i32'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "What is the result of the final print statement?",
  generateCode: (ctx) => {
    const val = ctx.values.TYPE === 'String' ? 'String::from("hi")' : '42';
    return `let x = ${val};\nlet y = x;\nprintln!("{:?}", x);`;
  },
  generateAnswer: (ctx) => {
    const correct = ctx.values.TYPE === 'String' ? 'compiler error' : (ctx.values.TYPE === 'i32' ? '42' : 'error');
    return {
      mode: 'multipleChoice',
      correct,
      options: [correct, 'hi', 'nil', 'panic'].sort(() => Math.random() - 0.5)
    };
  }
};
