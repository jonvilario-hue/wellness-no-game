
/**
 * @fileOverview Idiomatic training data for the Coding Lab.
 * 
 * DRILL STRATEGY:
 * - SQL: Joins, Aggregation, Nulls, Window Functions.
 * - Bash: Pipelines, Quoting, Expansion, Exit codes.
 * - Rust: Ownership, Borrowing, Result/Option, Lifetimes.
 * - Go: Concurrency (Channels/Select), Interfaces, Error handling.
 * - TS/JS: Coercion, Closures, Async, Narrowing.
 * - Python: Mutability, Comprehensions, Scoping.
 */

import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // --- SQL (FOUNDATION - Focus: Verification/Read) ---
  {
    id: 'sql-join-null-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Left Join Null Behavior',
    tableInput: 'Users: {id: 1, name: "A"}, {id: 2, name: "B"}\nLogs: {user_id: 1, action: "Login"}',
    content: 'SELECT Users.name, Logs.action FROM Users LEFT JOIN Logs ON Users.id = Logs.user_id;',
    expectedOutput: 'A, Login | B, NULL',
    explanation: 'A LEFT JOIN returns all rows from the left table. If no match exists in the right table (User 2), right-side columns are populated with NULL.',
    patternToNotice: 'NULLs in Outer Joins indicate non-matching records.'
  },
  {
    id: 'sql-group-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 1,
    title: 'Aggregated Columns',
    content: 'SELECT department, name, COUNT(*) \nFROM employees \nGROUP BY department;',
    bugs: [{ line: 1, type: 'Database' }],
    explanation: 'In most SQL dialects, selecting a non-aggregated column (name) that is not in the GROUP BY clause is invalid.',
    patternToNotice: 'All non-aggregated SELECT columns must appear in the GROUP BY clause.'
  },

  // --- BASH (SPECIALIST - Focus: Production/Write) ---
  {
    id: 'bash-quoting-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Word Splitting Pitfall',
    content: 'FILE_PATH="My Documents/data.txt"\nls -l $FILE_PATH',
    bugs: [{ line: 2, type: 'Syntax' }],
    explanation: 'Without double quotes, Bash performs word splitting on the space in "My Documents", attempting to list two separate non-existent files.',
    patternToNotice: 'Always double-quote variable expansions containing potential spaces.'
  },
  {
    id: 'bash-pipe-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 2,
    title: 'Log Extraction Pipeline',
    content: 'cat access.log | grep "404" | cut -d" " -f1 | sort | uniq -c',
    description: 'Count unique IP addresses generating 404 errors.',
    explanation: 'This pipeline follows the Unix philosophy: extract (grep), isolate field (cut), prepare for counting (sort), and count (uniq -c).',
    patternToNotice: 'Uniq only works on adjacent identical lines; always sort before uniq.'
  },

  // --- RUST (SPECIALIST - Focus: Systems/Write) ---
  {
    id: 'rust-move-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Use After Move',
    content: 'let s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);',
    bugs: [{ line: 3, type: 'Borrow Checker' }],
    explanation: 'Strings in Rust do not implement the Copy trait. Moving s1 to s2 invalidates s1 to ensure memory safety.',
    patternToNotice: 'Ownership transfer (moving) makes the source variable inaccessible.'
  },
  {
    id: 'rust-option-match-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 1,
    title: 'Option Unwrapping',
    content: 'let x: Option<i32> = None;\nlet y = x.unwrap_or(10) + 5;\nprintln!("{}", y);',
    expectedOutput: '15',
    explanation: 'unwrap_or(default) safely handles the None case by returning the provided default value.',
    patternToNotice: 'Use unwrap_or to provide safe fallback logic for Optional values.'
  },

  // --- GO (SPECIALIST - Focus: Concurrency/Write) ---
  {
    id: 'go-chan-deadlock-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 3,
    title: 'Unbuffered Channel Deadlock',
    content: 'ch := make(chan int)\nch <- 42\nfmt.Println(<-ch)',
    bugs: [{ line: 2, type: 'Concurrency' }],
    concurrencyRelevant: true,
    explanation: 'Sending to an unbuffered channel blocks the current goroutine until a receiver is ready. Since both happen in the same goroutine, it deadlocks.',
    patternToNotice: 'Unbuffered channel sends/receives MUST occur in different goroutines.'
  },
  {
    id: 'go-error-return-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Idiomatic Error Check',
    content: 'val, err := doWork()\nif err != nil {\n    return nil, err\n}',
    explanation: 'Go uses explicit error checking as a return value rather than exceptions.',
    patternToNotice: 'Check for error immediately after the function call.'
  },

  // --- TYPESCRIPT (FOUNDATION - Focus: Verification/Read) ---
  {
    id: 'ts-narrowing-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Missing Type Guard',
    content: 'function log(val: string | number) {\n  console.log(val.toUpperCase());\n}',
    bugs: [{ line: 2, type: 'Type' }],
    explanation: 'TypeScript requires narrowing (type guarding) before calling type-specific methods like toUpperCase() on a union type.',
    patternToNotice: 'Check the specific type of a union before using type-specific methods.'
  },

  // --- PYTHON (FOUNDATION - Focus: Verification/Read) ---
  {
    id: 'py-mutability-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Mutable Default Argument',
    content: 'def add_to(item, list=[]):\n    list.append(item)\n    return list',
    bugs: [{ line: 1, type: 'Logic' }],
    explanation: 'In Python, default arguments are evaluated once at definition time. The same list object is reused across all calls to the function.',
    patternToNotice: 'Never use mutable objects (lists, dicts) as default arguments; use None instead.'
  }
];
