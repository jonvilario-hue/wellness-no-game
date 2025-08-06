
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
        tasks: [
            // Week 1: Wake up, Stretch, Hydrate
            { day: 1, task: 'Wake up 15m early' }, { day: 2, task: 'Stretch' }, { day: 3, task: 'Hydrate' }, { day: 4, task: 'Wake up 15m early' }, { day: 5, task: 'Stretch' }, { day: 6, task: 'Hydrate' }, { day: 7, task: 'Review Week 1' },
            // Week 2: Add Journaling
            { day: 8, task: 'Wake, Stretch, Hydrate, Journal' }, { day: 9, task: 'Wake, Stretch, Hydrate, Journal' }, { day: 10, task: 'Wake, Stretch, Hydrate, Journal' }, { day: 11, task: 'Wake, Stretch, Hydrate, Journal' }, { day: 12, task: 'Wake, Stretch, Hydrate, Journal' }, { day: 13, task: 'Wake, Stretch, Hydrate, Journal' }, { day: 14, task: 'Review Week 2' },
            // Week 3: Add Exercise
            { day: 15, task: 'Routine + Exercise' }, { day: 16, task: 'Routine + Exercise' }, { day: 17, task: 'Routine + Exercise' }, { day: 18, task: 'Routine + Exercise' }, { day: 19, task: 'Routine + Exercise' }, { day: 20, task: 'Routine + Exercise' }, { day: 21, task: 'Plan Next Steps' },
        ]
    },
    {
        id: 'digital-detox',
        title: 'Digital Detox Calendar (14-Day)',
        goal: 'Reduce screen time and reclaim focus.',
        tags: ['Focus', 'Digital Wellness'],
        instructions: 'Follow the daily focus. The goal is to create intentional time away from screens to let your mind recover.',
        advanced: 'Commit to fully "unplugged weekends" with no social media or non-essential screen use. Use app time-limiters during the week.',
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
];
