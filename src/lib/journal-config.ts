
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
        daily: ["What was the hardest part of today?", "What helped you get through it?", "What can you try differently tomorrow?"],
        weekly: ["What recurring challenges did you face?", "What strategies or mindsets helped most?", "What did you learn about your limits and strengths?"],
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
        daily: ["What’s your #1 priority today?", "What value does it serve?", "One small step you will take?"],
        weekly: ["Which goals moved forward?", "What obstacles came up?", "How can your values guide your actions next week?"],
        monthly: ["What identity are you growing into?", "Are your goals aligned with that?", "What will you let go of or focus on next?"],
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
        daily: ["What went well today?", "What did you do that mattered?", "What are you grateful for?"],
        weekly: ["What strengths did you use this week?", "What unexpected joy or win showed up?", "What are you proud of?"],
        monthly: ["What patterns of progress are emerging?", "What strengths do you want to deepen?", "What are you thankful for that changed you this month?"],
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
        daily: ["What emotion was strongest today?", "What triggered it?", "What helped or could help you manage it?"],
        weekly: ["Which emotions showed up most?", "What patterns are forming?", "How do you want to respond differently next week?"],
        monthly: ["What emotions are you handling better?", "Where are you still reactive or avoidant?", "What emotional need deserves more care?"],
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
        daily: ["What thought won’t leave your mind?", "What would help you feel more grounded today?", "Write whatever comes to mind..."],
        weekly: ["What themes keep showing up in your entries?", "What surprises came up in your thinking?", "Free write about your week..."],
        monthly: ["What shifts have occurred in your beliefs, ideas, or focus?", "What creative or unexpected thoughts are worth revisiting?", "Reflect on the month as a whole..."],
    },
    affirmationPrompt: "Write an affirmation for the day.",
    guidance: "Use this space freely. No structure required. You can explore ideas, reflect on the day, or just release thoughts.",
    suggestedTags: "#thought-dump, #freewrite, #creative, #uncategorized",
    habits: []
  },
};
