
import { DrillTemplateFamily } from '@/types/drills';

export const tsMappedFamily: DrillTemplateFamily = {
  id: 'ts-mapped-modifier',
  language: 'typescript',
  lane: 'Write',
  type: 'Code Reconstruction',
  concept: 'mapped-types',
  conceptTags: ['utility-types'],
  difficulty: 3,
  slots: [
    { id: 'MODIFIER', kind: 'keyword', values: ['Partial', 'Readonly', 'Required'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Apply the '${ctx.values.MODIFIER}' modifier to the 'User' interface.`,
  generateCode: () => `interface User { id: number; name: string; }\ntype ModUser = _____<User>;`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: [ctx.values.MODIFIER as string, 'User']
  })
};
