
import { getHistory, addHistory, recentlySeenHashes, recentlySeenConcepts } from '../history';

describe('Anti-Repetition History', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists and retrieves history', () => {
    const entry = {
      hash: 'h1',
      templateId: 't1',
      concept: 'c1',
      timestamp: Date.now(),
      language: 'javascript' as any,
      lane: 'Read' as any,
      type: 'Output Prediction' as any
    };
    
    addHistory(entry);
    const history = getHistory();
    expect(history[0].hash).toBe('h1');
  });

  it('filters hashes by window size', () => {
    addHistory({ hash: 'old', timestamp: 1 } as any);
    addHistory({ hash: 'new', timestamp: 2 } as any);
    
    const hashes = recentlySeenHashes(1);
    expect(hashes.has('new')).toBe(true);
    expect(hashes.has('old')).toBe(false);
  });

  it('filters concepts by context', () => {
    addHistory({ concept: 'c1', language: 'python', lane: 'Read', type: 'Bug Hunt' } as any);
    addHistory({ concept: 'c2', language: 'go', lane: 'Read', type: 'Bug Hunt' } as any);
    
    const concepts = recentlySeenConcepts('python', 'Read', 'Bug Hunt');
    expect(concepts.has('c1')).toBe(true);
    expect(concepts.has('c2')).toBe(false);
  });
});
