'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemoryStick, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

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
  { id: 'alpha_only', label: "Repeat only the letters in order." },
  { id: 'numeric_only', label: "Repeat only the numbers in order." },
  { id: 'remove_first', label: "Repeat the sequence, removing the first character." },
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
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGameState('feedback');
    const correctAnswer = getCorrectAnswer();
    if (userAnswer.toUpperCase() === correctAnswer) {
      setFeedback('Correct! Next level.');
      setTimeout(() => {
        setLevel(level + 1);
        setGameState('start');
      }, 2000);
    } else {
      setFeedback(`Incorrect. The answer was ${correctAnswer}. Let's try again.`);
      setTimeout(() => {
        setGameState('start');
      }, 3000);
    }
  };


  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle>Dynamic Sequence Transformer</CardTitle>
        <CardDescription>Memorize the sequence, then transform it as instructed.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="w-full text-center font-mono text-lg">Level: {level}</div>
        
        {gameState === 'start' && (
            <Button onClick={startLevel} size="lg">Start Level {level}</Button>
        )}

        {gameState === 'memorizing' && (
          <div className="text-center space-y-4">
            <h3 className="font-semibold">Memorize this sequence:</h3>
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-4xl font-mono tracking-widest">{sequence}</p>
            </div>
            <p className="text-primary text-xl font-bold animate-pulse">Time remaining to answer...</p>
          </div>
        )}

        {(gameState === 'answering' || gameState === 'feedback') && (
          <div className="w-full space-y-4 text-center">
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
          <div className="mt-4 text-center text-xl font-bold">
            <p className={feedback.startsWith('Correct') ? 'text-green-500' : 'text-red-500'}>{feedback}</p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
