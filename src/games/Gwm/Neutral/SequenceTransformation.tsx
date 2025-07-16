
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemoryStick } from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { usePerformanceStore } from "@/hooks/use-performance-store";
import { getSuccessFeedback, getFailureFeedback } from "@/lib/feedback-system";
import { cn } from "@/lib/utils";

const generateNeutralSequence = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const neutralTasks = [
  { id: 'reverse', label: "Repeat the sequence backward." },
  { id: 'alpha_only', label: "Repeat only the letters, in order." },
  { id: 'numeric_only', label: "Repeat only the numbers, in order." },
  { id: 'remove_first', label: "Repeat the sequence, removing the first character." },
  { id: 'alpha_shift', label: "Repeat the letters, shifting each forward by one (A->B, Z->A)." },
  { id: 'every_other', label: "Repeat every other character, starting with the first." },
];

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Props {
  difficulty?: Difficulty;
  onComplete?: () => void;
}

export default function SequenceTransformation({ difficulty = 'Medium', onComplete }: Props) {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState('');
  const [task, setTask] = useState<(typeof neutralTasks)[0]>(neutralTasks[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameState, setGameState] = useState('start'); // start, memorizing, answering, feedback
  const [feedback, setFeedback] = useState('');
  const [startTime, setStartTime] = useState(0);
  
  const { logGameResult } = usePerformanceStore();

  const getSequenceLength = useCallback((currentLevel: number) => {
    const baseLength = currentLevel + 2;
    switch(difficulty) {
        case 'Easy': return baseLength;
        case 'Medium': return baseLength + 1;
        case 'Hard': return baseLength + 2;
        default: return baseLength + 1;
    }
  }, [difficulty]);
  
  const startLevel = useCallback((newLevel: number) => {
    const seqLength = getSequenceLength(newLevel);
    const newSequence = generateNeutralSequence(seqLength);
    const newTask = neutralTasks[Math.floor(Math.random() * neutralTasks.length)];
    
    setSequence(newSequence);
    setTask(newTask);
    setUserAnswer('');
    setFeedback('');
    setGameState('memorizing');
    setStartTime(Date.now());

    setTimeout(() => {
      setGameState('answering');
    }, 4000);
  }, [getSequenceLength]);
  
  useEffect(() => {
    setGameState('start');
    setLevel(1);
  }, []);

  const correctAnswer = useMemo(() => {
    if (!sequence || !task) return '';
    
    switch(task.id) {
        case 'reverse': return sequence.split('').reverse().join('');
        case 'alpha_only': return sequence.replace(/[^A-Z]/g, '');
        case 'numeric_only': return sequence.replace(/[^0-9]/g, '');
        case 'remove_first': return sequence.substring(1);
        case 'alpha_shift':
            return sequence.replace(/[^A-Z]/g, '').split('').map(char => 
                char === 'Z' ? 'A' : String.fromCharCode(char.charCodeAt(0) + 1)
            ).join('');
        case 'every_other':
            return sequence.split('').filter((_, i) => i % 2 === 0).join('');
        default: return '';
    }
  }, [sequence, task]);


  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'answering') return;
    
    setGameState('feedback');
    const time = (Date.now() - startTime) / 1000;
    
    const isCorrect = userAnswer.toUpperCase().trim() === correctAnswer;

    if (isCorrect) {
      logGameResult('Gwm', 'neutral', { score: level * 10, time });
      setFeedback(getSuccessFeedback('Gwm'));
      
      if (onComplete) {
        setTimeout(() => onComplete(), 1500);
        return;
      }
      
      setTimeout(() => {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        startLevel(nextLevel);
      }, 2000);

    } else {
      setFeedback(`Incorrect. The answer was: ${correctAnswer}. ${getFailureFeedback('Gwm')}`);
      logGameResult('Gwm', 'neutral', { score: 0, time });
      
      if (onComplete) {
        setTimeout(() => onComplete(), 3000);
      } else {
        setTimeout(() => {
            startLevel(level);
        }, 3000);
      }
    }
  }, [gameState, userAnswer, correctAnswer, startTime, logGameResult, level, onComplete, startLevel]);


  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
            <MemoryStick />
            (Gwm) Sequence Transformation
        </CardTitle>
        <CardDescription>Memorize the sequence, then transform it as instructed.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 min-h-[250px] justify-center">
        
        {gameState === 'start' && (
            <div className="flex flex-col items-center gap-4">
                <div className="font-mono text-lg">Level: {level}</div>
                <Button onClick={() => startLevel(level)} size="lg">
                  Start Level {level}
                </Button>
            </div>
        )}

        {gameState === 'memorizing' && (
          <div className="text-center space-y-4 animate-in fade-in">
            <p className="font-semibold text-muted-foreground">Memorize this sequence:</p>
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-4xl font-mono tracking-widest">{sequence}</p>
            </div>
            <p className="text-sm text-primary animate-pulse">Prepare to answer...</p>
          </div>
        )}

        {(gameState === 'answering' || gameState === 'feedback') && (
          <div className="w-full space-y-4 text-center animate-in fade-in">
             <div className="font-mono text-lg">Level: {level}</div>
             <div className="p-4 bg-muted rounded-lg">
                <p className="text-xl font-semibold">{task.label}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your transformed answer"
                className="text-center text-lg"
                disabled={gameState === 'feedback'}
                autoFocus
              />
              <Button type="submit" disabled={gameState === 'feedback'}>Submit Answer</Button>
            </form>
          </div>
        )}

        {gameState === 'feedback' && (
          <div className="mt-4 text-center text-xl font-bold animate-in fade-in">
            <p className={cn(feedback.includes('Incorrect') ? 'text-amber-600' : 'text-green-600')}>{feedback}</p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
