
import { DrillTemplateFamily } from '@/types/drills';

export const swiftProtocolFamily: DrillTemplateFamily = {
  id: 'swift-proto-conf',
  language: 'swift',
  lane: 'Write',
  type: 'Code Reconstruction',
  concept: 'protocols',
  conceptTags: ['types'],
  difficulty: 2,
  slots: [
    { id: 'NAME', kind: 'identifier', values: ['Identifiable', 'CustomStringConvertible'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Make struct 'User' conform to '${ctx.values.NAME}'.`,
  generateCode: () => `struct User { let id: String }\nextension User: _____ { }`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: [ctx.values.NAME as string, 'extension', 'User']
  })
};
