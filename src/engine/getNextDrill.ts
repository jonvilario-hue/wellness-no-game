
import { Language, Lane, DrillType, GeneratedDrill } from '@/types/drills';
import { recentlySeenHashes, addHistory } from './history';
import { selectFamily } from './selectFamily';
import { generateFromFamily } from './generateDrill';
import { allFamilies } from '@/data/families';

/**
 * Procedural Drill Generator Entry Point.
 * 
 * Logic:
 * 1. Tries to find a unique drill (not in recent history).
 * 2. If it fails after multiple attempts, it returns a valid drill even if recently seen.
 * 3. This ensures the user never hits a "Library Empty" state.
 */
export function getNextDrill(language: Language, lane: Lane, type: DrillType): GeneratedDrill {
  const seenHashes = recentlySeenHashes();
  let attempts = 0;
  let lastValidDrill: GeneratedDrill | null = null;

  // Attempt to find a unique drill
  while (attempts < 30) {
    try {
      const family = selectFamily(allFamilies, language, lane, type);
      const drill = generateFromFamily(family);
      
      lastValidDrill = drill;

      if (seenHashes.has(drill.metadata.hash)) {
        attempts++;
        continue;
      }

      // Found a unique drill
      addHistory({
        hash: drill.metadata.hash,
        templateId: drill.templateId,
        concept: drill.concept,
        timestamp: Date.now(),
        language: drill.language,
        lane: drill.lane,
        type: drill.type
      });

      return drill;
    } catch (e) {
      attempts++;
    }
  }

  // If we reach here, we've failed to find a unique one within attempts.
  // We return the last valid one we managed to generate to keep the loop going.
  if (lastValidDrill) {
    return lastValidDrill;
  }

  // Extreme fallback if selectFamily fails (e.g. invalid category requested)
  throw new Error(`Critical: No families found for ${language}/${lane}/${type}`);
}
