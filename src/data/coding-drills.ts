import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // --- WRITE LANE: SYNTAX SPRINTS ---
  {
    id: 'syntax-py-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'Variable & Loop',
    content: 'for i in range(10):\n    x = i * 2\n    print(f"Value: {x}")'
  },
  {
    id: 'syntax-js-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Array Mapping',
    content: 'const doubled = arr.map(n => n * 2);\nconsole.log(doubled);'
  },
  {
    id: 'syntax-ts-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Interface & Type',
    content: 'interface User {\n  id: string;\n  name: string;\n}\nconst u: User = { id: "1", name: "Alice" };'
  },
  {
    id: 'syntax-java-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Java',
    difficulty: 1,
    title: 'Class Main',
    content: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}'
  },
  {
    id: 'syntax-cpp-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'C++',
    difficulty: 1,
    title: 'Standard IO',
    content: '#include <iostream>\nint main() {\n    std::cout << "Hello" << std::endl;\n    return 0;\n}'
  },

  // --- WRITE LANE: RECONSTRUCTION ---
  {
    id: 'recon-js-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Sum Function',
    content: 'function sum(a, b) {\n  return a + b;\n}',
    studyTimeSeconds: 15
  },
  {
    id: 'recon-py-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'List Sum',
    content: 'def sum_list(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total',
    studyTimeSeconds: 20
  },
  {
    id: 'recon-ts-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Generic Identity',
    content: 'function identity<T>(arg: T): T {\n  return arg;\n}',
    studyTimeSeconds: 15
  },

  // --- READ LANE: OUTPUT PREDICTION ---
  {
    id: 'output-js-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Coercion Check',
    content: 'console.log(1 + "2" + 3);',
    expectedOutput: '123'
  },
  {
    id: 'output-py-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'List Slicing',
    content: 'nums = [1, 2, 3, 4, 5]\nprint(nums[1:3])',
    expectedOutput: '[2, 3]'
  },
  {
    id: 'output-ts-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Basic Logic',
    content: 'let x: number = 5;\nlet y: number = x * 2;\nconsole.log(y + 3);',
    expectedOutput: '13'
  },

  // --- READ LANE: BUG HUNT ---
  {
    id: 'bug-js-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Reference Error',
    content: 'function greet(name) {\n  return "Hello " + nme;\n}',
    bugs: [{ line: 2, type: 'Scope' }]
  },
  {
    id: 'bug-py-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'Indentation Issue',
    content: 'def add(a, b):\nreturn a + b',
    bugs: [{ line: 2, type: 'Syntax' }]
  },
  {
    id: 'bug-ts-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Type Mismatch',
    content: 'let score: number = "100";\nconsole.log(score);',
    bugs: [{ line: 1, type: 'Type' }]
  },

  // --- BUILD LANE: TIMED IMPLEMENTATION ---
  {
    id: 'impl-js-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Reverse String',
    description: 'Implement a function `reverse(str)` that returns the string reversed.',
    content: 'function reverse(str) {\n  return str.split("").reverse().join("");\n}',
    testCases: [
      { input: 'hello', output: 'olleh' },
      { input: 'world', output: 'dlrow' }
    ]
  },
  {
    id: 'impl-ts-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Hello Type',
    description: 'Create a function `greet(name: string)` that returns "Hello " + name.',
    content: 'function greet(name: string): string {\n  // your code\n}',
    testCases: [
      { input: 'World', output: 'Hello World' }
    ]
  },
  {
    id: 'impl-py-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 1,
    title: 'Square List',
    description: 'Create a function `squares(nums)` that returns a list of squares of the input numbers.',
    content: 'def squares(nums):\n    # your code',
    testCases: [
      { input: [1, 2, 3], output: [1, 4, 9] }
    ]
  }
];
