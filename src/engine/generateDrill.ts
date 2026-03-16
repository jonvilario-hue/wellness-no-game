import { DrillTemplateFamily, GeneratedDrill, FamilyRenderContext } from '@/types/drills';
import { selectSlotValues } from './slotSelection';
import { renderValueForLanguage } from './renderers';
import { hashDrill } from './hashing';

export function generateFromFamily(family: DrillTemplateFamily, maxAttempts = 50): GeneratedDrill {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const values = selectSlotValues(family.slots);
      
      const ctx: FamilyRenderContext = {
        language: family.language,
        lane: family.lane,
        type: family.type,
        values,
        render: (val, hint) => renderValueForLanguage(family.language, val, hint)
      };

      const validation = family.validate(ctx);
      if (!validation.ok) {
        attempts++;
        continue;
      }

      return {
        id: crypto.randomUUID(),
        templateId: family.id,
        language: family.language,
        lane: family.lane,
        type: family.type,
        concept: family.concept,
        conceptTags: family.conceptTags,
        difficulty: family.difficulty,
        prompt: family.generatePrompt(ctx),
        code: family.generateCode(ctx),
        answer: family.generateAnswer(ctx),
        metadata: {
          slotValues: values,
          hash: hashDrill(family.id, values),
          familyId: family.id
        }
      };
    } catch (e) {
      attempts++;
    }
  }

  throw new Error(`Generation failed for family ${family.id} after ${maxAttempts} attempts`);
}
