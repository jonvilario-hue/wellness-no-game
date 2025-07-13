
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type GameMode = 'mimic' | 'find';

export function ToneGridChallenge() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gameState, setGameState] = useState('idle'); // idle, playing, answering, feedback
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('');
  const [highlightedNote, setHighlightedNote] = useState<number | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('mimic');
  const [targetTone, setTargetTone] = useState<number | null>(null);

  useEffect(() => {
    // This effect runs only on the client
    if (typeof window !== 'undefined' && !audioContext) {
      setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
    }
    // Cleanup function to close the audio context
    return () => {
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
        }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playTone = (freq: number, duration = 0.3) => {
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };
  
  const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

  const generateSequence = (currentLevel: number) => {
    const newSequence = [];
    const seqLength = gameMode === 'mimic' ? currentLevel + 2 : 5;
    for (let i = 0; i < seqLength; i++) {
      newSequence.push(Math.floor(Math.random() * frequencies.length));
    }
    setSequence(newSequence);
    return newSequence;
  };
  
  const playSequence = (seq: number[], interval = 400) => {
    if (!audioContext) return;
    seq.forEach((noteIndex, i) => {
      setTimeout(() => {
        setHighlightedNote(noteIndex);
        playTone(frequencies[noteIndex]);
        setTimeout(() => setHighlightedNote(null), 300);
      }, i * interval);
    });
  };
  
  const startLevel = (currentLevel: number) => {
    setUserSequence([]);
    const newMode = Math.random() > 0.4 ? 'mimic' : 'find';
    setGameMode(newMode);
    
    if (newMode === 'mimic') {
      setMessage('Listen carefully...');
      setGameState('playing');
      const newSeq = generateSequence(currentLevel);
      setTimeout(() => {
        playSequence(newSeq);
        setTimeout(() => {
          setMessage('Your turn: Repeat the sequence');
          setGameState('answering');
        }, newSeq.length * 400 + 500);
      }, 1000);
    } else { // find mode
      const newTarget = Math.floor(Math.random() * frequencies.length);
      setTargetTone(newTarget);
      setMessage('Listen for this target tone...');
      setGameState('playing');
      setTimeout(() => {
        playTone(frequencies[newTarget], 0.5);
        setTimeout(() => {
          setMessage('Now, was it in this sequence?');
          const newSeq = generateSequence(currentLevel);
          setTimeout(() => {
            playSequence(newSeq, 500);
            setTimeout(() => {
              setMessage('Was the target tone in the sequence?');
              setGameState('answering');
            }, newSeq.length * 500 + 500);
          }, 1000);
        }, 1000);
      }, 500);
    }
  };
  
  const handleStart = () => {
    if (audioContext?.state === 'suspended') {
        audioContext.resume();
    }
    setLevel(1);
    startLevel(1);
  };
  
  const handleNextLevel = () => {
    setLevel(level + 1);
    startLevel(level + 1);
  };

  const handleIncorrect = () => {
    setMessage(`Not quite. Let's try level ${level} again.`);
    setTimeout(() => {
        startLevel(level);
    }, 1500);
  };

  const handleUserInput = (index: number) => {
    if (gameState !== 'answering' || gameMode !== 'mimic') return;
    playTone(frequencies[index]);
    const newAttempt = [...userSequence, index];
    setUserSequence(newAttempt);
    
    if (newAttempt.length === sequence.length) {
      setGameState('feedback');
      if (JSON.stringify(newAttempt) === JSON.stringify(sequence)) {
        setMessage('Correct! Next level.');
        setTimeout(handleNextLevel, 1500);
      } else {
        setMessage('Incorrect. The correct sequence was...');
        setTimeout(() => {
            playSequence(sequence, 200);
            setTimeout(handleIncorrect, sequence.length * 200 + 500);
        }, 500);
      }
    }
  };
  
  const handleFindAnswer = (wasPresent: boolean) => {
    if (gameState !== 'answering' || gameMode !== 'find' || targetTone === null) return;
    setGameState('feedback');
    const isCorrect = sequence.includes(targetTone) === wasPresent;
    if (isCorrect) {
        setMessage('Correct! Next level.');
        setTimeout(handleNextLevel, 1500);
    } else {
        setMessage(sequence.includes(targetTone) ? 'Incorrect. The tone was there.' : 'Incorrect. The tone was not there.');
        setTimeout(handleIncorrect, 1500);
    }
  };

  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle>(Ga) Tone Grid Challenge</CardTitle>
        <CardDescription>Listen to the sequence of tones, then follow the instructions.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="text-xl font-mono">Level: {level}</div>
        
        {gameState === 'idle' && <Button onClick={handleStart} size="lg">Start</Button>}
        
        {gameState !== 'idle' && (
          <div className="w-full">
            <p className="h-10 text-lg text-primary mb-4 flex items-center justify-center">{message}</p>
            {gameMode === 'mimic' && (
              <>
                <div className="grid grid-cols-4 gap-4">
                  {frequencies.map((_, index) => (
                    <Button 
                      key={index} 
                      onClick={() => handleUserInput(index)} 
                      disabled={gameState !== 'answering'}
                      className={cn(
                          "aspect-square h-auto text-2xl transition-all",
                          highlightedNote === index && 'bg-primary scale-110'
                      )}
                      variant="secondary"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
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
              </>
            )}
            {gameMode === 'find' && gameState === 'answering' && (
              <div className="flex justify-center gap-4 animate-in fade-in">
                <Button onClick={() => handleFindAnswer(true)} size="lg">Yes</Button>
                <Button onClick={() => handleFindAnswer(false)} size="lg">No</Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
