import type { CodingDrill } from '@/types/coding';

export const rustDrills: CodingDrill[] = [
  {
    id: 'rust-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Rust',
    difficulty: 1,
    title: 'Option Match',
    content: `match val {
  Some(x) => x,
  None => 0,
}`,
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
    content: `let s1 = String::from("hi");
let s2 = s1;
println!("{}", s1);`,
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
    content: `let r: Result<i32, &str> = Ok(10);
println!("{}", r.unwrap_or(5));`,
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
    content: `impl User {
  fn new(name: String) -> Self {
    Self { name }
  }
}`,
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
  }
];
