
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  BrainCircuit,
  Calendar,
  Coffee,
  Eye,
  Feather,
  HeartPulse,
  Leaf,
  MessageSquare,
  Smile,
  Sparkles,
  Target,
  Waves,
  Wind,
  Bed,
} from 'lucide-react';

export type JournalCategory =
  | 'Growth & Challenge Reflection'
  | 'Goal & Identity Alignment'
  | 'Positivity & Strengths'
  | 'Emotion & Mood Processing'
  | 'Freeform Exploration';

export type HabitId =
  | 'focus'
  | 'meditation'
  | 'rest'
  | 'planning'
  | 'visualization'
  | 'calendar'
  | 'exercise'
  | 'journaling'
  | 'sleep'
  | 'social'
  | 'breathwork'
  | 'distraction';

export type Habit = {
  id: HabitId;
  label: string;
  icon: LucideIcon;
};

export const allHabits: Record<HabitId, Habit> = {
  focus: { id: 'focus', label: 'Focus Blocks', icon: BrainCircuit },
  meditation: { id: 'meditation', label: 'Meditation', icon: Wind },
  rest: { id: 'rest', label: 'Rest', icon: Coffee },
  planning: { id: 'planning', label: 'Planning', icon: Target },
  visualization: { id: 'visualization', label: 'Visualization', icon: Eye },
  calendar: { id: 'calendar', label: 'Calendar Review', icon: Calendar },
  exercise: { id: 'exercise', label: 'Exercise', icon: HeartPulse },
  journaling: { id: 'journaling', label: 'Journaling', icon: BookOpen },
  sleep: { id: 'sleep', label: 'Good Sleep', icon: Bed },
  social: { id: 'social', label: 'Social Time', icon: MessageSquare },
  breathwork: { id: 'breathwork', label: 'Breathwork', icon: Leaf },
  distraction: { id: 'distraction', label: 'Limited Distractions', icon: Sparkles },
};

export const journalConfig: Record<JournalCategory, {
  icon: LucideIcon;
  title: JournalCategory;
  purpose: string;
  prompts: {
    daily: [string, string, string];
    weekly: [string, string, string];
    monthly: [string, string, string];
  };
  affirmationPrompt: string;
  guidance: string;
  suggestedTags: string;
  habits: HabitId[];
}> = {
  'Growth & Challenge Reflection': {
    icon: BrainCircuit,
    title: 'Growth & Challenge Reflection',
    purpose: "Reflect on difficulties, process effort, and build resilience.",
    prompts: {
        daily: ["What challenge or difficulty did you face today?", "What did you learn from how you handled it?", "What would you try differently if faced with it again?"],
        weekly: ["What was the most mentally or emotionally effortful part of this week?", "How did you grow or adapt when things got hard?", "What strategy or mindset helped you the most?"],
        monthly: ["What’s changed in how you respond to pressure or setbacks?", "What challenge are you most proud of handling?", "What mindset do you want to carry forward next month?"],
    },
    affirmationPrompt: "Write one sentence affirming your resilience.",
    guidance: "Use this space to reflect on challenges you encountered. Focus on how you handled them, what you learned, or how you might grow from them.",
    suggestedTags: "#resilience, #learning, #problem-solving, #setback, #growth",
    habits: ['focus', 'meditation', 'rest']
  },
  'Goal & Identity Alignment': {
    icon: Target,
    title: 'Goal & Identity Alignment',
    purpose: "Clarify intentions, set meaningful goals, and reinforce identity-aligned actions.",
    prompts: {
        daily: ["What’s your #1 priority today?", "What value does it reflect?", "What small step will move you closer?"],
        weekly: ["What progress did you make toward your goals this week?", "Were your actions aligned with who you want to become?", "What obstacles came up — and how did you respond?"],
        monthly: ["What identity or value guided you this month?", "How are your long-term goals evolving?", "What would you like to commit to for the month ahead?"],
    },
    affirmationPrompt: "Write an affirmation that reflects who you’re becoming.",
    guidance: "Use this section to connect your actions to what matters most. Define your goal clearly and focus on next steps that reflect your values.",
    suggestedTags: "#goal, #clarity, #values, #planning, #becoming",
    habits: ['planning', 'visualization', 'calendar']
  },
  'Positivity & Strengths': {
    icon: Smile,
    title: 'Positivity & Strengths',
    purpose: "Reinforce gratitude, recognize progress, and increase optimism and self-efficacy.",
    prompts: {
        daily: ["What went well today?", "What strength or habit helped you most?", "What are you grateful for right now?"],
        weekly: ["What strengths did you consistently use this week?", "What’s something that brought you unexpected joy?", "What positive change have you noticed in yourself?"],
        monthly: ["What progress or wins are you most proud of this month?", "What strengths showed up the most?", "What has improved about how you view yourself?"],
    },
    affirmationPrompt: "Write an affirmation that reinforces that strength.",
    guidance: "Reflect on what’s working, even if small. Use this space to train your brain to recognize positive progress and personal strengths.",
    suggestedTags: "#gratitude, #small-wins, #confidence, #strength",
    habits: ['exercise', 'journaling', 'sleep', 'social']
  },
  'Emotion & Mood Processing': {
    icon: Waves,
    title: 'Emotion & Mood Processing',
    purpose: "Label and regulate emotional states, reduce cognitive overload, and clarify patterns.",
    prompts: {
        daily: ["What emotion stood out to you today?", "What caused or triggered it?", "What helped (or could help) you manage it?"],
        weekly: ["What emotional patterns showed up this week?", "When did you respond to a feeling better than you expected?", "What emotions drained your energy — and why?"],
        monthly: ["Which emotions have you become more aware of or skilled at managing?", "What emotion would you like to handle differently in the future?", "How has your emotional landscape shifted this month?"],
    },
    affirmationPrompt: "What do you need right now — or what’s a kind thing to say to yourself?",
    guidance: "Use this space to name your emotions and reflect on their source. This helps reduce overwhelm and improve clarity.",
    suggestedTags: "#emotion, #stress, #processing, #mindfulness, #calm",
    habits: ['breathwork', 'rest', 'journaling', 'distraction']
  },
  'Freeform Exploration': {
    icon: Feather,
    title: 'Freeform Exploration',
    purpose: "Allow open, unstructured thought expression with optional guidance.",
    prompts: {
        daily: ["What thought or idea won’t leave your mind today?", "What are you avoiding or procrastinating on?", "What do you need to express without judgment?"],
        weekly: ["What recurring themes or patterns are showing up in your thoughts?", "What surprises or unexpected insights came to you this week?", "What’s one thing you’ve realized but haven’t acted on?"],
        monthly: ["What big ideas or reflections are worth revisiting?", "What’s shifted in your beliefs, priorities, or curiosities?", "What direction is your mind pulling you toward right now?"],
    },
    affirmationPrompt: "Write an affirmation for the day.",
    guidance: "Use this space freely. No structure required. You can explore ideas, reflect on the day, or just release thoughts.",
    suggestedTags: "#thought-dump, #freewrite, #creative, #uncategorized",
    habits: []
  },
};
