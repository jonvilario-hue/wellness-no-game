
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const colorOptions = [
    { name: 'DESTRUCTIVE', class: 'text-destructive' },
    { name: 'PRIMARY', class: 'text-primary' },
    { name: 'ACCENT', class: 'text-accent' },
    { name: 'CHART-3', class: 'text-chart-3' },
];

type Rule = 'color' | 'word' | 'no_go';
const rules: Rule[] = ['color', 'word', 'no_go'];

export function FocusSwitchReactor() {
  const [gameState, setGameState] = useState('idle'); // idle, running, finished
  const [rule, setRule] = useState<Rule>('word');
  const [stimulus, setStimulus] = useState({ word: 'PRIMARY', color: 'text-primary' });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  const ruleRef = useRef(rule);
  useEffect(() => {
    ruleRef.current = rule;
  }, [rule]);

  const generateStimulus = () => {
    const randomWord = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setStimulus({ word: randomWord.name, color: randomColor.class });
  };
  
  const generateRule = () => {
    // Make 'no_go' less frequent
    const ruleIndex = Math.floor(Math.random() * 5); // 0,1,2,3,4
    if (ruleIndex < 2) setRule('color'); // 40%
    else if (ruleIndex < 4) setRule('word'); // 40%
    else setRule('no_go'); // 20%
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
    setTimeLeft(45);
    setGameState('running');
    generateStimulus();
    generateRule();
  };
  
  const processNextTurn = (correct: boolean) => {
    setScore(prev => correct ? prev + 1 : Math.max(0, prev - 1));
    if (Math.random() < 0.4) { // Switch rule ~40% of the time
      generateRule();
    }
    generateStimulus();
  }

  const handleAnswer = (answer: string) => {
    if (rule === 'no_go') {
      processNextTurn(false); // Penalty for responding on a no-go trial
      return;
    }
    
    let correctAnswer;
    if (rule === 'word') {
      correctAnswer = stimulus.word;
    } else { // rule is 'color'
       const correctOption = colorOptions.find(opt => opt.class === stimulus.color);
       correctAnswer = correctOption?.name;
    }
    
    processNextTurn(answer === correctAnswer);
  };
  
  // This function is for when the user correctly waits on a "no_go" trial
  useEffect(() => {
    if (gameState === 'running' && rule === 'no_go') {
        const noGoTimer = setTimeout(() => {
            // Check again to make sure the rule hasn't changed by a fast click
            if(ruleRef.current === 'no_go') {
               processNextTurn(true); // Reward for correctly inhibiting response
            }
        }, 1500); // 1.5 seconds to wait
        return () => clearTimeout(noGoTimer);
    }
  }, [rule, stimulus, gameState]);


  const getRuleText = () => {
      if (rule === 'color') return 'Respond to the COLOR';
      if (rule === 'word') return 'Respond to the WORD';
      if (rule === 'no_go') return "DON'T RESPOND";
      return '';
  }

  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle>(EF) Focus Switch Reactor</CardTitle>
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
            <div className={cn("p-8 bg-muted rounded-lg w-full transition-colors", rule === 'no_go' && 'bg-destructive/10')}>
              <p className="text-xl mb-4">Rule: <span className="font-bold text-primary uppercase">{getRuleText()}</span></p>
              <div className="text-6xl font-extrabold" >
                <span className={stimulus.color}>{stimulus.word}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {colorOptions.map(color => (
                <Button key={color.name} onClick={() => handleAnswer(color.name)} variant="secondary" size="lg" disabled={rule === 'no_go'}>
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
