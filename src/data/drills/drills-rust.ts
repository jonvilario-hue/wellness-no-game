import type { CodingDrill } from '@/types/coding';

/**
 * DRILL CONTENT FILE — DO NOT DELETE OR MERGE
 * Language: Rust
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

export const rustDrills: CodingDrill[] = [
  // Syntax Sprints (Write)
  {
    id: 'rs-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Immutable Variable',
    content: 'let x = 5;',
    explanation: 'Variables are immutable by default in Rust.',
    patternToNotice: 'The let keyword is used for binding.',
    concept: 'basics',
    requiredTokens: ['let', '=']
  },
  {
    id: 'rs-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 2,
    title: 'Mutable Binding',
    content: 'let mut count = 0;',
    explanation: 'Use "mut" to allow variable modification.',
    patternToNotice: 'mut follows let directly.',
    concept: 'mutability',
    requiredTokens: ['let', 'mut']
  },
  {
    id: 'rs-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 3,
    title: 'Option Match',
    content: 'match val {\n  Some(x) => x,\n  None => 0,\n}',
    explanation: 'Pattern matching is the safe way to handle Option.',
    patternToNotice: 'Match arms must be exhaustive.',
    concept: 'enums',
    requiredTokens: ['match', 'Some', '=>', 'None']
  },
  {
    id: 'rs-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 4,
    title: 'Generic Constraint',
    content: 'fn p<T: Display>(x: T) { }',
    explanation: 'T is constrained to types implementing Display.',
    patternToNotice: 'Colon : defines trait bounds for generics.',
    concept: 'generics',
    requiredTokens: ['<T:', 'Display', '>', '(x: T)']
  },

  // Code Reconstruction (Write)
  {
    id: 'rs-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Struct Definition',
    content: 'struct User {\n  id: u32,\n  name: String,\n}',
    explanation: 'Structs group related data into named fields.',
    patternToNotice: 'Comma separates fields; type follows colon.',
    concept: 'structs',
    requiredTokens: ['struct', '{', 'u32', 'String', '}']
  },
  {
    id: 'rs-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 2,
    title: 'Implicit Return',
    content: 'fn add(a: i32, b: i32) -> i32 {\n  a + b\n}',
    explanation: 'The last expression without a semicolon is returned.',
    patternToNotice: 'No "return" keyword needed for the final expression.',
    concept: 'functions',
    requiredTokens: ['-> i32', 'a + b']
  },
  {
    id: 'rs-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 3,
    title: 'Trait Implementation',
    content: 'impl Summary for Tweet {\n  fn summarize(&self) -> String { }\n}',
    explanation: 'Methods for traits are defined in an impl block.',
    patternToNotice: 'Self is used to refer to the implementor instance.',
    concept: 'traits',
    requiredTokens: ['impl', 'for', 'fn', '&self']
  },
  {
    id: 'rs-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 4,
    title: 'Vector Filter Chain',
    content: 'v.into_iter()\n  .filter(|x| x > &0)\n  .collect::<Vec<_>>();',
    explanation: 'Iterators allow lazy, functional transformations.',
    patternToNotice: 'turbofish syntax ::<> is used for collect destination.',
    concept: 'iterators',
    requiredTokens: ['filter', 'collect', '::<']
  },

  // Output Prediction (Read)
  {
    id: 'rs-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 1,
    title: 'Shadowing',
    content: 'let x = 5;\nlet x = x + 1;\nprintln!("{}", x);',
    expectedOutput: '6',
    explanation: 'Redeclaring x shadows the previous binding.',
    patternToNotice: 'Shadowing allows changing the type or mutability of a name.',
    concept: 'basics'
  },
  {
    id: 'rs-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 2,
    title: 'Ownership Move',
    content: 'let s1 = String::from("a");\nlet s2 = s1;\n// println!("{}", s1); // error\nprintln!("{}", s2);',
    expectedOutput: 'a',
    explanation: 'Moving s1 to s2 invalidates s1.',
    patternToNotice: 'Types without Copy trait transfer ownership on assignment.',
    concept: 'ownership'
  },
  {
    id: 'rs-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Result Unwrapping',
    content: 'let res: Result<i32, &str> = Ok(10);\nprintln!("{}", res.unwrap_or(5));',
    expectedOutput: '10',
    explanation: 'unwrap_or returns value if Ok, otherwise returns default.',
    patternToNotice: 'Useful for safe error handling with fallbacks.',
    concept: 'errors'
  },
  {
    id: 'rs-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 4,
    title: 'Deref Coercion',
    content: 'let s = String::from("hi");\nfn len(x: &str) -> usize { x.len() }\nprintln!("{}", len(&s));',
    expectedOutput: '2',
    explanation: '&String automatically coerces to &str.',
    patternToNotice: 'Rust automatically converts refs to help match signatures.',
    concept: 'references'
  },

  // Bug Hunt (Read)
  {
    id: 'rs-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 1,
    title: 'Double Mut',
    content: 'let x = 5;\nx += 1;',
    explanation: 'Variable is not declared as mutable.',
    patternToNotice: 'Add "mut" after "let" to permit changes.',
    concept: 'mutability',
    requiredTokens: ['let mut x = 5']
  },
  {
    id: 'rs-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 2,
    title: 'Use After Move',
    content: 'let v = vec![1];\nlet v2 = v;\nprintln!("{:?}", v);',
    explanation: 'Vector ownership was moved to v2.',
    patternToNotice: 'You cannot use a variable after its value has been moved.',
    concept: 'ownership',
    requiredTokens: ['v.clone()', 'let v2 = &v']
  },
  {
    id: 'rs-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Invalid Reference',
    content: 'let r;\n{\n  let x = 5;\n  r = &x;\n}\nprintln!("{}", r);',
    explanation: 'r points to x, which is dropped at the end of the inner scope.',
    patternToNotice: 'References must not outlive the data they point to.',
    concept: 'lifetimes',
    requiredTokens: ['let x = 5; let r = &x;']
  },
  {
    id: 'rs-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 4,
    title: 'Mismatched Result',
    content: 'fn f() -> Result<(), String> {\n  Ok(())\n}\nfn main() { f(); }',
    explanation: 'Results marked with #[must_use] should not be ignored.',
    patternToNotice: 'Handle the potential error using match or the ? operator.',
    concept: 'errors',
    requiredTokens: ['let _ = f()', 'f().unwrap()']
  },

  // Build (Build)
  {
    id: 'rs-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 1,
    title: 'Absolute Value',
    content: '// Return i32 "n" as positive',
    explanation: 'n.abs() or simple if logic.',
    patternToNotice: 'Standard math method.',
    concept: 'basics',
    requiredTokens: ['.abs()']
  },
  {
    id: 'rs-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 2,
    title: 'Wrap in Option',
    content: '// Return Some(x) if x > 0 else None',
    explanation: 'Basic Option pattern.',
    patternToNotice: 'Safe handling of potentially empty values.',
    concept: 'enums',
    requiredTokens: ['Some', 'None', 'if x > 0']
  },
  {
    id: 'rs-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 3,
    title: 'Struct with Methods',
    content: '// Add "area()" to struct "Rect { w: u32, h: u32 }"',
    explanation: 'Implement the area method in an impl block.',
    patternToNotice: 'Returns u32 result of w * h.',
    concept: 'structs',
    requiredTokens: ['impl', 'fn area', '&self', '-> u32']
  },
  {
    id: 'rs-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 4,
    title: 'Error Propagation',
    content: '// Call "sub()" and return its error using "?"',
    explanation: 'Uses the question mark operator for propagation.',
    patternToNotice: 'The surrounding function must return a compatible Result.',
    concept: 'errors',
    requiredTokens: ['sub()?', 'Ok(())']
  }
];
