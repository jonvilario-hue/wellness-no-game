
import { getNextDrill } from '../getNextDrill';
import { allFamilies } from '@/data/families';
import { Language, Lane, DrillType } from '@/types/drills';

describe('Drill Engine Smoke Tests', () => {
  const languages: Language[] = ['python', 'javascript', 'typescript', 'go', 'rust', 'swift', 'sql', 'bash'];
  const lanes: Lane[] = ['Read', 'Write', 'Build'];
  const types: DrillType[] = ['Syntax Sprints', 'Code Reconstruction', 'Output Prediction', 'Bug Hunt', 'Timed Implementation'];

  it('generates valid drills for every registered combination', () => {
    allFamilies.forEach(family => {
      const drill = getNextDrill(family.language, family.lane, family.type);
      
      expect(drill.prompt).not.toBe('');
      expect(drill.code).not.toBe('');
      expect(drill.answer).toBeDefined();
      expect(['multipleChoice', 'exact', 'tokenProbe', 'structural']).toContain(drill.answer.mode);
      
      if (drill.answer.mode === 'multipleChoice') {
        expect(drill.answer.options.length).toBeGreaterThanOrEqual(2);
        expect(drill.answer.options).toContain(drill.answer.correct);
      }
    });
  });

  it('enforces uniqueness via hashing', () => {
    // Pick a family with enough variations
    const family = allFamilies.find(f => f.id === 'js-coercion-trap')!;
    const hashes = new Set();
    
    for (let i = 0; i < 5; i++) {
      const drill = getNextDrill(family.language, family.lane, family.type);
      expect(hashes.has(drill.metadata.hash)).toBe(false);
      hashes.add(drill.metadata.hash);
    }
  });
});
