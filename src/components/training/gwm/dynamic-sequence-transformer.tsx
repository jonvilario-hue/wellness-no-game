
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemoryStick } from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useTrainingFocus } from "@/hooks/use-training-focus";
import { useTrainingOverride } from "@/hooks/use-training-override";
import { usePerformanceStore } from "@/hooks/use-performance-store";

const generateNeutralSequence = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateMathSequence = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1).join('');
};

const neutralTasks = [
  { id: 'reverse', label: "Repeat the sequence backward." },
  { id: 'alpha_only', label: "Repeat only the letters, in order." },
  { id: 'numeric_only', label: "Repeat only the numbers, in order." },
  { id: 'remove_first', label: "Repeat the sequence, removing the first character." },
  { id: 'alpha_shift', label: "Repeat the letters, shifting each forward by one (A->B, Z->A)." },
];

const mathTasks = [
  { id: 'add_two', label: "Add 2 to each number and state the new sequence." },
  { id: 'subtract_one', label: "Subtract 1 from each number and state the new sequence." },
  { id: 'repeat_even', label: "Repeat only the even numbers in order." },
  { id: 'differences', label: "State the difference between each consecutive pair of numbers." }
];

export function DynamicSequenceTransformer() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState('');
  const [task, setTask] = useState<(typeof neutralTasks)[0] | (typeof mathTasks)[0]>(neutralTasks[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameState, setGameState] = useState('start'); // start, memorizing, answering, feedback
  const [feedback, setFeedback] = useState('');
  const [startTime, setStartTime] = useState(0);
  const { focus: globalFocus, isLoaded: isGlobalFocusLoaded } = useTrainingFocus();
  const { override, isLoaded: isOverrideLoaded } = useTrainingOverride();
  const { logGameResult } = usePerformanceStore();

  const isLoaded = isGlobalFocusLoaded && isOverrideLoaded;
  const currentMode = isLoaded ? (override || globalFocus) : 'neutral';
  
  const startLevel = useCallback((newLevel: number) => {
    const seqLength = newLevel + 3;
    const newSequence = currentMode === 'math' ? generateMathSequence(seqLength) : generateNeutralSequence(seqLength);
    const newTask = currentMode === 'math' ? mathTasks[Math.floor(Math.random() * mathTasks.length)] : neutralTasks[Math.floor(Math.random() * neutralTasks.length)];
    
    setSequence(newSequence);
    setTask(newTask);
    setUserAnswer('');
    setFeedback('');
    setGameState('memorizing');
    setStartTime(Date.now());

    setTimeout(() => {
      setGameState('answering');
    }, 4000); // 4 seconds to memorize
  }, [currentMode]);
  
  useEffect(() => {
    if (isLoaded) {
      setGameState('start');
      setLevel(1);
    }
  }, [isLoaded, currentMode]);

  const correctAnswer = useMemo(() => {
    if (!sequence || !task) return '';
    if (currentMode === 'neutral') {
        switch(task.id) {
            case 'reverse': return sequence.split('').reverse().join('');
            case 'alpha_only': return sequence.replace(/[^A-Z]/g, '');
            case 'numeric_only': return sequence.replace(/[^0-9]/g, '');
            case 'remove_first': return sequence.substring(1);
            case 'alpha_shift':
                return sequence.replace(/[^A-Z]/g, '').split('').map(char => 
                    char === 'Z' ? 'A' : String.fromCharCode(char.charCodeAt(0) + 1)
                ).join('');
            default: return '';
        }
    } else { // Math mode
        const nums = sequence.split('').map(Number);
        switch(task.id) {
            case 'add_two': return nums.map(n => n + 2).join('');
            case 'subtract_one': return nums.map(n => Math.max(0, n - 1)).join('');
            case 'repeat_even': return nums.filter(n => n % 2 === 0).join('');
            case 'differences':
                if (nums.length < 2) return '';
                const diffs = [];
                for (let i = 0; i < nums.length - 1; i++) {
                    diffs.push(Math.abs(nums[i+1] - nums[i]));
                }
                return diffs.join('');
            default: return '';
        }
    }
  }, [sequence, task, currentMode]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'answering') return;
    
    setGameState('feedback');
    const time = (Date.now() - startTime) / 1000;
    
    if (userAnswer.toUpperCase().trim() === correctAnswer) {
      setFeedback('Correct! Next level.');
      logGameResult('Gwm', currentMode, { score: level * 10, time });
      setTimeout(() => {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        startLevel(nextLevel);
      }, 2000);
    } else {
      setFeedback(`Incorrect. The answer was: ${correctAnswer}. Let's try again.`);
      logGameResult('Gwm', currentMode, { score: 0, time });
      setTimeout(() => {
        startLevel(level);
      }, 3000);
    }
  };


  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
            <MemoryStick />
            (Gwm) Sequence Dynamics
        </CardTitle>
        <CardDescription>Memorize the sequence, then transform it as instructed.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 min-h-[250px] justify-center">
        
        {gameState === 'start' && (
            <div className="flex flex-col items-center gap-4">
                <div className="font-mono text-lg">Level: {level}</div>
                <Button onClick={() => startLevel(level)} size="lg" disabled={!isLoaded}>
                  {isLoaded ? `Start Level ${level}` : "Loading..."}
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
            <p className={feedback.startsWith('Correct') ? 'text-green-500' : 'text-destructive'}>{feedback}</p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
