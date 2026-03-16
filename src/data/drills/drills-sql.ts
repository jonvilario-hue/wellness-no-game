import type { CodingDrill } from '@/types/coding';

export const sqlDrills: CodingDrill[] = [
  {
    id: 'sql-syntax-1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 1,
    title: 'Basic Select',
    content: 'SELECT name, age FROM users WHERE age > 18;',
    explanation: 'The standard way to retrieve specific columns with a filter.',
    patternToNotice: 'WHERE comes after the FROM clause.',
    concept: 'select',
    requiredTokens: ['SELECT', 'FROM', 'WHERE', '> 18']
  },
  {
    id: 'sql-read-1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Inner Join Logic',
    tableInput: 'Users: [1, "Bob"], [2, "Alice"]\nOrders: [1, 100]',
    content: 'SELECT name FROM users JOIN orders ON users.id = orders.user_id',
    expectedOutput: 'Bob',
    explanation: 'JOIN only returns rows where the condition matches in both tables.',
    patternToNotice: 'Alice is excluded because she has no order.',
    concept: 'joins'
  },
  {
    id: 'sql-bug-1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 3,
    title: 'Aggregation Error',
    content: 'SELECT dept, AVG(salary) FROM employees;',
    explanation: 'When using AVG, any non-aggregated columns must be in GROUP BY.',
    patternToNotice: 'Missing "GROUP BY dept" clause.',
    concept: 'aggregation',
    requiredTokens: ['GROUP BY', 'dept']
  },
  {
    id: 'sql-recon-1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 2,
    title: 'Common Table Expression',
    content: `WITH high_earners AS (
  SELECT * FROM staff WHERE sal > 5000
)
SELECT * FROM high_earners`,
    explanation: 'CTEs provide temporary result sets for complex queries.',
    patternToNotice: 'CTEs start with the WITH keyword.',
    concept: 'ctes',
    requiredTokens: ['WITH', 'AS', '(', ')', 'SELECT']
  },
  {
    id: 'sql-build-1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 2,
    title: 'Unique User Count',
    content: '-- Count unique users from "logs" table',
    explanation: 'COUNT(DISTINCT column) is used for unique counts.',
    patternToNotice: 'The DISTINCT keyword goes inside the COUNT function.',
    concept: 'aggregation',
    requiredTokens: ['SELECT', 'COUNT', 'DISTINCT', 'user_id', 'FROM', 'logs']
  }
];
