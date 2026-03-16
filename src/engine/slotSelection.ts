import { SlotDefinition } from '@/types/drills';

export function selectSlotValues(slots: SlotDefinition[], maxAttempts = 200): Record<string, unknown> {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const values: Record<string, unknown> = {};
    let valid = true;

    for (const slot of slots) {
      const val = slot.values[Math.floor(Math.random() * slot.values.length)];
      
      if (slot.constraints?.excludeValuePairs) {
        for (const constraint of slot.constraints.excludeValuePairs) {
          const otherVal = values[constraint.otherSlotId];
          if (otherVal !== undefined) {
            const isInvalid = constraint.invalidPairs.some(pair => 
              (pair[0] === val && pair[1] === otherVal)
            );
            if (isInvalid) {
              valid = false;
              break;
            }
          }
        }
      }

      if (!valid) break;
      values[slot.id] = val;
    }

    if (valid) return values;
    attempts++;
  }
  throw new Error("Failed to satisfy slot constraints after max attempts");
}
