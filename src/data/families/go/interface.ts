import { DrillTemplateFamily } from '@/types/drills';

export const goInterfaceFamily: DrillTemplateFamily = {
  id: 'go-interface-impl',
  language: 'go',
  lane: 'Build',
  type: 'Timed Implementation',
  concept: 'interfaces',
  conceptTags: ['polymorphism', 'types'],
  difficulty: 3,
  slots: [
    { id: 'NAME', kind: 'identifier', values: ['Sizer', 'Stringer', 'Closer', 'Reader', 'Writer'] },
    { id: 'METHOD', kind: 'identifier', values: ['Size', 'String', 'Close', 'Read', 'Write'] },
    { id: 'RET', kind: 'keyword', values: ['int', 'string', 'error', '[]byte'] }
  ],
  validate: (ctx) => {
    // Basic logic mapping for sensible interfaces
    if (ctx.values.METHOD === 'Size' && ctx.values.RET !== 'int') return { ok: false, reasons: [] };
    if (ctx.values.METHOD === 'String' && ctx.values.RET !== 'string') return { ok: false, reasons: [] };
    if (ctx.values.METHOD === 'Close' && ctx.values.RET !== 'error') return { ok: false, reasons: [] };
    return { ok: true, reasons: [] };
  },
  generatePrompt: (ctx) => `Define an interface '${ctx.values.NAME}' with a method '${ctx.values.METHOD}' returning '${ctx.values.RET}'.`,
  generateCode: () => `type _____ interface {\n    _____\n}`,
  generateAnswer: (ctx) => ({
    mode: 'structural',
    requiredTokens: [ctx.values.NAME as string, ctx.values.METHOD as string, ctx.values.RET as string]
  })
};
