
/**
 * @fileOverview Synthetic training data for the Coding Lab.
 * 
 * CONTENT CATEGORIES:
 * 1. Foundation: Python, JS/TS, SQL (Focus: Verification/Reading)
 * 2. Specialist: Rust, Bash, Swift, Go (Focus: Execution/Writing)
 */

import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // --- PYTHON (FOUNDATION) ---
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
    id: 'recon-py-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'List Comprehension',
    content: 'squares = [x**2 for x in range(10) if x % 2 == 0]\nprint(squares)',
    description: 'Reconstruct a concise list comprehension with a conditional filter.'
  },
  {
    id: 'output-py-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'Dictionary Access',
    content: 'd = {"a": 1, "b": 2}\nprint(d.get("c", 3))',
    expectedOutput: '3',
    description: 'Predict the output of a dictionary get operation with a default value.'
  },
  {
    id: 'bug-py-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 1,
    title: 'Indentation Error',
    content: 'def greet(name):\nprint(f"Hello {name}")\n\ngreet("Alice")',
    bugs: [{ line: 2, type: 'Syntax' }],
    description: 'Identify the missing indentation in a function body.'
  },
  {
    id: 'impl-py-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 1,
    title: 'FizzBuzz Implementation',
    content: 'for i in range(1, 16):\n    if i % 15 == 0: print("FizzBuzz")\n    elif i % 3 == 0: print("Fizz")\n    elif i % 5 == 0: print("Buzz")\n    else: print(i)',
    description: 'Implement the classic FizzBuzz logic for numbers 1 to 15.'
  },

  // --- JAVASCRIPT (FOUNDATION) ---
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
    id: 'recon-js-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Destructuring',
    content: 'const { name, age } = user;\nconsole.log(`${name} is ${age}`);',
    description: 'Reconstruct object destructuring and template literals.'
  },
  {
    id: 'output-js-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Coercion Check',
    content: 'console.log(1 + "2" - 1);',
    expectedOutput: '11',
    description: 'Predict output involving string concatenation followed by numeric subtraction.'
  },
  {
    id: 'bug-js-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Strict Equality',
    content: 'if (x = 5) {\n  console.log("True");\n}',
    bugs: [{ line: 1, type: 'Logic' }],
    description: 'Identify assignment used inside a conditional instead of comparison.'
  },
  {
    id: 'impl-js-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Array Filter',
    content: 'const evens = numbers.filter(n => n % 2 === 0);',
    description: 'Filter an array to return only even numbers.'
  },

  // --- TYPESCRIPT (FOUNDATION) ---
  {
    id: 'syntax-ts-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Interface Def',
    content: 'interface User {\n  id: number;\n  name: string;\n  email?: string;\n}',
    description: 'Type a standard interface with an optional property.'
  },
  {
    id: 'recon-ts-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Generics',
    content: 'function wrap<T>(val: T): T[] {\n  return [val];\n}',
    description: 'Reconstruct a simple generic wrapper function.'
  },
  {
    id: 'output-ts-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Union Types',
    content: 'let x: string | number = "5";\nx = 10;\nconsole.log(typeof x);',
    expectedOutput: 'number',
    description: 'Predict the runtime type after re-assignment of a union type variable.'
  },
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
  {
    id: 'impl-ts-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Enum Map',
    content: 'enum Status { Active, Inactive }\nconst s: Status = Status.Active;',
    description: 'Implement and use a simple numeric enum.'
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
    id: 'recon-sql-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 1,
    title: 'Inner Join',
    content: 'SELECT u.name, p.title\nFROM users u\nINNER JOIN posts p ON u.id = p.user_id;',
    description: 'Reconstruct a standard INNER JOIN between two tables.'
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
  {
    id: 'impl-sql-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 1,
    title: 'Filtering & Sorting',
    content: 'SELECT * FROM products WHERE price > 100 ORDER BY name ASC;',
    description: 'Write a query to filter products by price and sort by name.'
  },

  // --- RUST (SPECIALIST) ---
  {
    id: 'syntax-rust-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Match Expression',
    content: 'match value {\n    Some(v) => println!("{}", v),\n    None => println!("None"),\n}',
    description: 'Type a standard Option match pattern.'
  },
  {
    id: 'recon-rust-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Struct Method',
    content: 'impl Circle {\n    fn area(&self) -> f64 {\n        3.14 * self.radius * self.radius\n    }\n}',
    description: 'Reconstruct a simple method implementation for a struct.'
  },
  {
    id: 'output-rust-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 1,
    title: 'Ownership Move',
    content: 'let s1 = String::from("hi");\nlet s2 = s1;\nprintln!("{}", s2);',
    expectedOutput: 'hi',
    description: 'Predict output after a string ownership transfer.'
  },
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
  {
    id: 'impl-rust-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 1,
    title: 'Vector Loop',
    content: 'for x in &vec {\n    println!("{}", x);\n}',
    description: 'Implement a loop over a borrowed vector.'
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
    id: 'recon-bash-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'For Loop',
    content: 'for i in {1..5}; do\n  echo "Item $i"\ndone',
    description: 'Reconstruct a simple range-based for loop.'
  },
  {
    id: 'output-bash-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 1,
    title: 'Variable Expansion',
    content: 'NAME="World"\necho "Hello $NAME"',
    expectedOutput: 'Hello World',
    description: 'Predict standard string interpolation.'
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
  {
    id: 'impl-bash-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 1,
    title: 'File Check',
    content: 'if [ -f "$FILE" ]; then\n  echo "Exists"\nfi',
    description: 'Implement a conditional check for file existence.'
  },

  // --- SWIFT (SPECIALIST) ---
  {
    id: 'syntax-swift-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 1,
    title: 'Optional Binding',
    content: 'if let name = user.name {\n    print("Hello, \\(name)")\n}',
    description: 'Type a standard if-let optional unwrapping pattern.'
  },
  {
    id: 'recon-swift-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 1,
    title: 'Guard Statement',
    content: 'guard let id = id else { return }\nprint(id)',
    description: 'Reconstruct an early-exit guard statement.'
  },
  {
    id: 'output-swift-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 1,
    title: 'Array Append',
    content: 'var list = [1, 2]\nlist.append(3)\nprint(list.count)',
    expectedOutput: '3',
    description: 'Predict the count of an array after modification.'
  },
  {
    id: 'bug-swift-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 1,
    title: 'Force Unwrapping',
    content: 'let name: String? = nil\nprint(name!)',
    bugs: [{ line: 2, type: 'Type' }],
    description: 'Identify a crash caused by force-unwrapping a nil optional.'
  },
  {
    id: 'impl-swift-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 1,
    title: 'Simple Struct',
    content: 'struct User {\n    let id: Int\n    var name: String\n}',
    description: 'Implement a basic struct with constant and variable properties.'
  },

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
    id: 'recon-go-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Error Handling',
    content: 'res, err := doWork()\nif err != nil {\n    return err\n}',
    description: 'Reconstruct the idiomatic Go error checking pattern.'
  },
  {
    id: 'output-go-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 1,
    title: 'Slice Length',
    content: 's := []int{1, 2, 3}\ns = append(s, 4)\nfmt.Println(len(s))',
    expectedOutput: '4',
    description: 'Predict length of a slice after an append operation.'
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
  }
];
