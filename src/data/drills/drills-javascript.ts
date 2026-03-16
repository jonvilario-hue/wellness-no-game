import type { CodingDrill } from '@/types/coding';

export const javascriptDrills: CodingDrill[] = [
  {
    id: 'js-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Arrow Function',
    content: 'const add = (a, b) => a + b;',
    explanation: 'Implicit return syntax for single-expression arrow functions.',
    patternToNotice: 'No "return" or curly braces needed for single lines.',
    concept: 'functions',
    requiredTokens: ['=>', 'const']
  },
  {
    id: 'js-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Type Coercion',
    content: 'console.log(1 + "2" + 3);',
    expectedOutput: '123',
    explanation: 'Number + String causes string concatenation.',
    patternToNotice: 'JavaScript coerces to string if any operand is a string during +.',
    concept: 'coercion'
  },
  {
    id: 'js-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Closure Scope',
    content: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
    explanation: 'var is function-scoped; all callbacks see the final value (3).',
    patternToNotice: 'Use "let" for block-scoping in loops.',
    concept: 'closures',
    requiredTokens: ['let i = 0']
  },
  {
    id: 'js-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Destructuring',
    content: `const { name, age } = user;
console.log(name);`,
    explanation: 'Extracting properties directly into variables.',
    patternToNotice: 'The curly braces on the left side indicate object destructuring.',
    concept: 'syntax',
    requiredTokens: ['const', '{', '}', '=', 'user']
  },
  {
    id: 'js-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Array Mapping',
    content: '// Map an array "arr" to only their lengths',
    explanation: '.map() creates a new array by applying a function to each item.',
    patternToNotice: 'Arrow functions are ideal for map callbacks.',
    concept: 'arrays',
    requiredTokens: ['arr.map', '=>', '.length']
  }
];
