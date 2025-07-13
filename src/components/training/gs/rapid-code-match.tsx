
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

const symbols = ['★', '●', '▲', '■', '◆', '✚', '❤', '⚡', '☺'];
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NoiseOverlay = () => (
  <div 
    className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")` }}
  />
);

export function RapidCodeMatch() {
  const [gameState, setGameState] = useState('idle'); // idle, running, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentSymbol, setCurrentSymbol] = useState('');

  const keyMap = useMemo(() => {
    if (gameState !== 'running') return {};
    const shuffledSymbols = [...symbols].sort(() => Math.random() - 0.5);
    const map: { [key: string]: number } = {};
    shuffledSymbols.slice(0, 7).forEach((symbol, index) => {
      map[symbol] = digits[index];
    });
    return map;
  }, [gameState]);

  const keyEntries = useMemo(() => Object.entries(keyMap), [keyMap]);

  useEffect(() => {
    if (gameState === 'running' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setGameState('finished');
    }
  }, [gameState, timeLeft]);
  
  useEffect(() => {
    if (gameState === 'running' && keyEntries.length > 0) {
      const symbolsInKey = Object.keys(keyMap);
      setCurrentSymbol(symbolsInKey[Math.floor(Math.random() * symbolsInKey.length)]);
    }
  }, [gameState, keyMap, keyEntries]);

  const handleStart = () => {
    setScore(0);
    setTimeLeft(60);
    setGameState('running');
  };

  const handleAnswer = (digit: number) => {
    if (keyMap[currentSymbol] === digit) {
      setScore(score + 1);
    } else {
      setScore(Math.max(0, score - 1));
    }
    const symbolsInKey = Object.keys(keyMap);
    setCurrentSymbol(symbolsInKey[Math.floor(Math.random() * symbolsInKey.length)]);
  };

  return (
    <Card className="w-full max-w-4xl text-center">
      <CardHeader>
        <CardTitle>Rapid Code Match</CardTitle>
        <CardDescription>Match the symbol to the correct digit using the key as fast as you can.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {gameState === 'idle' && (
          <Button onClick={handleStart} size="lg">Start Game</Button>
        )}
        
        {gameState === 'running' && (
          <div className="w-full">
            <div className="flex justify-between w-full text-lg font-mono mb-4">
              <span>Score: {score}</span>
              <span>Time: {timeLeft}s</span>
            </div>
            <div className="flex justify-center gap-4 p-3 bg-muted rounded-lg mb-6 flex-wrap">
              {keyEntries.map(([symbol, digit]) => (
                <div key={symbol} className="flex flex-col items-center p-2">
                  <span className="text-3xl font-bold text-primary">{symbol}</span>
                  <span className="text-xl font-mono">{digit}</span>
                </div>
              ))}
            </div>

            <div className="relative inline-block mb-6">
              <div className="text-8xl font-extrabold text-primary">
                {currentSymbol}
              </div>
              <NoiseOverlay />
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {keyEntries.map(([_, digit]) => (
                <Button key={digit} onClick={() => handleAnswer(digit)} variant="secondary" size="lg" className="text-2xl h-16">
                  {digit}
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
