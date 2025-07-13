'use server';
/**
 * @fileOverview Defines a Genkit flow for generating a daily 3-part "Cognitive Circuit" challenge.
 *
 * - getDailyCircuit - A function that returns a unique 3-part training circuit for the day.
 * - DailyCircuitOutput - The return type for the getDailyCircuit function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { CHCDomain, chcDomains } from '@/types';

// Use a subset of domains suitable for a "circuit"
const CircuitDomainEnum = z.enum([
  'Gf',
  'Gwm',
  'Gs',
  'Gv',
  'EF',
  'Glr',
]);
type CircuitDomain = z.infer<typeof CircuitDomainEnum>;

const CircuitSegmentSchema = z.object({
  domain: CircuitDomainEnum.describe("The CHC domain for this segment."),
  title: z.string().describe("A catchy, motivating title for the training segment (e.g., 'Logic Flow', 'Attention Filter')."),
  transferAnchor: z.string().describe("A short, compelling description of the real-world benefit of this task. Frame it as 'Helps with...'."),
  gameTitle: z.string().describe("The specific name of the game for this segment."),
});

const DailyCircuitOutputSchema = z.object({
  circuitTitle: z.string().describe("An overarching, exciting title for the entire daily challenge (e.g., 'The Focus Catalyst Circuit')."),
  segments: z.array(CircuitSegmentSchema).length(3).describe("An array of exactly three training segments for the daily circuit."),
});
export type DailyCircuitOutput = z.infer<typeof DailyCircuitOutputSchema>;

export async function getDailyCircuit(): Promise<DailyCircuitOutput> {
  // Use a deterministic seed for the day to ensure the circuit is the same for a user.
  const dailySeed = new Date().toISOString().slice(0, 10);
  return dailyCircuitFlow(dailySeed);
}

const prompt = ai.definePrompt({
  name: 'dailyCircuitPrompt',
  input: { schema: z.string() },
  output: { schema: DailyCircuitOutputSchema },
  prompt: `You are an expert cognitive training designer. Your task is to create a compelling, 3-part "Cognitive Circuit" for a daily challenge. The circuit must be varied, engaging, and grounded in cognitive science.

Rules:
1.  **Select Three Distinct Domains:** From the available domains (Gf, Gwm, Gs, Gv, EF, Glr), choose three *different* domains for the circuit. The combination should be interesting. For example, a good mix could be Gf (logic), Gs (speed), and EF (focus).
2.  **Create Catchy Titles:** Give each segment a short, exciting title that hints at the cognitive skill being trained.
3.  **Write "Transfer Anchors":** For each segment, provide a "transferAnchor" that clearly and concisely explains the real-world benefit. Start it with "Helps with...".
4.  **Use Specific Game Titles:** Use the provided game titles for each domain.
5.  **Give the Circuit a Cool Name:** Create an overarching "circuitTitle" for the entire challenge.

Available Domains and Game Titles:
-   **Gf (Fluid Reasoning):** Pattern Matrix
-   **Gwm (Working Memory):** Dynamic Sequence Transformer
-   **Gs (Processing Speed):** Rapid Code Match
-   **Gv (Visual Processing):** Mental Rotation Lab
-   **EF (Executive Functioning):** Focus Switch Reactor
-   **Glr (Long-Term Retrieval):** Semantic Fluency Storm

**Daily Seed:** {{prompt}}

Based on this seed, generate a unique and exciting 3-part cognitive circuit. Ensure the output is in the required JSON format.
`,
});

const dailyCircuitFlow = ai.defineFlow(
  {
    name: 'dailyCircuitFlow',
    inputSchema: z.string(),
    outputSchema: DailyCircuitOutputSchema,
  },
  async (seed) => {
    const { output } = await prompt(seed);
    return output!;
  }
);
