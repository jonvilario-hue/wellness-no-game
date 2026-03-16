import type { CodingDrill } from '@/types/coding';

export const rustDrills: CodingDrill[] = [
  {
    id: 'rust-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Result Enum',
    content: 'let result: Result<i32, String> = Ok(42);',
    explanation: 'Rust uses Enums for error handling rather than exceptions.',
    patternToNotice: 'The Result type takes two generics: Success and Error.',
    concept: 'enums',
    requiredTokens: ['Result', '<', '>', 'Ok', '42']
  },
  {
    id: 'rust-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Rust',
    difficulty: 3,
    title: 'Explicit Lifetimes',
    content: "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}",
    explanation: 'Lifetimes ensure the returned reference is valid as long as the inputs.',
    patternToNotice: 'The generic lifetime name begins with a tick (e.g., \'a).',
    concept: 'lifetimes',
    requiredTokens: ["<'a>", "&'a", "-> &'a", "if", "else"]
  },
  {
    id: 'rust-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Rust',
    difficulty: 2,
    title: 'Reference Dereferencing',
    content: 'let x = 5;\nlet y = &x;\nprintln!("{}", *y);',
    expectedOutput: '5',
    explanation: 'The asterisk (*) is used to access the value at a reference address.',
    patternToNotice: 'Rust often handles dereferencing automatically, but explicit use is vital for primitives.',
    concept: 'ownership'
  },
  {
    id: 'rust-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Rust',
    difficulty: 3,
    title: 'Move Semantics',
    content: 'let s1 = String::from("hi");\nlet s2 = s1;\nprintln!("{}", s1);',
    explanation: 'String is moved to s2. s1 is no longer valid.',
    patternToNotice: 'Variable usage after a move triggers a compiler error.',
    concept: 'ownership',
    requiredTokens: ['.clone()']
  },
  {
    id: 'rust-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Rust',
    difficulty: 3,
    title: 'Message Enum',
    content: '// Implement a Message enum with Quit, Move(x,y), and Write(String) variants',
    explanation: 'Rust enums can store data within their variants.',
    patternToNotice: 'Variants can be unit-like, tuple-like, or struct-like.',
    concept: 'enums',
    requiredTokens: ['enum', 'Quit', 'Move', '{', '}', 'Write', 'String']
  }
];
