import type { CodingDrill } from '@/types/coding';

/**
 * DRILL CONTENT FILE — DO NOT DELETE OR MERGE
 * Language: SQL
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

export const sqlDrills: CodingDrill[] = [
  // Syntax Sprints (Write)
  {
    id: 'sql-syntax-l1',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 1,
    title: 'Select All',
    content: 'SELECT * FROM users;',
    explanation: 'Retrieves all columns and rows from a table.',
    patternToNotice: 'The asterisk * is a wildcard for all fields.',
    concept: 'basics',
    requiredTokens: ['SELECT', '*', 'FROM']
  },
  {
    id: 'sql-syntax-l2',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 2,
    title: 'Order Results',
    content: 'SELECT name FROM items ORDER BY price DESC;',
    explanation: 'Sorts output by a column in descending order.',
    patternToNotice: 'ORDER BY comes after the FROM/WHERE clause.',
    concept: 'sorting',
    requiredTokens: ['ORDER BY', 'DESC']
  },
  {
    id: 'sql-syntax-l3',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 3,
    title: 'Inner Join',
    content: 'SELECT u.name, o.id FROM users u JOIN orders o ON u.id = o.user_id;',
    explanation: 'Joins two tables based on a shared key.',
    patternToNotice: 'Aliases (u, o) make long table names easier to manage.',
    concept: 'joins',
    requiredTokens: ['JOIN', 'ON', '=']
  },
  {
    id: 'sql-syntax-l4',
    type: 'Syntax Sprints',
    lane: 'Write',
    language: 'SQL',
    difficulty: 4,
    title: 'Window Function',
    content: 'SELECT name, RANK() OVER (ORDER BY score DESC) FROM players;',
    explanation: 'Computes a value across a set of rows.',
    patternToNotice: 'OVER clause defines the window for the calculation.',
    concept: 'windows',
    requiredTokens: ['RANK()', 'OVER', 'ORDER BY']
  },

  // Code Reconstruction (Write)
  {
    id: 'sql-recon-l1',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 1,
    title: 'Filtering',
    content: 'SELECT name FROM users WHERE active = 1;',
    explanation: 'Filters rows based on a specific condition.',
    patternToNotice: 'WHERE is the primary filter mechanism.',
    concept: 'filtering',
    requiredTokens: ['WHERE', '=']
  },
  {
    id: 'sql-recon-l2',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 2,
    title: 'Aggregation',
    content: 'SELECT dept, COUNT(*) FROM staff GROUP BY dept;',
    explanation: 'Counts rows for each distinct value in a column.',
    patternToNotice: 'Non-aggregated columns in SELECT must be in GROUP BY.',
    concept: 'aggregation',
    requiredTokens: ['COUNT(*)', 'GROUP BY']
  },
  {
    id: 'sql-recon-l3',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 3,
    title: 'Filtering Groups',
    content: 'SELECT dept, AVG(sal) FROM staff GROUP BY dept HAVING AVG(sal) > 5000;',
    explanation: 'HAVING filters the result of an aggregation.',
    patternToNotice: 'HAVING acts like WHERE, but for groups.',
    concept: 'aggregation',
    requiredTokens: ['GROUP BY', 'HAVING', '>']
  },
  {
    id: 'sql-recon-l4',
    type: 'Code Reconstruction',
    lane: 'Write',
    language: 'SQL',
    difficulty: 4,
    title: 'CTE Declaration',
    content: 'WITH high_val AS (SELECT * FROM sales WHERE rev > 1000) SELECT * FROM high_val;',
    explanation: 'CTEs define temporary result sets.',
    patternToNotice: 'CTE starts with WITH followed by the alias and AS.',
    concept: 'ctes',
    requiredTokens: ['WITH', 'AS', '(', ')', 'SELECT']
  },

  // Output Prediction (Read)
  {
    id: 'sql-read-l1',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 1,
    title: 'Distinct Logic',
    content: 'SELECT DISTINCT val FROM (VALUES (1), (1), (2)) AS t(val);',
    expectedOutput: '1 2',
    explanation: 'DISTINCT removes duplicate values from output.',
    patternToNotice: 'Result set contains unique values only.',
    concept: 'uniqueness'
  },
  {
    id: 'sql-read-l2',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Null Comparisons',
    content: 'SELECT count(*) FROM (VALUES (1), (null)) AS t(v) WHERE v != 1;',
    expectedOutput: '0',
    explanation: 'NULL is not equal, and not not-equal, to anything. It is UNKNOWN.',
    patternToNotice: 'WHERE v != 1 filters out NULL because the comparison fails.',
    concept: 'nulls'
  },
  {
    id: 'sql-read-l3',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 3,
    title: 'Left Join Result',
    content: 'SELECT u.id FROM (VALUES (1)) u(id) LEFT JOIN (SELECT 2 as id) o ON u.id = o.id;',
    expectedOutput: '1',
    explanation: 'LEFT JOIN keeps all rows from the left table even if no match.',
    patternToNotice: 'The result includes row 1 from the left table.',
    concept: 'joins'
  },
  {
    id: 'sql-read-l4',
    type: 'Output Prediction',
    lane: 'Read',
    language: 'SQL',
    difficulty: 4,
    title: 'Window Sum',
    content: 'SELECT sum(v) OVER (ORDER BY v) FROM (VALUES (1), (2)) as t(v);',
    expectedOutput: '1 3',
    explanation: 'Running total calculated as rows are ordered.',
    patternToNotice: 'The second row sum includes the first row value.',
    concept: 'windows'
  },

  // Bug Hunt (Read)
  {
    id: 'sql-bug-l1',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 1,
    title: 'Inverted Order',
    content: 'FROM users SELECT *;',
    explanation: 'SQL statements must start with SELECT.',
    patternToNotice: 'Syntax order: SELECT -> FROM -> WHERE.',
    concept: 'syntax',
    requiredTokens: ['SELECT * FROM users']
  },
  {
    id: 'sql-bug-l2',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 2,
    title: 'Comma Error',
    content: 'SELECT name, age, FROM users;',
    explanation: 'Trailing commas before the FROM clause are invalid.',
    patternToNotice: 'Remove the comma after the last column name.',
    concept: 'syntax',
    requiredTokens: ['age FROM']
  },
  {
    id: 'sql-bug-l3',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 3,
    title: 'Ambiguous Column',
    content: 'SELECT id FROM users JOIN orders ON users.id = orders.user_id;',
    explanation: 'Both tables have an "id" column. You must specify which one.',
    patternToNotice: 'Use table aliases or names to prefix shared columns.',
    concept: 'joins',
    requiredTokens: ['users.id']
  },
  {
    id: 'sql-bug-l4',
    type: 'Bug Hunt',
    lane: 'Read',
    language: 'SQL',
    difficulty: 4,
    title: 'Where Aggregation',
    content: 'SELECT dept FROM staff WHERE COUNT(*) > 5 GROUP BY dept;',
    explanation: 'Aggregates cannot appear in WHERE. Use HAVING instead.',
    patternToNotice: 'WHERE filters rows; HAVING filters grouped results.',
    concept: 'aggregation',
    requiredTokens: ['HAVING COUNT(*) > 5']
  },

  // Build (Build)
  {
    id: 'sql-build-l1',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 1,
    title: 'Active Users',
    content: '-- Select all fields from users where status is "active"',
    explanation: 'Simple SELECT with WHERE clause.',
    patternToNotice: 'Equality check for string literals uses single quotes.',
    concept: 'filtering',
    requiredTokens: ['SELECT', 'FROM', 'WHERE', "'active'"]
  },
  {
    id: 'sql-build-l2',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 2,
    title: 'Order Spending',
    content: '-- Get total amount spent by user_id from "orders" table',
    explanation: 'Requires SUM and GROUP BY.',
    patternToNotice: 'Group by the identifier to aggregate amounts.',
    concept: 'aggregation',
    requiredTokens: ['SUM(amount)', 'GROUP BY user_id']
  },
  {
    id: 'sql-build-l3',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 3,
    title: 'High Volume Customers',
    content: '-- Find user names from "users" with > 5 "orders"',
    explanation: 'Requires JOIN and HAVING.',
    patternToNotice: 'Filter after grouping to find the specific volume.',
    concept: 'joins',
    requiredTokens: ['JOIN', 'GROUP BY', 'HAVING COUNT(*) > 5']
  },
  {
    id: 'sql-build-l4',
    type: 'Timed Implementation',
    lane: 'Build',
    language: 'SQL',
    difficulty: 4,
    title: 'Monthly Cohort',
    content: '-- Get monthly revenue growth vs previous month',
    explanation: 'Requires window function LAG().',
    patternToNotice: 'Compare current row to previous row using offset.',
    concept: 'windows',
    requiredTokens: ['SUM(rev)', 'LAG(', 'OVER']
  }
];
