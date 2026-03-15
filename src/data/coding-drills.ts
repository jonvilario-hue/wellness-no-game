
/**
 * @fileOverview Comprehensive IDIOMATIC Drill Library.
 * 
 * This file contains the master data set for all 8 supported languages.
 * Every language has a drill for every protocol:
 * 1. Syntax Sprints (Write)
 * 2. Code Reconstruction (Write)
 * 3. Output Prediction (Read)
 * 4. Bug Hunt (Read)
 * 5. Timed Implementation (Build)
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
    title: 'List Comprehension',
    content: '[x**2 for x in range(10) if x % 2 == 0]',
    explanation: 'Basic list comprehension syntax with a conditional filter.',
    patternToNotice: 'The filter comes after the loop in Python comprehensions.',
    concept: 'comprehensions',
    requiredTokens: ['[', 'for', 'in', 'if', '%', '==', '**']
  },
  {
    id: 'py-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Python',
    difficulty: 2,
    title: 'Context Manager',
    content: 'with open("file.txt", "r") as f:\n    content = f.read()',
    explanation: 'Using "with" ensures the file is closed automatically.',
    patternToNotice: 'The "as" keyword assigns the resource to a variable.',
    concept: 'context-managers',
    requiredTokens: ['with', 'open', 'as', ':', 'read']
  },
  {
    id: 'py-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Mutable Default Pitfall',
    content: 'def f(a, b=[]):\n    b.append(a)\n    return b\nprint(f(1), end=" ")\nprint(f(2))',
    expectedOutput: '[1] [1, 2]',
    explanation: 'Default arguments are evaluated once at definition. The list persists.',
    patternToNotice: 'Avoid mutable defaults; use "None" instead.',
    concept: 'mutability'
  },
  {
    id: 'py-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Python',
    difficulty: 2,
    title: 'Indentation Error',
    content: 'def greet(name):\nif name:\n    print("Hi " + name)',
    explanation: 'Python requires consistent indentation for block level code.',
    patternToNotice: 'Missing indent after the function signature.',
    concept: 'syntax',
    requiredTokens: ['    if']
  },
  {
    id: 'py-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Python',
    difficulty: 2,
    title: 'Dictionary Filter',
    content: '# Filter a dict "d" to keep only keys where value > 10',
    explanation: 'Dict comprehensions use {k: v for k, v in d.items() if condition}.',
    patternToNotice: 'Call .items() to iterate over keys and values simultaneously.',
    concept: 'comprehensions',
    requiredTokens: ['{', 'for', 'in', '.items()', 'if', '> 10']
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
    title: 'Arrow Function',
    content: 'const add = (a, b) => a + b;',
    explanation: 'Implicit return syntax for single-expression arrow functions.',
    patternToNotice: 'No "return" or curly braces needed for single lines.',
    concept: 'functions',
    requiredTokens: ['=>', 'const']
  },
  {
    id: 'js-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Destructuring',
    content: 'const { name, age } = user;\nconsole.log(name);',
    explanation: 'Extracting properties directly into variables.',
    patternToNotice: 'The curly braces on the left side indicate object destructuring.',
    concept: 'syntax',
    requiredTokens: ['const', '{', '}', '=', 'user']
  },
  {
    id: 'js-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Type Coercion',
    content: 'console.log(1 + "2" + 3);',
    expectedOutput: '123',
    explanation: 'Number + String causes string concatenation.',
    patternToNotice: 'JavaScript coerces to string if any operand is a string during +.',
    concept: 'coercion'
  },
  {
    id: 'js-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Closure Pitfall',
    content: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}',
    explanation: 'var is function-scoped; all callbacks see the final value (3).',
    patternToNotice: 'Use "let" for block-scoping in loops.',
    concept: 'closures',
    requiredTokens: ['let i = 0']
  },
  {
    id: 'js-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'JavaScript',
    difficulty: 2,
    title: 'Array Mapping',
    content: '// Map an array "arr" to only their lengths',
    explanation: '.map() creates a new array by applying a function to each item.',
    patternToNotice: 'Arrow functions are ideal for map callbacks.',
    concept: 'arrays',
    requiredTokens: ['arr.map', '=>', '.length']
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
    content: 'interface User {\n  id: number;\n  name: string;\n}',
    explanation: 'Defining custom shapes for objects.',
    patternToNotice: 'Interfaces describe the structure without implementation.',
    concept: 'interfaces',
    requiredTokens: ['interface', 'number', 'string']
  },
  {
    id: 'ts-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Union Type Narrowing',
    content: 'function p(val: string | number) {\n  return val.length;\n}',
    explanation: '.length only exists on strings. You must narrow the type first.',
    patternToNotice: 'Use "typeof val === \'string\'" to safely access string properties.',
    concept: 'narrowing',
    requiredTokens: ['typeof', 'string']
  },
  {
    id: 'ts-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'TypeScript',
    difficulty: 3,
    title: 'Generic Inference',
    content: 'function wrap<T>(val: T): T { return val; }\nconst res = wrap("hi");\nconsole.log(typeof res);',
    expectedOutput: 'string',
    explanation: 'TS infers T as string from the argument.',
    patternToNotice: 'Generics preserve the type through the function call.',
    concept: 'generics'
  },
  {
    id: 'ts-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Enum Usage',
    content: 'enum Color { Red, Green }\nconst c: Color = Color.Red;',
    explanation: 'Enums allow for a set of named constants.',
    patternToNotice: 'Enums act as both a type and a value.',
    concept: 'enums',
    requiredTokens: ['enum', 'const', ':', 'Color.Red']
  },
  {
    id: 'ts-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'TypeScript',
    difficulty: 2,
    title: 'Type Guard',
    content: '// Implement a type guard "isString" for value "x"',
    explanation: 'Type guards use "x is string" return type.',
    patternToNotice: 'The "is" keyword tells TS to narrow the type if true.',
    concept: 'narrowing',
    requiredTokens: ['function', 'is string', 'typeof', '=== "string"']
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
    title: 'Basic Select',
    content: 'SELECT name, age FROM users WHERE age > 18;',
    explanation: 'The standard way to retrieve specific columns with a filter.',
    patternToNotice: 'WHERE comes after the FROM clause.',
    concept: 'select',
    requiredTokens: ['SELECT', 'FROM', 'WHERE', '> 18']
  },
  {
    id: 'sql-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Inner Join Logic',
    tableInput: 'Users: [1, "Bob"], [2, "Alice"]\nOrders: [1, 100]',
    content: 'SELECT name FROM users JOIN orders ON users.id = orders.user_id',
    expectedOutput: 'Bob',
    explanation: 'JOIN only returns rows where the condition matches in both tables.',
    patternToNotice: 'Alice is excluded because she has no order.',
    concept: 'joins'
  },
  {
    id: 'sql-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 3,
    title: 'Aggregation Error',
    content: 'SELECT dept, AVG(salary) FROM employees;',
    explanation: 'When using AVG, any non-aggregated columns must be in GROUP BY.',
    patternToNotice: 'Missing "GROUP BY dept" clause.',
    concept: 'aggregation',
    requiredTokens: ['GROUP BY', 'dept']
  },
  {
    id: 'sql-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 2,
    title: 'Common Table Expression',
    content: 'WITH high_earners AS (\n  SELECT * FROM staff WHERE sal > 5000\n)\nSELECT * FROM high_earners',
    explanation: 'CTEs provide temporary result sets for complex queries.',
    patternToNotice: 'CTEs start with the WITH keyword.',
    concept: 'ctes',
    requiredTokens: ['WITH', 'AS', '(', ')', 'SELECT']
  },
  {
    id: 'sql-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 2,
    title: 'Unique User Count',
    content: '-- Count unique users from "logs" table',
    explanation: 'COUNT(DISTINCT column) is used for unique counts.',
    patternToNotice: 'The DISTINCT keyword goes inside the COUNT function.',
    concept: 'aggregation',
    requiredTokens: ['SELECT', 'COUNT', 'DISTINCT', 'user_id', 'FROM', 'logs']
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
    title: 'Option Match',
    content: 'match val {\n  Some(x) => x,\n  None => 0,\n}',
    explanation: 'Safe handling of optional values via pattern matching.',
    patternToNotice: 'Rust match arms must be exhaustive.',
    concept: 'enums',
    requiredTokens: ['match', 'Some', '=>', 'None']
  },
  {
    id: 'rust-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Borrow Checker: Move',
    content: 'let s1 = String::from("hi");\nlet s2 = s1;\nprintln!("{}", s1);',
    explanation: 'String does not implement Copy. Assigning to s2 moves ownership.',
    patternToNotice: 'Ownership transfer invalidates the original variable.',
    concept: 'ownership',
    requiredTokens: ['.clone()']
  },
  {
    id: 'rust-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 2,
    title: 'Result Unwrapping',
    content: 'let r: Result<i32, &str> = Ok(10);\nprintln!("{}", r.unwrap_or(5));',
    expectedOutput: '10',
    explanation: 'unwrap_or returns the success value if present.',
    patternToNotice: 'Only defaults to the provided value on Err.',
    concept: 'errors'
  },
  {
    id: 'rust-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 2,
    title: 'Struct Methods',
    content: 'impl User {\n  fn new(name: String) -> Self {\n    Self { name }\n  }\n}',
    explanation: 'Methods are defined in an impl block, separate from data.',
    patternToNotice: 'Self refers to the implementor type.',
    concept: 'structs',
    requiredTokens: ['impl', 'fn', '-> Self', '{', '}']
  },
  {
    id: 'rust-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 2,
    title: 'Vector Filter',
    content: '// Keep only even numbers in vec "v"',
    explanation: 'Iterators are the idiomatic way to transform collections.',
    patternToNotice: 'Call .into_iter() followed by .filter() and .collect().',
    concept: 'iterators',
    requiredTokens: ['v.into_iter', '.filter', '|x|', '% 2 == 0', '.collect']
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
    title: 'Variable Expansion',
    content: 'echo "Current user is: ${USER}"',
    explanation: 'Braces around variables protect them from adjacent characters.',
    patternToNotice: 'Always use double quotes to prevent word splitting.',
    concept: 'variables',
    requiredTokens: ['echo', '"', '${', '}']
  },
  {
    id: 'bash-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Pipeline Output',
    content: 'echo -e "a\\nb\\nc" | grep "b" | wc -l',
    expectedOutput: '1',
    explanation: 'grep filters for "b", wc -l counts that one line.',
    patternToNotice: 'Pipelines flow data left-to-right through standard streams.',
    concept: 'pipelines'
  },
  {
    id: 'bash-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Missing Quotes',
    content: 'NAME="John Doe"\nif [ $NAME == "John" ]; then',
    explanation: 'Unquoted variables with spaces cause "too many arguments" errors.',
    patternToNotice: 'Always quote variable expansions in [ ] tests.',
    concept: 'quoting',
    requiredTokens: ['"$NAME"']
  },
  {
    id: 'bash-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 2,
    title: 'Loop Through Files',
    content: 'for f in *.txt; do\n  mv "$f" "${f%.txt}.md"\ndone',
    explanation: 'Iterating over globs and using parameter expansion to rename.',
    patternToNotice: '${f%.txt} removes the extension suffix.',
    concept: 'loops',
    requiredTokens: ['for', 'in', '; do', 'done']
  },
  {
    id: 'bash-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 2,
    title: 'Log Parsing',
    content: '# Extract lines from "app.log" containing "ERROR" and count them',
    explanation: 'grep and wc are the fundamental text processing tools.',
    patternToNotice: 'The pipe operator | connects the filter to the counter.',
    concept: 'pipelines',
    requiredTokens: ['grep "ERROR"', 'app.log', '|', 'wc -l']
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
    content: 'guard let name = name else { return }',
    explanation: 'Guard ensures conditions are met before proceeding.',
    patternToNotice: 'Guard requires an "else" block that exits the scope.',
    concept: 'optionals',
    requiredTokens: ['guard', 'let', 'else', 'return']
  },
  {
    id: 'swift-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 2,
    title: 'Optional Chaining',
    content: 'let res = user?.address?.city\nprint(type(of: res))',
    expectedOutput: 'Optional<String>',
    explanation: 'Optional chaining always results in an optional value.',
    patternToNotice: 'The chain breaks and returns nil if any link is nil.',
    concept: 'optionals'
  },
  {
    id: 'swift-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 2,
    title: 'Force Unwrapping',
    content: 'var name: String?\nprint(name!)',
    explanation: 'Force unwrapping (!) a nil value causes a runtime crash.',
    patternToNotice: 'Use if-let or nil-coalescing instead of !.',
    concept: 'optionals',
    requiredTokens: ['if let', 'name ?? ""']
  },
  {
    id: 'swift-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 2,
    title: 'Protocol Conformance',
    content: 'protocol Drivable {\n  func drive()\n}\nstruct Car: Drivable { }',
    explanation: 'Protocols define blueprints of methods.',
    patternToNotice: 'Structs "adopt" protocols using colon syntax.',
    concept: 'protocols',
    requiredTokens: ['protocol', 'struct', ':', 'Drivable']
  },
  {
    id: 'swift-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 2,
    title: 'Computed Property',
    content: '// Add a computed property "isAdult" to User (age >= 18)',
    explanation: 'Computed properties use get { } or just { } for read-only.',
    patternToNotice: 'No "func" keyword is used for properties.',
    concept: 'syntax',
    requiredTokens: ['var isAdult: Bool', '{', 'age >= 18', '}']
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
    title: 'Error Return',
    content: 'val, err := doWork()\nif err != nil { return err }',
    explanation: 'Go uses multiple return values for explicit error handling.',
    patternToNotice: 'The "if err != nil" pattern is the standard way to check errors.',
    concept: 'errors',
    requiredTokens: [':=', '!= nil', 'return']
  },
  {
    id: 'go-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 3,
    title: 'Channel Deadlock',
    content: 'ch := make(chan int)\nch <- 1\nfmt.Println(<-ch)',
    expectedOutput: 'deadlock',
    explanation: 'Unbuffered channel sends block until there is a receiver.',
    patternToNotice: 'Without a separate goroutine, this blocks the main thread.',
    concept: 'concurrency',
    concurrencyRelevant: true
  },
  {
    id: 'go-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Short Declaration Shadow',
    content: 'var x = 1\nif true {\n  x := 2\n}\nfmt.Print(x)',
    explanation: 'x := 2 inside the block creates a new local x, shadowing the outer one.',
    patternToNotice: 'Use = instead of := if you want to update the existing variable.',
    concept: 'syntax',
    requiredTokens: ['x = 2']
  },
  {
    id: 'go-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 2,
    title: 'Interface Implementation',
    content: 'type Shape interface {\n  Area() float64\n}\ntype Circle struct { }',
    explanation: 'Go interfaces are implemented implicitly by matching signatures.',
    patternToNotice: 'No "implements" keyword is required.',
    concept: 'interfaces',
    requiredTokens: ['type', 'interface', 'struct']
  },
  {
    id: 'go-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 3,
    title: 'Concurrent Wait',
    content: '// Use sync.WaitGroup to wait for 3 goroutines',
    explanation: 'WaitGroups are the standard way to synchronize goroutine completion.',
    patternToNotice: 'Call .Add() before starting, .Done() in defer, and .Wait() at the end.',
    concept: 'concurrency',
    concurrencyRelevant: true,
    requiredTokens: ['sync.WaitGroup', '.Add(3)', 'go func()', 'defer .Done()', '.Wait()']
  }
];
