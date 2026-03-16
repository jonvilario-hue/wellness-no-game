
import { generateFromFamily } from '../generateDrill';
import { DrillTemplateFamily } from '@/types/drills';

describe('Generation Validation & Reroll', () => {
  it('rerolls until validate() returns true', () => {
    let callCount = 0;
    
    const mockFamily: DrillTemplateFamily = {
      id: 'mock',
      language: 'javascript',
      lane: 'Read',
      type: 'Output Prediction',
      concept: 'test',
      conceptTags: [],
      difficulty: 1,
      slots: [{ id: 'S', kind: 'literal', values: [1, 2] }],
      generatePrompt: () => '',
      generateCode: () => '',
      generateAnswer: () => ({ mode: 'exact', correct: '' }),
      validate: (ctx) => {
        callCount++;
        // Force failure on value '1', pass on value '2'
        return { ok: ctx.values.S === 2, reasons: [] };
      }
    };

    const drill = generateFromFamily(mockFamily);
    expect(drill.metadata.slotValues.S).toBe(2);
    expect(callCount).toBeGreaterThan(1); // Proves at least one reroll happened
  });
});
