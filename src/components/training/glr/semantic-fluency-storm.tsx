
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTrainingFocus } from "@/hooks/use-training-focus";
import { useTrainingOverride } from "@/hooks/use-training-override";
import { usePerformanceStore } from "@/hooks/use-performance-store";

const neutralPrompts = [
  "Things you find in a kitchen",
  "Types of fruit",
  "Animals that live in the jungle",
  "Words that start with 'C'",
  "Things that are cold",
  "Musical instruments",
];

const mathPrompts = [
  "Prime numbers under 50",
  "Even numbers between 10 and 30",
  "Types of geometric shapes",
  "Things measured in meters",
  "Multiples of 7",
  "Mathematical symbols",
];

export function SemanticFluencyStorm() {
  const [gameState, setGameState] = useState('idle'); // idle, running, finished
  const [prompt, setPrompt] = useState('');
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentInput, setCurrentInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [switched, setSwitched] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const promptHistory = useRef<string[]>([]);
  
  const { focus: globalFocus, isLoaded: isGlobalFocusLoaded } = useTrainingFocus();
  const { override, isLoaded: isOverrideLoaded } = useTrainingOverride();
  const { logGameResult } = usePerformanceStore();

  const isLoaded = isGlobalFocusLoaded && isOverrideLoaded;
  const currentMode = isLoaded ? (override || globalFocus) : 'neutral';
  const prompts = currentMode === 'math' ? mathPrompts : neutralPrompts;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'running' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        // Category switch halfway through
        if (timeLeft === 23 && !switched) {
          setSwitched(true);
          let newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
          while (promptHistory.current.includes(newPrompt)) {
            newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
          }
          setPrompt(newPrompt);
          promptHistory.current.push(newPrompt);
        }
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'running') {
      setGameState('finished');
      const time = (Date.now() - startTime) / 1000;
      logGameResult('Glr', currentMode, { score: responses.length, time });
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, switched, prompts, responses.length, currentMode, logGameResult, startTime]);

  const handleStart = () => {
    let initialPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    promptHistory.current = [initialPrompt];
    setPrompt(initialPrompt);
    
    setGameState('running');
    setTimeLeft(45);
    setResponses([]);
    setCurrentInput('');
    setSwitched(false);
    setStartTime(Date.now());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !responses.includes(currentInput.trim().toLowerCase())) {
      setResponses([...responses, currentInput.trim().toLowerCase()]);
    }
    setCurrentInput('');
  };

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-2xl text-center">
        <CardContent className="flex items-center justify-center h-48">
          <p>Loading game...</p>
        </CardContent>
      </Card>
    );
  }

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
              <p className="text-xl font-semibold">{prompt}</p>
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
