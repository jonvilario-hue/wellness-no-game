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
    .describe('An array of training recommendations for the user. This will be empty if there is not enough data.'),
  message: z
    .string()
    .optional()
    .describe('A message to the user, especially if there is not enough data to generate recommendations.'),
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
  prompt: `You are an AI-powered cognitive training assistant. Your task is to analyze a user's performance data and suggest focus areas for improvement.

Follow these steps:
1.  Review the user's performance data. Check if the user has completed at least 5 sessions in at least three different domains.
2.  If the user has NOT met this criteria, do not provide any recommendations. Instead, set the "recommendations" array to be empty and provide a friendly "message" explaining that more training data is needed. For example: "I need a little more data to find your weak spots. Try completing a few more different training sessions!".
3.  If the user HAS met the criteria, identify the 2-3 domains with the lowest scores. These are the user's weak areas.
4.  For each weak area, recommend a specific, engaging training exercise or puzzle. Explain concisely why this exercise is suitable for improving that specific cognitive domain.
5.  Format the output as a JSON object with a "recommendations" array. If you provided a message in step 2, include the "message" field.

User Performance Data:
{{#each performanceData}}
- Domain: {{this.domain}}, Score: {{this.score}}, Sessions: {{this.sessions}}
{{/each}}

Produce the output in the specified JSON format.
`,
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
