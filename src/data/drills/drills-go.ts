import type { CodingDrill } from '@/types/coding';

export const goDrills: CodingDrill[] = [
  {
    id: 'go-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Go',
    difficulty: 1,
    title: 'Map Initialization',
    content: 'm := make(map[string]int)',
    explanation: 'Basic map creation using make.',
    patternToNotice: 'Maps must be initialized with make before use.',
    concept: 'maps',
    requiredTokens: ['make', 'map', '[string]', 'int']
  },
  {
    id: 'go-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Channel Select',
    content: `c1 := make(chan string, 1)
c1 <- "ping"
select {
case msg := <-c1:
    fmt.Println(msg)
default:
    fmt.Println("no activity")
}`,
    expectedOutput: 'ping',
    explanation: 'The select statement chooses the first ready channel operation.',
    patternToNotice: 'Case is preferred over default if data is ready.',
    concept: 'channels'
  },
  {
    id: 'go-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Go',
    difficulty: 2,
    title: 'Pointer Receiver',
    content: `type Counter struct { val int }
func (c Counter) Inc() { c.val++ }
func main() {
    count := Counter{val: 0}
    count.Inc()
    fmt.Println(count.val)
}`,
    explanation: 'A value receiver operates on a copy. To modify the original, use a pointer receiver (*Counter).',
    patternToNotice: 'Methods that change state require pointer receivers.',
    concept: 'pointers',
    requiredTokens: ['*Counter']
  },
  {
    id: 'go-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Go',
    difficulty: 2,
    title: 'Error Wrapping',
    content: 'return fmt.Errorf("failed to process: %w", err)',
    explanation: 'Go 1.13+ error wrapping using %w.',
    patternToNotice: 'The %w verb allows for error inspection via errors.Is/As.',
    concept: 'errors',
    requiredTokens: ['fmt.Errorf', '%w', 'err']
  },
  {
    id: 'go-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Go',
    difficulty: 2,
    title: 'Slice Filter',
    content: '// Filter slice "s" to keep even numbers',
    explanation: 'Iterate and append to a new slice.',
    patternToNotice: 'Appending to a new slice is the standard way to filter.',
    concept: 'slices',
    requiredTokens: ['for', 'range', 'if', '% 2 == 0', 'append']
  }
];
