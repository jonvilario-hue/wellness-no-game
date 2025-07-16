
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemoryStick } from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { usePerformanceStore } from "@/hooks/use-performance-store";
import { getSuccessFeedback, getFailureFeedback } from "@/lib/feedback-system";
import { cn } from "@/lib/utils";

const mathTasks = [
  { id: 'add_two', label: "Add 2 to each number and state the new sequence." },
  { id: 'subtract_one', label: "Subtract 1 from each number and state the new sequence." },
  { id: 'repeat_even', label: "Repeat only the even numbers in order." },
  { id: 'differences', label: "State the difference between each consecutive pair of numbers." },
  { id: 'running_total', label: "State the running total after each number." },
  { id: 'memory_math', label: "Memorize the rule, then apply it to each number in a stream." },
];

const mathRules = [
    { text: "Add 4 then divide by 2", apply: (n: number) => (n + 4) / 2 },
    { text: "Subtract 1 then double", apply: (n: number) => (n - 1) * 2 },
    { text: "Square the number, then subtract 1", apply: (n: number) => (n * n) - 1 },
    { text: "Add the digits together, then multiply by 3", apply: (n: number) => (n.toString().split('').reduce((a, b) => a + parseInt(b), 0)) * 3 },
];

const generateMathSequence = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1).join('');
};

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Props {
  difficulty?: Difficulty;
  onComplete?: () => void;
}

export default function MentalMathStream({ difficulty = 'Medium', onComplete }: Props) {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState('');
  const [task, setTask] = useState<(typeof mathTasks)[0]>(mathTasks[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameState, setGameState] = useState('start'); // start, memorizing, answering, feedback
  const [feedback, setFeedback] = useState('');
  const [startTime, setStartTime] = useState(0);

  const [mathRule, setMathRule] = useState(() => mathRules[0]);
  const [showMathRule, setShowMathRule] = useState(true);
  const [mathStream, setMathStream] = useState([3, 6, 5]);
  const [mathStreamIndex, setMathStreamIndex] = useState(0);

  const { logGameResult } = usePerformanceStore();

  const getSequenceLength = useCallback((currentLevel: number) => {
    const baseLength = currentLevel + 2;
    switch (difficulty) {
      case 'Easy': return baseLength;
      case 'Medium': return baseLength + 1;
      case 'Hard': return baseLength + 2;
      default: return baseLength + 1;
    }
  }, [difficulty]);

  const startLevel = useCallback((newLevel: number) => {
    const seqLength = getSequenceLength(newLevel);
    const newSequence = generateMathSequence(seqLength);
    const newTask = mathTasks[Math.floor(Math.random() * mathTasks.length)];

    setSequence(newSequence);
    setTask(newTask);
    setUserAnswer('');
    setFeedback('');
    setGameState('memorizing');
    setStartTime(Date.now());

    if (newTask.id === 'memory_math') {
      const newRule = mathRules[Math.floor(Math.random() * mathRules.length)];
      setMathRule(newRule);
      const newStream = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
      setMathStream(newStream);
      setMathStreamIndex(0);
      setShowMathRule(true);
      setTimeout(() => {
        setShowMathRule(false)
        setGameState('answering');
      }, 3000);
    } else {
        setTimeout(() => {
            setGameState('answering');
        }, 4000);
    }
  }, [getSequenceLength]);

  useEffect(() => {
    startLevel(1);
  }, [startLevel]);

  const correctAnswer = useMemo(() => {
    if (!task) return '';
    if (task.id === 'memory_math') {
      return mathRule.apply(mathStream[mathStreamIndex]).toString();
    }
    
    const nums = sequence.split('').map(Number);
    switch (task.id) {
      case 'add_two': return nums.map(n => (n + 2) % 10).join('');
      case 'subtract_one': return nums.map(n => (n - 1 + 10) % 10).join('');
      case 'repeat_even': return nums.filter(n => n % 2 === 0).join('');
      case 'differences':
        if (nums.length < 2) return '';
        const diffs = [];
        for (let i = 0; i < nums.length - 1; i++) {
          diffs.push(Math.abs(nums[i + 1] - nums[i]));
        }
        return diffs.join('');
      case 'running_total':
        if (nums.length === 0) return '';
        let total = 0;
        return nums.map(n => total += n).join('');
      default: return '';
    }
  }, [sequence, task, mathRule, mathStream, mathStreamIndex]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'answering') return;

    setGameState('feedback');
    const time = (Date.now() - startTime) / 1000;
    const isCorrect = userAnswer.toUpperCase().trim() === correctAnswer;

    if (isCorrect) {
      logGameResult('Gwm', 'math', { score: level * 10, time });
      setFeedback(getSuccessFeedback('Gwm'));

      if (onComplete) {
        setTimeout(() => onComplete(), 1500);
        return;
      }

      if (task.id === 'memory_math' && mathStreamIndex < mathStream.length - 1) {
        setTimeout(() => {
          setMathStreamIndex(prev => prev + 1);
          setUserAnswer('');
          setFeedback('');
          setGameState('answering');
        }, 2000);
      } else {
        setTimeout(() => {
          const nextLevel = level + 1;
          setLevel(nextLevel);
          startLevel(nextLevel);
        }, 2000);
      }
    } else {
      setFeedback(`Incorrect. The answer was: ${correctAnswer}. ${getFailureFeedback('Gwm')}`);
      logGameResult('Gwm', 'math', { score: 0, time });

      if (onComplete) {
        setTimeout(() => onComplete(), 3000);
      } else {
        setTimeout(() => {
          startLevel(level);
        }, 3000);
      }
    }
  }, [gameState, userAnswer, correctAnswer, startTime, logGameResult, level, onComplete, task, mathStreamIndex, mathStream.length, startLevel]);

  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
            <MemoryStick />
            (Gwm) Mental Math Stream
        </CardTitle>
        <CardDescription>Memorize the sequence or rule, then transform it as instructed.</CardDescription>
      </CardHeader>
       <CardContent className="flex flex-col items-center gap-6 min-h-[250px] justify-center">
        {gameState === 'start' && (
            <div className="flex flex-col items-center gap-4">
                <div className="font-mono text-lg">Level: {level}</div>
                <Button onClick={() => startLevel(level)} size="lg">Start Level {level}</Button>
            </div>
        )}

        {gameState === 'memorizing' && (
          <div className="text-center space-y-4 animate-in fade-in">
             <p className="font-semibold text-muted-foreground">
                {task.id === 'memory_math' ? "Memorize this rule:" : "Memorize this sequence:"}
            </p>
            <div className="p-4 bg-muted rounded-lg">
                {task.id === 'memory_math' ? 
                    <p className="text-2xl font-semibold">{mathRule.text}</p> :
                    <p className="text-4xl font-mono tracking-widest">{sequence}</p>
                }
            </div>
            <p className="text-sm text-primary animate-pulse">Prepare to answer...</p>
          </div>
        )}

        {(gameState === 'answering' || gameState === 'feedback') && (
          <div className="w-full space-y-4 text-center animate-in fade-in">
             <div className="font-mono text-lg">Level: {level}</div>
             <div className="p-4 bg-muted rounded-lg min-h-[60px] flex items-center justify-center">
                <p className="text-xl font-semibold">{task.label}</p>
            </div>

            {task.id === 'memory_math' && (
                <p className="text-lg">Transform this number: <strong className="text-primary text-2xl">{mathStream[mathStreamIndex]}</strong></p>
            )}

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
