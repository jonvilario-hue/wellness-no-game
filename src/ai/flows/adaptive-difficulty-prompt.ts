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
  prompt: `You are an expert cognitive training assistant. Your role is to adjust the difficulty of puzzles based on the user's skill level in a specific CHC domain.

  CHC Domain: {{{chcDomain}}}
  User Skill Level (0-100): {{{userSkillLevel}}}

  Based on the user's skill level, determine the appropriate difficulty level for the next puzzle. The difficulty levels are Easy, Medium, and Hard.

  Consider the following guidelines:
  - If the user's skill level is below 30, the difficulty should be Easy.
  - If the user's skill level is between 30 and 70, the difficulty should be Medium.
  - If the user's skill level is above 70, the difficulty should be Hard.

  Explain your reasoning for the difficulty adjustment in a concise manner.

  Output the adjusted difficulty and the reasoning in the specified JSON format.
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



















































































































































































































































































