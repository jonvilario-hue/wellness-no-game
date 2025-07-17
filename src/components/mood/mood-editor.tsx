
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import type { MoodState } from '@/hooks/use-journal';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

export const moodOptions = [
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
    showQuickPicker?: boolean;
}

export const MoodEditor = ({ mood, moodNote, onMoodChange, onMoodNoteChange, showQuickPicker = true }: MoodEditorProps) => {

    const handleMoodSelect = useCallback((value: number) => {
        if (mood === value) {
            onMoodChange(null); // Deselect if tapped again
        } else {
            onMoodChange(value);
        }
    }, [mood, onMoodChange]);

    return (
        <div className="space-y-4">
            {showQuickPicker && (
                 <div>
                    <Label>How are you feeling right now?</Label>
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
                </div>
            )}
            <div>
                 <Label htmlFor="mood-note">What's influencing your mood? (optional)</Label>
                <Textarea
                    id="mood-note"
                    placeholder="e.g., Finished a big project, feeling tired..."
                    value={moodNote}
                    onChange={e => onMoodNoteChange(e.target.value)}
                    className="min-h-[60px] mt-1"
                />
            </div>
        </div>
    );
};
