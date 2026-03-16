
import { DrillTemplateFamily } from '@/types/drills';

export const bashCondFamily: DrillTemplateFamily = {
  id: 'bash-cond-numeric',
  language: 'bash',
  lane: 'Write',
  type: 'Syntax Sprints',
  concept: 'conditionals',
  conceptTags: ['numeric'],
  difficulty: 1,
  slots: [
    { id: 'OP', kind: 'operator', values: ['-eq', '-ne', '-gt', '-lt'] }
  ],
  validate: () => ({ ok: true, reasons: [] }),
  generatePrompt: (ctx) => `Write a test that checks if '$x' is ${ctx.values.OP === '-gt' ? 'greater than' : 'equal to'} 10.`,
  generateCode: () => `if [ $x _____ 10 ]; then`,
  generateAnswer: (ctx) => ({
    mode: 'tokenProbe',
    requiredTokens: ['[', '$x', ctx.values.OP as string, '10', ']', ';']
  })
};
