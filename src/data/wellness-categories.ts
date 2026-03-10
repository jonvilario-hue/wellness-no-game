
import { 
    Dumbbell, StretchHorizontal, Zap, Sunrise, Wind, 
    Brain, Shield, HeartHandshake, type LucideIcon,
    Wallet, Utensils, TrendingUp, Apple, Waves,
    Mic2, MessageSquare, User, Eye, ArrowLeftRight, 
    Target, Sparkles, BookOpen, Presentation, 
    Mail, Video, ClipboardList, Heart, Briefcase, MonitorSmartphone,
    PenTool, Layers, MousePointer2
} from "lucide-react";
import type { ExerciseCategory, MindfulnessCategory } from "./exercises";
import type { CommunicationCategory } from "./communication-practices";

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

export const communicationCategoryDetails: Record<CommunicationCategory, WellnessCategoryDetails> = {
    'Vocal Mechanics': {
        title: 'Vocal Mechanics',
        icon: Wind,
        purpose: 'Optimize the physical production of your voice for power and clarity.',
        useWhen: ['Before long speaking sessions', 'Finding your natural tone'],
        includes: ['Diaphragmatic Breathing', 'Pitch Finding'],
        tagline: 'Your voice is an instrument.'
    },
    'Active Listening': {
        title: 'Active Listening',
        icon: ArrowLeftRight,
        purpose: 'Deepen understanding and connection through focused attention.',
        useWhen: ['Learning new information', 'High-stakes conversations'],
        includes: ['Paraphrasing', 'Reflective Listening'],
        tagline: 'Listen to understand, not to reply.'
    },
    'Nonverbal': {
        title: 'Nonverbal',
        icon: Eye,
        purpose: 'Manage the silent signals that communicate confidence and empathy.',
        useWhen: ['In-person meetings', 'Social gatherings'],
        includes: ['Body Posture', 'Mirroring'],
        tagline: 'Say more without speaking.'
    },
    'Conversation Structure': {
        title: 'Conversation Structure',
        icon: MessageSquare,
        purpose: 'Navigate the ebb and flow of dialogue with grace.',
        useWhen: ['Networking', 'Group discussions'],
        includes: ['Turn-Taking', 'Topic Bridging'],
        tagline: 'Master the dance of dialogue.'
    },
    'Persuasion': {
        title: 'Persuasion',
        icon: Target,
        purpose: 'Apply evidence-based psychological principles to influence others.',
        useWhen: ['Negotiation', 'Pitching ideas'],
        includes: ['Reciprocity', 'Anchoring'],
        tagline: 'Influence with integrity.'
    },
    'clarity_language_craft': {
        title: 'CLARITY & LANGUAGE CRAFT',
        icon: PenTool,
        purpose: 'Eliminate ambiguity and ensure your message land effectively.',
        useWhen: ['Explaining complex topics', 'Creative writing', 'Speech preparation', 'Dynamic speaking'],
        includes: ['Active Voice', 'Analogy Building', 'Alliteration', 'Cadence Mimicry'],
        tagline: 'Choose precise words. Master rhythm and flow.'
    },
    'difficult_conversations': {
        title: 'DIFFICULT CONVERSATIONS',
        icon: HeartHandshake,
        purpose: 'Navigate disagreements without damaging relationships.',
        useWhen: ['Coaching', 'Difficult team dynamics', 'High-tension moments', 'Performance reviews'],
        includes: ['Emotion Labeling', 'De-Escalation', 'Collaborative Language'],
        tagline: 'Navigate tension with empathy and composure.'
    },
    'Storytelling': {
        title: 'Storytelling',
        icon: BookOpen,
        purpose: 'Use narrative structures to make information memorable.',
        useWhen: ['Speeches', 'Teaching', 'Interviews'],
        includes: ['Three-Act Arc', 'Sensory Details'],
        tagline: 'Facts tell, stories sell.'
    },
    'Public Speaking': {
        title: 'Public Speaking',
        icon: Presentation,
        purpose: 'Master the stage and manage performance pressure.',
        useWhen: ['Keynotes', 'Team presentations'],
        includes: ['Extemporaneous Delivery', 'Power Posing'],
        tagline: 'Own the room.'
    },
    'professional_communication': {
        title: 'PROFESSIONAL COMMUNICATION',
        icon: Briefcase,
        purpose: 'Communicate with impact at work — in person and remote.',
        useWhen: ['Office environment', 'Leadership roles', 'Video calls', 'Email', 'Slack'],
        includes: ['SBI Feedback', 'Radical Candor', 'Subject Line Clarity', 'Video Framing'],
        tagline: 'Communicate with impact at work — in person and remote.'
    },
    'Custom': {
        title: 'Custom',
        icon: Sparkles,
        purpose: 'Your personalized collection of success protocols.',
        useWhen: ['Personal routines', 'Unique challenges'],
        includes: ['User-created practices'],
        tagline: 'Designed by you.'
    }
};

export const speedReadingCategoryDetails: Record<string, WellnessCategoryDetails> = {
    'Chunk Training': {
        title: 'Chunk Training',
        icon: Layers,
        purpose: 'Absorb multiple words at once to expand your perceptual span and reduce eye fixations.',
        useWhen: ['Expanding peripheral vision', 'Reducing fixations per line'],
        includes: ['RSVP Drills', 'Grouped Word Recognition'],
        tagline: 'See more, read less.'
    },
    'Pacer': {
        title: 'Pacer Drills',
        icon: MousePointer2,
        purpose: 'Keep up with a moving visual guide to suppress subvocalization and maintain forward momentum.',
        useWhen: ['Breaking speed plateaus', 'Maintaining consistent rhythm'],
        includes: ['Highlight Pacing', 'Auto-scroll Training'],
        tagline: 'Set the tempo for your brain.'
    },
    'Peripheral Expansion': {
        title: 'Peripheral Expansion',
        icon: Eye,
        purpose: 'Train your eyes to capture information from the edges of your vision, increasing reading efficiency.',
        useWhen: ['Developing soft-gaze', 'High-density scanning'],
        includes: ['Column Drills', 'Schulte Tables'],
        tagline: 'Widen your window of focus.'
    },
    'Regression Eliminator': {
        title: 'Regression Eliminator',
        icon: Zap,
        purpose: 'Prevent the habit of re-reading text by removing words after they are displayed.',
        useWhen: ['Improving focus', 'Eliminating second-guessing'],
        includes: ['Vanishing Text Drills', 'Forward-Only Mode'],
        tagline: 'No looking back.'
    }
};
