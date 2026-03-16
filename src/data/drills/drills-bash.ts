import type { CodingDrill } from '@/types/coding';

export const bashDrills: CodingDrill[] = [
  {
    id: 'bash-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'File Test',
    content: 'if [[ -f "$FILE" ]]; then echo "Exists"; fi',
    explanation: 'Double brackets [[ ]] are the modern, safer way to perform tests.',
    patternToNotice: 'Variables in tests should almost always be quoted.',
    concept: 'conditionals',
    requiredTokens: ['if', '[[', '-f', ']]', 'then', 'fi']
  },
  {
    id: 'bash-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 3,
    title: 'Unique Sorted Count',
    content: 'cat file.txt | sort | uniq -c | sort -nr',
    explanation: 'A classic pipeline to find the frequency of occurrences.',
    patternToNotice: 'uniq only works on sorted input.',
    concept: 'pipelines',
    requiredTokens: ['cat', '|', 'sort', '|', 'uniq -c', '-nr']
  },
  {
    id: 'bash-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'String Slicing',
    content: 'VAR="hello"; echo ${VAR:1:2}',
    expectedOutput: 'el',
    explanation: 'Bash parameter expansion supports ${var:offset:length}.',
    patternToNotice: 'Offset starts at 0; length is the number of characters.',
    concept: 'variables'
  },
  {
    id: 'bash-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Loop Syntax',
    content: 'for i in 1 2 3 do echo $i done',
    explanation: 'Loops require semicolons or newlines after the list and the command.',
    patternToNotice: 'Missing ";" before "do" and "done".',
    concept: 'loops',
    requiredTokens: ['; do', '; done']
  },
  {
    id: 'bash-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 2,
    title: 'Recursive Delete',
    content: '# Find and delete all .log files in the current directory',
    explanation: 'find is the most powerful tool for recursive file operations.',
    patternToNotice: 'The -delete flag is more efficient than piping to rm.',
    concept: 'io',
    requiredTokens: ['find', '.', '-name', '"*.log"', '-delete']
  }
];
