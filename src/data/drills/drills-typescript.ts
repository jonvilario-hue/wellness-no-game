import type { CodingDrill } from '@/types/coding';

export const typescriptDrills: CodingDrill[] = [
  {
    id: 'ts-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Discriminated Unions',
    content: 'type Result<T> = { success: true; data: T } | { success: false; error: string };',
    explanation: 'A common pattern for representing operations that can fail.',
    patternToNotice: 'The "success" literal acts as a tag for narrowing.',
    concept: 'types',
    requiredTokens: ['type', 'true', '|', 'false', 'T']
  },
  {
    id: 'ts-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Readonly Interface',
    content: 'interface User {\n  readonly id: number;\n  name: string;\n  email?: string;\n}',
    explanation: 'Interfaces can mark properties as immutable or optional.',
    patternToNotice: 'readonly prevents property reassignment at compile time.',
    concept: 'interfaces',
    requiredTokens: ['interface', 'readonly', 'number', 'string', '?:']
  },
  {
    id: 'ts-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Generic Type Inference',
    content: 'function f<T>(arg: T): string { return typeof arg; }\nconsole.log(f(42));',
    expectedOutput: 'number',
    explanation: 'TS infers the generic T from the passed argument value.',
    patternToNotice: 'Generics are resolved during the call site inference.',
    concept: 'generics'
  },
  {
    id: 'ts-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Invalid Assignment',
    content: 'const x: string = 5;\nconsole.log(x);',
    explanation: 'TypeScript prevents assigning a number to a variable typed as string.',
    patternToNotice: 'Type safety catches basic assignment errors before runtime.',
    concept: 'types',
    requiredTokens: ['number']
  },
  {
    id: 'ts-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Custom Type Guard',
    content: '// Create a function "isString" that narrows "unknown" to "string"',
    explanation: 'Type predicates (val is string) allow for powerful type narrowing.',
    patternToNotice: 'The "is" keyword is the core of custom type guards.',
    concept: 'narrowing',
    requiredTokens: ['function', 'is string', 'typeof', '=== "string"']
  }
];
