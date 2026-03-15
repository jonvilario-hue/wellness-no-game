
/**
 * @fileOverview Language-Idiomatic "Gym Reps" for Coding Fluency.
 * 
 * DESIGN PRINCIPLES:
 * 1. Functional Evaluation: Every drill has a deterministic logical requirement.
 * 2. Idiomatic Fidelity: Drills target language-unique behavior (Ownership, Channels, Windows).
 * 3. Difficulty Calibration (1-4):
 *    - L1: Single atom (syntax/keyword).
 *    - L2: Two atoms interacting (logic/coercion).
 *    - L3: Multiple patterns (structural/idiomatic).
 *    - L4: Production-edge (complex concurrency/memory).
 */

import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // ==========================================
  // PYTHON
  // ==========================================
  {
    id: 'py-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'List Comprehension',
    content: '[x * 2 for x in items if x > 0]',
    explanation: 'List comprehensions provide a concise way to create lists based on existing lists.',
    patternToNotice: 'The filter (if) comes after the iteration (for).',
    requiredTokens: ['for', 'in', 'if', '*']
  },
  {
    id: 'py-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Mutable Default Arguments',
    content: 'def add(n, l=[]):\n  l.append(n)\n  return l\nprint(add(1), add(2))',
    expectedOutput: '[1] [1, 2]',
    explanation: 'Default arguments are evaluated once at definition, not execution. The list persists across calls.',
    patternToNotice: 'Avoid using mutable objects as default arguments.'
  },
  {
    id: 'py-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 3,
    title: 'Scoping in Closures',
    content: 'funcs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])',
    expectedOutput: '[2, 2, 2]',
    explanation: 'The lambda captures the variable i, not its value. i is 2 when the loop finishes.',
    patternToNotice: 'Variables in closures are looked up at execution time.',
    bugs: [{ line: 1, type: 'Scope' }]
  },

  // ==========================================
  // JAVASCRIPT / TYPESCRIPT
  // ==========================================
  {
    id: 'js-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Coercion & Equality',
    content: 'console.log([] == ![])',
    expectedOutput: 'true',
    explanation: '[] is truthy, ![] is false. In == comparison, both are coerced to 0.',
    patternToNotice: 'JavaScript coercion rules lead to non-intuitive results.'
  },
  {
    id: 'ts-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Type Narrowing',
    content: 'if (typeof val === "string") { return val.length; }',
    explanation: 'TypeScript narrows the type of val to string within the block.',
    patternToNotice: 'typeof checks act as type guards.',
    requiredTokens: ['typeof', '===', '"string"']
  },
  {
    id: 'ts-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Exhaustive Union Check',
    content: 'type S = "A" | "B";\nfunction h(s: S) {\n  if (s === "A") return 1;\n}',
    explanation: 'Missing return for case "B". Function implicitly returns undefined.',
    patternToNotice: 'Union types require exhaustive handling.',
    bugs: [{ line: 3, type: 'Type' }]
  },

  // ==========================================
  // SQL
  // ==========================================
  {
    id: 'sql-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Left Join Semantics',
    tableInput: 'Users: [1, "Alice"], [2, "Bob"]\nOrders: [10, 1]',
    content: 'SELECT name FROM Users LEFT JOIN Orders ON Users.id = Orders.user_id WHERE Orders.id IS NULL',
    expectedOutput: 'Bob',
    explanation: 'LEFT JOIN returns all left-table rows. IS NULL filters for those without orders.',
    patternToNotice: 'LEFT JOIN + IS NULL is the pattern for finding exclusions.'
  },
  {
    id: 'sql-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 3,
    title: 'Window Function Ranking',
    content: 'SELECT name, RANK() OVER(PARTITION BY dept ORDER BY salary DESC) FROM employees',
    explanation: 'RANK() allows for ordering within specific groups (PARTITIONs).',
    patternToNotice: 'OVER() clause defines the window logic.',
    requiredTokens: ['RANK', 'OVER', 'PARTITION BY', 'ORDER BY']
  },

  // ==========================================
  // RUST
  // ==========================================
  {
    id: 'rust-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Borrow Checker: Move',
    content: 'let s = String::from("hi");\nlet s2 = s;\nprintln!("{}", s);',
    explanation: 'Ownership of the string was moved to s2. s is no longer valid.',
    patternToNotice: 'Assignment moves ownership for non-Copy types.',
    bugs: [{ line: 3, type: 'Ownership' }]
  },
  {
    id: 'rust-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 2,
    title: 'Safe Unwrap Pattern',
    content: 'if let Some(val) = option { println!("{}", val); }',
    explanation: 'if let provides a safe way to unwrap Option or Result types.',
    patternToNotice: 'Use if let to avoid unsafe .unwrap() calls.',
    requiredTokens: ['if let', 'Some', '=']
  },

  // ==========================================
  // GO
  // ==========================================
  {
    id: 'go-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 4,
    title: 'Channel Deadlock',
    content: 'ch := make(chan int)\nch <- 1\nfmt.Println(<-ch)',
    explanation: 'Unbuffered channel sends block until there is a receiver. This blocks the main goroutine permanently.',
    patternToNotice: 'Sends to unbuffered channels must happen in a separate goroutine.',
    bugs: [{ line: 2, type: 'Concurrency' }],
    concurrencyRelevant: true
  },
  {
    id: 'go-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 3,
    title: 'Select Resolution',
    content: 'select {\n  case msg := <-ch:\n    fmt.Println(msg)\n  case <-time.After(time.Second):\n    return\n}',
    explanation: 'Select allows a goroutine to wait on multiple communication operations.',
    patternToNotice: 'Select + time.After is the standard pattern for timeouts.',
    requiredTokens: ['select', 'case', '<-', 'time.After'],
    concurrencyRelevant: true
  },

  // ==========================================
  // BASH
  // ==========================================
  {
    id: 'bash-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Word Splitting',
    content: 'FILES="a b c"\nfor f in $FILES; do echo "$f"; done | wc -l',
    expectedOutput: '3',
    explanation: 'Unquoted variable $FILES is split by the shell on whitespace.',
    patternToNotice: 'Quotes prevent word splitting.',
  },
  {
    id: 'bash-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'Pipeline Filtering',
    content: 'grep "ERROR" log.txt | sort | uniq -c',
    explanation: 'Pipelines connect stdout of one command to stdin of another.',
    patternToNotice: 'Use | to chain specialized tools.',
    requiredTokens: ['|', 'grep', 'sort', 'uniq']
  }
];
