// Weak Area Targeting [GenAI]: Smart repeat algorithms identify weak areas for revisit across all 8 CHC domains.
// A tool for helping the user train the appropriate skills.

'use server';
/**
 * @fileOverview This file defines a Genkit flow for identifying a user's weak areas across the 8 CHC domains
 * and recommending specific training exercises or puzzles to help improve those areas.
 *
 * - weakAreaRecommendation - A function that takes user's performance data and returns recommendations for weak area training.
 * - WeakAreaRecommendationInput - The input type for the weakAreaRecommendation function.
 * - WeakAreaRecommendationOutput - The return type for the weakAreaRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CHCDomainSchema = z.enum([
  'Gf',
  'Gc',
  'Gwm',
  'Gs',
  'Gv',
  'Ga',
  'Glr',
  'EF',
]);

const UserPerformanceDataSchema = z.object({
  domain: CHCDomainSchema.describe('The CHC domain the performance data is for'),
  score: z.number().describe('The user score in the domain'),
  sessions: z.number().describe('The number of training sessions completed in the domain'),
});

const WeakAreaRecommendationInputSchema = z.object({
  performanceData: z
    .array(UserPerformanceDataSchema)
    .describe('The user performance data across all 8 CHC domains.'),
});
export type WeakAreaRecommendationInput = z.infer<
  typeof WeakAreaRecommendationInputSchema
>;

const TrainingRecommendationSchema = z.object({
  domain: CHCDomainSchema.describe('The CHC domain for the recommended training.'),
  exercise: z.string().describe('A specific training exercise or puzzle to improve the identified weak area.'),
  reason: z.string().describe('Why this exercise is recommended for this particular weak area'),
});

const WeakAreaRecommendationOutputSchema = z.object({
  recommendations: z
    .array(TrainingRecommendationSchema)
    .describe('An array of training recommendations for the user.'),
});
export type WeakAreaRecommendationOutput = z.infer<
  typeof WeakAreaRecommendationOutputSchema
>;

export async function weakAreaRecommendation(
  input: WeakAreaRecommendationInput
): Promise<WeakAreaRecommendationOutput> {
  return weakAreaRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weakAreaRecommendationPrompt',
  input: {schema: WeakAreaRecommendationInputSchema},
  output: {schema: WeakAreaRecommendationOutputSchema},
  prompt: `You are an AI-powered cognitive training assistant. Analyze the user's performance data across the 8 CHC domains (Gf, Gc, Gwm, Gs, Gv, Ga, Glr, EF) and identify weak areas where the user needs the most improvement. Based on the weak areas, recommend specific training exercises or puzzles to help the user improve in those areas. Explain why the recommended exercises are appropriate for the identified weak areas.

User Performance Data:
{{#each performanceData}}
- Domain: {{this.domain}}, Score: {{this.score}}, Sessions: {{this.sessions}}
{{/each}}

Based on this data, provide a list of training recommendations in JSON format.

Each recommendation should include the domain, a specific exercise/puzzle, and a reason for the recommendation.

Output should be in JSON format:

{ "recommendations": [ { "domain": "<domain>",   "exercise": "<exercise name>",  "reason": "<reason>"  } ]}`,
});

const weakAreaRecommendationFlow = ai.defineFlow(
  {
    name: 'weakAreaRecommendationFlow',
    inputSchema: WeakAreaRecommendationInputSchema,
    outputSchema: WeakAreaRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
