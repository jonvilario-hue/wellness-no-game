
import { DrillTemplateFamily } from '@/types/drills';

export const bashRedirectFamily: DrillTemplateFamily = {
  id: 'bash-redir-err',
  language: 'bash',
  lane: 'Write',
  type: 'Code Reconstruction',
  concept: 'redirection',
  conceptTags: ['io'],
  difficulty: 2,
  slots: [
    { id: 'TARGET', kind: 'identifier', values: ['log.txt', 'error.log'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Redirect BOTH stdout and stderr to '${ctx.values.TARGET}'.`,
  generateCode: () => `ls -R /root _____`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['&>', ctx.values.TARGET as string],
    accepted: ['> ' + ctx.values.TARGET + ' 2>&1']
  })
};
