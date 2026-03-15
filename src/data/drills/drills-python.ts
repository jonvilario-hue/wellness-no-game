
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

import type { CodingDrill } from '@/types/coding';

export const pythonDrills: CodingDrill[] = [
  // Syntax Sprints
  {
    id: 'py-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'List Comprehension',
    content: '[x**2 for x in range(10)]',
    explanation: 'Basic list comprehension syntax.',
    patternToNotice: 'Expression comes first, followed by the loop.',
    concept: 'comprehensions',
    requiredTokens: ['[', 'for', 'in', 'range', ']']
  },
  {
    id: 'py-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'F-String Interpolation',
    content: 'f"Name: {user.name}"',
    explanation: 'F-strings allow embedding variables directly.',
    patternToNotice: 'The "f" prefix before quotes is mandatory.',
    concept: 'strings',
    requiredTokens: ['f"', '{', '}']
  },
  {
    id: 'py-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 3,
    title: 'Args and Kwargs',
    content: 'def fn(*args, **kwargs):',
    explanation: 'Unpacking arbitrary positional and keyword arguments.',
    patternToNotice: '* is for list unpacking, ** is for dict unpacking.',
    concept: 'functions',
    requiredTokens: ['*', 'args', '**', 'kwargs']
  },
  {
    id: 'py-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 4,
    title: 'Context Manager',
    content: 'with open("f.txt") as f:',
    explanation: 'The "with" statement ensures file closure.',
    patternToNotice: 'Indentation identifies the scope of the file handle.',
    concept: 'context-managers',
    requiredTokens: ['with', 'open', 'as', ':']
  },

  // Code Reconstruction
  {
    id: 'py-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'Conditionals',
    content: 'if x > 0:\n    print("pos")\nelse:\n    print("neg")',
    explanation: 'Standard if/else branching with colons.',
    patternToNotice: 'Indentation defines the block levels.',
    concept: 'conditionals',
    requiredTokens: ['if', ':', 'else', ':']
  },
  {
    id: 'py-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'Try Except',
    content: 'try:\n    val = int(s)\nexcept ValueError:\n    val = 0',
    explanation: 'Catching specific errors prevents crashes.',
    patternToNotice: 'Only the code likely to fail should be in the try block.',
    concept: 'exceptions',
    requiredTokens: ['try', ':', 'except', ':']
  },
  {
    id: 'py-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 3,
    title: 'List Slicing',
    content: 'reversed_list = data[::-1]',
    explanation: '[start:stop:step] syntax for list manipulation.',
    patternToNotice: '-1 step effectively reverses the sequence.',
    concept: 'lists',
    requiredTokens: ['[', ':', ':', '-1', ']']
  },
  {
    id: 'py-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 4,
    title: 'Lambda Filter',
    content: 'list(filter(lambda x: x > 0, nums))',
    explanation: 'Using functional primitives with anonymous functions.',
    patternToNotice: 'Filter returns an iterator; list() consumes it.',
    concept: 'functional',
    requiredTokens: ['list', 'filter', 'lambda', ':']
  },

  // Output Prediction
  {
    id: 'py-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'List Appending',
    content: 'a = [1]\nb = a\na.append(2)\nprint(b)',
    expectedOutput: '[1, 2]',
    explanation: 'Lists are mutable; b refers to the same object as a.',
    patternToNotice: 'Variables in Python are pointers to memory locations.',
    concept: 'mutability'
  },
  {
    id: 'py-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Bool Evaluation',
    content: 'print(bool([]) or bool(0))',
    expectedOutput: 'False',
    explanation: 'Empty containers and zero are falsy in Python.',
    patternToNotice: 'None, [], {}, 0, and "" are all False.',
    concept: 'truthiness'
  },
  {
    id: 'py-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 3,
    title: 'Integer Caching',
    content: 'a = 256\nb = 256\nprint(a is b)',
    expectedOutput: 'True',
    explanation: 'Python caches small integers (-5 to 256) for performance.',
    patternToNotice: '"is" checks memory ID, not just value.',
    concept: 'caching'
  },
  {
    id: 'py-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 4,
    title: 'Mutable Defaults',
    content: 'def f(x, l=[]):\n    l.append(x)\n    return l\nf(1)\nprint(f(2))',
    expectedOutput: '[1, 2]',
    explanation: 'Default arguments are evaluated once at definition.',
    patternToNotice: 'The list exists once and is shared across calls.',
    concept: 'functions'
  },

  // Bug Hunt
  {
    id: 'py-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'Indentation Error',
    content: 'def f():\nprint("hi")',
    explanation: 'Functions require an indented block.',
    patternToNotice: 'Python is whitespace-sensitive.',
    concept: 'syntax',
    requiredTokens: ['    print']
  },
  {
    id: 'py-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Tuple Assignment',
    content: 't = (1, 2)\nt[0] = 3',
    explanation: 'Tuples are immutable and cannot be modified.',
    patternToNotice: 'Use [ ] for mutable lists, ( ) for fixed tuples.',
    concept: 'mutability',
    requiredTokens: ['list(t)']
  },
  {
    id: 'py-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 3,
    title: 'Global Scoping',
    content: 'x = 1\ndef f():\n    x += 1',
    explanation: 'Cannot modify a global variable without the global keyword.',
    patternToNotice: 'Assignment within a function creates a local variable.',
    concept: 'scoping',
    requiredTokens: ['global x']
  },
  {
    id: 'py-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 4,
    title: 'Iterator Exhaustion',
    content: 'gen = (x for x in range(3))\nlist(gen)\nprint(list(gen))',
    explanation: 'Generators can only be consumed once.',
    patternToNotice: 'Convert to a list early if you need multiple passes.',
    concept: 'generators',
    requiredTokens: ['list(']
  },

  // Build / Timed Implementation
  {
    id: 'py-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 1,
    title: 'Filter Even',
    content: '# Return a list of even numbers from "nums"',
    explanation: 'Use [x for x in nums if x % 2 == 0].',
    patternToNotice: 'Comprehensions are the Pythonic way to filter.',
    concept: 'comprehensions',
    requiredTokens: ['for', 'in', '% 2 == 0']
  },
  {
    id: 'py-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 2,
    title: 'Merge Dicts',
    content: '# Merge dict "a" and "b" into a new dict',
    explanation: 'Use {**a, **b} or a | b (Python 3.9+).',
    patternToNotice: '| is the union operator for dictionaries.',
    concept: 'dictionaries',
    requiredTokens: ['|']
  },
  {
    id: 'py-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 3,
    title: 'Sort by Lambda',
    content: '# Sort list of dicts "data" by key "age"',
    explanation: 'Use data.sort(key=lambda x: x["age"]).',
    patternToNotice: 'The key parameter takes a transformation function.',
    concept: 'sorting',
    requiredTokens: ['sort', 'key=', 'lambda']
  },
  {
    id: 'py-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 4,
    title: 'Decorator',
    content: '# Write a decorator "timer" that prints execution time',
    explanation: 'Requires inner wrapper function and functools.wraps.',
    patternToNotice: 'Decorators wrap function calls without modifying them.',
    concept: 'decorators',
    requiredTokens: ['def', 'def', 'return', 'return']
  }
];
