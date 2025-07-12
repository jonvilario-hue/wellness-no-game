
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
  templateFields: [string, string, string, string];
  guidance: string;
  suggestedTags: string;
  habits: HabitId[];
}> = {
  'Growth & Challenge Reflection': {
    icon: BrainCircuit,
    title: 'Growth & Challenge Reflection',
    purpose: "Reflect on difficulties, process effort, and build resilience.",
    templateFields: [
      "What challenge or difficulty did you face today?",
      "How did you respond or feel in the moment?",
      "What helped you get through it — or what might help next time?",
      "Write one sentence affirming your resilience."
    ],
    guidance: "Use this space to reflect on challenges you encountered. Focus on how you handled them, what you learned, or how you might grow from them.",
    suggestedTags: "#resilience, #learning, #problem-solving, #setback, #growth",
    habits: ['focus', 'meditation', 'rest']
  },
  'Goal & Identity Alignment': {
    icon: Target,
    title: 'Goal & Identity Alignment',
    purpose: "Clarify intentions, set meaningful goals, and reinforce identity-aligned actions.",
    templateFields: [
      "What is a goal you're working toward?",
      "Why does it matter to you?",
      "What’s one small next step?",
      "Write an affirmation that reflects who you’re becoming."
    ],
    guidance: "Use this section to connect your actions to what matters most. Define your goal clearly and focus on next steps that reflect your values.",
    suggestedTags: "#goal, #clarity, #values, #planning, #becoming",
    habits: ['planning', 'visualization', 'calendar']
  },
  'Positivity & Strengths': {
    icon: Smile,
    title: 'Positivity & Strengths',
    purpose: "Reinforce gratitude, recognize progress, and increase optimism and self-efficacy.",
    templateFields: [
      "Name one thing that went well today.",
      "What strength did you use or notice in yourself?",
      "What are you grateful for?",
      "Write an affirmation that reinforces that strength."
    ],
    guidance: "Reflect on what’s working, even if small. Use this space to train your brain to recognize positive progress and personal strengths.",
    suggestedTags: "#gratitude, #small-wins, #confidence, #strength",
    habits: ['exercise', 'journaling', 'sleep', 'social']
  },
  'Emotion & Mood Processing': {
    icon: Waves,
    title: 'Emotion & Mood Processing',
    purpose: "Label and regulate emotional states, reduce cognitive overload, and clarify patterns.",
    templateFields: [
      "What emotion are you feeling right now?",
      "What triggered it?",
      "What’s another way to view this situation?",
      "What do you need right now — or what’s a kind thing to say to yourself?"
    ],
    guidance: "Use this space to name your emotions and reflect on their source. This helps reduce overwhelm and improve clarity.",
    suggestedTags: "#emotion, #stress, #processing, #mindfulness, #calm",
    habits: ['breathwork', 'rest', 'journaling', 'distraction']
  },
  'Freeform Exploration': {
    icon: Feather,
    title: 'Freeform Exploration',
    purpose: "Allow open, unstructured thought expression with optional guidance.",
    templateFields: [
      "Write whatever’s on your mind.",
      "Want inspiration? Try this: What thought keeps looping lately?",
      "Or this: What’s something you’ve been avoiding?",
      "Write an affirmation for the day."
    ],
    guidance: "Use this space freely. No structure required. You can explore ideas, reflect on the day, or just release thoughts.",
    suggestedTags: "#thought-dump, #freewrite, #creative, #uncategorized",
    habits: []
  },
};

    