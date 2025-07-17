
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Zap, Droplets } from 'lucide-react';
import { Slider } from '../ui/slider';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const effortLevels: { value: number, label: string, color: string, emoji: string }[] = [
    { value: 0, label: 'Not Rated', color: 'text-muted-foreground', emoji: ''},
    { value: 1, label: 'Low Effort', color: 'text-slate-400', emoji: '...' },
    { value: 2, label: 'Some Focus', color: 'text-blue-400', emoji: '⚡' },
    { value: 3, label: 'Average Focus', color: 'text-green-500', emoji: '⚖️' },
    { value: 4, 'label': 'High Focus', color: 'text-orange-500', emoji: '🔥' },
    { value: 5, label: 'Deep Focus', color: 'text-purple-500', emoji: '🎯' },
];

const allTags = ["quiet", "music", "Pomodoro", "exercise", "good sleep", "caffeine", "hydrated", "multitasking", "phone", "noise", "hunger", "tired", "stressed"];

interface FocusEditorProps {
  effort: number;
  onEffortChange: (value: number) => void;
  contextualPrompt: string;
  focusContext: string | null;
  onFocusContextChange: (value: string) => void;
  focusTags: string[];
  onFocusTagsChange: (tags: string[]) => void;
}

export const FocusEditor = ({ 
    effort, onEffortChange, 
    contextualPrompt, 
    focusContext, onFocusContextChange,
    focusTags, onFocusTagsChange
}: FocusEditorProps) => {
  const [internalEffort, setInternalEffort] = useState(effort || 1);
  const [isRated, setIsRated] = useState(effort > 0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    setInternalEffort(effort || 1);
    setIsRated(effort > 0);
  }, [effort]);

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => setFeedbackMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);
  
  const handleSliderChange = (value: number[]) => { setInternalEffort(value[0]); };

  const handleCommit = useCallback(() => {
    onEffortChange(internalEffort);
    setIsRated(true);
    setFeedbackMessage(`Focus level of ${internalEffort}/5 has been saved.`);
  }, [internalEffort, onEffortChange]);
  
  const handleClear = useCallback(() => {
    onEffortChange(0);
    setIsRated(false);
    setFeedbackMessage("Focus entry for this session has been cleared.");
  }, [onEffortChange]);

  const handleStarClick = () => {
    if (isRated) handleClear();
    else if (internalEffort > 0) handleCommit();
  };

  const handleTagToggle = (tag: string) => {
    const newTags = focusTags.includes(tag) ? focusTags.filter(t => t !== tag) : [...focusTags, tag];
    onFocusTagsChange(newTags);
  };
  
  const handleAddCustomTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !focusTags.includes(newTag)) {
        onFocusTagsChange([...focusTags, newTag]);
    }
    setTagInput('');
  };

  const currentLevel = effortLevels.find(l => l.value === internalEffort) || effortLevels[0];
  const starColor = isRated ? (effortLevels.find(l => l.value === effort)?.color || 'text-yellow-500') : 'text-muted-foreground';

  return (
    <div className="space-y-4 p-3 bg-muted/30 rounded-lg">
      <div className="flex items-center justify-between">
        <label htmlFor="effort-slider" className="font-medium text-sm">
          {contextualPrompt}
        </label>
        <motion.button whileTap={{ scale: 1.2 }} onClick={handleStarClick}>
            <Star className={cn("w-6 h-6 transition-colors", starColor)} fill={isRated ? 'currentColor' : 'none'}/>
        </motion.button>
      </div>

      <div className="flex items-center gap-4">
        <Slider id="effort-slider" min={1} max={5} step={1} value={[internalEffort]} onValueChange={handleSliderChange} onValueCommit={handleCommit} />
        <div className="w-12 text-center">
            <AnimatePresence mode="wait">
                <motion.span key={internalEffort} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className={cn("text-2xl font-bold block", currentLevel.color)}>
                   {currentLevel.emoji}
                </motion.span>
            </AnimatePresence>
        </div>
      </div>
       <div className="h-4 text-center">
         <AnimatePresence>
           {feedbackMessage && (
             <motion.p key={feedbackMessage} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.3 }} className="text-xs text-muted-foreground">
                {feedbackMessage}
              </motion.p>
           )}
         </AnimatePresence>
       </div>
       
        <div>
            <label className="font-medium text-sm mb-2 block">What influenced your focus?</label>
             <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                    <Button key={tag} variant={focusTags.includes(tag) ? 'default' : 'secondary'} size="sm" onClick={() => handleTagToggle(tag)} className="text-xs h-7">
                        {tag}
                    </Button>
                ))}
            </div>
             <div className="flex gap-2 mt-2">
                <Input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add custom tag..." className="h-8"/>
                <Button size="sm" onClick={handleAddCustomTag} className="h-8">Add</Button>
            </div>
        </div>
    </div>
  );
};
