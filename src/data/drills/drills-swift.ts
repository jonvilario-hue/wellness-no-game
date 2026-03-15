import type { CodingDrill } from '@/types/coding';

/**
 * DRILL CONTENT FILE — DO NOT DELETE OR MERGE
 * Language: Swift
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

export const swiftDrills: CodingDrill[] = [
  // Syntax Sprints (Write)
  {
    id: 'swift-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 1,
    title: 'Variable Binding',
    content: 'let x = 10',
    explanation: 'Use "let" for constants and "var" for variables.',
    patternToNotice: 'Swift defaults to safety via immutability.',
    concept: 'basics',
    requiredTokens: ['let', '=']
  },
  {
    id: 'swift-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 2,
    title: 'Optional Declaration',
    content: 'var name: String?',
    explanation: 'Question mark ? identifies an optional value.',
    patternToNotice: 'Optionals can be nil or hold a value.',
    concept: 'optionals',
    requiredTokens: ['String', '?']
  },
  {
    id: 'swift-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 3,
    title: 'Guard Statement',
    content: 'guard let user = user else { return }',
    explanation: 'Guard ensures conditions are met before proceeding.',
    patternToNotice: 'Requires an else block that exits scope.',
    concept: 'optionals',
    requiredTokens: ['guard', 'let', 'else', 'return']
  },
  {
    id: 'swift-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Swift',
    difficulty: 4,
    title: 'Associated Value Enum',
    content: 'enum Result { case ok(Int), err(String) }',
    explanation: 'Enums can store additional data with cases.',
    patternToNotice: 'Case names are followed by tuple types.',
    concept: 'enums',
    requiredTokens: ['enum', 'case', '(', ')']
  },

  // Code Reconstruction (Write)
  {
    id: 'swift-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 1,
    title: 'Basic Struct',
    content: 'struct Point {\n  var x: Int\n  var y: Int\n}',
    explanation: 'Structs are value types in Swift.',
    patternToNotice: 'Memberwise initializers are generated automatically.',
    concept: 'structs',
    requiredTokens: ['struct', '{', 'Int', '}']
  },
  {
    id: 'swift-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 2,
    title: 'Closure Syntax',
    content: 'let add = { (a: Int, b: Int) -> Int in\n  a + b\n}',
    explanation: 'Closures are self-contained blocks of functionality.',
    patternToNotice: 'The "in" keyword separates params from body.',
    concept: 'closures',
    requiredTokens: ['{', 'in', '}']
  },
  {
    id: 'swift-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 3,
    title: 'Protocol Definition',
    content: 'protocol Drivable {\n  func drive()\n  var speed: Int { get }\n}',
    explanation: 'Protocols define requirements for methods/properties.',
    patternToNotice: 'Variables must specify { get } or { get set }.',
    concept: 'protocols',
    requiredTokens: ['protocol', 'func', '{ get }']
  },
  {
    id: 'swift-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Swift',
    difficulty: 4,
    title: 'Error Handling',
    content: 'do {\n  try perform()\n} catch {\n  print(error)\n}',
    explanation: 'Swift uses do-catch blocks for error propagation.',
    patternToNotice: 'Functions that throw must be called with try.',
    concept: 'errors',
    requiredTokens: ['do', 'try', 'catch']
  },

  // Output Prediction (Read)
  {
    id: 'swift-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 1,
    title: 'String Interpolation',
    content: 'let n = 5\nprint("V: \\(n)")',
    expectedOutput: 'V: 5',
    explanation: 'Backslash parens \\() embeds values in strings.',
    patternToNotice: 'Consistent across all types.',
    concept: 'syntax'
  },
  {
    id: 'swift-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 2,
    title: 'Struct Value Type',
    content: 'struct S { var x = 1 }\nvar a = S()\nvar b = a\nb.x = 2\nprint(a.x)',
    expectedOutput: '1',
    explanation: 'Structs are copied when assigned. a stays unchanged.',
    patternToNotice: 'Value types ensure data isolation.',
    concept: 'structs'
  },
  {
    id: 'swift-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 3,
    title: 'Nil Coalescing',
    content: 'let x: Int? = nil\nprint(x ?? 10)',
    expectedOutput: '10',
    explanation: '?? provides a default value if the optional is nil.',
    patternToNotice: 'Avoids forced unwrapping (!) errors.',
    concept: 'optionals'
  },
  {
    id: 'swift-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Swift',
    difficulty: 4,
    title: 'Capture List',
    content: 'var x = 1\nlet c = { [x] in print(x) }\nx = 2\nc()',
    expectedOutput: '1',
    explanation: '[x] in the capture list copies x at closure creation.',
    patternToNotice: 'Without the capture list, it would print 2 (reference).',
    concept: 'closures'
  },

  // Bug Hunt (Read)
  {
    id: 'swift-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 1,
    title: 'Constant Mutation',
    content: 'let x = 1\nx = 2',
    explanation: 'let bindings are immutable.',
    patternToNotice: 'Change let to var to allow reassignment.',
    concept: 'basics',
    requiredTokens: ['var x = 1']
  },
  {
    id: 'swift-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 2,
    title: 'Force Unwrapping',
    content: 'var s: String?\nprint(s!)',
    explanation: 'Forced unwrapping (!) a nil value causes a crash.',
    patternToNotice: 'Always use optional binding or nil coalescing.',
    concept: 'optionals',
    requiredTokens: ['if let', 's ?? ""']
  },
  {
    id: 'swift-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 3,
    title: 'Class Reference Cycle',
    content: 'class A { var b: B? }\nclass B { var a: A? }',
    explanation: 'Strong references between classes create a retain cycle.',
    patternToNotice: 'Use "weak" to prevent memory leaks.',
    concept: 'arc',
    requiredTokens: ['weak var']
  },
  {
    id: 'swift-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Swift',
    difficulty: 4,
    title: 'Throwing Context',
    content: 'func p() throws { }\nfunc call() { p() }',
    explanation: 'Throwing functions must be preceded by "try" inside do-catch.',
    patternToNotice: 'Errors must be propagated or handled.',
    concept: 'errors',
    requiredTokens: ['try', 'do', 'catch']
  },

  // Build (Build)
  {
    id: 'swift-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 1,
    title: 'Is Even',
    content: '// Check if "n" is even',
    explanation: 'n % 2 == 0.',
    patternToNotice: 'Modulo operator usage.',
    concept: 'basics',
    requiredTokens: ['% 2 == 0']
  },
  {
    id: 'swift-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 2,
    title: 'Safely Print Name',
    content: '// Use if-let to print "val" if not nil',
    explanation: 'Optional binding pattern.',
    patternToNotice: 'Safely unwraps the value into a local constant.',
    concept: 'optionals',
    requiredTokens: ['if let', 'print']
  },
  {
    id: 'swift-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 3,
    title: 'Protocol Impl',
    content: '// Make "Circle" adopt "Area" { func calc() }',
    explanation: 'Conforming to protocols.',
    patternToNotice: 'Requires method implementation matching signature.',
    concept: 'protocols',
    requiredTokens: ['extension', 'func calc', 'struct']
  },
  {
    id: 'swift-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Swift',
    difficulty: 4,
    title: 'Computed Property',
    content: '// Add "isValid" to "Email" if contains "@"',
    explanation: 'Read-only computed property.',
    patternToNotice: 'No "get" keyword needed for read-only.',
    concept: 'syntax',
    requiredTokens: ['var isValid: Bool', '{', 'contains("@")', '}']
  }
];
