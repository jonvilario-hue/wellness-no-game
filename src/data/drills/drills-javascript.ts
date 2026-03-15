
/**
 * DRILL CONTENT FILE — DO NOT DELETE OR MERGE
 * Language: JavaScript
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

import type { CodingDrill } from '@/types/coding';

export const javascriptDrills: CodingDrill[] = [
  // Syntax Sprints
  {
    id: 'js-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Arrow Function',
    content: 'const add = (a, b) => a + b;',
    explanation: 'Basic arrow function with implicit return.',
    patternToNotice: 'No "return" or curly braces are needed for single-expression arrows.',
    concept: 'functions',
    requiredTokens: ['const', '=>', '+']
  },
  {
    id: 'js-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Destructuring',
    content: 'const { name, age } = user;',
    explanation: 'Object destructuring extracts properties into variables.',
    patternToNotice: 'Braces on the left of the equals sign signify extraction.',
    concept: 'syntax',
    requiredTokens: ['const', '{', '}', '=', 'user']
  },
  {
    id: 'js-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Template Literals',
    content: '`Welcome, ${user.name}!`',
    explanation: 'Backticks allow string interpolation using ${}.',
    patternToNotice: 'Only backticks (not single/double quotes) support interpolation.',
    concept: 'strings',
    requiredTokens: ['`', '${', '}', '`']
  },
  {
    id: 'js-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Nullish Coalescing',
    content: 'const val = input ?? "default";',
    explanation: '?? returns the right side only if the left is null or undefined.',
    patternToNotice: 'Unlike ||, ?? preserves 0 and empty strings as truthy.',
    concept: 'operators',
    requiredTokens: ['const', '??']
  },

  // Output Prediction
  {
    id: 'js-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Typeof Null',
    content: 'console.log(typeof null);',
    expectedOutput: 'object',
    explanation: 'A long-standing bug in JS: typeof null returns "object".',
    patternToNotice: 'Null is structurally empty but typed as an object.',
    concept: 'coercion'
  },
  {
    id: 'js-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Equality Coercion',
    content: 'console.log([] == ![]);',
    expectedOutput: 'true',
    explanation: '![] is false. [] == false coerces both to 0.',
    patternToNotice: 'Loose equality (==) can lead to bizarre boolean results.',
    concept: 'coercion'
  },
  {
    id: 'js-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Closures in Loops',
    content: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}',
    expectedOutput: '3 3 3',
    explanation: 'var is function-scoped. The loop finishes before the timeouts run.',
    patternToNotice: 'Use "let" for block-scoping to get 0 1 2.',
    concept: 'closures'
  },
  {
    id: 'js-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Promise Microtasks',
    content: 'console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);',
    expectedOutput: '1 4 3 2',
    explanation: 'Promises go to the microtask queue, which clears before the macrotask queue.',
    patternToNotice: 'Synchronous -> Microtasks (Promises) -> Macrotasks (SetTimeout).',
    concept: 'event-loop'
  },

  // Bug Hunt
  {
    id: 'js-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Assignment in Condition',
    content: 'if (x = 5) { console.log(x); }',
    explanation: 'The = operator assigns value, it does not compare.',
    patternToNotice: 'Always use === for comparison inside if statements.',
    concept: 'syntax',
    requiredTokens: ['===']
  },
  {
    id: 'js-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'This Binding',
    content: 'const obj = {\n  v: 1,\n  get: () => this.v\n};',
    explanation: 'Arrow functions do not have their own "this"; they inherit from parent.',
    patternToNotice: 'Use standard function syntax for object methods.',
    concept: 'this',
    requiredTokens: ['function']
  },
  {
    id: 'js-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Array Reference',
    content: 'const a = [1, 2];\nconst b = a;\nb.push(3);',
    explanation: 'Arrays are passed by reference. b.push modifies a.',
    patternToNotice: 'Use [...a] to create a shallow copy.',
    concept: 'mutability',
    requiredTokens: ['[...]']
  },
  {
    id: 'js-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Async Foreach',
    content: 'arr.forEach(async x => {\n  await save(x);\n});\nconsole.log("Done");',
    explanation: 'forEach is not async-aware and will not wait for completions.',
    patternToNotice: 'Use for...of for sequential async processing.',
    concept: 'async',
    requiredTokens: ['for', 'of']
  },

  // Code Reconstruction
  {
    id: 'js-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Map and Filter',
    content: 'arr.filter(x => x > 0).map(x => x * 2);',
    explanation: 'Chaining array methods for concise transformation.',
    patternToNotice: 'Filtering usually comes before mapping to reduce work.',
    concept: 'arrays',
    requiredTokens: ['filter', 'map']
  },
  {
    id: 'js-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Async Fetch',
    content: 'const res = await fetch(url);\nconst data = await res.json();',
    explanation: 'Standard async/await pattern for network requests.',
    patternToNotice: 'Both the fetch and the json parsing must be awaited.',
    concept: 'async',
    requiredTokens: ['const', 'await', 'fetch', 'json']
  },
  {
    id: 'js-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Object Entries',
    content: 'Object.entries(obj).map(([k, v]) => k + v);',
    explanation: 'Converting an object to an array of pairs for mapping.',
    patternToNotice: 'Entries returns [key, value] pairs.',
    concept: 'objects',
    requiredTokens: ['Object.entries', 'map', '[k, v]']
  },
  {
    id: 'js-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Proxy Handler',
    content: 'new Proxy(obj, { get: (t, k) => t[k] });',
    explanation: 'Basic proxy to intercept property access.',
    patternToNotice: 'The get trap receives the target and the key.',
    concept: 'proxies',
    requiredTokens: ['new Proxy', 'get', 't, k']
  },

  // Build / Timed Implementation
  {
    id: 'js-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Sum Array',
    content: '// Calculate the sum of an array "arr"',
    explanation: 'Use .reduce((a, b) => a + b, 0).',
    patternToNotice: 'Reduce is the idiomatic way to aggregate arrays.',
    concept: 'arrays',
    requiredTokens: ['reduce', 'a + b', '0']
  },
  {
    id: 'js-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Unique Items',
    content: '// Return unique values from "arr"',
    explanation: 'Use [...new Set(arr)].',
    patternToNotice: 'Set naturally handles uniqueness.',
    concept: 'arrays',
    requiredTokens: ['new Set', '[...']
  },
  {
    id: 'js-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Flatten Array',
    content: '// Flatten a nested array "arr" one level',
    explanation: 'Use .flat() or .reduce((a, b) => a.concat(b), []).',
    patternToNotice: '.flat() is the modern standard.',
    concept: 'arrays',
    requiredTokens: ['flat()']
  },
  {
    id: 'js-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Memoize',
    content: '// Implement a memoize function for fn',
    explanation: 'Requires a cache object and returning a new function.',
    patternToNotice: 'Closures are used to persist the cache across calls.',
    concept: 'closures',
    requiredTokens: ['function', 'cache', 'return function']
  }
];
