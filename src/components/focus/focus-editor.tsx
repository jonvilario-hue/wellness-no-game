
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Wand2 } from 'lucide-react';
import { Slider } from '../ui/slider';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const effortLevels: { value: number, label: string, color: string, emoji: string }[] = [
    { value: 0, label: 'Not Rated', color: 'text-muted-foreground', emoji: ''},
    { value: 1, label: 'Very Low', color: 'text-slate-400', emoji: '🫥' },
    { value: 2, label: 'Low', color: 'text-blue-400', emoji: '😕' },
    { value: 3, label: 'Medium', color: 'text-green-500', emoji: '🙂' },
    { value: 4, label: 'High', color: 'text-orange-500', emoji: '🔥' },
    { value: 5, label: 'Deep Focus', color: 'text-purple-500', emoji: '🎯' },
];

interface FocusEditorProps {
  effort: number;
  onEffortChange: (value: number) => void;
  contextualPrompt: string;
}

export const FocusEditor = ({ effort, onEffortChange, contextualPrompt }: FocusEditorProps) => {
  const [internalEffort, setInternalEffort] = useState(effort);
  const [isRated, setIsRated] = useState(effort > 0);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    setInternalEffort(effort);
    setIsRated(effort > 0);
  }, [effort]);

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const handleSliderChange = (value: number[]) => {
    setInternalEffort(value[0]);
  };

  const handleCommit = () => {
    onEffortChange(internalEffort);
    setIsRated(true);
    setFeedbackMessage(`Focus level of ${internalEffort}/5 has been saved.`);
  };
  
  const handleClear = () => {
      onEffortChange(0); // 0 signifies "unrated"
      setIsRated(false);
      setFeedbackMessage("Focus entry for this session has been cleared.");
  }

  const handleStarClick = () => {
    if (isRated) {
        handleClear();
    } else {
        if (internalEffort > 0) {
            handleCommit();
        }
    }
  };

  const currentLevel = effortLevels.find(l => l.value === internalEffort) || effortLevels[0];
  const starColor = isRated ? (effortLevels.find(l => l.value === effort)?.color || 'text-yellow-500') : 'text-muted-foreground';

  return (
    <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
      <div className="flex items-center justify-between">
        <label htmlFor="effort-slider" className="font-medium text-sm">
          {contextualPrompt}
        </label>
        <motion.button whileTap={{ scale: 1.2 }} onClick={handleStarClick}>
            <Star className={cn("w-6 h-6 transition-colors", starColor)} fill={isRated ? 'currentColor' : 'none'}/>
        </motion.button>
      </div>

      <div className="flex items-center gap-4">
        <Slider
          id="effort-slider"
          min={1}
          max={5}
          step={1}
          value={[internalEffort]}
          onValueChange={handleSliderChange}
          onValueCommit={handleCommit}
          className="mt-2"
        />
        <div className="w-12 text-center">
            <AnimatePresence mode="wait">
                <motion.span
                    key={internalEffort}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={cn("text-2xl font-bold block", currentLevel.color)}
                >
                   {currentLevel.emoji}
                </motion.span>
            </AnimatePresence>
        </div>
      </div>
       <div className="h-4 text-center">
         <AnimatePresence>
           {feedbackMessage && (
             <motion.p
                key={feedbackMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-muted-foreground"
              >
                {feedbackMessage}
              </motion.p>
           )}
         </AnimatePresence>
       </div>
    </div>
  );
};
