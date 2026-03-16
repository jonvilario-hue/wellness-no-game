import { GeneratedAnswer } from '@/types/drills';

export function gradeAnswer(userInput: string, answer: GeneratedAnswer): boolean {
  const normalizedInput = userInput.trim().replace(/\s+/g, ' ');
  
  switch (answer.mode) {
    case 'multipleChoice':
      return normalizedInput.toLowerCase() === answer.correct.trim().toLowerCase();
    
    case 'exact':
      const isCorrect = normalizedInput.toLowerCase() === answer.correct.trim().toLowerCase();
      if (isCorrect) return true;
      return !!answer.accepted?.some(alt => normalizedInput.toLowerCase() === alt.trim().toLowerCase());

    case 'tokenProbe': {
      const inputLower = normalizedInput.toLowerCase();
      const hasAllRequired = answer.requiredTokens.every(t => inputLower.includes(t.toLowerCase()));
      const hasForbidden = answer.forbiddenTokens?.some(t => inputLower.includes(t.toLowerCase()));
      return hasAllRequired && !hasForbidden;
    }

    case 'structural': {
      const inputLower = normalizedInput.toLowerCase();
      const hasAllRequired = answer.requiredTokens.every(t => inputLower.includes(t.toLowerCase()));
      if (!hasAllRequired) return false;

      const hasForbidden = answer.forbiddenTokens?.some(t => inputLower.includes(t.toLowerCase()));
      if (hasForbidden) return false;

      if (answer.requiredSequences) {
        for (const seq of answer.requiredSequences) {
          let lastIndex = -1;
          for (const token of seq) {
            const index = inputLower.indexOf(token.toLowerCase(), lastIndex + 1);
            if (index === -1) return false;
            lastIndex = index;
          }
        }
      }
      return true;
    }

    default:
      return false;
  }
}
