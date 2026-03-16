import { DrillTemplateFamily } from '@/types/drills';

export const jsArrowFamily: DrillTemplateFamily = {
  id: 'js-arrow-conv',
  language: 'javascript',
  lane: 'Write',
  type: 'Syntax Sprints',
  concept: 'functions',
  conceptTags: ['es6', 'syntax'],
  difficulty: 1,
  slots: [
    { id: 'PARAM_COUNT', kind: 'literal', values: [0, 1, 2] },
    { id: 'BODY_STYLE', kind: 'literal', values: ['expression', 'block'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Convert this function to a ${ctx.values.BODY_STYLE} arrow function with ${ctx.values.PARAM_COUNT} parameters.`,
  generateCode: (ctx) => {
    const params = Array.from({ length: ctx.values.PARAM_COUNT as number }, (_, i) => String.fromCharCode(97 + i)).join(', ');
    return `function add(${params}) {
  return ${ctx.values.BODY_STYLE === 'expression' ? 'a + b' : '{\n    return a + b;\n  }'};
}`;
  },
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['=>', ctx.values.BODY_STYLE === 'block' ? 'return' : ''],
    forbiddenTokens: ['function']
  })
};
