
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";
import { usePerformanceStore } from "@/hooks/use-performance-store";
import { getSuccessFeedback, getFailureFeedback } from "@/lib/feedback-system";

const mathOperators = [
    { name: 'add', op: (a: number, b: number) => a + b, decoyOp: (a: number, b: number) => Math.abs(a - b) },
    { name: 'subtract', op: (a: number, b: number) => Math.abs(a - b), decoyOp: (a: number, b: number) => a + b },
    { name: 'multiply', op: (a: number, b: number) => a * b, decoyOp: (a: number, b: number) => a + b + 1},
    { name: 'max', op: (a: number, b: number) => Math.max(a, b), decoyOp: (a: number, b: number) => Math.min(a,b)},
];

type MathElement = { value: number };
type Puzzle = { grid: (MathElement | null)[]; missingIndex: number; answer: MathElement; options: MathElement[]; size: number };

const generatePuzzle = (): Puzzle => {
    const size = 3;
    const grid: (MathElement | null)[] = Array(size * size).fill(null);
    const rules = ['row_op', 'col_op'];
    const rule = rules[Math.floor(Math.random() * rules.length)];
    const { op } = mathOperators[Math.floor(Math.random() * mathOperators.length)];
    
    for (let i = 0; i < size; i++) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * (a > 1 ? a : 10)) + 1;
        
        const values = [a, b, op(a, b)];
        
        if (rule === 'row_op') {
            grid[i * size] = { value: values[0] };
            grid[i * size + 1] = { value: values[1] };
            grid[i * size + 2] = { value: values[2] };
        } else {
            grid[i] = { value: values[0] };
            grid[i + size] = { value: values[1] };
            grid[i + 2 * size] = { value: values[2] };
        }
    }
    const lastIndices = rule === 'row_op' ? [2, 5, 8] : [6, 7, 8];
    const missingIndex = lastIndices[Math.floor(Math.random() * 3)];

    const answer = grid[missingIndex]!;
    grid[missingIndex] = null;

    const options = new Set<number>([answer.value]);
    while (options.size < 4) {
        const randomOperator = mathOperators[Math.floor(Math.random() * mathOperators.length)].decoyOp;
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const decoyValue = randomOperator(a, b);
        if (decoyValue !== answer.value) {
            options.add(decoyValue);
        }
    }

    const sortedOptions = Array.from(options).sort(() => Math.random() - 0.5);

    return { grid, missingIndex, answer, options: sortedOptions.map(v => ({ value: v })), size };
};

const MathComponent = ({ value }: MathElement) => (
    <span className="text-4xl font-bold text-primary font-mono">{value}</span>
);

export default function MathInduction() {
    const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
    const [puzzleKey, setPuzzleKey] = useState(0);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [selectedOption, setSelectedOption] = useState<MathElement | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');
    const [inlineFeedback, setInlineFeedback] = useState({ message: '', type: '' });
    const { logGameResult } = usePerformanceStore();

    const handleNextPuzzle = useCallback(() => {
        const puzzleScore = feedback === 'correct' ? 10 : 0;
        const time = (Date.now() - startTime) / 1000;
        logGameResult('Gf', 'math', { score: puzzleScore, time });

        setPuzzle(generatePuzzle());
        setPuzzleKey(prevKey => prevKey + 1);
        setSelectedOption(null);
        setFeedback('');
        setInlineFeedback({ message: '', type: '' });
        setStartTime(Date.now());
    }, [feedback, startTime, logGameResult]);

    useEffect(() => {
        setPuzzle(generatePuzzle());
    }, []);

    const handleSelectOption = useCallback((option: MathElement) => {
        if (feedback || !puzzle) return;
        setSelectedOption(option);
        if (option.value === puzzle.answer.value) {
            setFeedback('correct');
            setScore(score + 1);
            setInlineFeedback({ message: getSuccessFeedback('Gf'), type: 'success' });
        } else {
            setFeedback('incorrect');
            setInlineFeedback({ message: getFailureFeedback('Gf'), type: 'failure' });
        }
    }, [feedback, puzzle, score]);

    if (!puzzle) {
        return <p>Loading puzzle...</p>;
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                    <BrainCircuit />
                    (Gf) Mathematical Induction
                </CardTitle>
                <CardDescription className="text-center">Find the numerical rule and complete the matrix.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <div className="flex justify-between w-full font-mono text-sm">
                    <span>Puzzle: {puzzleKey + 1}</span>
                    <span>Score: {score}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 p-3 bg-muted rounded-lg">
                    {puzzle.grid.map((cell, index) => (
                        <div key={index} className="w-20 h-20 bg-background/50 rounded-md flex items-center justify-center">
                            {index === puzzle.missingIndex ? (
                                selectedOption ? <MathComponent {...selectedOption} /> : <span className="text-4xl font-bold text-primary">?</span>
                            ) : cell && (
                                <MathComponent {...cell} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-full">
                    <h3 className="text-center text-sm text-muted-foreground font-semibold mb-2">Choose the correct number:</h3>
                    <div className="h-6 text-sm font-semibold mb-2">
                        {inlineFeedback.message && (
                            <p className={cn("animate-in fade-in text-center", inlineFeedback.type === 'success' ? 'text-green-600' : 'text-amber-600')}>
                                {inlineFeedback.message}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {puzzle.options.map((option, index) => (
                            <Button
                                key={index}
                                onClick={() => handleSelectOption(option)}
                                className={cn(
                                    "h-16 text-xl transition-all border-2",
                                    selectedOption?.value === option.value && !feedback ? 'border-primary scale-105' : 'border-transparent',
                                    feedback && option.value === puzzle.answer.value && 'bg-green-500/20 border-green-500',
                                    feedback === 'incorrect' && selectedOption?.value === option.value && 'bg-destructive/20 border-destructive'
                                )}
                                disabled={!!feedback}
                            >
                                {option.value}
                            </Button>
                        ))}
                    </div>
                </div>
                {feedback && (
                    <div className="flex flex-col items-center gap-4 mt-4 text-center animate-in fade-in">
                        <Button onClick={handleNextPuzzle}>Next Puzzle</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
