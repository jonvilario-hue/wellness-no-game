
/**
 * @fileOverview Synthetic training data for the Coding Lab.
 * 
 * SOURCE AND CURATION:
 * These drills are synthetically curated "gym reps" designed to build automaticity. 
 * They are not pulled from external proprietary question banks. The content is 
 * derived from:
 * 1. Standard Language Specifications: Official documentation for Python, JS, TS, 
 *    Java, and C++ to ensure accurate syntax.
 * 2. Common Algorithmic Patterns: "Functional scales" like array manipulation, 
 *    string parsing, and basic control flow used in industry standards.
 * 3. Real-world Error Heuristics: The Bug Hunt categories are modeled after 
 *    the most frequent developer errors (e.g., off-by-one, scope leaks).
 * 
 * FOCUS:
 * The goal is high-frequency repetition of foundational structures, not 
 * novel problem-solving or conceptual teaching.
 */

import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // --- WRITE LANE: SYNTAX SPRINTS ---
  {
    id: 'syntax-py-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'Variable & Loop',
    content: 'for i in range(10):\n    x = i * 2\n    print(f"Value: {x}")',
    description: 'A standard for-loop with f-string formatting.'
  },
  {
    id: 'syntax-js-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Array Mapping',
    content: 'const doubled = arr.map(n => n * 2);\nconsole.log(doubled);',
    description: 'Basic functional programming pattern using .map()'
  },
  {
    id: 'syntax-ts-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Interface & Type',
    content: 'interface User {\n  id: string;\n  name: string;\n}\nconst u: User = { id: "1", name: "Alice" };',
    description: 'Interface definition and object assignment.'
  },
  {
    id: 'syntax-rust-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Immutable Binding',
    content: 'fn main() {\n    let x = 5;\n    println!("Value: {}", x);\n}',
    description: 'Basic Rust main function and variable binding.'
  },
  {
    id: 'syntax-sql-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 1,
    title: 'Select & Filter',
    content: 'SELECT name, email FROM users WHERE active = 1 ORDER BY created_at DESC;',
    description: 'Standard SQL query syntax for data retrieval.'
  },
  {
    id: 'syntax-bash-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'File Loop',
    content: 'for file in *.txt; do\n    echo "Processing $file"\n    cat "$file"\ndone',
    description: 'Bash loop for iterating over files.'
  },
  {
    id: 'syntax-swift-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 1,
    title: 'Safe Optional',
    content: 'if let name = user.name {\n    print("Hello, \\(name)")\n} else {\n    print("Hello, Guest")\n}',
    description: 'Swift optional binding for safety.'
  },

  // --- READ LANE: OUTPUT PREDICTION ---
  {
    id: 'output-js-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Coercion Check',
    content: 'console.log(1 + "2" + 3);',
    expectedOutput: '123',
    description: 'Implicit string coercion in JavaScript.'
  },
  {
    id: 'output-sql-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 1,
    title: 'Count Aggregation',
    content: 'SELECT COUNT(*) FROM tasks WHERE status = "done";',
    expectedOutput: 'The number of rows where status is "done".',
    description: 'Prediction of aggregate function behavior.'
  },

  // --- READ LANE: BUG HUNT ---
  {
    id: 'bug-py-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'Indentation Issue',
    content: 'def add(a, b):\nreturn a + b',
    bugs: [{ line: 2, type: 'Syntax' }],
    description: 'Incorrect indentation for function return statement.'
  },
  {
    id: 'bug-rust-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 1,
    title: 'Ownership Error',
    content: 'let s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);',
    bugs: [{ line: 3, type: 'Type' }],
    description: 'Use of moved value in Rust.'
  },

  // --- BUILD LANE: TIMED IMPLEMENTATION ---
  {
    id: 'impl-js-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Reverse String',
    description: 'Implement a function `reverse(str)` that returns the string reversed.',
    content: 'function reverse(str) {\n  return str.split("").reverse().join("");\n}',
    testCases: [
      { input: 'hello', output: 'olleh' },
      { input: 'world', output: 'dlrow' }
    ]
  },
  {
    id: 'impl-rust-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 1,
    title: 'Fibonacci',
    description: 'Calculate the nth Fibonacci number.',
    content: 'fn fib(n: u32) -> u32 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fib(n-1) + fib(n-2)\n    }\n}',
    testCases: [{ input: 5, output: 5 }]
  }
];
