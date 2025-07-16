
'use server';
/**
 * @fileOverview Defines an AI-driven flow for generating a daily 3-part "Training Sequence" challenge.
 *
 * - getDailyCircuit - A function that returns a unique 3-part training circuit for the day with AI-generated titles.
 * - DailyCircuitOutput - The return type for the getDailyCircuit function.
 */

import {z} from 'zod';
import type {CHCDomain} from '@/types';
import {chcDomains} from '@/types';
import {ai} from '@/ai/genkit';

const CircuitDomainEnum = z.enum(['Gf', 'Gc', 'Gwm', 'Gs', 'Gv', 'Ga', 'Glr', 'EF']);

const CircuitSegmentSchema = z.object({
  domain: CircuitDomainEnum.describe('The CHC domain for this segment.'),
  title: z
    .string()
    .describe(
      "A catchy, motivating title for the training segment (e.g., 'Logic Flow', 'Attention Filter')."
    ),
  gameTitle: z.string().describe('The specific name of the game for this segment.'),
  transferAnchor: z
    .string()
    .describe(
      "A short, compelling description of the real-world benefit of this task. Frame it as 'Helps with...'."
    ),
});

const DailyCircuitOutputSchema = z.object({
  circuitTitle: z
    .string()
    .describe(
      "An overarching, exciting title for the entire daily challenge (e.g., 'The Focus Catalyst Sequence')."
    ),
  segments: z
    .array(CircuitSegmentSchema)
    .length(3)
    .describe('An array of exactly three training segments for the daily circuit.'),
});
export type DailyCircuitOutput = z.infer<typeof DailyCircuitOutputSchema>;

// Helper to get static info for a domain
const getDomainInfo = (domainKey: CHCDomain) => {
  const domain = chcDomains.find(d => d.key === domainKey);
  return {
    name: domain?.name || 'Training',
    gameTitle: domain?.gameTitle || 'Brain Game',
    transferAnchor: domain
      ? `Helps with ${domain.description.toLowerCase().replace('.', '')}.`
      : 'Helps with cognitive skills.',
  };
};

// Deterministically selects 3 domains based on the day of the week to ensure variety.
const getTodayChallengeSet = (): CHCDomain[] => {
  const dayOfWeek = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)

  // A curated list of domains to ensure they rotate daily and are sorted for predictability
  const sortedDomains = [...chcDomains].sort((a, b) => (a.key < b.key ? -1 : 1)).map(d => d.key);

  // This ensures a different, predictable set every day
  return [sortedDomains[dayOfWeek % 8], sortedDomains[(dayOfWeek + 2) % 8], sortedDomains[(dayOfWeek + 4) % 8]];
};

const AIGeneratedTitlesSchema = z.object({
    circuitTitle: z.string().describe("An overarching, exciting title for the entire daily challenge (e.g., 'The Focus Catalyst Sequence')."),
    segmentTitles: z.array(z.string()).length(3).describe("An array of exactly three short, catchy titles for the training segments.")
});

const dailyCircuitPrompt = ai.definePrompt({
  name: 'dailyCircuitPrompt',
  input: {
    schema: z.object({
      domain1: z.string(),
      domain2: z.string(),
      domain3: z.string(),
    }),
  },
  output: {schema: AIGeneratedTitlesSchema},
  prompt: `
    You are a cognitive science coach creating a daily brain training routine.
    Your task is to generate an exciting and motivating set of titles for a 3-part training circuit.
    
    The three cognitive domains for today are:
    1. {{{domain1}}}
    2. {{{domain2}}}
    3. {{{domain3}}}

    Based on these domains, generate an exciting overall "Circuit Title" for the whole session.
    Then, for each of the three domains, create a short, catchy "Segment Title" and return them in the 'segmentTitles' array.
    
    For example, if the domains are Working Memory, Fluid Reasoning, and Executive Function, you might generate:
    - circuitTitle: "The Mental Architect Sequence"
    - segmentTitles: ["Memory Matrix", "Logic Flow", "Attention Filter"]
    
    Return the response in the specified JSON format.
  `,
});

export async function getDailyCircuit(): Promise<DailyCircuitOutput> {
  const selectedDomains = getTodayChallengeSet();
  const [d1, d2, d3] = selectedDomains.map(key => getDomainInfo(key).name);

  // Call the AI to get creative titles
  const {output} = await dailyCircuitPrompt({
    domain1: d1,
    domain2: d2,
    domain3: d3,
  });

  if (!output || !output.segmentTitles || output.segmentTitles.length !== 3) {
    throw new Error('AI failed to generate a valid daily circuit with 3 segment titles.');
  }

  // Combine AI titles with static domain data
  const finalSegments = selectedDomains.map((domainKey, index) => {
    const staticInfo = getDomainInfo(domainKey);
    return {
      domain: domainKey,
      title: output.segmentTitles[index],
      gameTitle: staticInfo.gameTitle,
      transferAnchor: staticInfo.transferAnchor,
    };
  });

  return {
    circuitTitle: output.circuitTitle,
    segments: finalSegments as [any, any, any],
  };
}
