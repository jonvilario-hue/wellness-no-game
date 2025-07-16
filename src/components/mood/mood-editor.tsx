
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import type { MoodState } from '@/hooks/use-journal';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

const moodOptions = [
  { emoji: '😔', label: 'Very Low', value: 0 },
  { emoji: '😐', label: 'Low', value: 1 },
  { emoji: '🙂', label: 'Neutral', value: 2 },
  { emoji: '😊', label: 'Good', value: 3 },
  { emoji: '😄', label: 'Very Good', value: 4 },
];

interface MoodEditorProps {
    mood: MoodState;
    moodNote: string;
    onMoodChange: (value: MoodState) => void;
    onMoodNoteChange: (value: string) => void;
}

export const MoodEditor = ({ mood, moodNote, onMoodChange, onMoodNoteChange }: MoodEditorProps) => {

    const handleMoodSelect = (value: number) => {
        if (mood === value) {
            onMoodChange(null); // Deselect
        } else {
            onMoodChange(value);
        }
    }

    return (
        <div className="space-y-2">
            <Label>Mood</Label>
            <TooltipProvider>
                <div className="flex justify-around items-center p-2 rounded-lg bg-muted/50 mt-1">
                    {moodOptions.map(option => (
                        <Tooltip key={option.value} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <motion.button
                                    whileTap={{ scale: 1.3 }}
                                    animate={{ scale: mood === option.value ? 1.25 : 1, opacity: mood === null || mood === option.value ? 1 : 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => handleMoodSelect(option.value)}
                                    className="text-3xl"
                                >
                                    {option.emoji}
                                </motion.button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{option.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </TooltipProvider>
            <Textarea
                placeholder="Optional: What influenced your mood today?"
                value={moodNote}
                onChange={e => onMoodNoteChange(e.target.value)}
                className="min-h-[60px] mt-2"
            />
        </div>
    );
};
