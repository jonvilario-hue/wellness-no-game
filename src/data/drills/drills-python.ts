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
  // --- Syntax Sprints ---
  {
    id: 'py-syn-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'List Comprehension',
    content: '[x**2 for x in range(10)]',
    explanation: 'Basic list comprehension syntax for generating a list of squares.',
    patternToNotice: 'Expression comes first, then the loop.',
    concept: 'comprehensions',
    requiredTokens: ['[', 'for', 'in', 'range', ']']
  },
  {
    id: 'py-syn-2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'Dict Comprehension',
    content: '{k: v for k, v in items if v > 0}',
    explanation: 'Filtering a dictionary during construction.',
    patternToNotice: 'Uses curly braces and key:value syntax.',
    concept: 'comprehensions',
    requiredTokens: ['{', ':', 'for', 'in', 'if', '}']
  },
  {
    id: 'py-syn-3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 3,
    title: 'Lambda Filter',
    content: 'list(filter(lambda x: x % 2 == 0, nums))',
    explanation: 'Using lambdas with the filter primitive.',
    patternToNotice: 'Lambda requires an argument and an expression.',
    concept: 'functional',
    requiredTokens: ['list', 'filter', 'lambda', ':', '==']
  },
  {
    id: 'py-syn-4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 4,
    title: 'Context Manager',
    content: 'with open("file.txt") as f:\n    data = f.read()',
    explanation: 'Safely handling file resources.',
    patternToNotice: 'The "with" keyword handles setup and cleanup automatically.',
    concept: 'io',
    requiredTokens: ['with', 'open', 'as', ':', 'read']
  },

  // --- Code Reconstruction ---
  {
    id: 'py-rec-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'If-Else Block',
    content: 'if x > 0:\n    print("pos")\nelse:\n    print("neg")',
    explanation: 'Standard conditional branching.',
    patternToNotice: 'Python uses colons and indentation, not curly braces.',
    concept: 'logic',
    requiredTokens: ['if', ':', 'else', ':']
  },
  {
    id: 'py-rec-2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'Function Decorator',
    content: '@timer\ndef task():\n    pass',
    explanation: 'Applying metadata or behavior to a function.',
    patternToNotice: 'Decorators start with the @ symbol.',
    concept: 'decorators',
    requiredTokens: ['@', 'def', ':', 'pass']
  },
  {
    id: 'py-rec-3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 3,
    title: 'Try-Except-Finally',
    content: 'try:\n    do_work()\nexcept Error as e:\n    handle(e)\nfinally:\n    cleanup()',
    explanation: 'Comprehensive error handling.',
    patternToNotice: 'Finally always runs, regardless of an exception.',
    concept: 'errors',
    requiredTokens: ['try', 'except', 'as', 'finally']
  },
  {
    id: 'py-rec-4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 4,
    title: 'Class Definition',
    content: 'class User(Base):\n    def __init__(self, name):\n        self.name = name',
    explanation: 'Object oriented blueprint with inheritance.',
    patternToNotice: 'Self is an explicit first parameter in Python methods.',
    concept: 'classes',
    requiredTokens: ['class', '(', ')', 'def', '__init__', 'self']
  },

  // --- Output Prediction ---
  {
    id: 'py-out-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'List Slicing',
    content: 'nums = [1, 2, 3, 4, 5]\nprint(nums[1:3])',
    expectedOutput: '[2, 3]',
    explanation: 'Slicing is inclusive of the start and exclusive of the end index.',
    patternToNotice: 'Index 1 is the second element; index 3 is the fourth.',
    concept: 'lists'
  },
  {
    id: 'py-out-2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Default Arguments',
    content: 'def add(a, b=10):\n    return a + b\nprint(add(5))',
    expectedOutput: '15',
    explanation: 'Parameters with defaults are optional during the call.',
    patternToNotice: 'The value 5 is assigned to the first parameter "a".',
    concept: 'functions'
  },
  {
    id: 'py-out-3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 3,
    title: 'Mutable Defaults',
    content: 'def f(x, l=[]):\n    l.append(x)\n    return l\nprint(f(1), f(2))',
    expectedOutput: '[1] [1, 2]',
    explanation: 'Default arguments are evaluated once at definition time, not call time.',
    patternToNotice: 'The same list object is reused across all calls to the function.',
    concept: 'pitfalls'
  },
  {
    id: 'py-out-4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 4,
    title: 'Closure Scoping',
    content: 'x = 10\ndef outer():\n    x = 20\n    def inner():\n        print(x)\n    inner()\nouter()',
    expectedOutput: '20',
    explanation: 'Python uses LEGB (Local, Enclosing, Global, Built-in) lookup.',
    patternToNotice: 'Inner looks at the enclosing "outer" scope before the global scope.',
    concept: 'scoping'
  },

  // --- Bug Hunt ---
  {
    id: 'py-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'Missing Colon',
    content: 'if x > 10\n    print("big")',
    explanation: 'Python block starters (if, for, while, def, class) require a colon.',
    patternToNotice: 'Always check for the : before the indented block.',
    concept: 'syntax',
    requiredTokens: ['if', '>', ':', 'print']
  },
  {
    id: 'py-bug-2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Tuple Mutability',
    content: 't = (1, 2)\nt[0] = 10',
    explanation: 'Tuples are immutable; their elements cannot be changed after creation.',
    patternToNotice: 'Use square brackets [] for mutable lists if you need change.',
    concept: 'types',
    requiredTokens: ['t = [1, 2]']
  },
  {
    id: 'py-bug-3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 3,
    title: 'Global Reference',
    content: 'count = 0\ndef inc():\n    count += 1',
    explanation: 'Modifying a global variable inside a function requires the "global" keyword.',
    patternToNotice: 'UnboundLocalError occurs when assigning to a global without declaring it.',
    concept: 'scoping',
    requiredTokens: ['global', 'count']
  },
  {
    id: 'py-bug-4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 4,
    title: 'Is vs Equals',
    content: 'a = [1, 2]\nb = [1, 2]\nif a is b: print("same")',
    explanation: '"is" checks identity (memory address); "==" checks equality (value).',
    patternToNotice: 'Two separate lists with the same values are not the same object.',
    concept: 'logic',
    requiredTokens: ['==']
  },

  // --- Build ---
  {
    id: 'py-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 1,
    title: 'Hello Function',
    content: '# Write a function "greet" that returns "Hello, [name]"',
    explanation: 'Basic function definition and string formatting.',
    patternToNotice: 'Use f-strings for concise formatting.',
    concept: 'basics',
    requiredTokens: ['def', 'greet', 'name', 'return', 'f"Hello, {name}"']
  },
  {
    id: 'py-build-2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 2,
    title: 'Filter List',
    content: '# Filter "nums" to return only even numbers',
    explanation: 'Using list comprehensions for filtering.',
    patternToNotice: 'The condition "if x % 2 == 0" belongs at the end.',
    concept: 'comprehensions',
    requiredTokens: ['[', 'for', 'in', 'if', '%', '==', '0', ']']
  },
  {
    id: 'py-build-3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 3,
    title: 'Unique Sorted',
    content: '# Return sorted unique elements of list "data"',
    explanation: 'Combining set for uniqueness and sorted for ordering.',
    patternToNotice: 'Convert to set then wrap in sorted().',
    concept: 'builtins',
    requiredTokens: ['sorted', 'set']
  },
  {
    id: 'py-build-4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 4,
    title: 'Merge Dictionaries',
    content: '# Merge dicts "a" and "b" (b overwrites a)',
    explanation: 'Modern Python (3.9+) uses the union operator | for dicts.',
    patternToNotice: 'a | b creates a new merged dictionary.',
    concept: 'dictionaries',
    requiredTokens: ['a', '|', 'b']
  }
];
