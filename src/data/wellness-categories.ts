
import { Dumbbell, StretchHorizontal, Zap, Sunrise, Wind, Brain, Shield, HeartHandshake, type LucideIcon } from "lucide-react";
import type { ExerciseCategory, MindfulnessCategory } from "./exercises";

export type WellnessCategoryDetails = {
    title: ExerciseCategory | MindfulnessCategory;
    icon: LucideIcon;
    purpose: string;
    useWhen: string[];
    includes: string[];
    tagline: string;
};

export const movementCategoryDetails: Record<ExerciseCategory, WellnessCategoryDetails> = {
    'Stretching': {
        title: 'Stretching',
        icon: StretchHorizontal,
        purpose: 'Restore ease of movement in areas of tension from sitting, stress, or inactivity. Helps improve joint range of motion and reduce pain or stiffness.',
        useWhen: ['After long work sessions', 'First thing in the morning', 'Before/after workouts'],
        includes: ['Neck & Shoulder Release', 'Hip Openers', 'Thoracic Spine Rotations'],
        tagline: 'Loosen up. Move freely.'
    },
    'Strength': {
        title: 'Strength',
        icon: Dumbbell,
        purpose: 'Build support for your daily posture, balance, and energy. Low-impact movements that strengthen without strain.',
        useWhen: ['Recovering from fatigue', 'Wanting sustainable strength', 'Fixing imbalances'],
        includes: ['Wall Push-ups', 'Single-Leg Balance', 'Core Awakening'],
        tagline: 'Build a better base.'
    },
    'Energizer': {
        title: 'Energizer',
        icon: Zap,
        purpose: 'Reboot your brain and body in under 2 minutes. Combines light cardio and nervous system stimulation.',
        useWhen: ['Feeling sluggish or foggy', 'Mid-afternoon crash', 'Pre-meeting or creative session'],
        includes: ['1-Min High Knees', 'Shadow Boxing', 'Breath & Squat Pulses'],
        tagline: 'Get fired up—fast.'
    },
    'Wakeup & Wind-Down': {
        title: 'Wakeup & Wind-Down',
        icon: Sunrise,
        purpose: 'Regulate your circadian rhythm with slow, breath-guided movement. Ease into or out of the day with intentional mobility.',
        useWhen: ['Starting your morning', 'Preparing for sleep', 'Transitioning out of stress'],
        includes: ['Morning Mobility Flow', 'Pre-Bedtime Stretch', 'Parasympathetic Breath Movement'],
        tagline: 'Begin and end with presence.'
    }
};

export const stillnessCategoryDetails: Record<MindfulnessCategory, WellnessCategoryDetails> = {
    'Breathwork': {
        title: 'Breathwork',
        icon: Wind,
        purpose: 'Train your breath to influence your nervous system. Calm down, focus up, or regulate emotions on command.',
        useWhen: ['Feeling anxious or overwhelmed', 'Need to reset your energy', 'Preparing to meditate or sleep'],
        includes: ['Box Breathing', '4-7-8 Breath', 'Resonant Breathing'],
        tagline: 'Your breath is your remote control.'
    },
    'Clarity & Focus': {
        title: 'Clarity & Focus',
        icon: Brain,
        purpose: 'Reduce cognitive clutter and re-engage with presence and purpose. Designed to reset executive function.',
        useWhen: ['Scattered brain', 'Mid-task transitions', 'Starting a deep work session'],
        includes: ['Two-Minute Reset', 'Focus Visualization', 'Name 3 Wins'],
        tagline: 'Clear mind, calm drive.'
    },
    'Grounding & Safety': {
        title: 'Grounding & Safety',
        icon: Shield,
        purpose: 'Support users in feeling safe in their body during anxiety, freeze responses, or emotional storms.',
        useWhen: ['Panic or sensory overload', 'Feeling disconnected', 'Recovering from emotional activation'],
        includes: ['5-4-3-2-1 Senses', 'Tactile Object Focus', 'Nature Visualization'],
        tagline: 'Come home to yourself.'
    },
    'Self-Compassion': {
        title: 'Self-Compassion',
        icon: HeartHandshake,
        purpose: 'Cultivate emotional resilience through kindness and inner connection. Rewire harsh inner voices.',
        useWhen: ['After burnout or rejection', 'Working through inner critic', 'Building self-worth'],
        includes: ['Loving-Kindness Meditation', 'Journaling Prompts', 'Heart-Focused Breath'],
        tagline: 'Be gentle with the one inside.'
    }
};
