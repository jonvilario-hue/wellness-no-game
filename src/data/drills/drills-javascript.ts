import type { CodingDrill } from '@/types/coding';

export const javascriptDrills: CodingDrill[] = [
  {
    id: 'js-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Rest Parameters',
    content: 'const sum = (...args) => args.reduce((a, b) => a + b, 0);',
    explanation: 'Use the rest operator (...) to capture any number of arguments into an array.',
    patternToNotice: 'Rest parameters must be the last argument in a function signature.',
    concept: 'functions',
    requiredTokens: ['...', '=>', 'reduce', '0']
  },
  {
    id: 'js-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Deep Destructuring',
    content: 'const { data: { id } } = response;',
    explanation: 'Extract nested properties in a single line using colon syntax.',
    patternToNotice: 'Nested braces map to the structure of the source object.',
    concept: 'syntax',
    requiredTokens: ['const', '{', ':', '}', '=', 'response']
  },
  {
    id: 'js-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Null Type Pitfall',
    content: 'console.log(typeof null);',
    expectedOutput: 'object',
    explanation: 'A long-standing bug in JS where null is categorized as an object.',
    patternToNotice: 'Always use strict equality (=== null) to check for nullity.',
    concept: 'coercion'
  },
  {
    id: 'js-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Comparison vs Assignment',
    content: 'if (user.role = "admin") {\n  grantAccess();\n}',
    explanation: 'Using = instead of === performs an assignment, which often evaluates to truthy.',
    patternToNotice: 'Logic errors in conditionals often stem from accidental assignments.',
    concept: 'logic',
    requiredTokens: ['===']
  },
  {
    id: 'js-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Sequential Async',
    content: '// Fetch IDs 1, 2, 3 sequentially using async/await',
    explanation: 'A for...of loop with await ensures serial execution.',
    patternToNotice: 'Array.forEach does NOT wait for promises; use a standard loop.',
    concept: 'async',
    requiredTokens: ['async', 'for', 'await', 'fetch']
  }
];
