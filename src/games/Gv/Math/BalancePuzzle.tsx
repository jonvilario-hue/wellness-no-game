
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePerformanceStore } from "@/hooks/use-performance-store";
import { Scale } from 'lucide-react';
import { getSuccessFeedback, getFailureFeedback } from "@/lib/feedback-system";

const shapes = [
    { id: 'circle', symbol: '●', color: 'text-chart-1' },
    { id: 'square', symbol: '■', color: 'text-chart-2' },
    { id: 'triangle', symbol: '▲', color: 'text-chart-3' },
    { id: 'diamond', symbol: '◆', color: 'text-chart-4' },
    { id: 'plus', symbol: '✚', color: 'text-chart-5' },
];

type Shape = (typeof shapes)[0];
type Puzzle = {
    leftSide: Shape[];
    rightSide: Shape[];
    questionShape: Shape;
    answer: number;
    options: number[];
};

const generatePuzzle = (): Puzzle => {
    const weights: Record<string, number> = {};
    const shuffledWeights = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    shapes.forEach((shape, index) => {
        weights[shape.id] = shuffledWeights[index];
    });

    const puzzleShapes = [...shapes].sort(() => Math.random() - 0.5).slice(0, 3);
    const [s1, s2, s3] = puzzleShapes;

    let leftSide: Shape[] = [s1];
    let rightSide: Shape[] = [s2, s3];
    
    let leftWeight = weights[s1.id];
    let rightWeight = weights[s2.id] + weights[s3.id];

    if(leftWeight > rightWeight) {
        const diff = leftWeight - rightWeight;
        const fillerShape = shapes.find(s => weights[s.id] === diff);
        if(fillerShape) rightSide.push(fillerShape);
    } else if (rightWeight > leftWeight) {
        const diff = rightWeight - leftWeight;
        const fillerShape = shapes.find(s => weights[s.id] === diff);
        if(fillerShape) leftSide.push(fillerShape);
    }
    
    const questionShape = puzzleShapes[Math.floor(Math.random() * puzzleShapes.length)];
    const answer = weights[questionShape.id];

    const options = new Set<number>([answer]);
    while (options.size < 4) {
        const decoy = Math.max(1, answer + Math.floor(Math.random() * 5) - 2);
        if (decoy !== answer) {
            options.add(decoy);
        }
    }

    return {
        leftSide,
        rightSide,
        questionShape,
        answer,
        options: Array.from(options).sort(() => Math.random() - 0.5),
    };
};

const ShapeDisplay = ({ shape, size = 'text-5xl' }: { shape: Shape, size?: string }) => (
    <span className={cn(shape.color, size, 'font-bold')}>{shape.symbol}</span>
);

export default function BalancePuzzle() {
    const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
    const [inlineFeedback, setInlineFeedback] = useState({ message: '', type: '' });
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [startTime, setStartTime] = useState(0);
    const { logGameResult } = usePerformanceStore();

    const generateNewPuzzle = useCallback(() => {
        setPuzzle(generatePuzzle());
        setInlineFeedback({ message: '', type: '' });
        setSelectedAnswer(null);
        setStartTime(Date.now());
    }, []);

    useEffect(() => {
        generateNewPuzzle();
    }, [generateNewPuzzle]);

    const handleAnswer = useCallback((option: number) => {
        if (inlineFeedback.message || !puzzle) return;

        setSelectedAnswer(option);
        const time = (Date.now() - startTime) / 1000;
        let score = 0;

        if (option === puzzle.answer) {
            setInlineFeedback({ message: getSuccessFeedback('Gv'), type: 'success' });
            score = 100;
        } else {
            setInlineFeedback({ message: getFailureFeedback('Gv'), type: 'failure' });
            score = 0;
        }
        logGameResult('Gv', 'math', { score, time });

        setTimeout(() => {
            generateNewPuzzle();
        }, 2000);
    }, [inlineFeedback.message, puzzle, startTime, logGameResult, generateNewPuzzle]);

    if (!puzzle) {
        return <div className="text-center">Loading Puzzle...</div>;
    }

    return (
        <Card className="w-full max-w-xl">
            <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                    <Scale />
                    (Gv) Balance Puzzle
                </CardTitle>
                <CardDescription>Deduce the value of the shape using the balanced scales. This puzzle helps you reason about quantity using spatial logic.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <div className="w-full p-4 bg-muted rounded-lg">
                    <h3 className="text-center text-sm font-semibold mb-2">Rule</h3>
                    <div className="flex items-center justify-center">
                        <div className="flex-1 flex justify-end items-center gap-2 p-2 pr-4">{puzzle.leftSide.map((s, i) => <ShapeDisplay key={i} shape={s} />)}</div>
                        <div className="text-4xl font-bold text-primary">=</div>
                        <div className="flex-1 flex justify-start items-center gap-2 p-2 pl-4">{puzzle.rightSide.map((s, i) => <ShapeDisplay key={i} shape={s} />)}</div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-3xl font-bold">
                    <ShapeDisplay shape={puzzle.questionShape} size="text-6xl" />
                    <span>=</span>
                    <span>?</span>
                </div>

                <div className="grid grid-cols-4 gap-4 w-full">
                    {puzzle.options.map((option, index) => (
                        <Button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            disabled={!!inlineFeedback.message}
                            size="lg"
                            className={cn(
                                "h-16 text-2xl transition-all duration-300",
                                inlineFeedback.message && option === puzzle.answer && "bg-green-600 hover:bg-green-700",
                                inlineFeedback.type === 'failure' && selectedAnswer === option && "bg-destructive hover:bg-destructive/90"
                            )}
                        >
                            {option}
                        </Button>
                    ))}
                </div>

                <div className="h-10 mt-2 text-center">
                    {inlineFeedback.message && (
                        <div className={cn("animate-in fade-in", inlineFeedback.type === 'success' ? 'text-green-600' : 'text-amber-600')}>
                            <p className="text-lg font-bold">
                                {inlineFeedback.message}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    </change>
  <change>
    <file>/src/games/Gwm/Math/MentalMathStream.tsx</file>
    <content><![CDATA[
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
