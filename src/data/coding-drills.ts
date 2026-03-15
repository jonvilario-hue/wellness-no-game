
import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // --- SYNTAX SPRINTS (Level 1) ---
  {
    id: 'syntax-py-1',
    type: 'Syntax Sprints',
    language: 'Python',
    difficulty: 1,
    title: 'Variable & Loop',
    content: 'for i in range(10):\n    x = i * 2\n    print(f"Value: {x}")'
  },
  {
    id: 'syntax-js-1',
    type: 'Syntax Sprints',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Array Mapping',
    content: 'const doubled = arr.map(n => n * 2);\nconsole.log(doubled);'
  },
  // --- OUTPUT PREDICTION (Level 1) ---
  {
    id: 'output-js-1',
    type: 'Output Prediction',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Coercion Check',
    content: 'console.log(1 + "2" + 3);',
    expectedOutput: '123'
  },
  {
    id: 'output-py-1',
    type: 'Output Prediction',
    language: 'Python',
    difficulty: 1,
    title: 'List Slicing',
    content: 'nums = [1, 2, 3, 4, 5]\nprint(nums[1:3])',
    expectedOutput: '[2, 3]'
  },
  // --- BUG HUNT (Level 1) ---
  {
    id: 'bug-js-1',
    type: 'Bug Hunt',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Reference Error',
    content: 'function greet(name) {\n  return "Hello " + nme;\n}',
    bugs: [{ line: 2, type: 'Scope' }]
  },
  {
    id: 'bug-py-1',
    type: 'Bug Hunt',
    language: 'Python',
    difficulty: 1,
    title: 'Indentation Issue',
    content: 'def add(a, b):\nreturn a + b',
    bugs: [{ line: 2, type: 'Syntax' }]
  },
  // --- RECONSTRUCTION (Level 1) ---
  {
    id: 'recon-js-1',
    type: 'Code Reconstruction',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Sum Function',
    content: 'function sum(a, b) {\n  return a + b;\n}',
    studyTimeSeconds: 15
  },
  // --- TIMED IMPLEMENTATION (Level 1) ---
  {
    id: 'impl-js-1',
    type: 'Timed Implementation',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Reverse String',
    description: 'Implement a function `reverse(str)` that returns the string reversed.',
    content: 'function reverse(str) {\n  // your code\n}',
    testCases: [
      { input: 'hello', output: 'olleh' },
      { input: 'world', output: 'dlrow' }
    ]
  }
];
