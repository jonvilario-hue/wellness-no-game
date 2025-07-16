
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { usePerformanceStore } from "@/hooks/use-performance-store";
import { useToast } from "@/components/ui/use-toast";
import { getSuccessFeedback, getFailureFeedback } from "@/lib/feedback-system";

type Prompt = {
    text: string;
    answers: string[];
};

const musicPrompts: Prompt[] = [
    { text: "Musical instruments", answers: ["piano", "guitar", "violin", "drums", "trumpet", "flute", "cello", "saxophone", "bass", "clarinet"] },
    { text: "Music genres", answers: ["rock", "pop", "jazz", "classical", "hip hop", "electronic", "country", "blues", "reggae", "folk"] },
    { text: "Terms for dynamics (volume)", answers: ["piano", "forte", "crescendo", "diminuendo", "mezzopiano", "mezzoforte", "pianissimo", "fortissimo"] },
    { text: "Notes in the C Major scale", answers: ["c", "d", "e", "f", "g", "a", "b"] },
];

export default function MusicRecall() {
  const [gameState, setGameState] = useState('idle');
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentInput, setCurrentInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [switched, setSwitched] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [inlineFeedback, setInlineFeedback] = useState({ message: '', type: '' });
  const promptHistory = useRef<string[]>([]);
  const { toast } = useToast();
  const { logGameResult } = usePerformanceStore();
  const timerRef = useRef<NodeJS.Timeout>();
  
  const prompts = musicPrompts;

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
    setPrompt(getNewPrompt());
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
      logGameResult('Glr', 'music', { score: responses.length, time });
    }
    return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState, timeLeft, switched, getNewPrompt, logGameResult, responses.length, startTime]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = currentInput.trim().toLowerCase();

    if (!cleanInput || !prompt) return;

    if (responses.includes(cleanInput)) {
      setCurrentInput('');
      return;
    }

    if (prompt.answers.includes(cleanInput)) {
      setInlineFeedback({ message: getSuccessFeedback('Glr'), type: 'success' });
      const newResponses = [...responses, cleanInput];
      setResponses(newResponses);

      const answersForPrompt = newResponses.filter(r => prompt.answers.includes(r));
      if (answersForPrompt.length === prompt.answers.length) {
        toast({ title: "Category Complete!", description: "Great job! Here's a new category." });
        setPrompt(getNewPrompt());
        setTimeLeft(prev => Math.min(45, prev + 5));
      }
    } else {
      setInlineFeedback({ message: getFailureFeedback('Glr'), type: 'failure' });
    }
    
    setTimeout(() => setInlineFeedback({ message: '', type: '' }), 1500);
    setCurrentInput('');
  }, [currentInput, responses, prompt, toast, getNewPrompt]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle>(Glr) Music Knowledge Recall</CardTitle>
        <CardDescription>Name as many items as you can for the given musical category.</CardDescription>
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
              <Input type="text" value={currentInput} onChange={e => setCurrentInput(e.target.value)} placeholder="Type your answer..." autoFocus/>
              <Button type="submit">Enter</Button>
            </form>
            <div className="h-6 text-sm font-semibold">
              {inlineFeedback.message && (
                <p className={cn("animate-in fade-in text-center", inlineFeedback.type === 'success' ? 'text-green-600' : 'text-amber-600')}>{inlineFeedback.message}</p>
              )}
            </div>
            <div className="p-4 border rounded-lg min-h-[100px] w-full flex flex-wrap gap-2">
              {responses.map((res, index) => <Badge key={index} variant="secondary">{res}</Badge>)}
            </div>
          </div>
        )}
        {gameState === 'finished' && (
          <div className="text-center space-y-4">
            <CardTitle>Time's Up!</CardTitle>
            <p className="text-xl">You named <span className="font-bold text-primary">{responses.length}</span> items.</p>
            <div className="p-4 border rounded-lg max-h-48 overflow-y-auto w-full flex flex-wrap justify-center gap-2">
              {responses.map((res, index) => <Badge key={index} variant="secondary">{res}</Badge>)}
            </div>
            <Button onClick={handleStart} size="lg">Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
