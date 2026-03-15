import type { CodingDrill } from '@/types/coding';

/**
 * DRILL CONTENT FILE — DO NOT DELETE OR MERGE
 * Language: Bash
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

export const bashDrills: CodingDrill[] = [
  // Syntax Sprints (Write)
  {
    id: 'bash-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'Assign Variable',
    content: 'NAME="Alice"',
    explanation: 'No spaces allowed around the = in assignment.',
    patternToNotice: 'Variables are referenced with $ but defined without it.',
    concept: 'variables',
    requiredTokens: ['NAME', '=', '"']
  },
  {
    id: 'bash-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 2,
    title: 'Conditional Test',
    content: 'if [ "$X" -eq 1 ]; then',
    explanation: 'Brackets [] call the "test" command. Semicolon starts the block.',
    patternToNotice: 'Always quote variables inside tests to prevent word splitting.',
    concept: 'conditionals',
    requiredTokens: ['if', '[', '-eq', ']; then']
  },
  {
    id: 'bash-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 3,
    title: 'Command Substitution',
    content: 'FILES=$(ls *.txt)',
    explanation: '$() executes a command and captures its output.',
    patternToNotice: 'The modern $() is preferred over backticks ``.',
    concept: 'substitution',
    requiredTokens: ['$(', ')']
  },
  {
    id: 'bash-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'Bash',
    difficulty: 4,
    title: 'Array Append',
    content: 'LIST+=("New Item")',
    explanation: 'Parentheses () create an array literal.',
    patternToNotice: '+= adds elements to an existing array.',
    concept: 'arrays',
    requiredTokens: ['+=', '(', ')']
  },

  // Code Reconstruction (Write)
  {
    id: 'bash-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 1,
    title: 'Loop Through Files',
    content: 'for f in *.md; do\n  echo "$f"\ndone',
    explanation: 'Iteration over globs is fundamental in shell scripts.',
    patternToNotice: 'The "do" keyword starts the loop body.',
    concept: 'loops',
    requiredTokens: ['for', 'in', 'do', 'done']
  },
  {
    id: 'bash-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 2,
    title: 'File Check',
    content: 'if [[ -f "$FILE" ]]; then\n  rm "$FILE"\nfi',
    explanation: '-f checks if a regular file exists.',
    patternToNotice: 'Double brackets [[ ]] provide more robust testing than [ ].',
    concept: 'conditionals',
    requiredTokens: ['[[', '-f', ']]', 'fi']
  },
  {
    id: 'bash-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 3,
    title: 'Function with Args',
    content: 'log() {\n  echo "[$1] $2"\n}',
    explanation: '$1, $2 refer to the positional arguments.',
    patternToNotice: 'Functions are invoked by name, not with ().',
    concept: 'functions',
    requiredTokens: ['log()', '{', '}']
  },
  {
    id: 'bash-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'Bash',
    difficulty: 4,
    title: 'Redirection Pipe',
    content: 'cat log.txt | grep "ERR" > error.log 2>&1',
    explanation: 'Redirects stdout and stderr to the same file.',
    patternToNotice: '2>&1 merges the error stream into the standard stream.',
    concept: 'redirection',
    requiredTokens: ['|', '>', '2>&1']
  },

  // Output Prediction (Read)
  {
    id: 'bash-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 1,
    title: 'Echo Variable',
    content: 'X=10\necho "X is $X"',
    expectedOutput: 'X is 10',
    explanation: 'Double quotes allow variable expansion.',
    patternToNotice: 'Single quotes would output the literal string "$X".',
    concept: 'quoting'
  },
  {
    id: 'bash-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Math Arithmetic',
    content: 'echo $(( 5 * 2 ))',
    expectedOutput: '10',
    explanation: '$(( )) is used for integer arithmetic.',
    patternToNotice: 'Spaces inside the parens are optional but aid readability.',
    concept: 'arithmetic'
  },
  {
    id: 'bash-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 3,
    title: 'Subshell Scoping',
    content: 'X=1\n(X=2)\necho $X',
    expectedOutput: '1',
    explanation: 'Parentheses () start a subshell. Changes to X stay local.',
    patternToNotice: 'Subshells cannot modify variables in the parent process.',
    concept: 'scoping'
  },
  {
    id: 'bash-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'Bash',
    difficulty: 4,
    title: 'Parameter Expansion',
    content: 'F="data.txt"\necho "${F%.txt}"',
    expectedOutput: 'data',
    explanation: '%.txt removes the shortest matching suffix from the string.',
    patternToNotice: 'Suffix/prefix removal is faster than using "sed" or "cut".',
    concept: 'expansion'
  },

  // Bug Hunt (Read)
  {
    id: 'bash-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 1,
    title: 'Space Assignment',
    content: 'NAME = "Alice"',
    explanation: 'Spaces around = are invalid in Bash assignment.',
    patternToNotice: 'Shell treats NAME as a command if space follows.',
    concept: 'variables',
    requiredTokens: ['NAME="Alice"']
  },
  {
    id: 'bash-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 2,
    title: 'Word Splitting',
    content: 'FILE="my data.txt"\nrm $FILE',
    explanation: 'Unquoted $FILE splits into two arguments: "my" and "data.txt".',
    patternToNotice: 'Always wrap variables in double quotes "$FILE".',
    concept: 'quoting',
    requiredTokens: ['"$FILE"']
  },
  {
    id: 'bash-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 3,
    title: 'Exit Code Ignore',
    content: 'grep "pattern" file\necho "Success"',
    explanation: 'The script always echoes Success, regardless of grep outcome.',
    patternToNotice: 'Check $? or use && to ensure logical flow.',
    concept: 'exit-codes',
    requiredTokens: ['&&', 'if']
  },
  {
    id: 'bash-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'Bash',
    difficulty: 4,
    title: 'Unintended Globbing',
    content: 'SEARCH="*"\necho $SEARCH',
    explanation: 'Unquoted * expands to all files in current directory.',
    patternToNotice: 'Single quotes or escaping prevent expansion.',
    concept: 'globbing',
    requiredTokens: ['"$SEARCH"']
  },

  // Build (Build)
  {
    id: 'bash-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 1,
    title: 'Hello Script',
    content: '# Print "Hello" followed by the first argument',
    explanation: 'Use echo "Hello $1".',
    patternToNotice: '$1 is the first positional argument.',
    concept: 'basics',
    requiredTokens: ['echo', '$1']
  },
  {
    id: 'bash-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 2,
    title: 'Directory Maker',
    content: '# Create dir "logs" if it doesn\'t exist',
    explanation: 'Use [[ -d "logs" ]] or mkdir -p.',
    patternToNotice: '-p creates parent dirs and ignores existing.',
    concept: 'fs',
    requiredTokens: ['mkdir', '-p']
  },
  {
    id: 'bash-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 3,
    title: 'Line Counter',
    content: '# Count lines in "app.log" containing "ERR"',
    explanation: 'Pipe grep into wc -l.',
    patternToNotice: 'Standard text processing pipeline.',
    concept: 'pipelines',
    requiredTokens: ['grep', '|', 'wc -l']
  },
  {
    id: 'bash-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'Bash',
    difficulty: 4,
    title: 'File Rename Bulk',
    content: '# Change all .txt files to .md using a loop',
    explanation: 'Iterate and use parameter expansion.',
    patternToNotice: 'mv "$f" "${f%.txt}.md"',
    concept: 'loops',
    requiredTokens: ['for', 'in', 'mv', '${']
  }
];
