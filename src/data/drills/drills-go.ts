import type { CodingDrill } from '@/types/coding';

/**
 * DRILL CONTENT FILE — DO NOT DELETE OR MERGE
 * Language: Go
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

export const goDrills: CodingDrill[] = [
  // Syntax Sprints (Write)
  {
    id: 'go-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Short Declaration',
    content: 'x := 10',
    explanation: ':= declares and initializes a variable with inferred type.',
    patternToNotice: 'Only valid inside functions.',
    concept: 'basics',
    requiredTokens: [':=', '10']
  },
  {
    id: 'go-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 2,
    title: 'Channel Make',
    content: 'ch := make(chan int)',
    explanation: 'Channels must be initialized using the make function.',
    patternToNotice: 'The "chan" keyword specifies the transmission type.',
    concept: 'concurrency',
    requiredTokens: ['make', 'chan', 'int'],
    concurrencyRelevant: true
  },
  {
    id: 'go-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 3,
    title: 'Error Return',
    content: 'func do() (int, error) { }',
    explanation: 'Go functions typically return error as the final value.',
    patternToNotice: 'Multiple return values are wrapped in parens.',
    concept: 'errors',
    requiredTokens: ['func', '(', 'int, error', ')']
  },
  {
    id: 'go-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 4,
    title: 'Type Assertion',
    content: 's, ok := val.(string)',
    explanation: 'Safe way to check an interface\'s underlying type.',
    patternToNotice: 'Always check the boolean "ok" before using the value.',
    concept: 'interfaces',
    requiredTokens: ['.(', 'string', ')']
  },

  // Code Reconstruction (Write)
  {
    id: 'go-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Basic Struct',
    content: 'type User struct {\n  ID int\n  Name string\n}',
    explanation: 'Structs are collections of typed fields.',
    patternToNotice: 'PascalCase fields are exported (public).',
    concept: 'structs',
    requiredTokens: ['type', 'struct', 'int', 'string']
  },
  {
    id: 'go-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 2,
    title: 'Defer Order',
    content: 'defer fmt.Println("Last")\nfmt.Println("First")',
    explanation: 'Defer pushes a call onto a stack; it runs when function exits.',
    patternToNotice: 'Last-in, first-out (LIFO) execution order.',
    concept: 'syntax',
    requiredTokens: ['defer', 'fmt.Println']
  },
  {
    id: 'go-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 3,
    title: 'Interface Implementation',
    content: 'type Writer interface {\n  Write([]byte) (int, error)\n}',
    explanation: 'Interfaces are implemented implicitly.',
    patternToNotice: 'Any type with a matching Write method implements this.',
    concept: 'interfaces',
    requiredTokens: ['interface', 'Write([]byte)', 'error']
  },
  {
    id: 'go-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 4,
    title: 'Select Statement',
    content: 'select {\n  case msg := <-ch:\n    log(msg)\n  default:\n    return\n}',
    explanation: 'Select waits on multiple channel operations.',
    patternToNotice: 'The default case makes the operation non-blocking.',
    concept: 'concurrency',
    requiredTokens: ['select', 'case', '<-', 'default'],
    concurrencyRelevant: true
  },

  // Output Prediction (Read)
  {
    id: 'go-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 1,
    title: 'Zero Values',
    content: 'var x int\nvar s string\nfmt.Printf("%v%v", x, s)',
    expectedOutput: '0',
    explanation: 'Uninitialized variables receive their type\'s zero value.',
    patternToNotice: 'ints are 0, strings are empty "", pointers are nil.',
    concept: 'basics'
  },
  {
    id: 'go-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Slice Length',
    content: 's := make([]int, 2, 5)\nfmt.Print(len(s))',
    expectedOutput: '2',
    explanation: 'len() returns number of elements, not capacity.',
    patternToNotice: 'capacity can be larger than length.',
    concept: 'slices'
  },
  {
    id: 'go-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 3,
    title: 'Pointer Update',
    content: 'x := 1\nf := func(p *int) { *p = 2 }\nf(&x)\nfmt.Print(x)',
    expectedOutput: '2',
    explanation: 'Modifying via pointer affects the original variable.',
    patternToNotice: 'Asterisk * dereferences the pointer to access the value.',
    concept: 'pointers'
  },
  {
    id: 'go-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 4,
    title: 'Closure Capture',
    content: 'fns := []func(){}\nfor i := 0; i < 2; i++ {\n  fns = append(fns, func() { fmt.Print(i) })\n}\nfns[0]()',
    expectedOutput: '2',
    explanation: 'The closure captures the loop variable i by reference.',
    patternToNotice: 'In older Go versions, this was a common pitfall.',
    concept: 'closures'
  },

  // Bug Hunt (Read)
  {
    id: 'go-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 1,
    title: 'Unused Variable',
    content: 'func main() {\n  x := 5\n  fmt.Println("Hi")\n}',
    explanation: 'Go forbids unused local variables.',
    patternToNotice: 'Either use the variable or remove it.',
    concept: 'basics',
    requiredTokens: ['fmt.Println(x)', '_ = x']
  },
  {
    id: 'go-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Nil Map Assignment',
    content: 'var m map[string]int\nm["a"] = 1',
    explanation: 'Maps must be initialized with make() before writing.',
    patternToNotice: 'Reading from a nil map is fine, but writing crashes.',
    concept: 'maps',
    requiredTokens: ['m := make(map[string]int)']
  },
  {
    id: 'go-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 3,
    title: 'Unbuffered Deadlock',
    content: 'ch := make(chan int)\nch <- 1\n<-ch',
    explanation: 'Sending to an unbuffered channel blocks until receiver is ready.',
    patternToNotice: 'Without a goroutine, this blocks the current execution thread.',
    concept: 'concurrency',
    requiredTokens: ['go func() { ch <- 1 }()'],
    concurrencyRelevant: true
  },
  {
    id: 'go-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 4,
    title: 'Slice Header Update',
    content: 'func f(s []int) { s = append(s, 1) }\nfunc main() {\n  v := []int{}\n  f(v)\n  fmt.Print(len(v))\n}',
    explanation: 'append returns a new slice header. f modifies a local copy.',
    patternToNotice: 'Slices are passed by value (the header), so use a pointer to modify length.',
    concept: 'slices',
    requiredTokens: ['func f(s *[]int)']
  },

  // Build (Build)
  {
    id: 'go-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 1,
    title: 'Return Sum',
    content: '// Implement sum(a, b int) int',
    explanation: 'Basic function syntax.',
    patternToNotice: 'Types follow parameter names.',
    concept: 'basics',
    requiredTokens: ['func', 'int', 'return']
  },
  {
    id: 'go-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 2,
    title: 'Find in Slice',
    content: '// Return index of "val" in slice "s" or -1',
    explanation: 'Use a for-range loop.',
    patternToNotice: 'Check every element against target.',
    concept: 'slices',
    requiredTokens: ['for', 'range', '== val']
  },
  {
    id: 'go-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 3,
    title: 'Concurrent Fetch',
    content: '// Run "fetch()" in a goroutine and send result to "ch"',
    explanation: 'Use the go keyword.',
    patternToNotice: 'Fast asynchronous execution.',
    concept: 'concurrency',
    requiredTokens: ['go', '<-', 'fetch()'],
    concurrencyRelevant: true
  },
  {
    id: 'go-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 4,
    title: 'Worker Pool',
    content: '// Launch 3 workers consuming from "jobs" channel',
    explanation: 'Requires loop and WaitGroup for proper sync.',
    patternToNotice: 'Distribute tasks across multiple concurrent workers.',
    concept: 'concurrency',
    requiredTokens: ['sync.WaitGroup', '.Add(3)', 'go func', '.Done()'],
    concurrencyRelevant: true
  }
];
