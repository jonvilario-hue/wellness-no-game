import { GeneratedAnswer, GradingResult } from '@/types/drills';

export function gradeAnswer(userInput: string, answer: GeneratedAnswer): GradingResult {
  const normalizedInput = userInput.trim().replace(/\s+/g, ' ');
  const inputLower = normalizedInput.toLowerCase();
  
  switch (answer.mode) {
    case 'multipleChoice': {
      const isCorrect = normalizedInput.toLowerCase() === answer.correct.trim().toLowerCase();
      return {
        isCorrect,
        feedback: isCorrect ? undefined : "That's a common misconception. Review the core rules for this concept."
      };
    }
    
    case 'exact': {
      const isCorrect = normalizedInput.toLowerCase() === answer.correct.trim().toLowerCase() ||
                        !!answer.accepted?.some(alt => normalizedInput.toLowerCase() === alt.trim().toLowerCase());
      return {
        isCorrect,
        feedback: isCorrect ? undefined : `Expected exact match: ${answer.correct}`
      };
    }

    case 'tokenProbe': {
      const missing = answer.requiredTokens.filter(t => !inputLower.includes(t.toLowerCase()));
      const forbidden = answer.forbiddenTokens?.find(t => inputLower.includes(t.toLowerCase()));
      
      if (forbidden) return { isCorrect: false, feedback: `Syntactic violation: Do not use "${forbidden}" in this context.` };
      if (missing.length > 0) return { isCorrect: false, feedback: `Incomplete logic: Check for missing "${missing[0]}" syntax.` };
      
      return { isCorrect: true };
    }

    case 'structural': {
      const missing = answer.requiredTokens.filter(t => !inputLower.includes(t.toLowerCase()));
      if (missing.length > 0) return { isCorrect: false, feedback: `Missing core logic: Ensure you include "${missing[0]}".` };

      const forbidden = answer.forbiddenTokens?.find(t => inputLower.includes(t.toLowerCase()));
      if (forbidden) return { isCorrect: false, feedback: `Structural error: "${forbidden}" is not used in this pattern.` };

      if (answer.requiredSequences) {
        for (const seq of answer.requiredSequences) {
          let lastIndex = -1;
          for (const token of seq) {
            const index = inputLower.indexOf(token.toLowerCase(), lastIndex + 1);
            if (index === -1) return { isCorrect: false, feedback: `Check your sequence order. Part of the logic is in the wrong place.` };
            lastIndex = index;
          }
        }
      }
      return { isCorrect: true };
    }

    default:
      return { isCorrect: false, feedback: "Internal evaluation error." };
  }
}
