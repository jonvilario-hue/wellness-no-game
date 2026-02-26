
'use server';
/**
 * @fileOverview AI flow for generating personalized 7-day nutrition plans.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NutritionArchitectInputSchema = z.object({
  dietaryPreference: z.string().describe('Omnivore, Vegan, Keto, etc.'),
  allergies: z.array(z.string()).describe('List of allergies to avoid.'),
  weeklyBudget: z.number().describe('Budget constraint for 7 days.'),
  calorieGoal: z.number().describe('Target daily caloric intake.'),
  healthGoal: z.string().describe('Weight loss, muscle gain, energy focus, etc.'),
  householdSize: z.number().describe('Number of people to cook for.'),
});

const MealSchema = z.object({
  type: z.string().describe('Breakfast, Lunch, Dinner, or Snack.'),
  name: z.string().describe('Name of the dish.'),
  calories: z.number().describe('Estimated calories.'),
  protein: z.number().describe('Grams of protein.'),
  carbs: z.number().describe('Grams of carbs.'),
  fat: z.number().describe('Grams of fat.'),
  ingredients: z.array(z.string()).describe('Core ingredients list.'),
});

const NutritionArchitectOutputSchema = z.object({
  title: z.string().describe('A motivating title for the plan.'),
  days: z.array(z.object({
    day: z.number(),
    meals: z.array(MealSchema),
  })).length(7),
});

export type NutritionArchitectInput = z.infer<typeof NutritionArchitectInputSchema>;
export type NutritionArchitectOutput = z.infer<typeof NutritionArchitectOutputSchema>;

export async function generateNutritionPlan(input: NutritionArchitectInput): Promise<NutritionArchitectOutput> {
  const prompt = ai.definePrompt({
    name: 'nutritionArchitectPrompt',
    input: { schema: NutritionArchitectInputSchema },
    output: { schema: NutritionArchitectOutputSchema },
    prompt: `You are an elite Performance Nutritionist and Financial Architect.
    Generate a 7-day meal plan based on the following profile:
    
    Preference: {{{dietaryPreference}}}
    Allergies: {{{allergies}}}
    Calorie Goal: {{{calorieGoal}}} kcal/day
    Health Goal: {{{healthGoal}}}
    Weekly Budget: \${{{weeklyBudget}}}
    Household Size: {{{householdSize}}}
    
    Guidelines:
    1. Stay strictly within the budget.
    2. Ensure every meal respects the allergies list.
    3. Balance macros based on the Health Goal (e.g., high protein for muscle gain).
    4. Provide clear, appetizing meal names.
    5. Ensure variety across the 7 days.`,
  });

  const { output } = await prompt(input);
  if (!output) throw new Error('AI failed to generate nutrition plan.');
  return output;
}
