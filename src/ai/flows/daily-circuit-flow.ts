
'use server';
/**
 * @fileOverview Defines a Genkit flow for generating a daily 3-part "Cognitive Circuit" challenge.
 *
 * - getDailyCircuit - A function that returns a unique 3-part training circuit for the day.
 * - DailyCircuitOutput - The return type for the getDailyCircuit function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { CHCDomain } from '@/types';
import { chcDomains } from '@/types';

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
  // Use a deterministic seed for the day to ensure the circuit is the same for all users.
  const dailySeed = new Date().toISOString().slice(0, 10);
  return dailyCircuitFlow(dailySeed);
}

const getDomainInfo = (domainKey: CircuitDomain) => {
    const domain = chcDomains.find(d => d.key === domainKey);
    return {
        gameTitle: domain?.gameTitle || 'Training',
        transferAnchor: domain ? `Helps with ${domain.description.toLowerCase().replace('.', '')}.` : 'Helps with cognitive skills.',
    };
};

const createDefaultCircuit = (): DailyCircuitOutput => {
    const defaultDomains: CircuitDomain[] = ['Gf', 'Gwm', 'EF'];
    return {
        circuitTitle: "The Core Focus Circuit",
        segments: defaultDomains.map(domain => {
            const { gameTitle, transferAnchor } = getDomainInfo(domain);
            return {
                domain: domain,
                title: `${chcDomains.find(d => d.key === domain)?.name || 'Training'} Drill`,
                gameTitle,
                transferAnchor,
            };
        })
    };
};

const prompt = ai.definePrompt({
  name: 'dailyCircuitPrompt',
  input: { schema: z.string() },
  output: { schema: DailyCircuitOutputSchema },
  prompt: `You are a cognitive training designer. Create a compelling, 3-part "Cognitive Circuit" for a daily challenge based on the provided daily seed.

Rules:
1.  **Select Three Distinct Domains:** Choose three *different* domains from: Gf, Gwm, Gs, Gv, EF, Glr.
2.  **Generate Catchy Titles:** Create a cool, overarching circuit title and catchy titles for each of the three segments.
3.  **Provide Transfer Anchors:** For each segment, provide a "transferAnchor" that starts with "Helps with...".
4.  **Use Specific Game Titles:**
    - Gf: Pattern Matrix
    - Gwm: Dynamic Sequence Transformer
    - Gs: Rapid Code Match
    - Gv: Mental Rotation Lab
    - EF: Focus Switch Reactor
    - Glr: Semantic Fluency Storm

**Daily Seed:** {{prompt}}

Generate a unique and exciting 3-part cognitive circuit based on this seed. Ensure the domains are distinct.
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
    if (!output) {
      console.warn('Daily circuit generation failed. Using default circuit.');
      return createDefaultCircuit();
    }

    // Validate that the domains are unique. If not, use the default.
    const domains = new Set(output.segments.map(s => s.domain));
    if (domains.size !== 3) {
        console.warn(`AI returned non-unique domains: ${[...domains].join(', ')}. Using default circuit.`);
        return createDefaultCircuit();
    }
    
    return output;
  }
);
