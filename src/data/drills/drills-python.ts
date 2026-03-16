import type { CodingDrill } from '@/types/coding';

export const pythonDrills: CodingDrill[] = [
  {
    id: 'py-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'List Comprehension',
    content: '[x**2 for x in range(10) if x % 2 == 0]',
    explanation: 'Basic list comprehension syntax with a conditional filter.',
    patternToNotice: 'The filter comes after the loop in Python comprehensions.',
    concept: 'comprehensions',
    requiredTokens: ['[', 'for', 'in', 'if', '%', '==', '**']
  },
  {
    id: 'py-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Mutable Default Pitfall',
    content: `def f(a, b=[]):
    b.append(a)
    return b
print(f(1), end=" ")
print(f(2))`,
    expectedOutput: '[1] [1, 2]',
    explanation: 'Default arguments are evaluated once at definition. The list persists.',
    patternToNotice: 'Avoid mutable defaults; use "None" instead.',
    concept: 'mutability'
  },
  {
    id: 'py-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Indentation logic',
    content: `def greet(name):
if name:
    print("Hi " + name)`,
    explanation: 'Python requires consistent indentation for block level code.',
    patternToNotice: 'Missing indent after the function signature.',
    concept: 'syntax',
    requiredTokens: ['    if']
  },
  {
    id: 'py-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'Context Manager',
    content: `with open("file.txt", "r") as f:
    content = f.read()`,
    explanation: 'Using "with" ensures the file is closed automatically.',
    patternToNotice: 'The "as" keyword assigns the resource to a variable.',
    concept: 'context-managers',
    requiredTokens: ['with', 'open', 'as', ':', 'read']
  },
  {
    id: 'py-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 2,
    title: 'Dictionary Filter',
    content: '# Filter a dict "d" to keep only keys where value > 10',
    explanation: 'Dict comprehensions use {k: v for k, v in d.items() if condition}.',
    patternToNotice: 'Call .items() to iterate over keys and values simultaneously.',
    concept: 'comprehensions',
    requiredTokens: ['{', 'for', 'in', '.items()', 'if', '> 10']
  }
];
