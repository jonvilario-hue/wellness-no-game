
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
  // ==========================================
  // PYTHON
  // ==========================================
  {
    id: 'py-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Python',
    difficulty: 1,
    title: 'F-String Interpolation',
    content: 'print(f"User {name} has {count} notifications.")',
    explanation: 'F-strings provide a concise way to embed expressions inside string literals.',
    patternToNotice: 'Prefix the string with "f" and use curly braces for variables.',
    requiredTokens: ['f"', '{', '}']
  },
  {
    id: 'py-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Mutable Defaults',
    content: 'def append_to(element, to=[]):\n    to.append(element)\n    return to\n\nmy_list = append_to(12)\nmy_list = append_to(42)\nprint(my_list)',
    expectedOutput: '[12, 42]',
    explanation: 'Default arguments in Python are evaluated once at definition time, not every time the function is called.',
    patternToNotice: 'Avoid using mutable objects (lists, dicts) as default arguments.'
  },
  {
    id: 'py-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Identical Identity',
    content: 'a = [1, 2, 3]\nb = a\nb.append(4)\n# Line 4: check length of a\nprint(len(a))',
    bugs: [{ line: 2, type: 'Logic' }],
    explanation: 'Assignment in Python creates a reference, not a copy. a and b point to the same list object.',
    patternToNotice: 'Modification of one reference affects all references to that object.'
  },
  {
    id: 'py-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'List Comprehension Filtering',
    content: '[x for x in range(10) if x % 2 == 0]',
    explanation: 'Pythonic way to create a new list by filtering an existing iterable.',
    patternToNotice: '[expression for item in iterable if condition]',
    requiredTokens: ['for', 'in', 'if', '%']
  },
  {
    id: 'py-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 3,
    title: 'Dictionary Frequency Map',
    content: 'counts = {}\nfor x in items:\n    counts[x] = counts.get(x, 0) + 1',
    explanation: 'The .get() method handles missing keys safely with a default value.',
    patternToNotice: 'counts.get(key, 0) is safer and cleaner than if-else checks.',
    requiredTokens: ['counts', 'get', '+ 1']
  },

  // ==========================================
  // JAVASCRIPT
  // ==========================================
  {
    id: 'js-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 1,
    title: 'Template Literals',
    content: 'console.log(`Hello, ${name}!`);',
    explanation: 'Template literals allow for multi-line strings and easy variable interpolation.',
    patternToNotice: 'Use backticks (`) and ${} for expressions.',
    requiredTokens: ['`', '${', '}']
  },
  {
    id: 'js-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Loose Equality Coercion',
    content: 'console.log(0 == false);',
    expectedOutput: 'true',
    explanation: 'The loose equality operator (==) performs type coercion, treating 0 and false as equivalent.',
    patternToNotice: 'Always prefer strict equality (===) to avoid coercion surprises.'
  },
  {
    id: 'js-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Asynchronous Loop Failure',
    content: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1000);\n}',
    bugs: [{ line: 1, type: 'Scope' }],
    explanation: 'Because "var" is function-scoped, by the time the timeout fires, the loop has finished and "i" is 3.',
    patternToNotice: 'Use "let" in for-loops to create a new binding for every iteration.'
  },
  {
    id: 'js-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 3,
    title: 'Array Destructuring & Rest',
    content: 'const [first, ...others] = arr;',
    explanation: 'Efficiently pull the first element and collect the remainder into a new array.',
    patternToNotice: 'The rest operator (...) must be the last element in destructuring.',
    requiredTokens: ['[', '...', ']']
  },
  {
    id: 'js-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Promise Rejection Handler',
    content: 'fetch(url)\n  .then(res => res.json())\n  .catch(err => console.error(err));',
    explanation: 'Always chain a .catch() to a promise chain to handle runtime network or parsing errors.',
    patternToNotice: 'Implicitly return promise chains and handle errors at the end.',
    requiredTokens: ['then', 'catch']
  },

  // ==========================================
  // TYPESCRIPT
  // ==========================================
  {
    id: 'ts-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 1,
    title: 'Interface Definition',
    content: 'interface User {\n  id: string;\n  name: string;\n  email?: string;\n}',
    explanation: 'Interfaces define the shape of objects, ensuring type safety during development.',
    patternToNotice: 'Use "?" for optional properties.',
    requiredTokens: ['interface', ':', '?']
  },
  {
    id: 'ts-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Literal Union Types',
    content: 'type Status = "open" | "closed";\nlet s: Status = "open";\nconsole.log(typeof s);',
    expectedOutput: 'string',
    explanation: 'TypeScript types disappear at runtime. status is just a string in the compiled JavaScript.',
    patternToNotice: 'Types are for development-time safety, not runtime validation.'
  },
  {
    id: 'ts-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Non-Exhaustive Switch',
    content: 'type Mode = "A" | "B";\nfunction handle(m: Mode) {\n  switch(m) {\n    case "A": return 1;\n  }\n}',
    bugs: [{ line: 3, type: 'Type' }],
    explanation: 'TypeScript requires exhaustive checks when working with union types to ensure no state is left unhandled.',
    patternToNotice: 'Always ensure all union members are handled in a switch or if-else block.'
  },
  {
    id: 'ts-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Generic Function',
    content: 'function wrap<T>(item: T): T[] {\n  return [item];\n}',
    explanation: 'Generics allow for creating reusable components that work with a variety of types.',
    patternToNotice: 'The <T> syntax captures the input type for use in the output.',
    requiredTokens: ['<T>', ':', '[]']
  },
  {
    id: 'ts-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Type Guard implementation',
    content: 'function isString(val: any): val is string {\n  return typeof val === "string";\n}',
    explanation: 'User-defined type guards allow you to narrow down the type of a variable within a conditional block.',
    patternToNotice: 'The "parameter is Type" return signature is required for narrowing.',
    requiredTokens: ['val is string', 'typeof', '===']
  },

  // ==========================================
  // SQL
  // ==========================================
  {
    id: 'sql-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 1,
    title: 'Inner Join Logic',
    content: 'SELECT * FROM users JOIN orders ON users.id = orders.user_id;',
    explanation: 'Joins allow you to retrieve related data stored across multiple tables.',
    patternToNotice: 'The ON clause specifies the primary/foreign key relationship.',
    requiredTokens: ['SELECT', 'JOIN', 'ON']
  },
  {
    id: 'sql-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Left Join Results',
    tableInput: 'Users: {id: 1, name: "A"}\nOrders: {id: 10, user_id: 2}',
    content: 'SELECT name FROM Users LEFT JOIN Orders ON Users.id = Orders.user_id;',
    expectedOutput: 'A',
    explanation: 'LEFT JOIN returns all rows from the left table, even if there is no match in the right table.',
    patternToNotice: 'Unmatched rows from the left table will have NULLs for right-table columns.'
  },
  {
    id: 'sql-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 3,
    title: 'Aggregation Missing Group',
    content: 'SELECT department, count(*) \nFROM employees \nWHERE salary > 50000;',
    bugs: [{ line: 1, type: 'Database' }],
    explanation: 'Any non-aggregated column in the SELECT clause must appear in the GROUP BY clause.',
    patternToNotice: 'You cannot mix individual detail columns with counts without grouping.'
  },
  {
    id: 'sql-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 3,
    title: 'Common Table Expression (CTE)',
    content: 'WITH monthly_sales AS (\n  SELECT date_trunc("month", date), sum(amount) FROM sales GROUP BY 1\n)\nSELECT * FROM monthly_sales;',
    explanation: 'CTEs make complex queries more readable by breaking them into named logic blocks.',
    patternToNotice: 'WITH name AS (...) defines the temporary result set.',
    requiredTokens: ['WITH', 'AS', 'SELECT']
  },
  {
    id: 'sql-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 2,
    title: 'Duplicate Email Finder',
    content: 'SELECT email FROM users GROUP BY email HAVING count(*) > 1;',
    explanation: 'Use GROUP BY and HAVING to filter based on the results of an aggregate function.',
    patternToNotice: 'HAVING acts like WHERE but for aggregated results.',
    requiredTokens: ['GROUP BY', 'HAVING', 'count']
  },

  // ==========================================
  // RUST
  // ==========================================
  {
    id: 'rust-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Match Pattern',
    content: 'match result {\n    Ok(val) => println!("{}", val),\n    Err(e) => eprintln!("{}", e),\n}',
    explanation: 'Pattern matching is the primary way to handle Result and Option types in Rust.',
    patternToNotice: 'Match arms must be exhaustive.',
    requiredTokens: ['match', '=>', 'Ok', 'Err']
  },
  {
    id: 'rust-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 2,
    title: 'Ownership Move',
    content: 'let s1 = String::from("hello");\nlet s2 = s1;\n// print!("{}", s1); // error!\nprintln!("{}", s2);',
    expectedOutput: 'hello',
    explanation: 'Assigning s1 to s2 moves the ownership of the underlying data. s1 is no longer valid.',
    patternToNotice: 'Variable binding transfers ownership for types that do not implement the Copy trait.'
  },
  {
    id: 'rust-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Multiple Mutable Borrows',
    content: 'let mut data = vec![1, 2, 3];\nlet r1 = &mut data;\nlet r2 = &mut data;\nr1.push(4);',
    bugs: [{ line: 3, type: 'Borrow Checker' }],
    explanation: 'Rust prevents data races by only allowing one mutable reference to a piece of data at a time.',
    patternToNotice: 'Cannot borrow as mutable more than once at a time in the same scope.'
  },
  {
    id: 'rust-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 3,
    title: 'Safe Unwrap with ?',
    content: 'fn do_work() -> Result<i32, Error> {\n    let val = step_one()?;\n    Ok(val + 1)\n}',
    explanation: 'The "?" operator propagates errors early, keeping the "happy path" clean.',
    patternToNotice: 'Use "?" instead of nested match/if-let for error handling.',
    requiredTokens: ['?', 'Result', 'Ok']
  },
  {
    id: 'rust-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 2,
    title: 'Custom Struct Implementation',
    content: 'struct Rect { w: u32, h: u32 }\nimpl Rect {\n    fn area(&self) -> u32 { self.w * self.h }\n}',
    explanation: 'impl blocks are where you define methods for your types in Rust.',
    patternToNotice: 'Methods take &self to read the instance data.',
    requiredTokens: ['struct', 'impl', '&self']
  },

  // ==========================================
  // GO
  // ==========================================
  {
    id: 'go-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Channel Initialization',
    content: 'ch := make(chan int, 10)',
    explanation: 'Channels are the conduits through which goroutines communicate.',
    patternToNotice: 'Use make to initialize channels with an optional buffer size.',
    requiredTokens: [':=', 'make', 'chan']
  },
  {
    id: 'go-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 3,
    title: 'Select Resolution',
    content: 'ch := make(chan int, 1)\nch <- 1\nselect {\n  case val := <-ch: fmt.Print(val)\n  default: fmt.Print(0)\n}',
    expectedOutput: '1',
    explanation: 'The select statement blocks until one of its cases can run. Since the channel has data, that case runs immediately.',
    patternToNotice: 'The default case prevents the select from blocking if no other case is ready.'
  },
  {
    id: 'go-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Nil Map Assignment',
    content: 'var counts map[string]int\ncounts["a"] = 1',
    bugs: [{ line: 2, type: 'Logic' }],
    explanation: 'A declared map is nil and will panic if you try to write to it. You must initialize it with make.',
    patternToNotice: 'Always use make(map[K]V) before assigning keys.'
  },
  {
    id: 'go-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 2,
    title: 'Error Return Pattern',
    content: 'val, err := doSomething()\nif err != nil {\n    return nil, err\n}',
    explanation: 'Go uses explicit error returns rather than exceptions.',
    patternToNotice: 'Always check the second return value for errors before using the first.',
    requiredTokens: ['if', 'err != nil', 'return']
  },
  {
    id: 'go-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 2,
    title: 'Concurrent Loop',
    content: 'for _, url := range urls {\n    go func(u string) { fetch(u) }(url)\n}',
    explanation: 'Goroutines allow for lightweight concurrency.',
    patternToNotice: 'Pass the loop variable as an argument to the closure to avoid capture bugs.',
    requiredTokens: ['go func', 'range']
  },

  // ==========================================
  // BASH
  // ==========================================
  {
    id: 'bash-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'Pipeline Filtering',
    content: 'grep "ERROR" logs.txt | sort | uniq -c',
    explanation: 'Pipelines chain commands together by passing the output of one to the next.',
    patternToNotice: 'Use | to connect standard output to standard input.',
    requiredTokens: ['|', 'grep', 'sort']
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
    explanation: 'Single quotes in Bash prevent variable expansion. Use double quotes if you want the variable value.',
    patternToNotice: 'Quotes matter: Single = Literal, Double = Evaluated.'
  },
  {
    id: 'bash-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Unquoted variable splitting',
    content: 'FILE="my document.pdf"\nls $FILE',
    bugs: [{ line: 2, type: 'Syntax' }],
    explanation: 'Without quotes, Bash splits the variable value on spaces, looking for two separate files.',
    patternToNotice: 'Always wrap variable references in double quotes: "$VAR".'
  },
  {
    id: 'bash-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 2,
    title: 'If Statement (Test)',
    content: 'if [ -f "$FILE" ]; then\n  echo "Exists"\nfi',
    explanation: 'The brackets [] are an alias for the test command, used for conditional checks.',
    patternToNotice: 'The space after "[" and before "]" is required syntax.',
    requiredTokens: ['if', '[', '-f', ']', 'then', 'fi']
  },
  {
    id: 'bash-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 3,
    title: 'Log Line Count',
    content: 'find . -name "*.log" -exec wc -l {} +',
    explanation: 'Combines searching for files with executing a command on the results.',
    patternToNotice: '{} + is more efficient than calling the command for every file.',
    requiredTokens: ['find', '-name', '-exec']
  },

  // ==========================================
  // SWIFT
  // ==========================================
  {
    id: 'swift-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 1,
    title: 'Optional Unwrapping (Guard)',
    content: 'guard let name = user.name else { return }',
    explanation: 'Guard provides a clean "early exit" for handling optional values.',
    patternToNotice: 'The guard statement keeps the "happy path" un-indented.',
    requiredTokens: ['guard let', 'else', 'return']
  },
  {
    id: 'swift-output-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 2,
    title: 'Optional Chaining',
    content: 'let count = user.orders?.first?.total ?? 0\nprint(count)',
    expectedOutput: '0',
    explanation: 'Optional chaining returns nil if any link in the chain is nil. ?? provides a default value.',
    patternToNotice: '?. exits the chain early if the value is nil.'
  },
  {
    id: 'swift-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 3,
    title: 'Force Unwrap Crash',
    content: 'var label: String?\nprint(label!)',
    bugs: [{ line: 2, type: 'Type' }],
    explanation: 'Force unwrapping (!) a nil value will crash the application at runtime.',
    patternToNotice: 'Never use ! unless you are 100% certain the value exists.'
  },
  {
    id: 'swift-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 3,
    title: 'Closure Capture List',
    content: '{ [weak self] in self?.doWork() }',
    explanation: 'Capture lists prevent retain cycles by capturing references weakly.',
    patternToNotice: 'Use [weak self] when using self inside a closure that is stored by self.',
    requiredTokens: ['[weak self]', 'in']
  },
  {
    id: 'swift-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 2,
    title: 'Protocol Implementation',
    content: 'extension String: Identifiable {\n    public var id: String { self }\n}',
    explanation: 'Extensions let you add protocol conformance to existing types.',
    patternToNotice: 'Add protocol conformance in an extension for cleaner code.',
    requiredTokens: ['extension', ':', '{', '}']
  }
];
