
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
 * 
 * All drills are tagged by Lane (Write, Read, Build) and Type.
 */

import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  // ==========================================
  // PYTHON (Foundation)
  // ==========================================
  {
    id: 'py-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'F-String Interpolation',
    content: 'print(f"User {name} has {count} notifications.")',
    explanation: 'F-strings provide a concise and readable way to embed expressions inside string literals.',
    patternToNotice: 'Prefix the string with "f" and use curly braces for variables.'
  },
  {
    id: 'py-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'List Comprehension Logic',
    content: 'nums = [1, 2, 3, 4]\nprint([x * 2 for x in nums if x > 2])',
    expectedOutput: '[6, 8]',
    explanation: 'The comprehension filters for numbers > 2 (3 and 4) and then doubles them.',
    patternToNotice: '[expression for item in iterable if condition]'
  },
  {
    id: 'py-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Mutable Default Argument',
    content: 'def add_to(item, list=[]):\n    list.append(item)\n    return list\n\nprint(add_to(1))\nprint(add_to(2))',
    bugs: [{ line: 1, type: 'Logic' }],
    explanation: 'Default arguments are evaluated once at definition. The same list object is reused across all calls.',
    patternToNotice: 'Never use mutable objects (like lists or dicts) as default arguments.'
  },
  {
    id: 'py-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'Context Manager (with)',
    content: 'with open("data.txt", "r") as f:\n    content = f.read()\n    print(content)',
    description: 'Safely open and read a file using a context manager.',
    explanation: 'The "with" statement ensures the file is automatically closed, even if an exception occurs.',
    patternToNotice: 'Always use "with" for resource management (files, locks, connections).'
  },
  {
    id: 'py-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 1,
    title: 'Frequency Dictionary',
    content: 'def get_freq(items):\n    freq = {}\n    for x in items:\n        freq[x] = freq.get(x, 0) + 1\n    return freq',
    description: 'Implement a function that returns a count of each item in a list.',
    explanation: 'Using dict.get(key, default) is the idiomatic way to handle missing keys in Python.',
    patternToNotice: 'Leverage .get() to avoid KeyErrors during accumulation.'
  },

  // ==========================================
  // JAVASCRIPT (Foundation)
  // ==========================================
  {
    id: 'js-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Arrow Function Destructuring',
    content: 'const logUser = ({ name, id }) => console.log(id, name);',
    explanation: 'Destructuring in parameters allows for clean access to object properties.',
    patternToNotice: 'Use ({ prop }) to pull properties directly into the scope.'
  },
  {
    id: 'js-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Closure Lexical Scope',
    content: 'let x = 10;\nfunction outer() {\n  let x = 20;\n  return () => console.log(x);\n}\nconst inner = outer();\nx = 30;\ninner();',
    expectedOutput: '20',
    explanation: 'Closures capture the environment at the time of creation, not when they are executed.',
    patternToNotice: 'The function "remembers" the variables in its parent scope at creation time.'
  },
  {
    id: 'js-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Implicit Global Variable',
    content: 'function calculate() {\n  result = 10 * 5;\n  return result;\n}',
    bugs: [{ line: 2, type: 'Scope' }],
    explanation: 'Assigning to an undeclared variable creates an implicit global in non-strict mode, leading to potential leaks.',
    patternToNotice: 'Always declare variables with const, let, or var.'
  },
  {
    id: 'js-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Promise.all Concurrency',
    content: 'const results = await Promise.all([fetch(url1), fetch(url2)]);',
    description: 'Execute multiple fetch requests in parallel.',
    explanation: 'Promise.all allows for parallel execution of asynchronous tasks, significantly improving performance.',
    patternToNotice: 'Use Promise.all for independent async operations.'
  },
  {
    id: 'js-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Array Chunking',
    content: 'const chunk = (arr, size) => {\n  const res = [];\n  for (let i = 0; i < arr.length; i += size) {\n    res.push(arr.slice(i, i + size));\n  }\n  return res;\n};',
    description: 'Split an array into smaller arrays of a specified size.',
    explanation: 'Using a for-loop with a custom increment and array.slice is the most efficient way to chunk.',
    patternToNotice: 'Slice handles end-of-array boundaries automatically.'
  },

  // ==========================================
  // TYPESCRIPT (Foundation)
  // ==========================================
  {
    id: 'ts-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Interface Definition',
    content: 'interface User {\n  readonly id: string;\n  email?: string;\n}',
    explanation: 'Interfaces define the shape of an object, including optional and read-only properties.',
    patternToNotice: 'Use "?" for optional and "readonly" for immutable fields.'
  },
  {
    id: 'ts-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Type Narrowing',
    content: 'function print(val: string | number) {\n  if (typeof val === "string") {\n    console.log("S");\n  } else {\n    console.log("N");\n  }\n}\nprint(42);',
    expectedOutput: 'N',
    explanation: 'The typeof check narrows the union type, allowing safe access to type-specific methods.',
    patternToNotice: 'TypeScript "understands" control flow to narrow types.'
  },
  {
    id: 'ts-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Exhaustive Check Missing',
    content: 'type Status = "A" | "B";\nfunction handle(s: Status) {\n  if (s === "A") return 1;\n  // Bug: missing handle for "B"\n}',
    bugs: [{ line: 2, type: 'Type' }],
    explanation: 'When using union types, TypeScript warns if you fail to handle all possible members of the union.',
    patternToNotice: 'Always ensure all branches of a union are handled.'
  },
  {
    id: 'ts-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Generic Function',
    content: 'function wrap<T>(item: T): T[] {\n  return [item];\n}',
    description: 'Create a function that takes an item of any type and returns it in an array.',
    explanation: 'Generics allow for reusable code that maintains type safety.',
    patternToNotice: 'Use <T> to declare a type parameter.'
  },
  {
    id: 'ts-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Type-Safe Result Wrapper',
    content: 'type Result<T> = \n  | { success: true; data: T }\n  | { success: false; error: string };',
    description: 'Define a discriminated union for handling operation results.',
    explanation: 'Discriminated unions (using a literal like "success") make it impossible to access data when success is false.',
    patternToNotice: 'Tag your unions with a common literal field for safe narrowing.'
  },

  // ==========================================
  // SQL (Foundation)
  // ==========================================
  {
    id: 'sql-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 1,
    title: 'Basic Join Syntax',
    content: 'SELECT * FROM users JOIN orders ON users.id = orders.user_id;',
    explanation: 'Joins combine rows from two or more tables based on a related column.',
    patternToNotice: 'Always specify the table name for the join and the ON condition.'
  },
  {
    id: 'sql-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Left Join Null Behavior',
    tableInput: 'Users: {id: 1, name: "A"}\nOrders: {id: 10, user_id: 2}',
    content: 'SELECT name FROM Users LEFT JOIN Orders ON Users.id = Orders.user_id;',
    expectedOutput: 'A',
    explanation: 'A LEFT JOIN returns all rows from the left table, even if there are no matches in the right.',
    patternToNotice: 'Left table rows are preserved regardless of match.'
  },
  {
    id: 'sql-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Group By Requirement',
    content: 'SELECT department, name, COUNT(*) \nFROM employees \nGROUP BY department;',
    bugs: [{ line: 1, type: 'Database' }],
    explanation: 'All columns in the SELECT clause that are not aggregated must appear in the GROUP BY clause.',
    patternToNotice: 'You cannot select individual details (name) alongside aggregate counts unless grouping by them.'
  },
  {
    id: 'sql-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 3,
    title: 'Common Table Expression (CTE)',
    content: 'WITH regional_sales AS (\n  SELECT region, SUM(amt) as total\n  FROM sales GROUP BY region\n)\nSELECT * FROM regional_sales;',
    description: 'Calculate regional sales totals using a WITH clause.',
    explanation: 'CTEs (WITH) make complex queries more readable and organized than nested subqueries.',
    patternToNotice: 'Use WITH to define temporary result sets for the main query.'
  },
  {
    id: 'sql-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 2,
    title: 'Monthly Active Users',
    content: 'SELECT \n  DATE_TRUNC("month", login_date) as month,\n  COUNT(DISTINCT user_id) as mau\nFROM logins\nGROUP BY 1;',
    description: 'Calculate distinct active users grouped by month.',
    explanation: 'DATE_TRUNC is the standard way to bucket timestamps into periods like months.',
    patternToNotice: 'Use COUNT(DISTINCT) for unique entity counts.'
  },

  // ==========================================
  // RUST (Specialist)
  // ==========================================
  {
    id: 'rust-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Option Matching',
    content: 'match val {\n  Some(x) => println!("{}", x),\n  None => (),\n}',
    explanation: 'Rust requires explicit handling of Option types using pattern matching.',
    patternToNotice: 'Match is exhaustive; you must handle all cases.'
  },
  {
    id: 'rust-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Ownership Move',
    content: 'let s1 = String::from("hi");\nlet s2 = s1;\n// println!("{}", s1); // This would error\nprintln!("{}", s2);',
    expectedOutput: 'hi',
    explanation: 'Assigning s1 to s2 moves the ownership of the string. s1 is no longer valid.',
    patternToNotice: 'Variable binding transfers ownership for non-Copy types.'
  },
  {
    id: 'rust-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Multiple Mutable Borrows',
    content: 'let mut data = vec![1, 2];\nlet r1 = &mut data;\nlet r2 = &mut data;\nr1.push(3);',
    bugs: [{ line: 3, type: 'Borrow Checker' }],
    explanation: 'Rust allows only one mutable reference to a piece of data in a particular scope.',
    patternToNotice: 'The "Alias XOR Mutation" rule: you can have many readers OR one writer.'
  },
  {
    id: 'rust-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 2,
    title: 'Result Propagation (?)',
    content: 'fn work() -> Result<i32, Error> {\n  let val = do_step()?;\n  Ok(val + 1)\n}',
    description: 'Propagate errors using the question mark operator.',
    explanation: 'The "?" operator returns the error early if the Result is Err, otherwise unwraps the value.',
    patternToNotice: 'Use "?" for clean error propagation in functions returning Result.'
  },
  {
    id: 'rust-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 2,
    title: 'Custom Trait Impl',
    content: 'impl Summary for NewsArticle {\n    fn summarize(&self) -> String {\n        format!("{}, by {}", self.headline, self.author)\n    }\n}',
    description: 'Implement a summary trait for a struct.',
    explanation: 'Traits define shared behavior. Implementation blocks connect that behavior to specific types.',
    patternToNotice: 'impl TraitName for TypeName { ... }'
  },

  // ==========================================
  // BASH (Specialist)
  // ==========================================
  {
    id: 'bash-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'Pipeline Sequence',
    content: 'grep "error" logs.txt | sort | uniq -c',
    explanation: 'Pipelines chain commands by passing stdout of one to stdin of the next.',
    patternToNotice: 'The pipe operator "|" connects commands.'
  },
  {
    id: 'bash-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Variable Expansion',
    content: 'NAME="World"\necho \'Hello $NAME\'',
    expectedOutput: 'Hello $NAME',
    explanation: 'Single quotes (\') prevent variable expansion in Bash. Double quotes (") allow it.',
    patternToNotice: 'Quotes matter: Single = Literal, Double = Interpreted.'
  },
  {
    id: 'bash-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Unquoted Variable Splitting',
    content: 'FILE="my document.txt"\nrm $FILE',
    bugs: [{ line: 2, type: 'Syntax' }],
    explanation: 'Without quotes, the space in the filename causes "rm" to look for two separate files: "my" and "document.txt".',
    patternToNotice: 'Always double-quote variable expansions that might contain spaces.'
  },
  {
    id: 'bash-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 2,
    title: 'Conditional File Check',
    content: 'if [ -f "$FILE" ]; then\n  echo "Exists"\nfi',
    description: 'Check if a regular file exists.',
    explanation: 'The -f operator tests if a path is a file. The brackets [ ] are an alias for the test command.',
    patternToNotice: 'Use brackets and flags for filesystem tests.'
  },
  {
    id: 'bash-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 2,
    title: 'Log Line Counter',
    content: 'find . -name "*.log" -exec wc -l {} + | awk \'{s+=$1} END {print s}\'',
    description: 'Count total lines across all .log files in the current directory tree.',
    explanation: 'Find locates files, exec passes them to wc, and awk sums the resulting line counts.',
    patternToNotice: 'Combine find and awk for complex directory-wide text tasks.'
  },

  // ==========================================
  // SWIFT (Specialist)
  // ==========================================
  {
    id: 'swift-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 1,
    title: 'Guard Statement',
    content: 'guard let name = user.name else { return }',
    explanation: 'Guard provides early exit for optional unwrapping, keeping the "happy path" unindented.',
    patternToNotice: 'Unwrap and exit early if the condition fails.'
  },
  {
    id: 'swift-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 2,
    title: 'Optional Chaining',
    content: 'let count = user.orders?.first?.itemCount ?? 0\nprint(count)',
    expectedOutput: '0', // Assuming user or orders is nil
    explanation: 'Optional chaining returns nil if any link in the chain is nil. The nil-coalescing operator (??) provides a default.',
    patternToNotice: '?. returns nil early; ?? provides the fallback.'
  },
  {
    id: 'swift-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 3,
    title: 'Force Unwrap Crash',
    content: 'var name: String?\nprint(name!)',
    bugs: [{ line: 2, type: 'Type' }],
    explanation: 'Force unwrapping (!) a nil value causes a runtime crash. Always use safe unwrapping.',
    patternToNotice: 'Avoid "!" unless you are 100% certain the value is not nil.'
  },
  {
    id: 'swift-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 2,
    title: 'Enum with Associated Values',
    content: 'enum Result {\n  case success(String)\n  case failure(Error)\n}',
    description: 'Define an enum that can hold data with its cases.',
    explanation: 'Associated values allow enums to carry context, making them much more powerful than simple labels.',
    patternToNotice: 'Add types in parentheses after the case name.'
  },
  {
    id: 'swift-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 2,
    title: 'Array Mapping',
    content: 'let names = users.compactMap { $0.name }',
    description: 'Transform an array of users into an array of names, removing nils.',
    explanation: 'compactMap performs a map and then filters out any nil results.',
    patternToNotice: 'Use compactMap when transforming optionals to a non-optional array.'
  },

  // ==========================================
  // GO (Specialist)
  // ==========================================
  {
    id: 'go-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Struct Definition',
    content: 'type User struct {\n  ID   int\n  Name string\n}',
    explanation: 'Structs are Go\'s way of grouping related data together.',
    patternToNotice: 'Define types with the struct keyword and capitalized (exported) field names.'
  },
  {
    id: 'go-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 3,
    title: 'Channel Blocking',
    content: 'ch := make(chan int)\ngo func() { ch <- 1 }()\nfmt.Println(<-ch)',
    expectedOutput: '1',
    concurrencyRelevant: true,
    explanation: 'Unbuffered channels block the sender until a receiver is ready. The goroutine allows parallel execution.',
    patternToNotice: 'Sends and receives on unbuffered channels must synchronize.'
  },
  {
    id: 'go-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 3,
    title: 'Unbuffered Deadlock',
    content: 'ch := make(chan int)\nch <- 42\nfmt.Println(<-ch)',
    bugs: [{ line: 2, type: 'Concurrency' }],
    concurrencyRelevant: true,
    explanation: 'In a single goroutine, sending to an unbuffered channel blocks forever because there is no parallel receiver.',
    patternToNotice: 'Never send to an unbuffered channel in the same goroutine that receives from it.'
  },
  {
    id: 'go-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 2,
    title: 'Error Return Pattern',
    content: 'val, err := doWork()\nif err != nil {\n  return nil, err\n}',
    description: 'Implement the idiomatic Go error check.',
    explanation: 'Go uses explicit error handling as return values rather than exceptions.',
    patternToNotice: 'Check for error immediately after calling a function.'
  },
  {
    id: 'go-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 2,
    title: 'HTTP Handler',
    content: 'http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n  fmt.Fprint(w, "Hello")\n})',
    description: 'Implement a basic HTTP root handler.',
    explanation: 'Go\'s standard library makes setting up web servers extremely simple and performant.',
    patternToNotice: 'HandleFunc takes a path and a function with Writer and Request params.'
  }
];
