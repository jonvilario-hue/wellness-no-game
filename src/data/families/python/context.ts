import { DrillTemplateFamily } from '@/types/drills';

export const pyContextFamily: DrillTemplateFamily = {
  id: 'py-with-statement',
  language: 'python',
  lane: 'Write',
  type: 'Syntax Sprints',
  concept: 'context-managers',
  conceptTags: ['io', 'resources'],
  difficulty: 1,
  slots: [
    { id: 'NAME', kind: 'identifier', values: ['f', 'file', 'stream'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: () => "Open 'data.txt' for reading using a context manager.",
  generateCode: () => `# Complete the statement\n_____ open("data.txt") _____ ${ctx => ctx.values.NAME}:\n    pass`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['with', 'as', ctx.values.NAME as string]
  })
};
