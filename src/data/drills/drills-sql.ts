import type { CodingDrill } from '@/types/coding';

export const sqlDrills: CodingDrill[] = [
  {
    id: 'sql-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 1,
    title: 'Ordered Selection',
    content: "SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC;",
    explanation: 'Filtering and sorting results is the bread and butter of SQL.',
    patternToNotice: 'ORDER BY always follows the WHERE clause.',
    concept: 'select',
    requiredTokens: ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'DESC']
  },
  {
    id: 'sql-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 3,
    title: 'Grouped Join',
    content: 'SELECT d.name, COUNT(e.id) FROM depts d LEFT JOIN emps e ON d.id = e.dept_id GROUP BY d.name;',
    explanation: 'LEFT JOIN ensures departments without employees are still counted.',
    patternToNotice: 'Non-aggregated columns must appear in the GROUP BY clause.',
    concept: 'joins',
    requiredTokens: ['SELECT', 'COUNT', 'LEFT JOIN', 'ON', 'GROUP BY']
  },
  {
    id: 'sql-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Null Check Logic',
    tableInput: 'Users: [1, "Bob", NULL], [2, "Alice", 25]',
    content: 'SELECT COUNT(*) FROM users WHERE age IS NULL;',
    expectedOutput: '1',
    explanation: 'NULL values are not matched with =; you must use IS NULL.',
    patternToNotice: 'Comparison operators fail against NULL values.',
    concept: 'logic'
  },
  {
    id: 'sql-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 3,
    title: 'Having vs Where',
    content: 'SELECT name FROM users HAVING age > 18;',
    explanation: 'WHERE filters rows; HAVING filters groups after aggregation.',
    patternToNotice: 'HAVING requires a GROUP BY clause or aggregate context.',
    concept: 'select',
    requiredTokens: ['WHERE age > 18']
  },
  {
    id: 'sql-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 2,
    title: 'Relative Update',
    content: '-- Increase price by 10% for the "electronics" category',
    explanation: 'Updates can perform calculations on the current column value.',
    patternToNotice: 'The SET clause can reference the updated column itself.',
    concept: 'update',
    requiredTokens: ['UPDATE', 'SET', 'price * 1.1', 'WHERE']
  }
];
