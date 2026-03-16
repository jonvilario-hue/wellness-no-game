import type { CodingDrill } from '@/types/coding';

export const bashDrills: CodingDrill[] = [
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
    content: `NAME="John Doe"
if [ $NAME == "John" ]; then`,
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
    content: `for f in *.txt; do
  mv "$f" "\${f%.txt}.md"
done`,
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
  }
];
