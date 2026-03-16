import { DrillTemplateFamily, Language, Lane, DrillType } from '@/types/drills';
import { recentlySeenConcepts } from './history';

export function selectFamily(
  families: DrillTemplateFamily[], 
  language: Language, 
  lane: Lane, 
  type: DrillType
): DrillTemplateFamily {
  const candidates = families.filter(f => 
    f.language === language && f.lane === lane && f.type === type
  );

  if (candidates.length === 0) {
    throw new Error(`No families found for ${language}/${lane}/${type}`);
  }

  const seenConcepts = recentlySeenConcepts(language, lane, type);
  
  // Weighting logic
  const weightedCandidates = candidates.map(f => ({
    family: f,
    weight: seenConcepts.has(f.concept) ? 0.2 : 1.0
  }));

  const totalWeight = weightedCandidates.reduce((sum, c) => sum + c.weight, 0);
  let random = Math.random() * totalWeight;

  for (const candidate of weightedCandidates) {
    if (random < candidate.weight) return candidate.family;
    random -= candidate.weight;
  }

  return candidates[0];
}
