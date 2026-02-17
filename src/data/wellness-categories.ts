
import { 
    Dumbbell, StretchHorizontal, Zap, Sunrise, Wind, 
    Brain, Shield, HeartHandshake, type LucideIcon,
    Wallet, Utensils, TrendingUp, Apple, Waves
} from "lucide-react";
import type { ExerciseCategory, MindfulnessCategory } from "./exercises";

export type WellnessCategoryDetails = {
    title: string;
    icon: LucideIcon;
    purpose: string;
    useWhen: string[];
    includes: string[];
    tagline: string;
};

export const movementCategoryDetails: Record<ExerciseCategory, WellnessCategoryDetails> = {
    'Mind-Body': {
        title: 'Mind-Body',
        icon: Waves,
        purpose: 'Integrate movement with breath and mindfulness to improve flow, balance, and centeredness.',
        useWhen: ['Seeking mental clarity', 'Daily maintenance', 'Active recovery'],
        includes: ['Yoga Flows', 'Tai Chi Forms'],
        tagline: 'Flow with intention.'
    },
    'Stretching': {
        title: 'Stretching',
        icon: StretchHorizontal,
        purpose: 'Restore ease of movement in areas of tension from sitting, stress, or inactivity.',
        useWhen: ['After long work sessions', 'First thing in the morning'],
        includes: ['Neck & Shoulder Release', 'Hip Openers'],
        tagline: 'Loosen up. Move freely.'
    },
    'Strength': {
        title: 'Strength',
        icon: Dumbbell,
        purpose: 'Build support for your daily posture, balance, and energy.',
        useWhen: ['Recovering from fatigue', 'Sustainable strength'],
        includes: ['Wall Push-ups', 'Core Awakening'],
        tagline: 'Build a better base.'
    },
    'Energizer': {
        title: 'Energizer',
        icon: Zap,
        purpose: 'Reboot your brain and body in under 2 minutes.',
        useWhen: ['Feeling sluggish', 'Mid-afternoon crash'],
        includes: ['1-Min High Knees', 'Shadow Boxing'],
        tagline: 'Get fired up—fast.'
    },
    'Wakeup & Wind-Down': {
        title: 'Wakeup & Wind-Down',
        icon: Sunrise,
        purpose: 'Regulate your circadian rhythm with slow, breath-guided movement.',
        useWhen: ['Starting your morning', 'Preparing for sleep'],
        includes: ['Morning Mobility Flow', 'Pre-Bedtime Stretch'],
        tagline: 'Begin and end with presence.'
    }
};

export const stillnessCategoryDetails: Record<MindfulnessCategory, WellnessCategoryDetails> = {
    'Breathwork': {
        title: 'Breathwork',
        icon: Wind,
        purpose: 'Train your breath to influence your nervous system.',
        useWhen: ['Feeling anxious', 'Preparing to sleep'],
        includes: ['Box Breathing', '4-7-8 Breath'],
        tagline: 'Your breath is your remote control.'
    },
    'Clarity & Focus': {
        title: 'Clarity & Focus',
        icon: Brain,
        purpose: 'Reduce cognitive clutter and re-engage with purpose.',
        useWhen: ['Scattered brain', 'Mid-task transitions'],
        includes: ['Two-Minute Reset', 'Focus Visualization'],
        tagline: 'Clear mind, calm drive.'
    },
    'Grounding & Safety': {
        title: 'Grounding & Safety',
        icon: Shield,
        purpose: 'Support users in feeling safe in their body during stress.',
        useWhen: ['Panic or overload', 'Feeling disconnected'],
        includes: ['5-4-3-2-1 Senses', 'Nature Visualization'],
        tagline: 'Come home to yourself.'
    },
    'Self-Compassion': {
        title: 'Self-Compassion',
        icon: HeartHandshake,
        purpose: 'Cultivate emotional resilience through kindness.',
        useWhen: ['Burnout', 'Inner critic'],
        includes: ['Loving-Kindness Meditation', 'Journaling Prompts'],
        tagline: 'Be gentle with the one inside.'
    }
};

export const financialCategoryDetails: Record<string, WellnessCategoryDetails> = {
    'Tracking': {
        title: 'Financial Health',
        icon: Wallet,
        purpose: 'Manage your resources to reduce survival stress and build future freedom.',
        useWhen: ['Payday', 'Making discretionary purchases', 'Monthly reviews'],
        includes: ['Expense Logging', 'Budget Setting', 'Bill Reminders'],
        tagline: 'Resource management is stress management.'
    }
};

export const nutritionCategoryDetails: Record<string, WellnessCategoryDetails> = {
    'Fueling': {
        title: 'Nutrition Lab',
        icon: Utensils,
        purpose: 'Optimize your intake for cognitive performance and physical recovery.',
        useWhen: ['After meals', 'Planning your week', 'Energy crashes'],
        includes: ['Calorie & Macro Tracking', 'Water Intake', 'Weight Trajectory'],
        tagline: 'Fuel the polymath within.'
    }
};
