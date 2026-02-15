import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  BrainCircuit,
  Eye,
  Feather,
  HeartPulse,
  Leaf,
  MessageSquare,
  Smile,
  Target,
  Waves,
  CheckCircle,
  Lightbulb,
  Repeat,
  Sparkles,
  ClipboardCheck,
  ShieldQuestion,
  Search,
  Zap,
  HeartHandshake,
  Notebook,
} from 'lucide-react';

export type JournalCategory =
  | 'Notebook'
  | 'Growth & Challenge Reflection'
  | 'Goal & Identity Alignment'
  | 'Positivity & Strengths'
  | 'Emotion & Mood Processing'
  | 'Freeform Exploration';

export type HabitId = string;

export type HabitConfig = {
  id: HabitId;
  label: string;
  icon: LucideIcon;
  category: JournalCategory;
};

export const allHabits: Record<HabitId, HabitConfig> = {
  reflect_challenge: { id: 'reflect_challenge', label: 'Reflected on a challenge', icon: ShieldQuestion, category: 'Growth & Challenge Reflection' },
  learn_from_discomfort: { id: 'learn_from_discomfort', label: 'Learned from discomfort', icon: Zap, category: 'Growth & Challenge Reflection' },
  step_toward_goal: { id: 'step_toward_goal', label: 'Step toward goal', icon: Target, category: 'Goal & Identity Alignment' },
  note_gratitude: { id: 'note_gratitude', label: 'Noted gratitude', icon: Leaf, category: 'Positivity & Strengths' },
  name_emotion: { id: 'name_emotion', label: 'Labeled emotion', icon: MessageSquare, category: 'Emotion & Mood Processing' },
  freewrite: { id: 'freewrite', label: 'Freewrote 5 mins', icon: Feather, category: 'Freeform Exploration' },
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
  guidance: string;
}> = {
  'Notebook': {
    icon: Notebook,
    title: 'Notebook',
    purpose: "A blank canvas for your thoughts.",
    prompts: { daily: ["", "", ""], weekly: ["", "", ""], monthly: ["", "", ""] },
    guidance: "Use this space for anything you want.",
  },
  'Growth & Challenge Reflection': {
    icon: BrainCircuit,
    title: 'Growth & Challenge Reflection',
    purpose: "Reflect on difficulties and build resilience.",
    prompts: {
        daily: ["What challenge did you face today?", "What did you learn?", "What would you try differently?"],
        weekly: ["Weekly win?", "Weekly struggle?", "Adaptation strategy?"],
        monthly: ["Growth this month?", "Proudest moment?", "Next month goal?"],
    },
    guidance: "Focus on how you handled effort and learning.",
  },
  'Goal & Identity Alignment': {
    icon: Target,
    title: 'Goal & Identity Alignment',
    purpose: "Reinforce who you are becoming.",
    prompts: {
        daily: ["Priority today?", "Aligned value?", "Small step?"],
        weekly: ["Goal progress?", "Identity alignment?", "Response to obstacles?"],
        monthly: ["Identity evolution?", "Goal shifts?", "Next month commitment?"],
    },
    guidance: "Connect actions to core values.",
  },
  'Positivity & Strengths': {
    icon: Smile,
    title: 'Positivity & Strengths',
    purpose: "Reinforce optimism and self-efficacy.",
    prompts: {
        daily: ["What went well?", "Strength used?", "Current gratitude?"],
        weekly: ["Consistent strengths?", "Unexpected joy?", "Positive change?"],
        monthly: ["Top wins?", "Dominant strength?", "Self-view shift?"],
    },
    guidance: "Train your brain to see progress.",
  },
  'Emotion & Mood Processing': {
    icon: Waves,
    title: 'Emotion & Mood Processing',
    purpose: "Label and regulate emotional states.",
    prompts: {
        daily: ["Core emotion?", "The trigger?", "Management strategy?"],
        weekly: ["Emotional patterns?", "Better-than-expected response?", "Energy drainers?"],
        monthly: ["Emotional awareness growth?", "Alternate handle?", "Landscape shift?"],
    },
    guidance: "Reduce overload through naming.",
  },
  'Freeform Exploration': {
    icon: Feather,
    title: 'Freeform Exploration',
    purpose: "Unstructured thought expression.",
    prompts: {
        daily: ["Persistent thought?", "Avoided task?", "Expression focus?"],
        weekly: ["Recurring themes?", "Surprise insights?", "Realized but inactive?"],
        monthly: ["Ideas to revisit?", "Shifted beliefs?", "Mind's direction?"],
    },
    guidance: "No rules. No judgment.",
  },
};
