
import type { LucideIcon } from 'lucide-react';
import { BrainCircuit, BookOpen, Waves, Target, HeartPulse, Edit } from 'lucide-react';

export type CalendarDay = {
    day: number;
    icon: LucideIcon;
    prompt: string;
    description: string;
    toolType: 'embed' | 'link' | 'text';
    toolContent: string; // e.g., YouTube video ID, URL, or plain text
};

export const calendarContent: CalendarDay[] = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const prompts = [
        { icon: Edit, prompt: "Morning Freewrite", desc: "Write for 5 minutes without stopping.", type: 'text', content: "Use this space to clear your mind. What's on your mind right now? Don't judge, just write." },
        { icon: BrainCircuit, prompt: "Problem-Solving Prep", desc: "Visualize one challenge for today.", type: 'embed', content: 'L_LUpnjgPso' }, // Short focus meditation
        { icon: HeartPulse, prompt: "Energy Check-in", desc: "Scan your body for tension.", type: 'embed', content: 'aXfIaj1i4_s' }, // Body scan meditation
        { icon: Target, prompt: "Set Daily Intention", desc: "What is your #1 goal today?", type: 'text', content: "Clearly state the most important thing you want to accomplish. Be specific. Example: 'Finish the first draft of the report'." },
        { icon: Waves, prompt: "Mindful Break", desc: "Practice 2 minutes of calm breathing.", type: 'embed', content: 'inhl-hYfFzI' }, // 2 min breathwork
        { icon: BookOpen, prompt: "Weekly Review", desc: "What did you learn this week?", type: 'text', content: "List one win, one challenge, and one lesson from the past 7 days." },
        { icon: HeartPulse, prompt: "Rest & Recovery", desc: "Plan a non-work activity.", type: 'embed', content: '86sY_sZ2w5I' }, // Relaxing music
    ];
    const p = prompts[day % prompts.length];
    return {
        day: day,
        icon: p.icon,
        prompt: p.prompt,
        description: p.desc,
        toolType: p.type as 'embed' | 'link' | 'text',
        toolContent: p.content,
    };
});

export const getThemeForWeek = (date: Date) => {
    const week = Math.floor((date.getDate() - 1) / 7);
    const themes = [
        { theme: "Theme: Deep Work & Focus", description: "This week is dedicated to minimizing distractions and tackling your most important tasks." },
        { theme: "Theme: Planning & Strategy", description: "Focus on organizing your goals and creating clear action plans for the weeks ahead." },
        { theme: "Theme: Learning & Growth", description: "Dedicate time to learning new skills or reflecting on recent challenges to foster growth." },
        { theme: "Theme: Recovery & Wellness", description: "Prioritize rest, mindfulness, and activities that recharge your mental and physical batteries." }
    ];
    return themes[week % themes.length];
};

export const getDailyQuote = (date: Date) => {
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const quotes = [
        "The secret of getting ahead is getting started. – Mark Twain",
        "Your focus determines your reality. – Qui-Gon Jinn",
        "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb",
        "Well done is better than well said. – Benjamin Franklin",
        "It does not matter how slowly you go as long as you do not stop. – Confucius",
        "A goal without a plan is just a wish. – Antoine de Saint-Exupéry",
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit. – Aristotle"
    ];
    return quotes[dayOfYear % quotes.length];
};
