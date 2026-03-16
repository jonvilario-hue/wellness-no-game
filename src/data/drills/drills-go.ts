import type { CodingDrill } from '@/types/coding';

export const goDrills: CodingDrill[] = [
  {
    id: 'go-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Struct Type',
    content: 'type Vertex struct {\n  X, Y int\n}',
    explanation: 'Go uses structs to group fields together.',
    patternToNotice: 'Fields of the same type can be declared on one line.',
    concept: 'structs',
    requiredTokens: ['type', 'struct', 'int']
  },
  {
    id: 'go-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 3,
    title: 'Panic Recovery',
    content: 'defer func() {\n  if r := recover(); r != nil {\n    fmt.Println(r)\n  }\n}()',
    explanation: 'The defer/recover pattern is the Go way to handle panics.',
    patternToNotice: 'Recover only works inside a deferred function.',
    concept: 'errors',
    requiredTokens: ['defer', 'func()', 'recover()', '!= nil']
  },
  {
    id: 'go-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Buffered Channel',
    content: 'ch := make(chan int, 1); ch <- 1; fmt.Println(<-ch)',
    expectedOutput: '1',
    explanation: 'A buffered channel allows sending without an active receiver.',
    patternToNotice: 'The buffer size is the second argument to make(chan...).',
    concept: 'channels'
  },
  {
    id: 'go-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Nil Map Assignment',
    content: 'var m map[string]int\nm["key"] = 1',
    explanation: 'Declaring a map doesn\'t initialize it. Assigning to a nil map panics.',
    patternToNotice: 'Maps must be initialized with make() before use.',
    concept: 'maps',
    requiredTokens: ['make(map[string]int)']
  },
  {
    id: 'go-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 2,
    title: 'Variadic Sum',
    content: '// Implement sum(nums ...int) int',
    explanation: 'The ... operator allows a function to accept any number of trailing arguments.',
    patternToNotice: 'Variadic arguments are received as a slice inside the function.',
    concept: 'functions',
    requiredTokens: ['func sum', '...int', 'range', 'return']
  }
];
