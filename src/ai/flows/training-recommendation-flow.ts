
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating smart training recommendations.
 * It decides which of three types of recommendations to provide based on user performance data:
 * 1. Weak Area Targeting: Focus on the lowest-performing domain.
 * 2. Performance Insight: Capitalize on peak performance times (e.g., morning for EF).
 * 3. Momentum Starter: Build confidence by training in a high-performing domain.
 *
 * - getTrainingRecommendation - A function that takes user data and returns a single, prioritized training recommendation.
 * - TrainingRecommendationInput - The input type for the function.
 * - TrainingRecommendationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { CHCDomain, chcDomains } from '@/types';

const CHCDomainEnum = z.enum([
  'Gf',
  'Gc',
  'Gwm',
  'Gs',
  'Gv',
  'Ga',
  'Glr',
  'EF',
]);

const UserPerformanceSchema = z.object({
  domain: CHCDomainEnum,
  score: z.number().describe('Average score over the last 5 sessions (0-100).'),
  trend: z.number().describe('Percentage change in score over the last 5 sessions.'),
});

const TrainingRecommendationInputSchema = z.object({
  performanceData: z.array(UserPerformanceSchema),
  sessionStreak: z.number().describe('Current daily training streak.'),
  hoursSinceLastSession: z.number().describe('Hours since the user last completed a session.'),
  timeOfDay: z.enum(['morning', 'afternoon', 'evening']).describe('Current time of day for the user.'),
  recentFailures: z.number().describe('Number of failed games or early exits in the last session.'),
});
export type TrainingRecommendationInput = z.infer<typeof TrainingRecommendationInputSchema>;

const RecommendationTypeEnum = z.enum([
  'weakArea',
  'performanceInsight',
  'momentumStarter',
]);

const TrainingRecommendationOutputSchema = z.object({
  recommendationType: RecommendationTypeEnum.describe('The type of recommendation provided.'),
  title: z.string().describe('A catchy, motivating title for the button label.'),
  description: z.string().describe('A short, persuasive reason for this recommendation.'),
  domain: CHCDomainEnum.describe('The recommended CHC domain to train.'),
});
export type TrainingRecommendationOutput = z.infer<typeof TrainingRecommendationOutputSchema>;


export async function getTrainingRecommendation(input: TrainingRecommendationInput): Promise<TrainingRecommendationOutput> {
  return trainingRecommendationFlow(input);
}

const prompt = ai.definePrompt({
    name: 'trainingRecommendationPrompt',
    input: { schema: TrainingRecommendationInputSchema },
    output: { schema: TrainingRecommendationOutputSchema },
    prompt: `You are a cognitive training coach AI. Your goal is to provide a single, highly relevant training recommendation to a user based on their recent performance and context.

Analyze the user's data and choose ONE of the following three recommendation strategies:

1.  **Performance Insight (Highest Priority):** If the user's context matches a known peak performance pattern, recommend that.
    *   *Trigger condition:* User is training in the morning.
    *   *Insight:* Users often exhibit stronger Executive Function (EF) in the morning.
    *   *Action:* If it's morning, recommend 'EF' training. Use a personal, time-sensitive tone.

2.  **Momentum Starter (Second Priority):** If the user needs a confidence boost, recommend their strongest domain.
    *   *Trigger conditions:* User is returning after a break (> 24 hours), has a broken streak (streak is 0 but has trained before), or had recent failures (> 2).
    *   *Action:* Identify the domain with the highest score. Recommend training in that domain to build momentum. Use a confidence-boosting tone.

3.  **Weak Area Targeting (Default Priority):** If no other conditions are met, recommend the user's weakest domain to encourage growth.
    *   *Trigger condition:* Default case when other conditions aren't met.
    *   *Action:* Identify the domain with the lowest score. Recommend training that domain. Frame it as an opportunity for a breakthrough.

**User Data:**
-   **Performance:**
    {{#each performanceData}}
    - Domain: {{this.domain}}, Score: {{this.score}}, Trend: {{this.trend}}%
    {{/each}}
-   **Context:**
    -   Current Streak: {{sessionStreak}} days
    -   Hours Since Last Session: {{hoursSinceLastSession}} hours
    -   Time of Day: {{timeOfDay}}
    -   Recent Failures: {{recentFailures}}

Based on the hierarchy (Performance Insight > Momentum Starter > Weak Area Targeting), determine the single best recommendation and provide the output in the required JSON format.
`,
});

const trainingRecommendationFlow = ai.defineFlow(
  {
    name: 'trainingRecommendationFlow',
    inputSchema: TrainingRecommendationInputSchema,
    outputSchema: TrainingRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
