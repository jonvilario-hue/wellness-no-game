import type { CodingDrill } from '@/types/coding';

export const swiftDrills: CodingDrill[] = [
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
    content: `let res = user?.address?.city
print(type(of: res))`,
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
    content: `var name: String?
print(name!)`,
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
    content: `protocol Drivable {
  func drive()
}
struct Car: Drivable { }`,
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
  }
];
