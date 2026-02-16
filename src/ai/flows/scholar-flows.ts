'use server';
/**
 * @fileOverview AI flows for Scholar Hub learning tools.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// --- Why-Chain Flow ---
const WhyChainInputSchema = z.object({
  topic: z.string().describe('The concept to explore deeply.'),
});

const WhyChainOutputSchema = z.object({
  questions: z.array(z.string()).length(5).describe('5 progressively deeper questions.'),
});

export const generateWhyChain = ai.defineFlow(
  {
    name: 'generateWhyChain',
    inputSchema: WhyChainInputSchema,
    outputSchema: WhyChainOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
      name: 'whyChainPrompt',
      input: { schema: WhyChainInputSchema },
      output: { schema: WhyChainOutputSchema },
      prompt: `You are an expert educator specializing in Elaborative Interrogation.
      Generate 5 progressively deeper "why" or "how" questions about the topic: "{{{topic}}}".
      The questions should start with basic foundational concepts and move toward complex systemic connections or underlying principles.`,
    });
    const { output } = await prompt(input);
    return output!;
  }
);

// --- Concrete Example Flow ---
const ExampleInputSchema = z.object({
  concept: z.string().describe('The abstract concept.'),
});

const ExampleOutputSchema = z.object({
  example: z.string().describe('A clear, real-world example.'),
});

export const generateStarterExample = ai.defineFlow(
  {
    name: 'generateStarterExample',
    inputSchema: ExampleInputSchema,
    outputSchema: ExampleOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
      name: 'examplePrompt',
      input: { schema: ExampleInputSchema },
      output: { schema: ExampleOutputSchema },
      prompt: `Provide one clear, relatable, real-world example of the abstract concept: "{{{concept}}}".
      The example should be concise and illustrate the core principle clearly.`,
    });
    const { output } = await prompt(input);
    return output!;
  }
);
