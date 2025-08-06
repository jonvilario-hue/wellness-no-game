
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
        id: 'morning-routine',
        title: 'Morning Routine Reset (21-Day)',
        goal: 'Build a foundational and uplifting start to the day.',
        tags: ['Productivity', 'Wellness', 'Beginner'],
        instructions: 'Week 1: Wake up 15 mins earlier, drink water, and do 3 mins of light stretching. Week 2: Add 5-minute journaling. Week 3: Add 5 mins of movement.',
        advanced: 'Follow the 5 AM club model: 20 mins of high-intensity exercise, 20 mins of journaling/planning, and 20 mins of learning. Add cold showers for an extra boost.',
        enhancements: [
            'Daily Reflection Question: “What went well this morning?”',
            'Add a Mood Check Emoji row below the calendar for visual tracking (☀️🌥️🌧️).',
            'Link to a printable PDF version for offline use.'
        ],
        tasks: [
            // Week 1
            { day: 1, task: 'Wake up 15m early' }, { day: 2, task: 'Hydrate' }, { day: 3, task: 'Stretch' }, { day: 4, task: 'Wake up 15m early' }, { day: 5, task: 'Hydrate' }, { day: 6, task: 'Stretch' }, { day: 7, task: 'Review Week 1' },
            // Week 2
            { day: 8, task: 'Routine + 5m Journal' }, { day: 9, task: 'Routine + 5m Journal' }, { day: 10, task: 'Routine + 5m Journal' }, { day: 11, task: 'Routine + 5m Journal' }, { day: 12, task: 'Routine + 5m Journal' }, { day: 13, task: 'Routine + 5m Journal' }, { day: 14, task: 'Review Week 2' },
            // Week 3
            { day: 15, task: 'Routine + 5m Movement' }, { day: 16, task: 'Routine + 5m Movement' }, { day: 17, task: 'Routine + 5m Movement' }, { day: 18, task: 'Routine + 5m Movement' }, { day: 19, task: 'Routine + 5m Movement' }, { day: 20, task: 'Routine + 5m Movement' }, { day: 21, task: 'Plan Next Steps' },
        ]
    },
    {
        id: 'digital-detox',
        title: 'Digital Detox Challenge (14-Day)',
        goal: 'Reduce screen time and reclaim focus.',
        tags: ['Focus', 'Digital Wellness'],
        instructions: 'Week 1: No phone in bed, 30 min social media limit, and a 1-hour screen-free block. Week 2: Add screen-free mornings and no-scroll zones during meals.',
        advanced: 'Commit to fully "unplugged weekends" with no social media or non-essential screen use. Use app time-limiters during the week and delete 3 time-wasting apps.',
        enhancements: [
            'Daily prompt: “What did you notice with less screen time today?”',
            'Static infographic: Average screen time reduction = +3 hours per week productivity.',
            'Checklist: Digital Clutter Items (unsubscribe, clean inbox, etc.).'
        ],
        tasks: [
            // Week 1
            { day: 1, task: 'No phone in bed' }, { day: 2, task: '30m social media limit' }, { day: 3, task: '1hr screen-free block' }, { day: 4, task: 'Replace 1 app with offline activity' }, { day: 5, task: 'No phone in bed' }, { day: 6, task: 'Read a physical book' }, { day: 7, task: 'Review screen time report' },
            // Week 2
            { day: 8, task: 'Screen-free morning' }, { day: 9, task: 'No-scroll meals' }, { day: 10, task: 'Screen-free morning' }, { day: 11, task: 'No-scroll meals' }, { day: 12, task: 'Half-day offline on weekend' }, { day: 13, task: 'Go for a walk without phone' }, { day: 14, task: 'Plan ongoing habits' },
        ]
    },
    {
        id: 'hydration-nutrition',
        title: 'Hydration & Nutrition Tracker (30-Day)',
        goal: 'Build basic health consistency around hydration and meals.',
        tags: ['Health', 'Wellness'],
        instructions: 'Week 1: Track water intake (8 cups/day). Week 2: Swap one junk food item per day. Week 3: Add one veggie/fruit with every meal. Week 4: Track energy/mood after meals.',
        advanced: 'Shift into calorie/macronutrient tracking, intermittent fasting, or mindful eating journaling. Follow a color-coded meal calendar (plant-based, lean protein, sugar-free).',
        enhancements: [
            'Static cup icons per day for coloring in.',
            'Optional warm-up: “Just track water for first 3 days.”',
            'Sample low-prep meal ideas.'
        ],
        tasks: [
            { day: 1, task: 'Track water' }, { day: 2, task: 'Track water' }, { day: 3, task: 'Track water' }, { day: 4, task: 'Track water' }, { day: 5, task: 'Track water' }, { day: 6, task: 'Track water' }, { day: 7, task: 'Review Week 1' },
            { day: 8, task: 'Swap 1 junk food' }, { day: 9, task: 'Swap 1 junk food' }, { day: 10, task: 'Swap 1 junk food' }, { day: 11, task: 'Swap 1 junk food' }, { day: 12, task: 'Swap 1 junk food' }, { day: 13, task: 'Swap 1 junk food' }, { day: 14, task: 'Review Week 2' },
            { day: 15, task: 'Add veggie/fruit to meals' }, { day: 16, task: 'Add veggie/fruit to meals' }, { day: 17, task: 'Add veggie/fruit to meals' }, { day: 18, task: 'Add veggie/fruit to meals' }, { day: 19, task: 'Add veggie/fruit to meals' }, { day: 20, task: 'Add veggie/fruit to meals' }, { day: 21, task: 'Review Week 3' },
            { day: 22, task: 'Track energy after meals' }, { day: 23, task: 'Track energy after meals' }, { day: 24, task: 'Track energy after meals' }, { day: 25, task: 'Track energy after meals' }, { day: 26, task: 'Track energy after meals' }, { day: 27, task: 'Track energy after meals' }, { day: 28, task: 'Track energy after meals' },
            { day: 29, task: 'Plan next month' }, { day: 30, task: 'Final review' },
        ]
    },
    {
        id: 'focus-sprint',
        title: 'Focus Builder: Deep Work Sprint (14-Day)',
        goal: 'Build concentration and achieve flow states.',
        tags: ['Focus', 'Productivity'],
        instructions: 'Days 1-3: One 25-min Pomodoro. Days 4-7: Two 25-min Pomodoros. Days 8-10: One 50-min block. Days 11-14: Add a 5-min reflection after focus session.',
        advanced: 'Schedule two 90-minute flow sessions per day. Track your focus energy level before and after each block. Add a pre-focus ritual (stretch, tea, music).',
        enhancements: [
            'Mini Journal prompt: “How distracted were you today?” [1–5 scale emoji: 🎯🔥🤔💨🐿️].',
            'Include a “Flow Song” suggestion.',
            'Add links to printable focus timer templates.'
        ],
        tasks: [
            // Week 1
            { day: 1, task: '1x25min Pomodoro' }, { day: 2, task: '1x25min Pomodoro' }, { day: 3, task: '1x25min Pomodoro' }, { day: 4, task: '2x25min Pomodoro' }, { day: 5, task: '2x25min Pomodoro' }, { day: 6, task: '2x25min Pomodoro' }, { day: 7, task: '2x25min Pomodoro' },
            // Week 2
            { day: 8, task: '1x50min Deep Work' }, { day: 9, task: '1x50min Deep Work' }, { day: 10, task: '1x50min Deep Work' }, { day: 11, task: 'Add 5m reflection' }, { day: 12, task: 'Add 5m reflection' }, { day: 13, task: 'Add 5m reflection' }, { day: 14, task: 'Evaluate Focus' },
        ]
    },
    {
        id: 'declutter-challenge',
        title: 'Declutter Challenge (10-Day)',
        goal: 'Reduce physical and digital clutter for mental clarity.',
        tags: ['Home', 'Productivity', 'Organization'],
        instructions: 'Tackle one small, specific area of clutter each day. The goal is to build momentum and make the process feel manageable, not overwhelming.',
        advanced: 'After the initial 10 days, adopt a "one in, one out" policy for all new purchases. Expand the declutter to finances and commitments.',
        enhancements: [
            'Static photo checklist: Before / After visual rows.',
            'Printable “Donation or Toss?” worksheet.',
            'Pre-filled list of clutter-prone spaces (digital + physical).'
        ],
        tasks: [
            { day: 1, task: 'Phone Apps' },
            { day: 2, task: 'Email Inbox' },
            { day: 3, task: 'Desk Space' },
            { day: 4, task: 'Closet' },
            { day: 5, task: 'Kitchen Counter' },
            { day: 6, task: 'Bathroom Items' },
            { day: 7, task: 'Junk Drawer' },
            { day: 8, task: 'Bookshelf' },
            { day: 9, task: 'Photos/Screenshots' },
            { day: 10, task: 'Car or Bag' },
        ]
    },
    {
        id: 'sleep-optimization',
        title: 'Sleep Optimization (14-Day)',
        goal: 'Improve sleep quality and establish a healthy rhythm.',
        tags: ['Wellness', 'Health', 'Recovery'],
        instructions: 'Days 1-3: Set a consistent bedtime. Days 4-6: No screens 1 hour before sleep. Days 7-9: Create a wind-down routine. Days 10-14: Log sleep quality.',
        advanced: 'Follow a strict circadian alignment protocol: aim for morning sunlight exposure within 30 minutes of waking and use blue-light filtering software/glasses after sunset.',
        enhancements: [
            'Static Sleep Tracker: HTML table with fields for “Sleep Time,” “Wake Time,” “Rest Quality”.',
            'Add a “Wind-Down Playlist” suggestion.',
            'Include “Caffeine cut-off” and blue light cutoff reminders as icons on the calendar.'
        ],
        tasks: [
            // Week 1
            { day: 1, task: 'Consistent bedtime' }, { day: 2, task: 'Consistent bedtime' }, { day: 3, task: 'Consistent bedtime' }, { day: 4, task: 'No screens 1hr pre-bed' }, { day: 5, task: 'No screens 1hr pre-bed' }, { day: 6, task: 'No screens 1hr pre-bed' }, { day: 7, task: 'Review Week 1' },
            // Week 2
            { day: 8, task: 'Wind-down routine' }, { day: 9, task: 'Wind-down routine' }, { day: 10, task: 'Wind-down routine' }, { day: 11, task: 'Log sleep quality' }, { day: 12, task: 'Log sleep quality' }, { day: 13, task: 'Log sleep quality' }, { day: 14, task: 'Final review' },
        ]
    },
    {
        id: 'confidence-builder',
        title: 'Confidence Builder Plan (7-Day)',
        goal: 'Build self-esteem through small daily wins.',
        tags: ['Confidence', 'Mental Clarity'],
        instructions: 'Day 1: Compliment yourself. Day 2: Record a voice memo pep talk. Day 3: Complete 1 micro-task. Day 4: Share your goals. Days 5-7: Increase social interaction.',
        advanced: 'Do one brave thing per day. Create an "I’m proud of…" journal. Film a 30-sec confidence log daily.',
        enhancements: [
            'Add “Today’s Win” text box.',
            '“Empowerment Quote” carousel (static).',
            'Color-code each day’s card as a Confidence Level Up.'
        ],
        tasks: [
            { day: 1, task: 'Mirror Affirmation' }, { day: 2, task: 'Complete 1 hard task' }, { day: 3, task: 'Compliment yourself' }, { day: 4, task: 'Share an idea' }, { day: 5, task: 'Dress with intention' }, { day: 6, task: 'Talk to someone new' }, { day: 7, task: 'Reflect on 3 wins' },
        ]
    },
    {
        id: 'habit-stacking',
        title: 'Habit Stacking Challenge (21-Day)',
        goal: 'Layer small habits onto existing routines to make them stick.',
        tags: ['Productivity', 'Behavioral Science'],
        instructions: 'Based on James Clear’s "Atomic Habits." Attach a new, small habit to a routine you already do without thinking.',
        advanced: 'Create "habit chains" where one stacked habit triggers the next, creating a cascade of productive actions with minimal willpower.',
        enhancements: [],
        tasks: [
            { day: 1, task: 'After brushing teeth, state 1 gratitude.' }, { day: 2, task: 'Gratitude after brushing' }, { day: 3, task: 'Gratitude after brushing' }, { day: 4, task: 'Gratitude after brushing' }, { day: 5, task: 'Gratitude after brushing' }, { day: 6, task: 'Gratitude after brushing' }, { day: 7, task: 'Review Week 1' },
            { day: 8, task: 'Add: 1-min breathwork after coffee' }, { day: 9, task: 'Habit Stack 1 & 2' }, { day: 10, task: 'Habit Stack 1 & 2' }, { day: 11, task: 'Habit Stack 1 & 2' }, { day: 12, task: 'Habit Stack 1 & 2' }, { day: 13, task: 'Habit Stack 1 & 2' }, { day: 14, task: 'Review Week 2' },
            { day: 15, task: 'Add: Review goals after lunch' }, { day: 16, task: 'Habit Stack 1, 2, & 3' }, { day: 17, task: 'Habit Stack 1, 2, & 3' }, { day: 18, task: 'Habit Stack 1, 2, & 3' }, { day: 19, task: 'Habit Stack 1, 2, & 3' }, { day: 20, task: 'Habit Stack 1, 2, & 3' }, { day: 21, task: 'Plan next habit stack' },
        ]
    },
    {
        id: 'social-recharge',
        title: 'Social Recharge Calendar (14-Day)',
        goal: 'Rebuild healthy social bonds and reduce loneliness.',
        tags: ['Health', 'Mental Clarity'],
        instructions: 'Each day, take one small step to connect with others. The goal is gentle, consistent effort, not overwhelming social events.',
        advanced: 'Schedule one longer, meaningful conversation per week. Volunteer or join a club to meet new people with shared interests.',
        enhancements: ['Include an "Energy after interaction" emoji row (⚡|🙂|😴).'],
        tasks: [
            { day: 1, task: 'Text a friend you miss' }, { day: 2, task: 'Comment on a post' }, { day: 3, task: 'Compliment a stranger' }, { day: 4, task: 'Ask a coworker about their day' }, { day: 5, task: 'Call a family member' }, { day: 6, task: 'Attend a community event' }, { day: 7, task: 'Review social energy' },
            { day: 8, task: 'Text a friend you miss' }, { day: 9, task: 'Comment on a post' }, { day: 10, task: 'Compliment a stranger' }, { day: 11, task: 'Ask a coworker about their day' }, { day: 12, task: 'Call a family member' }, { day: 13, task: 'Attend a community event' }, { day: 14, task: 'Plan next steps' },
        ]
    },
    {
        id: 'micro-workout-month',
        title: 'Micro-Workout Month (30-Day)',
        goal: 'Boost fitness and energy in small, consistent bursts.',
        tags: ['Fitness', 'Health', 'Energy'],
        instructions: 'Commit to a 3-5 minute micro-workout each day. The goal is consistency over intensity. Never miss a day, even if it\'s just stretching.',
        advanced: 'Increase the duration of each micro-workout to 10 minutes, or add a second micro-workout in the afternoon to break up sedentary time.',
        tasks: [
            { day: 1, task: '30s Jumping Jacks' }, { day: 2, task: '1m Wall Sit' }, { day: 3, task: '10 Squats' }, { day: 4, task: '30s High Knees' }, { day: 5, task: '10 Push-ups (on knees is ok!)' }, { day: 6, task: '1m Plank' }, { day: 7, task: 'Rest/Stretch' },
            { day: 8, task: '30s Jumping Jacks' }, { day: 9, task: '1m Wall Sit' }, { day: 10, task: '10 Squats' }, { day: 11, task: '30s High Knees' }, { day: 12, 'task': '10 Push-ups' }, { day: 13, task: '1m Plank' }, { day: 14, task: 'Rest/Stretch' },
            { day: 15, task: '45s Jumping Jacks' }, { day: 16, task: '90s Wall Sit' }, { day: 17, task: '15 Squats' }, { day: 18, task: '45s High Knees' }, { day: 19, task: '12 Push-ups' }, { day: 20, task: '90s Plank' }, { day: 21, task: 'Rest/Stretch' },
            { day: 22, task: '45s Jumping Jacks' }, { day: 23, task: '90s Wall Sit' }, { day: 24, task: '15 Squats' }, { day: 25, task: '45s High Knees' }, { day: 26, task: '12 Push-ups' }, { day: 27, task: '90s Plank' }, { day: 28, task: 'Rest/Stretch' },
            { day: 29, task: 'Your Favorite Micro-Workout' }, { day: 30, task: 'Your Favorite Micro-Workout' },
        ]
    },
    {
        id: 'creative-expression',
        title: 'Creative Expression Plan (15-Day)',
        goal: 'Unlock creativity and self-expression through small daily acts.',
        tags: ['Creativity', 'Mental Clarity', 'Wellness'],
        instructions: 'Dedicate just 5-10 minutes each day to a low-stakes creative prompt. The goal is to silence the inner critic and simply play.',
        advanced: 'Choose one of your daily creations and spend 30-60 minutes developing it further. Share one of your creations with a trusted friend.',
        tasks: [
            { day: 1, task: 'Doodle a dream' }, { day: 2, task: '5-min freewrite' }, { day: 3, task: 'Photo of something you love' }, { day: 4, task: 'Describe a color with words' }, { day: 5, task: 'Build something with 3 objects' },
            { day: 6, task: 'Doodle a feeling' }, { day: 7, task: 'Write a 6-word story' }, { day: 8, task: 'Photo of a texture' }, { day: 9, task: 'Describe a sound with words' }, { day: 10, task: 'Arrange items into a face' },
            { day: 11, task: 'Doodle to music' }, { day: 12, task: 'Write a haiku' }, { day: 13, task: 'Photo of a shadow' }, { day: 14, task: 'Describe a taste with words' }, { day: 15, task: 'Combine 2 past prompts' },
        ]
    },
    {
        id: 'gratitude-growth',
        title: 'Gratitude Growth Calendar (28-Day)',
        goal: 'Build positivity and reduce stress by focusing on gratitude.',
        tags: ['Mental Clarity', 'Wellness', 'Confidence'],
        instructions: 'Each day, answer the specific gratitude prompt. It helps train your brain to notice the good that is already present.',
        advanced: 'Expand on one of your daily gratitudes, writing a full paragraph about why you appreciate it. Once a week, write a letter of appreciation to someone (you don\'t have to send it).',
        tasks: [
            { day: 1, task: 'Something you see' }, { day: 2, task: 'A skill you have' }, { day: 3, task: 'A person' }, { day: 4, task: 'A simple pleasure' }, { day: 5, task: 'A technology' }, { day: 6, task: 'Something in nature' }, { day: 7, task: 'Weekly review' },
            { day: 8, task: 'Something you hear' }, { day: 9, task: 'A food you enjoy' }, { day: 10, task: 'A challenge that taught you' }, { day: 11, task: 'A piece of knowledge' }, { day: 12, task: 'Your body' }, { day: 13, task: 'A memory' }, { day: 14, task: 'Weekly review' },
            { day: 15, task: 'Something that smells good' }, { day: 16, task: 'A book or movie' }, { day: 17, task: 'A tough lesson' }, { day: 18, task: 'Something beautiful' }, { day: 19, task: 'A place' }, { day: 20, task: 'A song' }, { day: 21, task: 'Weekly review' },
            { day: 22, task: 'Something you touch' }, { day: 23, task: 'A stranger\'s kindness' }, { day: 24, task: 'A future event' }, { day: 25, task: 'A mistake you learned from' }, { day: 26, task: 'Yourself' }, { day: 27, task: 'Something that made you laugh' }, { day: 28, task: 'Final review' },
        ]
    },
    {
        id: 'study-calendar-plan',
        title: 'Study Calendar Plan (21-Day)',
        goal: 'Develop a consistent study habit with built-in time management and review periods.',
        tags: ['Productivity', 'Focus', 'Learning'],
        instructions: 'Week 1 focuses on foundations: setting up your environment and using basic techniques like Pomodoros. Week 2 is about applying active learning methods like the Feynman Technique. Week 3 consolidates knowledge through self-testing and review.',
        advanced: 'Study in 90-minute ultradian rhythm blocks. Track your energy before/after each session. Use dual notebooks for Cornell notes and Active Recall. Simulate a full weekly test under timed conditions.',
        enhancements: [
            'How was your focus today? ☀️ Great / ⛅ Okay / 🌧️ Scattered',
            'Tip of the Day: Try explaining what you learned to an imaginary student. This helps with memory and reveals weak spots.',
            'Weekly Reflection: What went well? What was difficult? What can I improve next week?',
            'Mini Flashcard: Q: What is the Feynman Technique? A: A method of learning by explaining a concept in simple terms, as if teaching it to someone else.',
            'Downloadable Weekly Study Planner PDF'
        ],
        tasks: [
            // Week 1
            { day: 1, task: 'Choose subject + set goals' }, { day: 2, task: '25m study + 5m break' }, { day: 3, task: 'Review notes with colors' }, { day: 4, task: 'Flashcards only' }, { day: 5, task: 'Pomodoro ×2' }, { day: 6, task: 'Short practice test' }, { day: 7, task: 'Journal & Relax' },
            // Week 2
            { day: 8, task: 'Use Feynman Technique' }, { day: 9, task: 'Rotate subjects AM/PM' }, { day: 10, task: '2 Pomodoros + note rewrite' }, { day: 11, task: 'Record audio summary' }, { day: 12, task: 'Use Feynman Technique' }, { day: 13, task: 'Rotate subjects' }, { day: 14, task: 'Review & Plan' },
            // Week 3
            { day: 15, task: '3 study blocks' }, { day: 16, task: 'Self-quiz' }, { day: 17, task: 'Mind map main topic' }, { day: 18, task: '3 study blocks' }, { day: 19, task: 'Self-quiz' }, { day: 20, task: 'Mind map main topic' }, { day: 21, task: 'Final review + checklist' },
        ]
    },
    {
        id: 'math-study-plan',
        title: 'Math Study Calendar (21-Day)',
        goal: 'Build a strong foundation in core math concepts and problem-solving skills.',
        tags: ['Learning', 'Math'],
        instructions: 'Start with 25-minute Pomodoro blocks. Focus on fundamentals like algebra and geometry, gradually moving to practice tests.',
        advanced: 'Use 90-minute study blocks. Add SAT-style timed tests and explain concepts to a peer or study group to solidify understanding.',
        enhancements: [
            'Daily Study Tip: Try explaining today\'s topic to an imaginary class. Teaching is the best test of mastery.',
            'End-of-Week Reflection: What went well in your studies? What was challenging? What can you improve next week?',
        ],
        tasks: [
            { day: 1, task: 'Set Goals' }, { day: 2, task: 'Basic Algebra' }, { day: 3, task: 'Quadratics' }, { day: 4, task: 'Fractions' }, { day: 5, task: 'Rest' }, { day: 6, task: 'Geometry' }, { day: 7, task: 'Review' },
            { day: 8, task: 'Equations' }, { day: 9, task: 'Graphs' }, { day: 10, task: 'Practice' }, { day: 11, task: 'Math Game' }, { day: 12, task: 'Logic Puzzles' }, { day: 13, task: 'Rest' }, { day: 14, task: 'Reflection' },
            { day: 15, task: 'Word Problems' }, { day: 16, task: 'Final Quiz' }, { day: 17, task: 'Flashcards' }, { day: 18, task: 'Proof Writing' }, { day: 19, task: 'Rest' }, { day: 20, task: 'Review' }, { day: 21, task: 'Celebrate' },
        ]
    },
    {
        id: 'coding-bootcamp-plan',
        title: 'Coding Bootcamp Study Calendar (21-Day)',
        goal: 'Master fundamental web development skills from HTML to deployment.',
        tags: ['Learning', 'Coding', 'Productivity'],
        instructions: 'Learn the basics of HTML, CSS, and JavaScript with short daily coding challenges. Progress from basic syntax to building and deploying small projects.',
        advanced: 'Build full apps using fetch, async/await, and GitHub deployment. Track bugs and performance metrics for each project.',
        enhancements: [
            'Daily Coding Tip: When debugging, explain the bug out loud as if teaching someone — this reveals assumptions.',
            'End-of-Week Reflection: What project milestone did I hit? What did I learn from bugs? What could I automate or reuse?',
        ],
        tasks: [
            { day: 1, task: 'HTML Basics' }, { day: 2, task: 'CSS Styling' }, { day: 3, task: 'JS Syntax' }, { day: 4, task: 'Code Challenge' }, { day: 5, task: 'Rest' }, { day: 6, task: 'JS Project' }, { day: 7, task: 'Review' },
            { day: 8, task: 'Git Commands' }, { day: 9, task: 'Responsive Design' }, { day: 10, task: 'APIs' }, { day: 11, task: 'Mini Project' }, { day: 12, task: 'Rest' }, { day: 13, task: 'Debugging' }, { day: 14, task: 'Reflection' },
            { day: 15, task: 'Async JS' }, { day: 16, task: 'Project Start' }, { day: 17, task: 'Build' }, { day: 18, task: 'Deploy' }, { day: 19, task: 'Polish' }, { day: 20, task: 'Demo' }, { day: 21, task: 'Celebrate' },
        ]
    },
    {
        id: 'language-learning-plan',
        title: 'Language Learning Calendar (21-Day)',
        goal: 'Develop foundational vocabulary, grammar, and conversational skills in a new language.',
        tags: ['Learning', 'Language'],
        instructions: 'Focus on 10-15 new words a day with audio listening and writing practice. Gradually build up to simple conversations and cultural notes.',
        advanced: 'Watch short videos, summarize them, and speak daily. Try mock conversation recordings to improve fluency and confidence.',
        enhancements: [
            'Daily Language Tip: Try to think in your target language during daily activities for passive immersion.',
            'End-of-Week Reflection: What words or phrases felt easiest? What grammar rule confused you? How can you get more listening/speaking time?',
        ],
        tasks: [
            { day: 1, task: 'Alphabet' }, { day: 2, task: 'Pronunciation' }, { day: 3, task: 'Basic Phrases' }, { day: 4, task: 'Numbers' }, { day: 5, task: 'Rest' }, { day: 6, task: 'Vocabulary' }, { day: 7, task: 'Review' },
            { day: 8, task: 'Verbs' }, { day: 9, task: 'Simple Sentences' }, { day: 10, task: 'Audio Listening' }, { day: 11, task: 'Practice Writing' }, { day: 12, task: 'Rest' }, { day: 13, task: 'Roleplay' }, { day: 14, task: 'Reflection' },
            { day: 15, task: 'Tenses' }, { day: 16, task: 'Conversation Drill' }, { day: 17, task: 'Cultural Notes' }, { day: 18, task: 'Exam Practice' }, { day: 19, task: 'Flashcards' }, { day: 20, task: 'Review' }, { day: 21, task: 'Celebrate' },
        ]
    },
];
