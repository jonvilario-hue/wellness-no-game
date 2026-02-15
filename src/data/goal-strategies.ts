
import type { LucideIcon } from "lucide-react";
import { ArrowLeftRight, CheckSquare, Clock, Eye, Gamepad, HelpCircle, Map, PieChart, ShieldAlert, Users, Target, Sparkles, Brain, Repeat, Pen, BookUp, GitBranch, BoxSelect, Palette, Image as ImageIcon, Link as LinkIcon, PenLine, FileQuestion, Pilcrow, Trophy, CalendarCheck, Lightbulb, BatteryCharging } from "lucide-react";

export type GoalStrategy = {
    id: 'backcasting' | 'woop' | 'smart' | 'identity' | 'okrs' | 'review_loop' | 'milestone_mapping' | 'pre_mortem' | 'energy_mapping' | 'gamified';
    name: string;
    description: string;
    icon: LucideIcon;
    steps: string[];
    useFor: string;
    prompts: {
        title: string;
        identity: string;
        description: string;
    };
};

export const goalStrategies: GoalStrategy[] = [
    {
        id: 'backcasting',
        name: 'Backcasting Strategy',
        description: 'Plan by imagining future success, then work backward to define milestones.',
        icon: ArrowLeftRight,
        steps: [
            "Visualize success 5 years from now.",
            "Work backward: what needed to happen in Year 4? Year 3? Month 6?",
            "Create milestones for each phase.",
            "Define tasks to reach the next phase forward."
        ],
        useFor: 'Big life shifts, creative dreams, career pivots',
        prompts: {
            title: "What is the ultimate vision 5 years from now?",
            identity: "Who have you become once this is achieved?",
            description: "Describe what your life looks like in this successful future."
        }
    },
    {
        id: 'woop',
        name: 'WOOP Strategy',
        description: 'A psychology-backed method to handle obstacles with mental planning.',
        icon: ShieldAlert,
        steps: [
            "<strong>W</strong>ish: Define your most important wish.",
            "<strong>O</strong>utcome: Visualize the best possible outcome.",
            "<strong>O</strong>bstacle: Identify one key internal obstacle.",
            "<strong>P</strong>lan: Create an 'If-Then' plan for that obstacle."
        ],
        useFor: 'Internal blockers, self-sabotage, goal resistance',
        prompts: {
            title: "What is your most important Wish?",
            identity: "Who are you when this Wish is fulfilled?",
            description: "What is the best possible Outcome, and what is the primary internal Obstacle?"
        }
    },
    {
        id: 'smart',
        name: 'SMART Goals',
        description: 'A system to define goals clearly by making them Specific, Measurable, Achievable, Relevant, and Time-bound.',
        icon: CheckSquare,
        steps: [
            "<strong>S</strong>pecific: Clearly define what you want to accomplish.",
            "<strong>M</strong>easurable: How will you track progress?",
            "<strong>A</strong>chievable: Is the goal realistic?",
            "<strong>R</strong>elevant: Does it align with your broader objectives?",
            "<strong>T</strong>ime-bound: When will you achieve it?"
        ],
        useFor: 'Concrete goals, task planning, accountability',
        prompts: {
            title: "What is your Specific goal?",
            identity: "Why is this goal Relevant to you?",
            description: "How is this goal Measurable and what is the Time-bound deadline?"
        }
    },
    {
        id: 'identity',
        name: 'Identity-Based Goals',
        description: 'Anchor goals to your evolving self-image rather than just outcomes.',
        icon: Users,
        steps: [
            "Frame: Frame as 'I want to become the kind of person who...'",
            "Define habits: Define habits that reinforce this identity.",
            "Review weekly: Review weekly: 'Is this helping me become that person?'",
            "Celebrate: Celebrate small wins as identity confirmations."
        ],
        useFor: 'Creative, fitness, discipline, lifestyle goals',
        prompts: {
            title: "What kind of person are you trying to become?",
            identity: "I am becoming someone who...",
            description: "What are the small, daily proofs of this new identity?"
        }
    },
    {
        id: 'okrs',
        name: 'OKRs (Objectives & Key Results)',
        description: 'A system to track ambitious goals through measurable outputs.',
        icon: PieChart,
        steps: [
            "<strong>O</strong>bjective: Write your ambitious, qualitative goal.",
            "<strong>K</strong>ey <strong>R</strong>esults: Create 3-5 measurable outputs.",
            "Check in weekly on KR progress.",
            "Mark Objective complete when most KRs are done."
        ],
        useFor: 'Product launches, skills, major achievements',
        prompts: {
            title: "What is your main Objective?",
            identity: "Who are you when this objective is met?",
            description: "List 3-5 measurable Key Results to track this objective."
        }
    },
    {
        id: 'review_loop',
        name: 'Weekly Review Loop',
        description: 'A habit of reviewing weekly progress and correcting course regularly.',
        icon: Clock,
        steps: [
            "What were your wins this week?",
            "What felt stuck or didn't move?",
            "What tasks should be removed or reframed?",
            "What's the top priority for next week?"
        ],
        useFor: 'Productivity, course-correction, momentum',
        prompts: {
            title: "What is the primary focus for this review period?",
            identity: "Who do you want to be at the end of this cycle?",
            description: "Summarize your recent wins, stalls, and lessons learned."
        }

    },
    {
        id: 'milestone_mapping',
        name: 'Milestone Mapping',
        description: 'A process of breaking long-term goals into mid-sized achievement markers.',
        icon: Map,
        steps: [
            "Define the long-term goal.",
            "Add 3-7 milestones as natural checkpoints.",
            "Write 3-5 tasks under each milestone.",
            "Add rough dates or checkpoints."
        ],
        useFor: 'All goal types, especially multi-month projects',
        prompts: {
            title: "What is the ultimate destination or outcome?",
            identity: "What skills will you have after completing these milestones?",
            description: "Break this goal into 3-7 natural checkpoints or phases."
        }
    },
    {
        id: 'pre_mortem',
        name: 'Obstacle Pre-Mortem',
        description: 'Think ahead to what might go wrong and plan around it.',
        icon: HelpCircle,
        steps: [
            "Predict: Imagine this goal has failed. Why?",
            "Analyze: Write out 3-5 specific reasons for the failure.",
            "Prevent: Create a prevention or recovery plan for each risk.",
            "Review: Set a reminder to check in on these risks."
        ],
        useFor: 'High-stakes or habit-breaking goals',
        prompts: {
            title: "What is the project you want to protect from failure?",
            identity: "Who are you when you've successfully navigated these obstacles?",
            description: "Imagine it's 3 months from now and this failed. What went wrong?"
        }
    },
    {
        id: 'energy_mapping',
        name: 'Energy Mapping',
        description: 'Align your goals with the times you have the most energy and focus.',
        icon: Eye,
        steps: [
            "Observe: Track your energy and focus levels for 2-3 days.",
            "Tag Tasks: Categorize your tasks as 'deep' or 'shallow'.",
            "Schedule: Align deep work with your peak energy windows.",
            "Protect: Defend your high-energy times from distractions."
        ],
        useFor: 'Focus-intensive, creative, or strategic goals',
        prompts: {
            title: "What major task requires your best energy?",
            identity: "Who are you when you work in sync with your energy?",
            description: "Map your most important tasks to your peak energy windows."
        }
    },
    {
        id: 'gamified',
        name: 'Gamified Progress',
        description: 'Turn your progress into a game with levels, streaks, and rewards.',
        icon: Gamepad,
        steps: [
            "Challenge: Define your goal as a 'Level 1' challenge.",
            "Level Up: Frame every milestone as a level up.",
            "Streaks: Keep a streak counter for daily/weekly progress.",
            "Rewards: Create personal rewards for each phase."
        ],
        useFor: 'Creative people, students, neurodivergent minds',
        prompts: {
            title: "What is the 'game' you are trying to win?",
            identity: "What is the 'final boss' or 'character class' you are building towards?",
            description: "Define the levels, streaks, and rewards for this quest."
        }
    }
];
