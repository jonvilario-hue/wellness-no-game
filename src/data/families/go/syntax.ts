
import { DrillTemplateFamily } from '@/types/drills';

export const goSyntaxFamily: DrillTemplateFamily = {
  id: 'go-err-return',
  language: 'go',
  lane: 'Write',
  type: 'Syntax Sprints',
  concept: 'errors',
  conceptTags: ['idioms', 'functions'],
  difficulty: 1,
  slots: [
    { id: 'NAME', kind: 'identifier', values: ['Calculate', 'Fetch', 'Save', 'Process'] },
    { id: 'MSG', kind: 'literal', values: ['failed', 'unauthorized', 'not found'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Write a function '${ctx.values.NAME}' that returns an error with the message "${ctx.values.MSG}".`,
  generateCode: () => `func _____() error {\n    return _____.New("_____")\n}`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['func', ctx.values.NAME as string, 'errors', 'New', ctx.render(ctx.values.MSG)]
  })
};
