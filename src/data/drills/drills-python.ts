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
    id: 'py-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'File Context Manager',
    content: 'with open("data.txt") as f:\n    lines = f.readlines()',
    explanation: 'Using the "with" statement ensures files are closed automatically.',
    patternToNotice: 'The resource is assigned using the "as" keyword.',
    concept: 'io',
    requiredTokens: ['with', 'open', 'as', ':', 'readlines']
  },
  {
    id: 'py-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Boolean Empty Collections',
    content: 'print(bool([])), print(bool([0]))',
    expectedOutput: 'False True',
    explanation: 'Empty containers in Python evaluate to False; non-empty evaluate to True.',
    patternToNotice: 'The content of the collection, not its truthiness value, matters for non-empty checks.',
    concept: 'logic'
  },
  {
    id: 'py-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Missing Colon',
    content: 'for i in range(5)\n    print(i)',
    explanation: 'Control flow statements (if, for, while, def) require a trailing colon.',
    patternToNotice: 'SyntaxError: invalid syntax usually points to a missing punctuation at the block start.',
    concept: 'syntax',
    requiredTokens: [':']
  },
  {
    id: 'py-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 3,
    title: 'Factorial Recursive',
    content: '# Implement factorial(n) recursively',
    explanation: 'A function that calls itself with n-1 until it hits the base case.',
    patternToNotice: 'Recursive functions must have a base case to avoid Infinite Recursion.',
    concept: 'recursion',
    requiredTokens: ['def', 'if n == 0', 'return 1', 'n * factorial(n - 1)']
  }
];
