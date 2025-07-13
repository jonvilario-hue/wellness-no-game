'use server';

/**
 * @fileOverview A flow to determine the adaptive difficulty of a puzzle based on user performance.
 *
 * - adaptDifficulty - A function that adjusts puzzle difficulty based on user skill level.
 * - AdaptDifficultyInput - The input type for the adaptDifficulty function.
 * - AdaptDifficultyOutput - The return type for the adaptDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptDifficultyInputSchema = z.object({
  chcDomain: z.string().describe('The CHC domain the user is training in.'),
  userSkillLevel: z.number().describe('The user skill level in the specified CHC domain (0-100).'),
});
export type AdaptDifficultyInput = z.infer<typeof AdaptDifficultyInputSchema>;

const AdaptDifficultyOutputSchema = z.object({
  adjustedDifficulty: z.string().describe('The adjusted difficulty level of the puzzle (Easy, Medium, Hard).'),
  reasoning: z.string().describe('The reasoning for the difficulty adjustment based on user skill.'),
});
export type AdaptDifficultyOutput = z.infer<typeof AdaptDifficultyOutputSchema>;

export async function adaptDifficulty(input: AdaptDifficultyInput): Promise<AdaptDifficultyOutput> {
  return adaptDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptDifficultyPrompt',
  input: {schema: AdaptDifficultyInputSchema},
  output: {schema: AdaptDifficultyOutputSchema},
  prompt: `You are an expert cognitive training assistant. Your role is to suggest a puzzle difficulty based on a user's self-reported skill level in a CHC domain.

Follow these rules:
- Skill level < 30: "Easy"
- Skill level >= 30 and <= 70: "Medium"
- Skill level > 70: "Hard"

The user is training in "{{chcDomain}}" and their skill level is {{userSkillLevel}}.

Based on this, determine the appropriate difficulty. Provide a brief, encouraging reason for your choice.
`,
});

const adaptDifficultyFlow = ai.defineFlow(
  {
    name: 'adaptDifficultyFlow',
    inputSchema: AdaptDifficultyInputSchema,
    outputSchema: AdaptDifficultyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
