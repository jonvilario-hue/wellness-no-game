'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

export function ToneGridChallenge() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gameState, setGameState] = useState('idle'); // idle, playing, answering, feedback
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('');

  // Initialize AudioContext on client-side only
  useEffect(() => {
    // Check if window is defined (runs only on client)
    if (typeof window !== 'undefined') {
      setAudioContext(new window.AudioContext());
    }
  }, []);

  const playTone = (freq: number) => {
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  };
  
  const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < level + 2; i++) {
      newSequence.push(Math.floor(Math.random() * frequencies.length));
    }
    setSequence(newSequence);
    return newSequence;
  };
  
  const playSequence = (seq: number[]) => {
    if (!audioContext) return;
    seq.forEach((noteIndex, i) => {
      setTimeout(() => {
        playTone(frequencies[noteIndex]);
      }, i * 400);
    });
  };
  
  const handleStartLevel = () => {
    setUserSequence([]);
    setMessage('Listen carefully...');
    setGameState('playing');
    const newSeq = generateSequence();
    setTimeout(() => {
      playSequence(newSeq);
      setTimeout(() => {
        setMessage('Your turn!');
        setGameState('answering');
      }, newSeq.length * 400 + 500);
    }, 1000);
  };
  
  const handleUserInput = (index: number) => {
    if (gameState !== 'answering') return;
    playTone(frequencies[index]);
    const newAttempt = [...userSequence, index];
    setUserSequence(newAttempt);
    
    if (newAttempt.length === sequence.length) {
      setGameState('feedback');
      if (JSON.stringify(newAttempt) === JSON.stringify(sequence)) {
        setMessage('Correct! Next level.');
        setTimeout(() => {
          setLevel(level + 1);
          handleStartLevel();
        }, 1500);
      } else {
        setMessage(`Incorrect. Let's try level ${level} again.`);
        setTimeout(handleStartLevel, 1500);
      }
    }
  };


  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle>Tone Grid Challenge</CardTitle>
        <CardDescription>Listen to the sequence of tones, then repeat it.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="text-xl font-mono">Level: {level}</div>
        
        {gameState === 'idle' && <Button onClick={handleStartLevel} size="lg">Start</Button>}
        
        {gameState !== 'idle' && (
          <div className="w-full">
            <p className="h-6 text-lg text-primary mb-4">{message}</p>
            <div className="grid grid-cols-4 gap-4">
              {frequencies.map((_, index) => (
                <Button 
                  key={index} 
                  onClick={() => handleUserInput(index)} 
                  disabled={gameState !== 'answering'}
                  className="aspect-square h-auto text-2xl"
                  variant="secondary"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <Button 
            onClick={() => playSequence(sequence)} 
            disabled={gameState !== 'answering' || sequence.length === 0}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            <Volume2 className="mr-2"/>
            Replay Sequence
          </Button>
      </CardContent>
    </Card>
  );
}
