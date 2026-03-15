
/**
 * @fileOverview Comprehensive IDIOMATIC Drill Library.
 * 
 * Rules enforced:
 * 1. Functional determinism (Stage 1)
 * 2. Language-specific idioms (Stage 2)
 * 3. Standardized difficulty 1-4 (Stage 4)
 */

import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // ==========================================
  // FOUNDATION: PYTHON
  // ==========================================
  {
    id: 'py-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Mutable Default Pitfall',
    content: 'def f(a, b=[]):\n  b.append(a)\n  return b\nprint(f(1), end=" ")\nprint(f(2))',
    expectedOutput: '[1] [1, 2]',
    concept: 'mutability',
    explanation: 'In Python, default arguments are evaluated once at definition time, not execution. The list "b" persists between calls.',
    patternToNotice: 'Avoid using mutable objects (lists, dicts) as default parameters. Use None instead.'
  },
  {
    id: 'py-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 1,
    title: 'List Comprehension Filter',
    content: '# Implement a list comprehension that squares even numbers in a list "nums"',
    concept: 'comprehensions',
    requiredTokens: ['[', 'for', 'in', 'if', '%', '2', '==', '0', '**', '2'],
    testCases: [
      { input: '[1, 2, 3, 4]', expected: '[4, 16]', description: 'Filter and square' },
      { input: '[1, 3, 5]', expected: '[]', description: 'Empty result' }
    ],
    explanation: 'List comprehensions follow the [expression for item in iterable if condition] pattern.',
    patternToNotice: 'The filter comes at the end of the comprehension.'
  },

  // ==========================================
  // FOUNDATION: SQL
  // ==========================================
  {
    id: 'sql-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Inner Join vs Exists',
    tableInput: 'Users: [1, "Dev"], [2, "Ops"]\nLogs: [1, "Err"]',
    content: 'SELECT name FROM Users WHERE id IN (SELECT user_id FROM Logs)',
    expectedOutput: 'Dev',
    concept: 'subqueries',
    explanation: 'The IN operator filters the outer query based on values returned by the subquery.',
    patternToNotice: 'Subqueries in the WHERE clause are evaluated conceptually before the outer filter.'
  },
  {
    id: 'sql-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 3,
    title: 'Missing Group By',
    content: 'SELECT dept, AVG(salary) FROM employees WHERE active = 1',
    concept: 'aggregation',
    explanation: 'When using aggregate functions (AVG) with non-aggregated columns (dept), a GROUP BY clause is mandatory.',
    patternToNotice: 'Every column in SELECT that is not an aggregate must appear in GROUP BY.',
    requiredTokens: ['GROUP BY', 'dept']
  },

  // ==========================================
  // SPECIALIST: RUST
  // ==========================================
  {
    id: 'rust-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'The Borrow Checker: Move',
    content: 'let s1 = String::from("hi");\nlet s2 = s1;\nprintln!("{}", s1);',
    concept: 'ownership',
    explanation: 'String does not implement the Copy trait. Assigning s1 to s2 moves ownership, invalidating s1.',
    patternToNotice: 'Heap-allocated data is moved by default. Use .clone() to keep the original.',
    requiredTokens: ['clone']
  },
  {
    id: 'rust-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 2,
    title: 'Pattern Matching Options',
    content: 'match some_val {\n  Some(v) => v,\n  None => 0\n}',
    concept: 'enums',
    explanation: 'Match statements in Rust must be exhaustive, handling all variants of an Enum.',
    patternToNotice: 'The Option enum is the idiomatic way to handle nullability in Rust.',
    requiredTokens: ['match', 'Some', 'None', '=>']
  },

  // ==========================================
  // SPECIALIST: GO
  // ==========================================
  {
    id: 'go-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 3,
    title: 'Channel Deadlock',
    content: 'ch := make(chan int)\nch <- 1\nfmt.Println(<-ch)',
    expectedOutput: 'deadlock',
    concept: 'concurrency',
    concurrencyRelevant: true,
    explanation: 'Unbuffered channel sends block until there is a receiver. This blocks the main goroutine permanently.',
    patternToNotice: 'Sends to unbuffered channels must happen in a separate goroutine or use a buffer.'
  },
  {
    id: 'go-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 2,
    title: 'Multiple Return Values',
    content: '// Implement a function "divide" that returns (int, error)\n// Return an error if the divisor is 0.',
    concept: 'error-handling',
    requiredTokens: ['func', 'error', 'nil', 'errors.New', 'return'],
    explanation: 'Go uses multiple return values to explicitly separate logic results from error states.',
    patternToNotice: 'The error is traditionally the final return value.'
  }
];
