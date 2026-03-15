
/**
 * @fileOverview Synthetic training data for the Coding Lab.
 * 
 * CONTENT CATEGORIES:
 * 1. Foundation: Python, JS/TS, SQL (Focus: Verification/Reading)
 * 2. Specialist: Rust, Bash, Swift, Go (Focus: Execution/Writing)
 */

import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // --- GO (SPECIALIST) ---
  {
    id: 'syntax-go-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Goroutine & Channel',
    content: 'ch := make(chan int)\ngo func() {\n    ch <- 42\n}()\nfmt.Println(<-ch)',
    description: 'Basic concurrent communication using a channel.',
    concurrencyRelevant: true
  },
  {
    id: 'bug-go-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Deadlock Risk',
    content: 'func main() {\n    ch := make(chan string)\n    ch <- "ping"\n    fmt.Println(<-ch)\n}',
    bugs: [{ line: 3, type: 'Concurrency' }],
    description: 'Sending to an unbuffered channel in the same goroutine causes a deadlock.',
    concurrencyRelevant: true
  },
  {
    id: 'impl-go-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 2,
    title: 'Worker Pool Core',
    description: 'Implement a worker that reads from a jobs channel and sends to a results channel.',
    content: 'func worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        results <- j * 2\n    }\n}',
    concurrencyRelevant: true
  },

  // --- SQL (FOUNDATION) ---
  {
    id: 'syntax-sql-cte',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 2,
    title: 'CTE & Window Function',
    content: 'WITH regional_sales AS (\n    SELECT region, SUM(amount) as total\n    FROM sales GROUP BY region\n)\nSELECT region, total, RANK() OVER(ORDER BY total DESC) FROM regional_sales;',
    description: 'Using Common Table Expressions and Window functions for ranking.'
  },
  {
    id: 'output-sql-join',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 1,
    title: 'Left Join Result',
    tableInput: 'Users: [1, "A"], [2, "B"]\nPosts: [1, "Hello"] (User 1)',
    content: 'SELECT Users.name, Posts.title FROM Users LEFT JOIN Posts ON Users.id = Posts.user_id;',
    expectedOutput: '["A", "Hello"], ["B", NULL]',
    description: 'Predicting result set with NULLs in a LEFT JOIN.'
  },
  {
    id: 'bug-sql-group',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 1,
    title: 'Aggregation Error',
    content: 'SELECT department, name, AVG(salary)\nFROM employees\nGROUP BY department;',
    bugs: [{ line: 1, type: 'Database' }],
    description: 'Selecting non-aggregated columns without grouping them.'
  },

  // --- BASH (SPECIALIST) ---
  {
    id: 'syntax-bash-pipe',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'Command Pipeline',
    content: 'cat data.log | grep "ERROR" | awk \'{print $NF}\' | sort | uniq -c',
    description: 'Extracting and counting unique errors from a log file.'
  },
  {
    id: 'bug-bash-quotes',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 1,
    title: 'Variable Expansion',
    content: 'FILE_PATH="My Documents/data.txt"\nls -l $FILE_PATH',
    bugs: [{ line: 2, type: 'Syntax' }],
    description: 'Missing quotes on a variable containing spaces leads to word splitting.'
  },

  // --- RUST (SPECIALIST) ---
  {
    id: 'bug-rust-borrow',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 2,
    title: 'Mutable Borrow Conflict',
    content: 'let mut s = String::from("hello");\nlet r1 = &s;\nlet r2 = &mut s;\nprintln!("{}, {}", r1, r2);',
    bugs: [{ line: 3, type: 'Ownership' }],
    description: 'Cannot have a mutable borrow while immutable borrows are active.'
  },

  // --- TYPESCRIPT (FOUNDATION) ---
  {
    id: 'bug-ts-interface',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Interface Compliance',
    content: 'interface User { id: number; name: string; }\nconst u: User = { id: "1", name: "Alice" };',
    bugs: [{ line: 2, type: 'Type' }],
    description: 'Type mismatch: string assigned to a number property.'
  },

  // --- FOUNDATION CORE DRILLS (Preserved and Updated) ---
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
  }
];
