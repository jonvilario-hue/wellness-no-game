
export type CalendarTask = {
    day: number;
    task: string;
};

export type CalendarPlan = {
    id: string;
    title: string;
    goal: string;
    tags: string[];
    instructions: string;
    advanced: string;
    enhancements?: string[];
    tasks: CalendarTask[];
};

export const calendarPlans: CalendarPlan[] = [
    {
        id: 'study-plan',
        title: 'Study Calendar Plan (21-Day)',
        goal: 'Develop a consistent study habit with built-in time management and review periods.',
        tags: ['Productivity', 'Focus', 'Learning'],
        instructions: 'Week 1 focuses on foundations (setting environment, basic Pomodoros). Week 2 applies active learning (Feynman Technique). Week 3 consolidates through self-testing.',
        advanced: 'Study in 90-minute blocks. Track energy before/after sessions. Use dual notebooks: Cornell + Active Recall. Simulate weekly tests.',
        enhancements: [
            'How was your focus today? ☀️ Great / ⛅ Okay / 🌧️ Hard',
            '💡 Tip: Try explaining today\'s topic to an imaginary student to reveal gaps.',
            '🧠 Weekly Reflection: What went well? What was hard? What to improve?',
            '❓ Flashcard: What is Active Recall? ✅ Retrieving info from memory instead of re-reading.',
            '📄 Download: Printable Weekly Study Planner (PDF)'
        ],
        tasks: [
            { day: 1, task: 'Choose subject + set goals' }, { day: 2, task: '25m study + 5m break' }, { day: 3, task: 'Review notes with color' }, { day: 4, task: 'Flashcards only' }, { day: 5, task: 'Pomodoro × 2' }, { day: 6, task: 'Practice test (short)' }, { day: 7, task: 'Journal + Relax' },
            { day: 8, task: 'Feynman Technique' }, { day: 9, task: 'Rotate subjects AM/PM' }, { day: 10, task: '2 Pomodoros + rewrite' }, { day: 11, task: 'Audio summary' }, { day: 12, task: 'Feynman Technique' }, { day: 13, task: 'Rotate subjects' }, { day: 14, task: 'Review & Plan' },
            { day: 15, task: '3 study blocks' }, { day: 16, task: 'Self-quiz' }, { day: 17, task: 'Mind map' }, { day: 18, task: '3 study blocks' }, { day: 19, task: 'Self-quiz' }, { day: 20, task: 'Mind map' }, { day: 21, task: 'Mastery checklist' },
        ]
    },
    {
        id: 'math-study',
        title: 'Math Study Calendar (21-Day)',
        goal: 'Build strong foundations in algebra, geometry, and problem-solving.',
        tags: ['Math', 'Learning'],
        instructions: 'Start with 25-minute Pomodoro blocks. Focus on fundamentals.',
        advanced: 'Use 90-minute blocks. Add SAT-style timed tests and peer explanations.',
        enhancements: [
            '🧠 Tip: Teaching is the best test of mastery. Explain concepts to an imaginary class.',
            '📊 Reflection: What went well in your math studies? What was challenging?'
        ],
        tasks: [
            { day: 1, task: 'Set Goals' }, { day: 2, task: 'Basic Algebra' }, { day: 3, task: 'Quadratics' }, { day: 4, task: 'Fractions' }, { day: 5, task: 'Rest' }, { day: 6, task: 'Geometry' }, { day: 7, task: 'Review' },
            { day: 8, task: 'Equations' }, { day: 9, task: 'Graphs' }, { day: 10, task: 'Practice' }, { day: 11, task: 'Math Game' }, { day: 12, task: 'Logic Puzzles' }, { day: 13, task: 'Rest' }, { day: 14, task: 'Reflection' },
            { day: 15, task: 'Word Problems' }, { day: 16, task: 'Final Quiz' }, { day: 17, task: 'Flashcards' }, { day: 18, task: 'Proof Writing' }, { day: 19, task: 'Rest' }, { day: 20, task: 'Review' }, { day: 21, task: 'Celebrate' },
        ]
    },
    {
        id: 'coding-bootcamp',
        title: 'Coding Bootcamp Study Calendar (21-Day)',
        goal: 'Master web fundamentals from HTML to deployment.',
        tags: ['Coding', 'Tech'],
        instructions: 'Learn basics of HTML, CSS, and JS with short daily challenges.',
        advanced: 'Build full apps with fetch/async. Deploy to GitHub. Track bugs/performance.',
        enhancements: [
            '🧠 Tip: When debugging, explain the bug out loud to reveal assumptions.',
            '💻 Reflection: Project milestones hit? Lessons from bugs? Automation ideas?'
        ],
        tasks: [
            { day: 1, task: 'HTML Basics' }, { day: 2, task: 'CSS Styling' }, { day: 3, task: 'JS Syntax' }, { day: 4, task: 'Code Challenge' }, { day: 5, task: 'Rest' }, { day: 6, task: 'JS Project' }, { day: 7, task: 'Review' },
            { day: 8, task: 'Git Commands' }, { day: 9, task: 'Responsive Design' }, { day: 10, task: 'APIs' }, { day: 11, task: 'Mini Project' }, { day: 12, task: 'Rest' }, { day: 13, task: 'Debugging' }, { day: 14, task: 'Reflection' },
            { day: 15, task: 'Async JS' }, { day: 16, task: 'Project Start' }, { day: 17, task: 'Build' }, { day: 18, task: 'Deploy' }, { day: 19, task: 'Polish' }, { day: 20, task: 'Demo' }, { day: 21, task: 'Celebrate' },
        ]
    },
    {
        id: 'language-learning',
        title: 'Language Learning Calendar (21-Day)',
        goal: 'Develop vocabulary, grammar, and conversational skills in a new language.',
        tags: ['Language', 'Culture'],
        instructions: 'Focus on 10-15 words a day with audio and writing practice.',
        advanced: 'Watch videos, summarize, and speak daily. Try mock recordings.',
        enhancements: [
            '🧠 Tip: Think in your target language during daily activities for immersion.',
            '🌍 Reflection: Which words felt easiest? Grammar confusion? Speaking time?'
        ],
        tasks: [
            { day: 1, task: 'Alphabet' }, { day: 2, task: 'Pronunciation' }, { day: 3, task: 'Basic Phrases' }, { day: 4, task: 'Numbers' }, { day: 5, task: 'Rest' }, { day: 6, task: 'Vocabulary' }, { day: 7, task: 'Review' },
            { day: 8, task: 'Verbs' }, { day: 9, task: 'Simple Sentences' }, { day: 10, task: 'Audio Listening' }, { day: 11, task: 'Practice Writing' }, { day: 12, task: 'Rest' }, { day: 13, task: 'Roleplay' }, { day: 14, task: 'Reflection' },
            { day: 15, task: 'Tenses' }, { day: 16, task: 'Conversation Drill' }, { day: 17, task: 'Cultural Notes' }, { day: 18, task: 'Exam Practice' }, { day: 19, task: 'Flashcards' }, { day: 20, task: 'Review' }, { day: 21, task: 'Celebrate' },
        ]
    },
    {
        id: 'morning-routine',
        title: 'Morning Routine Reset (21-Day)',
        goal: 'Build a foundational and uplifting start to the day.',
        tags: ['Productivity', 'Wellness'],
        instructions: 'Wk 1: Wake early, hydrate, stretch. Wk 2: Add 5m journaling. Wk 3: Add 5m movement.',
        advanced: '5 AM club: 20m exercise, 20m planning, 20m learning. Cold showers.',
        tasks: [
            { day: 1, task: 'Wake up 15m early' }, { day: 2, task: 'Hydrate' }, { day: 3, task: 'Stretch' }, { day: 4, task: 'Wake up 15m early' }, { day: 5, task: 'Hydrate' }, { day: 6, task: 'Stretch' }, { day: 7, task: 'Review Week 1' },
            { day: 8, task: 'Routine + 5m Journal' }, { day: 9, task: 'Routine + 5m Journal' }, { day: 10, task: 'Routine + 5m Journal' }, { day: 11, task: 'Routine + 5m Journal' }, { day: 12, task: 'Routine + 5m Journal' }, { day: 13, task: 'Routine + 5m Journal' }, { day: 14, task: 'Review Week 2' },
            { day: 15, task: 'Routine + 5m Movement' }, { day: 16, task: 'Routine + 5m Movement' }, { day: 17, task: 'Routine + 5m Movement' }, { day: 18, task: 'Routine + 5m Movement' }, { day: 19, task: 'Routine + 5m Movement' }, { day: 20, task: 'Routine + 5m Movement' }, { day: 21, task: 'Plan Next Steps' },
        ]
    }
];
