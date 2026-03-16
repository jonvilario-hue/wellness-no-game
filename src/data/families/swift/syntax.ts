
import { DrillTemplateFamily } from '@/types/drills';

export const swiftSyntaxFamily: DrillTemplateFamily = {
  id: 'swift-guard-let',
  language: 'swift',
  lane: 'Write',
  type: 'Syntax Sprints',
  concept: 'unwrapping',
  conceptTags: ['idioms'],
  difficulty: 1,
  slots: [
    { id: 'NAME', kind: 'identifier', values: ['user', 'profile', 'token'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Use 'guard let' to unwrap optional '${ctx.values.NAME}'.`,
  generateCode: () => `func check(_____) {\n    _____ else { return }\n}`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['guard', 'let', ctx.values.NAME as string, 'else', 'return']
  })
};
