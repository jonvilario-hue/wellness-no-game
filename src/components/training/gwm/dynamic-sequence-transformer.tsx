
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemoryStick } from "lucide-react";
import { useState } from "react";

const generateSequence = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const tasks = [
  { id: 'reverse', label: "Repeat the sequence backward." },
  { id: 'alpha_only', label: "Repeat only the letters, in order." },
  { id: 'numeric_only', label: "Repeat only the numbers, in order." },
  { id: 'remove_first', label: "Repeat the sequence, removing the first character." },
  { id: 'alpha_shift', label: "Repeat the letters, shifting each forward by one (A->B, Z->A)." },
];

export function DynamicSequenceTransformer() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState('');
  const [task, setTask] = useState(tasks[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameState, setGameState] = useState('start'); // start, memorizing, answering, feedback
  const [feedback, setFeedback] = useState('');

  const startLevel = () => {
    const newSequence = generateSequence(level + 3);
    const newTask = tasks[Math.floor(Math.random() * tasks.length)];
    setSequence(newSequence);
    setTask(newTask);
    setUserAnswer('');
    setFeedback('');
    setGameState('memorizing');

    setTimeout(() => {
      setGameState('answering');
    }, 4000); // 4 seconds to memorize
  };

  const getCorrectAnswer = () => {
    switch(task.id) {
      case 'reverse':
        return sequence.split('').reverse().join('');
      case 'alpha_only':
        return sequence.replace(/[^A-Z]/g, '');
      case 'numeric_only':
        return sequence.replace(/[^0-9]/g, '');
      case 'remove_first':
        return sequence.substring(1);
      case 'alpha_shift':
        return sequence.replace(/[^A-Z]/g, '').split('').map(char => {
          if (char === 'Z') return 'A';
          return String.fromCharCode(char.charCodeAt(0) + 1);
        }).join('');
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'answering') return;
    
    setGameState('feedback');
    const correctAnswer = getCorrectAnswer();
    
    if (userAnswer.toUpperCase().trim() === correctAnswer) {
      setFeedback('Correct! Next level.');
      setTimeout(() => {
        setLevel(level + 1);
        startLevel();
      }, 2000);
    } else {
      setFeedback(`Incorrect. The answer was: ${correctAnswer}. Let's try again.`);
      setTimeout(() => {
        // Restart the same level
        startLevel();
      }, 3000);
    }
  };


  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
            <MemoryStick />
            Dynamic Sequence Transformer
        </CardTitle>
        <CardDescription>Memorize the sequence, then transform it as instructed.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 min-h-[250px] justify-center">
        
        {gameState === 'start' && (
            <div className="flex flex-col items-center gap-4">
                <div className="font-mono text-lg">Level: {level}</div>
                <Button onClick={startLevel} size="lg">Start Level {level}</Button>
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
