

import { movementExercises, mindfulnessPractices, type Exercise, type MindfulnessPractice } from './exercises';
import { wellnessPlans, type WellnessPlan } from './wellness-plans';
import { kits } from './wellness-kits';
import type { MiniKit } from './wellness-kits';
import type { LucideIcon } from 'lucide-react';
import { Leaf, Dumbbell, Zap, Sunrise, Wind, Brain, Shield, HeartHandshake, Package, ClipboardCheck, Play } from 'lucide-react';

export type LibraryItemType = 'Practice' | 'Kit' | 'Plan';

export type LibraryTag = 
    | 'Movement' | 'Stillness' 
    | 'Short' | 'Medium' | 'Long' // Duration
    | 'Low Energy' | 'High Energy'
    | 'Calm' | 'Focus' | 'Energy' | 'Recovery' | 'Sleep' | 'Clarity' | 'Anxiety Relief' | 'Grounding' | 'Self-Compassion' | 'Creativity' | 'ADHD-Friendly'; // Intent

export type LibraryItem = {
    id: string;
    type: LibraryItemType;
    title: string;
    description: string;
    icon: LucideIcon;
    tags: LibraryTag[];
    actionLink: string;
    content: Exercise | MindfulnessPractice | WellnessPlan | MiniKit;
};

// --- Tagging Logic ---
const getPracticeTags = (practice: Exercise | MindfulnessPractice): LibraryTag[] => {
    const tags: LibraryTag[] = [];
    if ('category' in practice) {
        if (['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'].includes(practice.category)) {
            tags.push('Movement');
        } else {
            tags.push('Stillness');
        }
    }
    if (practice.duration < 120) tags.push('Short');
    else if (practice.duration <= 300) tags.push('Medium');
    else tags.push('Long');

    // Infer intent from category
    switch (practice.category) {
        case 'Energizer': tags.push('Energy', 'High Energy'); break;
        case 'Stretching': tags.push('Recovery'); break;
        case 'Strength': tags.push('Recovery'); break;
        case 'Wakeup & Wind-Down': tags.push('Sleep', 'Calm'); break;
        case 'Breathwork': tags.push('Calm', 'Anxiety Relief'); break;
        case 'Clarity & Focus': tags.push('Focus', 'Clarity'); break;
        case 'Grounding & Safety': tags.push('Grounding', 'Anxiety Relief'); break;
        case 'Self-Compassion': tags.push('Self-Compassion', 'Recovery'); break;
    }

    return [...new Set(tags)];
};

const getKitTags = (kit: MiniKit): LibraryTag[] => {
    const tags: LibraryTag[] = kit.tags ? (kit.tags as LibraryTag[]) : [];
    tags.push('Short', 'Low Energy'); // Most kits are short and low energy
    if (kit.title.includes('Stress') || kit.title.includes('Emotional')) tags.push('Anxiety Relief', 'Recovery');
    if (kit.title.includes('Focus') || kit.title.includes('Idea')) tags.push('Focus', 'Clarity');
    if (kit.title.includes('Morning') || kit.title.includes('Jumpstart')) tags.push('Energy');
    if (kit.title.includes('Creative') || kit.title.includes('Muse') || kit.title.includes('Play') || kit.title.includes('Spark')) tags.push('Creativity');
    if (kit.title.includes('Boundaries') || kit.title.includes('Self-Talk')) tags.push('Self-Compassion');
    if (kit.title.includes('Unfreeze') || kit.title.includes('SOS')) tags.push('Grounding');
    if (kit.title.includes('Evening') || kit.title.includes('Sleep')) tags.push('Sleep', 'Calm');

    return [...new Set(tags)];
}

const getPlanTags = (plan: WellnessPlan): LibraryTag[] => {
    const tags: LibraryTag[] = ['Long'];
    if (plan.title.includes('Stress')) tags.push('Anxiety Relief', 'Recovery');
    if (plan.title.includes('Sleep')) tags.push('Sleep');
    if (plan.title.includes('Morning')) tags.push('Energy', 'Focus');
    if (plan.title.includes('Desk')) tags.push('Recovery');
    if (plan.title.includes('Regulate')) tags.push('Anxiety Relief', 'Grounding');
    return [...new Set(tags)];
}


// --- Data Aggregation ---
const allPractices: LibraryItem[] = [...movementExercises, ...mindfulnessPractices].map(p => ({
    id: p.id,
    type: 'Practice',
    title: p.name,
    description: p.description,
    icon: p.icon,
    tags: getPracticeTags(p),
    actionLink: `/exercises#practice-${p.id}`,
    content: p
}));

const allKits: LibraryItem[] = kits.map(k => ({
    id: k.title.toLowerCase().replace(/ /g, '-'),
    type: 'Kit',
    title: k.title,
    description: k.description,
    icon: Package,
    tags: getKitTags(k),
    actionLink: `/exercises#kit-${k.title.toLowerCase().replace(/ /g, '-')}`,
    content: k
}));

const allPlans: LibraryItem[] = wellnessPlans.map(p => ({
    id: p.id,
    type: 'Plan',
    title: p.title,
    description: p.description,
    icon: ClipboardCheck,
    tags: getPlanTags(p),
    actionLink: `/exercises/plans/${p.id}`,
    content: p,
}));

export const wellnessLibrary: LibraryItem[] = [...allPractices, ...allKits, ...allPlans];

    