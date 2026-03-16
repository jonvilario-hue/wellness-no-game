import type { CodingDrill } from '@/types/coding';

export const swiftDrills: CodingDrill[] = [
  {
    id: 'swift-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 1,
    title: 'Guard Let',
    content: 'guard let value = optionalValue else { return }',
    explanation: 'Guard ensures early exit if an optional is nil.',
    patternToNotice: 'The unwrapped "value" is available in the scope AFTER the guard.',
    concept: 'optionals',
    requiredTokens: ['guard', 'let', '=', 'else', '{', 'return', '}']
  },
  {
    id: 'swift-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 2,
    title: 'Immutable Struct',
    content: 'struct User {\n  let id: Int;\n  var name: String\n}',
    explanation: 'Swift structs use "let" for constants and "var" for variables.',
    patternToNotice: 'Structs are value types by default in Swift.',
    concept: 'syntax',
    requiredTokens: ['struct', 'let', 'Int', 'var', 'String']
  },
  {
    id: 'swift-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 2,
    title: 'Nil Coalescing',
    content: 'let x: Int? = 10; print(x ?? 0)',
    expectedOutput: '10',
    explanation: 'The ?? operator returns the value if it exists, else the default.',
    patternToNotice: 'Nil coalescing is a concise alternative to force unwrapping.',
    concept: 'optionals'
  },
  {
    id: 'swift-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 2,
    title: 'Non-Optional Nil',
    content: 'var str: String = nil',
    explanation: 'In Swift, only Optional types (marked with ?) can store nil.',
    patternToNotice: 'Non-optional variables must have a valid value assigned.',
    concept: 'optionals',
    requiredTokens: ['String?']
  },
  {
    id: 'swift-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 2,
    title: 'Protocol Definition',
    content: '// Define a Drivable protocol with a drive() method',
    explanation: 'Protocols define requirements that types can conform to.',
    patternToNotice: 'Protocol methods define the signature, not the body.',
    concept: 'protocols',
    requiredTokens: ['protocol', 'Drivable', 'func', 'drive()']
  }
];
