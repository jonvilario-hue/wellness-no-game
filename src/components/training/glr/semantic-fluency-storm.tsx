'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const prompts = [
  "Things you find in a kitchen",
  "Types of fruit",
  "Animals that live in the jungle",
  "Words that start with 'C'",
  "Things that are cold",
];

export function SemanticFluencyStorm() {
  const [gameState, setGameState] = useState('idle'); // idle, running, finished
  const [prompt, setPrompt] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentInput, setCurrentInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  
  useEffect(() => {
    if (gameState === 'running' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setGameState('finished');
    }
  }, [gameState, timeLeft]);

  const handleStart = () => {
    setGameState('running');
    setTimeLeft(30);
    setResponses([]);
    setCurrentInput('');
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
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

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle>Semantic Fluency Storm</CardTitle>
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
            <div className="p-4 bg-muted rounded-lg w-full text-center">
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
            <div className="text-2xl font-bold">Time's Up!</div>
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
