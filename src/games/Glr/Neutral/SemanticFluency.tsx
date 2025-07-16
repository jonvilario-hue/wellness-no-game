
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { usePerformanceStore } from "@/hooks/use-performance-store";
import { getSuccessFeedback } from "@/lib/feedback-system";

type Prompt = { text: string };

const neutralPrompts: Prompt[] = [
  { text: "Things you find in a kitchen" },
  { text: "Types of fruit" },
  { text: "Animals that live in the jungle" },
  { text: "Words that start with 'C'" },
  { text: "Things that are cold" },
  { text: "Hobbies or pastimes" },
  { text: "Types of trees" },
  { text: "Things with wheels" },
];

export default function SemanticFluency() {
  const [gameState, setGameState] = useState('idle'); // idle, running, finished
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentInput, setCurrentInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [switched, setSwitched] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [inlineFeedback, setInlineFeedback] = useState({ message: '', type: '' });
  const promptHistory = useRef<string[]>([]);
  
  const { logGameResult } = usePerformanceStore();
  const timerRef = useRef<NodeJS.Timeout>();

  const prompts = neutralPrompts;

  const getNewPrompt = useCallback(() => {
    let newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    while (promptHistory.current.includes(newPrompt.text) && promptHistory.current.length < prompts.length) {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    }
    promptHistory.current.push(newPrompt.text);
    return newPrompt;
  }, [prompts]);
  
  const handleStart = useCallback(() => {
    promptHistory.current = [];
    let initialPrompt = getNewPrompt();
    setPrompt(initialPrompt);
    
    setGameState('running');
    setTimeLeft(45);
    setResponses([]);
    setCurrentInput('');
    setSwitched(false);
    setStartTime(Date.now());
    setInlineFeedback({ message: '', type: '' });
  }, [getNewPrompt]);

  useEffect(() => {
    if (gameState === 'running' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft === 23 && !switched) {
          setSwitched(true);
          setPrompt(getNewPrompt());
        }
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'running') {
      setGameState('finished');
      const time = (Date.now() - startTime) / 1000;
      logGameResult('Glr', 'neutral', { score: responses.length, time });
    }
    return () => {
        if(timerRef.current) clearTimeout(timerRef.current)
    };
  }, [gameState, timeLeft, switched, responses.length, startTime, logGameResult, getNewPrompt]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = currentInput.trim().toLowerCase();

    if (!cleanInput || responses.includes(cleanInput)) {
        setCurrentInput('');
        return;
    }
    
    setInlineFeedback({ message: getSuccessFeedback('Glr'), type: 'success' });
    setResponses(prev => [...prev, cleanInput]);
    
    setTimeout(() => setInlineFeedback({ message: '', type: '' }), 1500);
    setCurrentInput('');
  }, [currentInput, responses]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle>(Glr) Semantic Fluency Storm</CardTitle>
        <CardDescription>Name as many items as you can for the given category.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {gameState === 'idle' && (
          <Button onClick={handleStart} size="lg">Start Game</Button>
        )}
        
        {gameState === 'running' && (
          <div className="w-full space-y-4">
            <div className="flex justify-between w-full text-lg font-mono">
              <span>Time: {timeLeft}s</span>
              <span>Score: {responses.length}</span>
            </div>
            <div className={cn("p-4 bg-muted rounded-lg w-full text-center transition-all", switched && timeLeft > 20 && "bg-primary/20 animate-pulse")}>
              <p className="text-xl font-semibold">{prompt?.text}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input 
                type="text" 
                value={currentInput}
                onChange={handleInputChange}
                placeholder="Type your answer..."
                autoFocus
              />
              <Button type="submit">Enter</Button>
            </form>
            <div className="h-6 text-sm font-semibold">
              {inlineFeedback.message && (
                <p className={cn("animate-in fade-in text-center", inlineFeedback.type === 'success' ? 'text-green-600' : 'text-amber-600')}>
                  {inlineFeedback.message}
                </p>
              )}
            </div>
            <div className="p-4 border rounded-lg min-h-[100px] w-full flex flex-wrap gap-2">
              {responses.map((res, index) => (
                <Badge key={index} variant="secondary">{res}</Badge>
              ))}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center space-y-4">
            <CardTitle>Time's Up!</CardTitle>
            <p className="text-xl">You named <span className="font-bold text-primary">{responses.length}</span> items.</p>
            <div className="p-4 border rounded-lg max-h-48 overflow-y-auto w-full flex flex-wrap justify-center gap-2">
              {responses.map((res, index) => (
                <Badge key={index} variant="secondary">{res}</Badge>
              ))}
            </div>
            <Button onClick={handleStart} size="lg">Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
