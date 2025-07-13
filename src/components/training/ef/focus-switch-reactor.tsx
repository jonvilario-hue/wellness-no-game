
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTrainingFocus } from "@/hooks/use-training-focus";
import { useTrainingOverride } from "@/hooks/use-training-override";
import { usePerformanceStore } from "@/hooks/use-performance-store";

// --- Neutral Mode Config ---
const colorOptions = [
    { name: 'DESTRUCTIVE', class: 'text-destructive' },
    { name: 'PRIMARY', class: 'text-primary' },
    { name: 'ACCENT', class: 'text-accent' },
    { name: 'CHART-3', class: 'text-chart-3' },
];
type NeutralRule = 'color' | 'word' | 'no_go';
const neutralRules: NeutralRule[] = ['color', 'word', 'no_go'];


// --- Math Mode Config ---
type MathRule = 'parity' | 'primality' | 'no_go';
const mathRules: MathRule[] = ['parity', 'primality', 'no_go'];

const isPrime = (num: number) => {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};


export function FocusSwitchReactor() {
  const [gameState, setGameState] = useState('idle'); // idle, running, finished
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [rule, setRule] = useState<NeutralRule | MathRule>('word');
  const [stimulus, setStimulus] = useState<any>({ word: 'PRIMARY', color: 'text-primary', value: 7 });

  const ruleRef = useRef(rule);
  const { focus: globalFocus, isLoaded: isGlobalFocusLoaded } = useTrainingFocus();
  const { override, isLoaded: isOverrideLoaded } = useTrainingOverride();
  const { logGameResult } = usePerformanceStore();
  
  const isLoaded = isGlobalFocusLoaded && isOverrideLoaded;
  const currentMode = isLoaded ? (override || globalFocus) : 'neutral';

  useEffect(() => {
    ruleRef.current = rule;
  }, [rule]);

  const generateNeutralStimulus = () => {
    const randomWord = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setStimulus({ word: randomWord.name, color: randomColor.class });
  };
  
  const generateMathStimulus = () => {
    const value = Math.floor(Math.random() * 20) + 2; // numbers from 2 to 21
    setStimulus({ value });
  }

  const generateStimulus = () => {
    if (currentMode === 'math') {
        generateMathStimulus();
    } else {
        generateNeutralStimulus();
    }
  }

  const generateRule = () => {
    if (currentMode === 'math') {
        const ruleIndex = Math.floor(Math.random() * 5); // 0,1,2,3,4
        if (ruleIndex < 2) setRule('parity'); // 40%
        else if (ruleIndex < 4) setRule('primality'); // 40%
        else setRule('no_go'); // 20%
    } else {
        const ruleIndex = Math.floor(Math.random() * 5);
        if (ruleIndex < 2) setRule('color');
        else if (ruleIndex < 4) setRule('word');
        else setRule('no_go');
    }
  };
  
  const restartGame = () => {
    setScore(0);
    setTimeLeft(45);
    setStartTime(Date.now());
    setGameState('running');
    generateStimulus();
    generateRule();
  }

  const finishGame = () => {
    setGameState('finished');
    const time = (Date.now() - startTime) / 1000;
    logGameResult('EF', currentMode, { score, time });
  }

  useEffect(() => {
    if (gameState === 'running' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && gameState === 'running') {
      finishGame();
    }
  }, [gameState, timeLeft]);
  
  // This effect handles mode changes.
  useEffect(() => {
    if (isLoaded) {
      setGameState('idle');
      setScore(0);
      setTimeLeft(45);
    }
  }, [currentMode, isLoaded]);
  
  const processNextTurn = (correct: boolean) => {
    setScore(prev => correct ? prev + 1 : Math.max(0, prev - 1));
    // Increase rule switch randomness. It could switch now, or in the next few turns.
    if (Math.random() < 0.3) { 
      generateRule();
    }
    generateStimulus();
  }

  const handleAnswer = (answer: string) => {
    if (gameState !== 'running') return;
    
    if (rule === 'no_go') {
      processNextTurn(false); // Penalty for responding on a no-go trial
      return;
    }
    
    let isCorrect = false;
    if (currentMode === 'neutral') {
        let correctAnswer;
        if (rule === 'word') {
            correctAnswer = stimulus.word;
        } else { // rule is 'color'
            const correctOption = colorOptions.find(opt => opt.class === stimulus.color);
            correctAnswer = correctOption?.name;
        }
        isCorrect = (answer === correctAnswer);
    } else { // Math mode
        const num = stimulus.value;
        if (rule === 'parity') {
            const parity = num % 2 === 0 ? 'EVEN' : 'ODD';
            isCorrect = (answer === parity);
        } else if (rule === 'primality') {
            const primality = isPrime(num) ? 'PRIME' : 'COMPOSITE';
            isCorrect = (answer === primality);
        }
    }
    
    processNextTurn(isCorrect);
  };
  
  // This function is for when the user correctly waits on a "no_go" trial
  useEffect(() => {
    let noGoTimer: NodeJS.Timeout;
    if (gameState === 'running' && rule === 'no_go') {
        noGoTimer = setTimeout(() => {
            if(ruleRef.current === 'no_go') {
               processNextTurn(true); // Reward for correctly inhibiting response
            }
        }, 1500); // 1.5 seconds to wait
    }
    return () => clearTimeout(noGoTimer);
  }, [rule, stimulus, gameState]);


  const getRuleText = () => {
      if (rule === 'color') return 'Respond to the COLOR';
      if (rule === 'word') return 'Respond to the WORD';
      if (rule === 'parity') return 'Is the number EVEN or ODD?';
      if (rule === 'primality') return 'Is the number PRIME or COMPOSITE?';
      if (rule === 'no_go') return "DON'T RESPOND";
      return '';
  }
  
  const mathAnswerOptions = useMemo(() => {
      if (rule === 'parity') return ['EVEN', 'ODD'];
      if (rule === 'primality') return ['PRIME', 'COMPOSITE'];
      // Fallback for when the rule is 'no_go' but we still need to render buttons
      return ['EVEN', 'ODD', 'PRIME', 'COMPOSITE'];
  }, [rule]);

  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle>(EF) Focus Switch Reactor</CardTitle>
        <CardDescription>Inhibition & Task-Switching Challenge. Pay attention to the rule!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {gameState === 'idle' && (
          <Button onClick={restartGame} size="lg" disabled={!isLoaded}>
              {isLoaded ? "Start Game" : "Loading..."}
          </Button>
        )}
        
        {gameState === 'running' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex justify-between w-full text-lg font-mono">
              <span>Score: {score}</span>
              <span>Time: {timeLeft}s</span>
            </div>
            <div className="p-8 bg-muted rounded-lg w-full transition-colors">
              <p className="text-xl mb-4">Rule: <span className="font-bold text-primary uppercase">{getRuleText()}</span></p>
              <div className="text-6xl font-extrabold" >
                {currentMode === 'neutral' ? (
                     <span className={stimulus.color}>{stimulus.word}</span>
                ) : (
                    <span className="text-primary">{stimulus.value}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {currentMode === 'neutral' ? (
                colorOptions.map(color => (
                    <Button key={color.name} onClick={() => handleAnswer(color.name)} variant="secondary" size="lg" disabled={rule === 'no_go'}>
                    {color.name}
                    </Button>
                ))
              ) : (
                 mathAnswerOptions.map(option => (
                     <Button key={option} onClick={() => handleAnswer(option)} variant="secondary" size="lg" disabled={rule === 'no_go'}>
                         {option}
                     </Button>
                 ))
              )}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="flex flex-col items-center gap-4">
            <CardTitle>Game Over!</CardTitle>
            <p className="text-xl">Your final score is: <span className="text-primary font-bold">{score}</span></p>
            <Button onClick={restartGame} size="lg">Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
