import type { CodingDrill } from '@/types/coding';

/**
 * DRILL CONTENT FILE — DO NOT DELETE OR MERGE
 * Language: Python
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

export const pythonDrills: CodingDrill[] = [
  // Syntax Sprints (Write)
  {
    id: 'py-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'Basic List Comprehension',
    content: '[x for x in range(5)]',
    explanation: 'List comprehensions provide a concise way to create lists.',
    patternToNotice: 'The brackets [] surrounding the expression indicate a list output.',
    concept: 'comprehensions',
    requiredTokens: ['[', 'for', 'in', 'range', ']']
  },
  {
    id: 'py-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'Conditional Comprehension',
    content: '[x for x in data if x > 0]',
    explanation: 'Adding an "if" at the end filters the iteration.',
    patternToNotice: 'The filter comes after the "in" clause.',
    concept: 'comprehensions',
    requiredTokens: ['if', '>', 'for']
  },
  {
    id: 'py-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 3,
    title: 'Dict Comprehension',
    content: '{k: v for k, v in pairs if k}',
    explanation: 'Dict comprehensions use curly braces and k:v pairs.',
    patternToNotice: 'Colon separates key and value expressions.',
    concept: 'comprehensions',
    requiredTokens: ['{', ':', 'for', 'in', '}']
  },
  {
    id: 'py-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 4,
    title: 'Nested Comprehension',
    content: '[col for row in matrix for col in row]',
    explanation: 'Nested loops in comprehensions read from left to right.',
    patternToNotice: 'The outer loop comes before the inner loop.',
    concept: 'comprehensions',
    requiredTokens: ['for', 'in', 'for', 'in']
  },

  // Code Reconstruction (Write)
  {
    id: 'py-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'Function Definition',
    content: 'def greet(name):\n    return f"Hello {name}"',
    explanation: 'Functions use the "def" keyword and indentation.',
    patternToNotice: 'Python uses whitespace to define blocks, not curly braces.',
    concept: 'functions',
    requiredTokens: ['def', ':', 'return']
  },
  {
    id: 'py-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'Context Manager',
    content: 'with open("log.txt") as f:\n    data = f.read()',
    explanation: 'The "with" statement ensures resources are cleaned up.',
    patternToNotice: 'The "as" keyword assigns the object to a local variable.',
    concept: 'context-managers',
    requiredTokens: ['with', 'open', 'as', ':', 'read']
  },
  {
    id: 'py-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 3,
    title: 'Exception Handling',
    content: 'try:\n    do_work()\nexcept ValueError as e:\n    log(e)',
    explanation: 'The "except" block catches specific error types.',
    patternToNotice: 'Always catch specific exceptions, never a bare "except:".',
    concept: 'exceptions',
    requiredTokens: ['try', 'except', 'ValueError', 'as']
  },
  {
    id: 'py-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 4,
    title: 'Decorator Pattern',
    content: 'def deco(func):\n    def wrap():\n        return func()\n    return wrap',
    explanation: 'Decorators are functions that return functions.',
    patternToNotice: 'A closure is used to wrap the original function logic.',
    concept: 'decorators',
    requiredTokens: ['def', 'def', 'return', 'return']
  },

  // Output Prediction (Read)
  {
    id: 'py-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'Falsiness',
    content: 'x = []\nif x:\n    print("True")\nelse:\n    print("False")',
    expectedOutput: 'False',
    explanation: 'Empty lists are falsy in Python.',
    patternToNotice: 'None, 0, "", and empty containers []/{} are all False.',
    concept: 'truthiness'
  },
  {
    id: 'py-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'List Referencing',
    content: 'a = [1]\nb = a\na.append(2)\nprint(b)',
    expectedOutput: '[1, 2]',
    explanation: 'b refers to the same object as a. List mutation affects all refs.',
    patternToNotice: 'Variables are pointers to objects, not copies of data.',
    concept: 'mutability'
  },
  {
    id: 'py-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 3,
    title: 'Mutable Default',
    content: 'def add(n, l=[]):\n    l.append(n)\n    return l\nadd(1)\nprint(add(2))',
    expectedOutput: '[1, 2]',
    explanation: 'Default arguments are evaluated once at definition time.',
    patternToNotice: 'Never use mutable types (lists/dicts) as default arguments.',
    concept: 'mutability'
  },
  {
    id: 'py-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 4,
    title: 'Scoping (LEGB)',
    content: 'x = 1\ndef f():\n    x = 2\n    def g():\n        nonlocal x\n        x = 3\n    g()\n    return x\nprint(f(), x)',
    expectedOutput: '3 1',
    explanation: '"nonlocal" modifies the nearest enclosing scope variable.',
    patternToNotice: 'nonlocal skips the local scope but doesn\'t reach global.',
    concept: 'scoping'
  },

  // Bug Hunt (Read)
  {
    id: 'py-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'Syntax Error',
    content: 'if x == 5\n    print(x)',
    explanation: 'Conditionals require a colon at the end of the line.',
    patternToNotice: 'Missing colon ":" after the if statement.',
    concept: 'syntax',
    requiredTokens: ['if x == 5:']
  },
  {
    id: 'py-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Index Error',
    content: 'items = [1, 2]\nfor i in range(3):\n    print(items[i])',
    explanation: 'The loop goes out of bounds. The list only has 2 items.',
    patternToNotice: 'Python is zero-indexed; range(3) produces 0, 1, 2.',
    concept: 'indices',
    requiredTokens: ['range(2)', 'range(len(items))']
  },
  {
    id: 'py-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 3,
    title: 'UnboundLocalError',
    content: 'count = 0\ndef inc():\n    count += 1\ninc()',
    explanation: 'Attempting to modify a global without "global" keyword fails.',
    patternToNotice: 'Assignment within a function marks the name as local.',
    concept: 'scoping',
    requiredTokens: ['global count']
  },
  {
    id: 'py-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 4,
    title: 'Generator Exhaustion',
    content: 'gen = (x for x in range(3))\nlist(gen)\nprint(list(gen))',
    explanation: 'Generators can only be iterated over once.',
    patternToNotice: 'Once a generator is consumed, it remains empty.',
    concept: 'generators',
    requiredTokens: ['[x for x in range(3)]']
  },

  // Build (Build)
  {
    id: 'py-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 1,
    title: 'Double Numbers',
    content: '# Return a list of numbers doubled from input list "nums"',
    explanation: 'A simple list comprehension handles this efficiently.',
    patternToNotice: 'x * 2 for x in nums',
    concept: 'comprehensions',
    requiredTokens: ['[', 'for', 'in', '* 2', ']']
  },
  {
    id: 'py-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 2,
    title: 'Dictionary Filter',
    content: '# Return dict "d" with only keys where value > 10',
    explanation: 'Use a dictionary comprehension: {k: v for k, v in d.items() if v > 10}.',
    patternToNotice: 'Use .items() to get both key and value during iteration.',
    concept: 'comprehensions',
    requiredTokens: ['{', '.items()', 'if', 'v > 10', '}']
  },
  {
    id: 'py-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 3,
    title: 'List to Dict Frequency',
    content: '# Count occurrences of strings in list "words"',
    explanation: 'collections.Counter or a loop with .get() is standard.',
    patternToNotice: 'The result should be a map of word: count.',
    concept: 'dictionaries',
    requiredTokens: ['for', 'in', '.get(', '0) + 1']
  },
  {
    id: 'py-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 4,
    title: 'Debounce Wrapper',
    content: '# Write a decorator that skips calls if made within 1s',
    explanation: 'Requires nested functions and timestamp comparison.',
    patternToNotice: 'Keep state in the outer closure to track last call time.',
    concept: 'decorators',
    requiredTokens: ['def', 'def', 'time.time()', 'return']
  }
];
