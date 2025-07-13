
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Maps color names to theme-based CSS classes
const colorOptions = [
    { name: 'DESTRUCTIVE', class: 'text-destructive' },
    { name: 'PRIMARY', class: 'text-primary' },
    { name: 'ACCENT', class: 'text-accent' },
    { name: 'GREEN', class: 'text-green-500' },
];

export function FocusSwitchReactor() {
  const [gameState, setGameState] = useState('idle'); // idle, running, finished
  const [rule, setRule] = useState<'color' | 'word'>('word');
  const [stimulus, setStimulus] = useState({ word: 'PRIMARY', color: 'text-primary' });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const generateStimulus = () => {
    const randomWord = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setStimulus({ word: randomWord.name, color: randomColor.class });
  };
  
  const generateRule = () => {
    setRule(Math.random() > 0.5 ? 'color' : 'word');
  };

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
    setScore(0);
    setTimeLeft(30);
    setGameState('running');
    generateStimulus();
    generateRule();
  };

  const handleAnswer = (answer: string) => {
    let correctAnswer;
    if (rule === 'word') {
      correctAnswer = stimulus.word;
    } else { // rule is 'color'
       const correctOption = colorOptions.find(opt => opt.class === stimulus.color);
       correctAnswer = correctOption?.name;
    }
    
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
    
    // Switch rule ~30% of the time
    if(Math.random() < 0.3) {
      generateRule();
    }
    generateStimulus();
  };

  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle>Focus Switch Reactor</CardTitle>
        <CardDescription>Inhibition & Task-Switching Challenge. Pay attention to the rule!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {gameState === 'idle' && (
          <Button onClick={handleStart} size="lg">Start Game</Button>
        )}
        
        {gameState === 'running' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex justify-between w-full text-lg font-mono">
              <span>Score: {score}</span>
              <span>Time: {timeLeft}s</span>
            </div>
            <div className="p-8 bg-muted rounded-lg w-full">
              <p className="text-xl mb-4">Rule: Respond to the <span className="font-bold text-primary uppercase">{rule}</span></p>
              <div className="text-6xl font-extrabold" >
                <span className={stimulus.color}>{stimulus.word}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {colorOptions.map(color => (
                <Button key={color.name} onClick={() => handleAnswer(color.name)} variant="secondary" size="lg">
                  {color.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="flex flex-col items-center gap-4">
            <CardTitle>Game Over!</CardTitle>
            <p className="text-xl">Your final score is: <span className="text-primary font-bold">{score}</span></p>
            <Button onClick={handleStart} size="lg">Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
