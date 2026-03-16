import { Language, Lane, DrillType, GeneratedDrill } from '@/types/drills';
import { recentlySeenHashes, addHistory } from './history';
import { selectFamily } from './selectFamily';
import { generateFromFamily } from './generateDrill';
import { allFamilies } from '@/data/families';

export function getNextDrill(language: Language, lane: Lane, type: DrillType): GeneratedDrill {
  const seenHashes = recentlySeenHashes();
  let attempts = 0;

  while (attempts < 30) {
    try {
      const family = selectFamily(allFamilies, language, lane, type);
      const drill = generateFromFamily(family);

      if (seenHashes.has(drill.metadata.hash)) {
        attempts++;
        continue;
      }

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

  throw new Error("Exhausted all attempts to generate a unique drill");
}
