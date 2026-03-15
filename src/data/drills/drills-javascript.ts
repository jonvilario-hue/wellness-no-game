import type { CodingDrill } from '@/types/coding';

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

export const javascriptDrills: CodingDrill[] = [
  // Syntax Sprints (Write)
  {
    id: 'js-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Arrow Function',
    content: 'const add = (a, b) => a + b;',
    explanation: 'Arrow functions provide a concise syntax for anonymous functions.',
    patternToNotice: 'Implicit return when no curly braces are used.',
    concept: 'functions',
    requiredTokens: ['=>', 'const']
  },
  {
    id: 'js-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Destructuring',
    content: 'const { id, name } = user;',
    explanation: 'Destructuring allows unpacking properties from objects.',
    patternToNotice: 'Braces {} on the left of = indicate object destructuring.',
    concept: 'syntax',
    requiredTokens: ['{', '}', '=', 'user']
  },
  {
    id: 'js-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Template Literal',
    content: '`Status: ${active ? "On" : "Off"}`',
    explanation: 'Backticks allow embedding expressions with ${}.',
    patternToNotice: 'Use backticks ``, not single or double quotes.',
    concept: 'syntax',
    requiredTokens: ['`', '${', '}', '`']
  },
  {
    id: 'js-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Async Generator',
    content: 'async function* gen() { yield await p; }',
    explanation: 'Async generators use yield and can await promises.',
    patternToNotice: 'The asterisk * identifies the function as a generator.',
    concept: 'async',
    requiredTokens: ['async', 'function*', 'yield', 'await']
  },

  // Code Reconstruction (Write)
  {
    id: 'js-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Array Mapping',
    content: 'nums.map(n => n * 2);',
    explanation: '.map() creates a new array by transforming each element.',
    patternToNotice: 'The callback function is applied to every item.',
    concept: 'arrays',
    requiredTokens: ['map', '=>']
  },
  {
    id: 'js-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Promise Chain',
    content: 'fetch(url)\n  .then(r => r.json())\n  .catch(err => log(err));',
    explanation: '.then() handles success, .catch() handles errors.',
    patternToNotice: 'Method chaining is used for asynchronous flow.',
    concept: 'promises',
    requiredTokens: ['fetch', 'then', 'json', 'catch']
  },
  {
    id: 'js-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Module Export',
    content: 'export const util = () => { };\nexport default App;',
    explanation: 'Named and default exports can coexist in a file.',
    patternToNotice: 'Only one default export is allowed per module.',
    concept: 'modules',
    requiredTokens: ['export', 'const', 'export', 'default']
  },
  {
    id: 'js-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Class Mixin',
    content: 'const Mixin = Base => class extends Base { };',
    explanation: 'Mixins use factory functions to extend classes dynamically.',
    patternToNotice: 'The class keyword can be used inside an expression.',
    concept: 'classes',
    requiredTokens: ['class', 'extends', '=>']
  },

  // Output Prediction (Read)
  {
    id: 'js-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Equality Coercion',
    content: 'console.log(0 == "0");',
    expectedOutput: 'true',
    explanation: '== performs type coercion before comparison.',
    patternToNotice: 'Always prefer === to avoid unexpected truthy/falsy matches.',
    concept: 'coercion'
  },
  {
    id: 'js-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Closure State',
    content: 'let c = 0;\nconst inc = () => ++c;\ninc();\nconsole.log(inc());',
    expectedOutput: '2',
    explanation: 'The function inc closes over the variable c.',
    patternToNotice: 'Closures maintain access to the live variables in their scope.',
    concept: 'closures'
  },
  {
    id: 'js-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Hoisting Order',
    content: 'var x = 1;\nfunction f() {\n  console.log(x);\n  var x = 2;\n}\nf();',
    expectedOutput: 'undefined',
    explanation: 'Variable x is hoisted to top of f(), but not its assignment.',
    patternToNotice: 'The local var shadows the global one immediately.',
    concept: 'hoisting'
  },
  {
    id: 'js-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Event Loop Order',
    content: 'console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);',
    expectedOutput: '1 4 3 2',
    explanation: 'Promises (Microtasks) run before SetTimeout (Macrotasks).',
    patternToNotice: 'Synchronous code runs first, then microtasks, then macrotasks.',
    concept: 'event-loop'
  },

  // Bug Hunt (Read)
  {
    id: 'js-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Reference Error',
    content: 'const x = 5;\nx = 6;',
    explanation: 'Variables declared with "const" cannot be reassigned.',
    patternToNotice: 'Use "let" if you need to change the variable\'s value.',
    concept: 'variables',
    requiredTokens: ['let x = 5']
  },
  {
    id: 'js-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Unintended Coercion',
    content: 'if (arr.length = 0) { }',
    explanation: 'One = is an assignment, not a comparison.',
    patternToNotice: 'Use === for comparison inside if statements.',
    concept: 'syntax',
    requiredTokens: ['length === 0']
  },
  {
    id: 'js-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 3,
    title: 'This Binding',
    content: 'const obj = {\n  v: 1,\n  get: function() { return this.v; }\n};\nconst g = obj.get;\nconsole.log(g());',
    explanation: 'Calling g() loses the context of obj. this becomes global/undefined.',
    patternToNotice: 'Function context is determined by how it is called.',
    concept: 'this',
    requiredTokens: ['obj.get.bind(obj)']
  },
  {
    id: 'js-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Shadowing Parameter',
    content: 'function f(x) {\n  var x = 1;\n  return x;\n}',
    explanation: 'The variable declaration shadows the parameter.',
    patternToNotice: 'Redeclaring parameters can lead to confusing logic.',
    concept: 'scoping',
    requiredTokens: ['return x']
  },

  // Build (Build)
  {
    id: 'js-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Square Numbers',
    content: '// Return array of numbers squared from "arr"',
    explanation: 'Use .map(n => n * n).',
    patternToNotice: 'Efficient array transformation.',
    concept: 'arrays',
    requiredTokens: ['map', '=>', '*']
  },
  {
    id: 'js-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Filter Adults',
    content: '// Filter "users" array for age >= 18',
    explanation: 'Use .filter(u => u.age >= 18).',
    patternToNotice: '.filter() returns a subset of the original array.',
    concept: 'arrays',
    requiredTokens: ['filter', '>= 18']
  },
  {
    id: 'js-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Grouping Logic',
    content: '// Group "items" by property "cat" into a record',
    explanation: 'Use .reduce() or a loop to build the map.',
    patternToNotice: 'Initializing the accumulator as {} is critical.',
    concept: 'arrays',
    requiredTokens: ['reduce', '{}', 'acc[item.cat]']
  },
  {
    id: 'js-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 4,
    title: 'Memoize Function',
    content: '// Implement "memoize(fn)" that caches results',
    explanation: 'Requires a Map or Object closure to store results.',
    patternToNotice: 'Check the cache before executing the expensive function.',
    concept: 'closures',
    requiredTokens: ['function', 'return function', 'Map', 'has', 'get']
  }
];
