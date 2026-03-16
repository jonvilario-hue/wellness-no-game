
import { gradeAnswer } from '../grading';

describe('Grading Engine', () => {
  it('handles multipleChoice', () => {
    const ans = { mode: 'multipleChoice', correct: '42', options: ['42', '0'] } as const;
    expect(gradeAnswer('42', ans)).toBe(true);
    expect(gradeAnswer('0', ans)).toBe(false);
  });

  it('handles exact with accepted alternatives', () => {
    const ans = { mode: 'exact', correct: 'error', accepted: ['syntax error'] } as const;
    expect(gradeAnswer('error', ans)).toBe(true);
    expect(gradeAnswer('syntax error', ans)).toBe(true);
    expect(gradeAnswer('wrong', ans)).toBe(false);
  });

  it('handles tokenProbe', () => {
    const ans = { mode: 'tokenProbe', requiredTokens: ['with', 'as'], forbiddenTokens: ['try'] } as const;
    expect(gradeAnswer('with open(x) as f:', ans)).toBe(true);
    expect(gradeAnswer('open(x) as f:', ans)).toBe(false); // missing 'with'
    expect(gradeAnswer('with try open(x) as f:', ans)).toBe(false); // has forbidden
  });

  it('handles structural sequences', () => {
    const ans = { 
      mode: 'structural', 
      requiredTokens: ['filter', 'map', 'collect'],
      requiredSequences: [['filter', 'map', 'collect']]
    } as const;
    expect(gradeAnswer('v.filter(x).map(y).collect()', ans)).toBe(true);
    expect(gradeAnswer('v.map(y).filter(x).collect()', ans)).toBe(false); // wrong order
  });
});
