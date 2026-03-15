import type { CodingDrill } from '@/types/coding';

/**
 * DRILL CONTENT FILE — DO NOT DELETE OR MERGE
 * Language: TypeScript
 * Drill types: Syntax Sprint, Code Reconstruction, Output Prediction, Bug Hunt, Build
 * Difficulty levels: 1, 2, 3, 4
 * Total drill count: 20
 * Last verified: 2024-05-22
 * Content version: v1
 *
 * THIS FILE IS LOAD-BEARING. Removing it causes "content unavailable" errors
 * across the Coding subtab for this language. Do not delete, consolidate, or
 * reorganize without explicit instruction.
 */

export const typescriptDrills: CodingDrill[] = [
  // Syntax Sprints (Write)
  {
    id: 'ts-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Basic Type Annotation',
    content: 'const age: number = 25;',
    explanation: 'Explicitly defining types helps catch errors early.',
    patternToNotice: 'Colon : follows the variable name.',
    concept: 'annotations',
    requiredTokens: [':', 'number']
  },
  {
    id: 'ts-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Union Type',
    content: 'let id: string | number;',
    explanation: 'Unions allow variables to hold multiple types.',
    patternToNotice: 'Pipe symbol | separates the options.',
    concept: 'unions',
    requiredTokens: ['string', '|', 'number']
  },
  {
    id: 'ts-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Interface Conformance',
    content: 'interface User { name: string; age?: number }',
    explanation: 'Question mark ? denotes an optional property.',
    patternToNotice: 'Interfaces are preferred for object shapes.',
    concept: 'interfaces',
    requiredTokens: ['interface', 'string', '?', 'number']
  },
  {
    id: 'ts-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 4,
    title: 'Conditional Type',
    content: 'type IsString<T> = T extends string ? true : false;',
    explanation: 'Conditional types choose types based on constraints.',
    patternToNotice: 'Uses the extends keyword and ternary syntax.',
    concept: 'conditional-types',
    requiredTokens: ['type', 'extends', '?', ':']
  },

  // Code Reconstruction (Write)
  {
    id: 'ts-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Function Signature',
    content: 'function sum(a: number, b: number): number {\n  return a + b;\n}',
    explanation: 'Return types come after the parameter list.',
    patternToNotice: 'Total type safety for both inputs and outputs.',
    concept: 'functions',
    requiredTokens: ['number', 'number', '): number']
  },
  {
    id: 'ts-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Generic Function',
    content: 'function wrap<T>(val: T): T {\n  return val;\n}',
    explanation: 'Generics allow for reusable, type-safe components.',
    patternToNotice: 'Angle brackets <> identify the type parameter.',
    concept: 'generics',
    requiredTokens: ['<T>', '(val: T)', ': T']
  },
  {
    id: 'ts-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Readonly Tuple',
    content: 'const point: readonly [number, number] = [10, 20];',
    explanation: 'Readonly prevents modification of the fixed-length array.',
    patternToNotice: 'Tuples define the exact order and length of types.',
    concept: 'tuples',
    requiredTokens: ['readonly', '[number, number]']
  },
  {
    id: 'ts-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 4,
    title: 'Mapped Type',
    content: 'type Optional<T> = { [P in keyof T]?: T[P] };',
    explanation: 'Mapped types transform each property of an existing type.',
    patternToNotice: 'Use in keyof to iterate over property keys.',
    concept: 'mapped-types',
    requiredTokens: ['{', '[P in keyof T]', '?', '}']
  },

  // Output Prediction (Read)
  {
    id: 'ts-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Literal Type',
    content: 'let x: "A" | "B" = "A";\nx = "B";\nconsole.log(x);',
    expectedOutput: 'B',
    explanation: 'Literal types restrict values to a specific string/number.',
    patternToNotice: 'TS enforces the set of allowed values at compile time.',
    concept: 'literals'
  },
  {
    id: 'ts-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Array Type Interference',
    content: 'const arr = [1, "two"];\nconsole.log(typeof arr[0]);',
    expectedOutput: 'number',
    explanation: 'TS infers the array type as (number | string)[].',
    patternToNotice: 'The underlying JS runtime typeof still returns primitive types.',
    concept: 'inference'
  },
  {
    id: 'ts-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Type Narrowing',
    content: 'function p(v: string | number) {\n  if (typeof v === "string") return v.length;\n  return v.toFixed(0);\n}\nconsole.log(p(10));',
    expectedOutput: '10',
    explanation: 'Narrowing allows accessing type-specific methods safely.',
    patternToNotice: 'The if block acts as a guard for the string type.',
    concept: 'narrowing'
  },
  {
    id: 'ts-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 4,
    title: 'Enum Value',
    content: 'enum Dir { Up = 1, Down }\nconsole.log(Dir.Down);',
    expectedOutput: '2',
    explanation: 'Enums increment from the previous value if not specified.',
    patternToNotice: 'Default starting index is 0 if nothing is provided.',
    concept: 'enums'
  },

  // Bug Hunt (Read)
  {
    id: 'ts-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Type Mismatch',
    content: 'let x: number = "5";',
    explanation: 'Cannot assign a string to a variable typed as number.',
    patternToNotice: 'TS errors happen at compile time, before execution.',
    concept: 'types',
    requiredTokens: ['let x: string', 'let x: any', 'x = 5']
  },
  {
    id: 'ts-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Missing Property',
    content: 'interface U { id: number }\nconst u: U = { id: 1, name: "A" };',
    explanation: 'Object literals can only specify known properties.',
    patternToNotice: 'The interface must include all properties being assigned.',
    concept: 'interfaces',
    requiredTokens: ['name: string']
  },
  {
    id: 'ts-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Undefined Access',
    content: 'function f(x?: string) { return x.trim(); }',
    explanation: 'Optional parameters might be undefined.',
    patternToNotice: 'Always check for existence before accessing properties.',
    concept: 'strict-nulls',
    requiredTokens: ['x?.trim()', 'if (x)']
  },
  {
    id: 'ts-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 4,
    title: 'Readonly Mutation',
    content: 'const arr: readonly number[] = [1];\narr.push(2);',
    explanation: 'Readonly arrays do not have mutating methods like push.',
    patternToNotice: 'Immutability is enforced by the TS type system.',
    concept: 'readonly',
    requiredTokens: ['number[]']
  },

  // Build (Build)
  {
    id: 'ts-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Sum Signature',
    content: '// Write sum(a, b) with number annotations',
    explanation: 'Basic parameter typing.',
    patternToNotice: 'Clear input/output expectations.',
    concept: 'functions',
    requiredTokens: [': number', ': number', '): number']
  },
  {
    id: 'ts-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Identify Result',
    content: '// Type guard "isSuccess" for { status: "success" | "error" }',
    explanation: 'Identify specific literal values.',
    patternToNotice: 'Discriminative unions allow safe object handling.',
    concept: 'narrowing',
    requiredTokens: ['=== "success"']
  },
  {
    id: 'ts-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Generic Identity',
    content: '// Write generic "identity<T>(arg: T): T"',
    explanation: 'Standard generic pattern.',
    patternToNotice: 'Reusable across all types.',
    concept: 'generics',
    requiredTokens: ['<T>', '(arg: T)', ': T']
  },
  {
    id: 'ts-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 4,
    title: 'Partial Implementation',
    content: '// Define "MyPartial<T>" without using built-in Partial',
    explanation: 'Manual mapped type implementation.',
    patternToNotice: 'Looping over keys and making them optional.',
    concept: 'mapped-types',
    requiredTokens: ['[P in keyof T]?', 'T[P]']
  }
];
