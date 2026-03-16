import type { CodingDrill } from '@/types/coding';

export const typescriptDrills: CodingDrill[] = [
  {
    id: 'ts-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Interface Definition',
    content: `interface User {
  id: number;
  name: string;
}`,
    explanation: 'Defining custom shapes for objects.',
    patternToNotice: 'Interfaces describe the structure without implementation.',
    concept: 'interfaces',
    requiredTokens: ['interface', 'number', 'string']
  },
  {
    id: 'ts-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Union Type Narrowing',
    content: `function p(val: string | number) {
  return val.length;
}`,
    explanation: '.length only exists on strings. You must narrow the type first.',
    patternToNotice: 'Use "typeof val === \'string\'" to safely access string properties.',
    concept: 'narrowing',
    requiredTokens: ['typeof', 'string']
  },
  {
    id: 'ts-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Generic Inference',
    content: `function wrap<T>(val: T): T { return val; }
const res = wrap("hi");
console.log(typeof res);`,
    expectedOutput: 'string',
    explanation: 'TS infers T as string from the argument.',
    patternToNotice: 'Generics preserve the type through the function call.',
    concept: 'generics'
  },
  {
    id: 'ts-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Enum Usage',
    content: `enum Color { Red, Green }
const c: Color = Color.Red;`,
    explanation: 'Enums allow for a set of named constants.',
    patternToNotice: 'Enums act as both a type and a value.',
    concept: 'enums',
    requiredTokens: ['enum', 'const', ':', 'Color.Red']
  },
  {
    id: 'ts-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Type Guard',
    content: '// Implement a type guard "isString" for value "x"',
    explanation: 'Type guards use "x is string" return type.',
    patternToNotice: 'The "is" keyword tells TS to narrow the type if true.',
    concept: 'narrowing',
    requiredTokens: ['function', 'is string', 'typeof', '=== "string"']
  }
];
