
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { ReadingPassage } from '@/types/speedreading';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  passage: ReadingPassage;
  onComplete: (score: number) => void;
}

export function SpeedReadingQuiz({ passage, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = passage.quiz[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQuestion.answerIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < passage.quiz.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const finalScore = Math.round((correctCount / passage.quiz.length) * 100);
      onComplete(finalScore);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl w-full">
      <Card className="border-primary/20 shadow-2xl overflow-hidden">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline" className="uppercase font-black text-[9px]">Comprehension Audit</Badge>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Question {currentIndex + 1} of {passage.quiz.length}</span>
          </div>
          <CardTitle className="text-xl leading-tight">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          {currentQuestion.options.map((option, i) => {
            const isCorrect = i === currentQuestion.answerIndex;
            const isSelected = i === selectedOption;
            
            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleSelect(i)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all font-medium",
                  !isAnswered && "hover:border-primary/40 hover:bg-primary/[0.02] border-primary/5",
                  isAnswered && isCorrect && "bg-emerald-500/10 border-emerald-500 text-emerald-700",
                  isAnswered && isSelected && !isCorrect && "bg-destructive/5 border-destructive text-destructive"
                )}
              >
                {option}
              </button>
            );
          })}
        </CardContent>
        <CardFooter className="bg-muted/10 p-4 justify-end">
          <Button disabled={!isAnswered} onClick={handleNext} className="gap-2 font-bold h-10 px-8">
            {currentIndex === passage.quiz.length - 1 ? 'See Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
