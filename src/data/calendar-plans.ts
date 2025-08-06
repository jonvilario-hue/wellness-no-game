
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
        instructions: 'Start by waking up 15 mins earlier. Each week, add the next habit to your routine. Focus on consistency over perfection.',
        advanced: 'Follow the 5 AM club model: 20 mins of high-intensity exercise, 20 mins of journaling/planning, and 20 mins of learning. Add cold showers for an extra boost.',
        enhancements: [
            'Daily Reflection Question: “What went well this morning?”',
            'Add a Mood Check Emoji row below the calendar for visual tracking (☀️🌥️🌧️).',
            'Link to a printable PDF version for offline use.'
        ],
        tasks: [
            // Week 1: Wake up, Stretch, Hydrate
            { day: 1, task: 'Wake up 15m early' }, { day: 2, task: 'Stretch' }, { day: 3, task: 'Hydrate' }, { day: 4, task: 'Wake up 15m early' }, { day: 5, task: 'Stretch' }, { day: 6, task: 'Hydrate' }, { day: 7, task: 'Review Week 1' },
            // Week 2: Add Journaling
            { day: 8, task: 'Routine + Journal' }, { day: 9, task: 'Routine + Journal' }, { day: 10, task: 'Routine + Journal' }, { day: 11, task: 'Routine + Journal' }, { day: 12, task: 'Routine + Journal' }, { day: 13, task: 'Routine + Journal' }, { day: 14, task: 'Review Week 2' },
            // Week 3: Add Exercise
            { day: 15, task: 'Routine + Exercise' }, { day: 16, task: 'Routine + Exercise' }, { day: 17, task: 'Routine + Exercise' }, { day: 18, task: 'Routine + Exercise' }, { day: 19, task: 'Routine + Exercise' }, { day: 20, task: 'Routine + Exercise' }, { day: 21, task: 'Plan Next Steps' },
        ]
    },
    {
        id: 'digital-detox',
        title: 'Digital Detox Challenge (14-Day)',
        goal: 'Reduce screen time and reclaim focus.',
        tags: ['Focus', 'Digital Wellness'],
        instructions: 'Follow the daily focus. The goal is to create intentional time away from screens to let your mind recover.',
        advanced: 'Commit to fully "unplugged weekends" with no social media or non-essential screen use. Use app time-limiters during the week.',
        enhancements: [
            'Daily prompt: “What did you notice with less screen time today?”',
            'Static infographic: Average screen time reduction = +3 hours per week productivity.',
            'Checklist of digital clutter items (unsubscribe from newsletters, clean inbox, etc.).'
        ],
        tasks: [
            // Week 1
            { day: 1, task: 'No phone in bed' }, { day: 2, task: '1hr social media fast' }, { day: 3, task: 'No phone in bed' }, { day: 4, task: '1hr social media fast' }, { day: 5, task: 'No phone in bed' }, { day: 6, task: 'Read a physical book' }, { day: 7, task: 'Review screen time report' },
            // Week 2
            { day: 8, task: 'Screen-free evening' }, { day: 9, task: 'Digital-free morning' }, { day: 10, task: 'Screen-free evening' }, { day: 11, task: 'Digital-free morning' }, { day: 12, task: 'Screen-free evening' }, { day: 13, task: 'Go for a walk without phone' }, { day: 14, task: 'Plan ongoing habits' },
        ]
    },
    {
        id: 'focus-sprint',
        title: 'Focus Builder: Deep Work Sprint (14-Day)',
        goal: 'Build concentration and achieve flow states.',
        tags: ['Focus', 'Productivity'],
        instructions: 'Dedicate specific time each day to uninterrupted, single-task focus. Start with two 25-minute Pomodoro sessions and increase the duration in week 2.',
        advanced: 'Schedule full 90-minute flow sessions. Prepare the day before with a dopamine detox (reducing high-stimulation activities) to increase your ability to focus.',
        enhancements: [
            'Mini Journal prompt: “How distracted were you today?” [1–5 scale emoji: 🎯🔥🤔💨🐿️].',
            'Include a “Flow Song” suggestion row for music-based focus.',
            'Add links to printable focus timer templates or a no-JS Pomodoro timer embed.'
        ],
        tasks: [
            // Week 1
            { day: 1, task: '2x25min Pomodoro' }, { day: 2, task: '2x25min Pomodoro' }, { day: 3, task: '2x25min Pomodoro' }, { day: 4, task: '2x25min Pomodoro' }, { day: 5, task: '2x25min Pomodoro' }, { day: 6, task: 'Rest' }, { day: 7, task: 'Review & Plan' },
            // Week 2
            { day: 8, task: '2x50min Deep Work' }, { day: 9, task: '2x50min Deep Work' }, { day: 10, task: '2x50min Deep Work' }, { day: 11, task: '2x50min Deep Work' }, { day: 12, task: '2x50min Deep Work' }, { day: 13, task: 'Rest' }, { day: 14, task: 'Evaluate Focus' },
        ]
    },
    {
        id: 'sleep-optimization',
        title: 'Sleep Optimization (14-Day)',
        goal: 'Improve sleep quality and establish a healthy rhythm.',
        tags: ['Wellness', 'Health', 'Recovery'],
        instructions: 'Introduce one new habit every few days to gently build a powerful wind-down routine that signals to your body it\'s time for deep rest.',
        advanced: 'Follow a strict circadian alignment protocol: aim for morning sunlight exposure within 30 minutes of waking and use blue-light filtering software/glasses after sunset.',
        enhancements: [
            'Static Sleep Tracker: HTML table with fields for “Sleep Time,” “Wake Time,” “Rest Quality”.',
            'Add a “Wind-Down Playlist” suggestion.',
            'Include “Caffeine cut-off” and blue light cutoff reminders as icons on the calendar.'
        ],
        tasks: [
            // Week 1
            { day: 1, task: 'Set consistent bedtime' }, { day: 2, task: 'Consistent bedtime' }, { day: 3, task: 'Consistent bedtime' }, { day: 4, task: 'Consistent bedtime' }, { day: 5, task: 'Add: No screens 1hr before bed' }, { day: 6, task: 'Add: No screens 1hr before bed' }, { day: 7, task: 'Add: No screens 1hr before bed' },
            // Week 2
            { day: 8, task: 'Add: Wind-down routine' }, { day: 9, task: 'Wind-down routine' }, { day: 10, task: 'Wind-down routine' }, { day: 11, task: 'Wind-down routine' }, { day: 12, task: 'Add: Journal sleep score' }, { day: 13, task: 'Journal sleep score' }, { day: 14, task: 'Review sleep data' },
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
            { day: 1, task: 'Clean computer desktop' },
            { day: 2, task: 'Inbox Zero on email' },
            { day: 3, task: 'Declutter one drawer' },
            { day: 4, task: 'Clear one countertop' },
            { day: 5, task: 'Organize junk mail pile' },
            { day: 6, task: 'Delete unused apps' },
            { day: 7, task: 'Tidy a single shelf' },
            { day: 8, task: 'Review subscriptions' },
            { day: 9, task: 'Clear out medicine cabinet' },
            { day: 10, task: 'Plan next declutter area' },
        ]
    },
    {
        id: 'habit-stacking',
        title: 'Habit Stacking Challenge (21-Day)',
        goal: 'Layer small habits onto existing routines to make them stick.',
        tags: ['Productivity', 'Behavioral Science'],
        instructions: 'Based on James Clear’s "Atomic Habits." Attach a new, small habit to a routine you already do without thinking.',
        advanced: 'Create "habit chains" where one stacked habit triggers the next, creating a cascade of productive actions with minimal willpower.',
        tasks: [
            { day: 1, task: 'After brushing teeth, state 1 gratitude.' }, { day: 2, task: 'Gratitude after brushing' }, { day: 3, task: 'Gratitude after brushing' }, { day: 4, task: 'Gratitude after brushing' }, { day: 5, task: 'Gratitude after brushing' }, { day: 6, task: 'Gratitude after brushing' }, { day: 7, task: 'Review Week 1' },
            { day: 8, task: 'Add: 1-min breathwork after coffee' }, { day: 9, task: 'Habit Stack 1 & 2' }, { day: 10, task: 'Habit Stack 1 & 2' }, { day: 11, task: 'Habit Stack 1 & 2' }, { day: 12, task: 'Habit Stack 1 & 2' }, { day: 13, task: 'Habit Stack 1 & 2' }, { day: 14, task: 'Review Week 2' },
            { day: 15, task: 'Add: Review goals after lunch' }, { day: 16, task: 'Habit Stack 1, 2, & 3' }, { day: 17, task: 'Habit Stack 1, 2, & 3' }, { day: 18, task: 'Habit Stack 1, 2, & 3' }, { day: 19, task: 'Habit Stack 1, 2, & 3' }, { day: 20, task: 'Habit Stack 1, 2, & 3' }, { day: 21, task: 'Plan next habit stack' },
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
            { day: 8, task: '30s Jumping Jacks' }, { day: 9, task: '1m Wall Sit' }, { day: 10, task: '10 Squats' }, { day: 11, task: '30s High Knees' }, { day: 12, task: '10 Push-ups' }, { day: 13, task: '1m Plank' }, { day: 14, task: 'Rest/Stretch' },
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
];

    