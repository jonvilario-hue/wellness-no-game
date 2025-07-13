
'use server';
/**
 * @fileOverview Defines a deterministic flow for generating a daily 3-part "Cognitive Circuit" challenge.
 *
 * - getDailyCircuit - A function that returns a unique 3-part training circuit for the day.
 * - DailyCircuitOutput - The return type for the getDailyCircuit function.
 */

import { z } from 'zod';
import type { CHCDomain } from '@/types';
import { chcDomains } from '@/types';

const CircuitDomainEnum = z.enum([
  'Gf', 'Gc', 'Gwm', 'Gs', 'Gv', 'Ga', 'Glr', 'EF'
]);

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


const getDomainInfo = (domainKey: CHCDomain) => {
    const domain = chcDomains.find(d => d.key === domainKey);
    return {
        name: domain?.name || 'Training',
        gameTitle: domain?.gameTitle || 'Brain Game',
        transferAnchor: domain ? `Helps with ${domain.description.toLowerCase().replace('.', '')}.` : 'Helps with cognitive skills.',
    };
};

// Deterministically selects 3 domains based on the day of the week to ensure variety.
const getTodayChallengeSet = (): CHCDomain[] => {
  const dayOfWeek = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
  
  // A curated list of domains to ensure they rotate daily and are sorted alphabetically for predictability
  const sortedDomains = [...chcDomains].sort((a,b) => a.key < b.key ? -1 : 1).map(d => d.key);
  
  // This ensures a different, predictable set every day
  return [
      sortedDomains[dayOfWeek % 8],
      sortedDomains[(dayOfWeek + 2) % 8],
      sortedDomains[(dayOfWeek + 4) % 8],
  ];
}


export async function getDailyCircuit(): Promise<DailyCircuitOutput> {
  const selectedDomains = getTodayChallengeSet();
  
  const segments = selectedDomains.map(domainKey => {
    const { name, gameTitle, transferAnchor } = getDomainInfo(domainKey);
    return {
      domain: domainKey,
      title: `${name}`,
      gameTitle,
      transferAnchor,
    };
  });

  return {
    circuitTitle: "Today's Cognitive Circuit",
    segments,
  };
}
