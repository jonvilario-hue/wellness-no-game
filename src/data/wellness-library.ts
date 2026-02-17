import { movementExercises, mindfulnessPractices, type Exercise, type MindfulnessPractice } from './exercises';
import { communicationPractices } from './communication-practices';
import { wellnessPlans, type WellnessPlan } from './wellness-plans';
import { communicationPlans } from './communication-plans';
import { kits } from './wellness-kits';
import { communicationKits } from './communication-kits';
import type { MiniKit } from './wellness-kits';
import type { LucideIcon } from 'lucide-react';
import { Package, ClipboardCheck, MessageSquare } from 'lucide-react';

export type LibraryItemType = 'Practice' | 'Kit' | 'Plan';

export type LibraryTag = 
    | 'Movement' | 'Stillness' | 'Communication'
    | 'Short' | 'Medium' | 'Long' 
    | 'Low Energy' | 'High Energy'
    | 'Calm' | 'Focus' | 'Energy' | 'Recovery' | 'Sleep' | 'Clarity' | 'Anxiety Relief' | 'Grounding' | 'Self-Compassion' | 'Creativity' | 'ADHD-Friendly'
    | 'public-speaking' | 'vocal' | 'confidence' | 'conflict' | 'de-escalation' | 'emotional-intelligence' | 'persuasion' | 'professional' | 'listening' | 'small-talk' | 'storytelling' | 'vulnerability' | 'quick';

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

const getPracticeTags = (practice: Exercise | MindfulnessPractice): LibraryTag[] => {
    const tags: LibraryTag[] = [];
    if ('category' in practice) {
        if (['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down', 'Mind-Body'].includes(practice.category)) {
            tags.push('Movement');
        } else if (['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'].includes(practice.category)) {
            tags.push('Stillness');
        } else {
            tags.push('Communication');
        }
    }
    if (practice.duration < 120) tags.push('Short');
    else if (practice.duration <= 300) tags.push('Medium');
    else tags.push('Long');

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

    return [...new Set([...tags, ...(practice.tags as LibraryTag[])])];
};

const allMovement: LibraryItem[] = movementExercises.map(p => ({
    id: p.id,
    type: 'Practice',
    title: p.name,
    description: p.description,
    icon: p.icon,
    tags: getPracticeTags(p),
    actionLink: `/exercises?tab=movement#practice-${p.id}`,
    content: p
}));

const allStillness: LibraryItem[] = mindfulnessPractices.map(p => ({
    id: p.id,
    type: 'Practice',
    title: p.name,
    description: p.description,
    icon: p.icon,
    tags: getPracticeTags(p),
    actionLink: `/exercises?tab=stillness#practice-${p.id}`,
    content: p
}));

const allCommunication: LibraryItem[] = communicationPractices.map(p => ({
    id: p.id,
    type: 'Practice',
    title: p.name,
    description: p.description,
    icon: p.icon,
    tags: getPracticeTags(p),
    actionLink: `/exercises?tab=communication#practice-${p.id}`,
    content: p
}));

const allKits: LibraryItem[] = [...kits, ...communicationKits].map(k => ({
    id: k.title.toLowerCase().replace(/ /g, '-'),
    type: 'Kit',
    title: k.title,
    description: k.description,
    icon: Package,
    tags: [...(k.tags as LibraryTag[]), 'Short'],
    actionLink: `/exercises?tab=${k.tags.includes('vocal') || k.tags.includes('conflict') ? 'communication' : 'movement'}#kit-${k.title.toLowerCase().replace(/ /g, '-')}`,
    content: k
}));

const allPlans: LibraryItem[] = [...wellnessPlans, ...communicationPlans].map(p => ({
    id: p.id,
    type: 'Plan',
    title: p.title,
    description: p.description,
    icon: ClipboardCheck,
    tags: ['Long'],
    actionLink: `/exercises/plans/${p.id}`,
    content: p,
}));

export const wellnessLibrary: LibraryItem[] = [...allMovement, ...allStillness, ...allCommunication, ...allKits, ...allPlans];
