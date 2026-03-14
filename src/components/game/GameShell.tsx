
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Settings, ArrowLeft, Play, Info, Trophy, ChevronRight } from 'lucide-react';
import { getPreferences, markInstructionsSeen } from '@/lib/storage/preferences';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GameShellProps {
  gameName: string;
  description: string;
  instructions: string[];
  children: React.ReactNode;
  gameState: 'idle' | 'playing' | 'complete' | 'paused';
  currentRound: number;
  totalRounds: number;
  score: number;
  onStart: () => void;
  onPauseToggle: () => void;
  backHref?: string;
  breadcrumb?: string[];
}

export function GameShell({
  gameName,
  description,
  instructions,
  children,
  gameState,
  currentRound,
  totalRounds,
  score,
  onStart,
  onPauseToggle,
  backHref = "/music/listen",
  breadcrumb = ["Music", "Listen"]
}: GameShellProps) {
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const prefs = getPreferences();
    if (!prefs.hasSeenInstructions[gameName]) {
      setShowInstructions(true);
    }
  }, [gameName]);

  const handleDismissInstructions = () => {
    setShowInstructions(false);
    markInstructionsSeen(gameName);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              <span>{crumb}</span>
              {i < breadcrumb.length - 1 && <ChevronRight className="w-2 h-2" />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href={backHref}><ArrowLeft className="w-5 h-5" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{gameName}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold uppercase text-muted-foreground">Score</p>
              <p className="text-2xl font-black text-primary">{score}</p>
            </div>
            <Button variant="outline" size="icon" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
          <span>Progress</span>
          <span>{currentRound} / {totalRounds}</span>
        </div>
        <Progress value={(currentRound / totalRounds) * 100} className="h-1.5" />
      </div>

      <main className="relative min-h-[400px] flex items-center justify-center bg-card rounded-2xl border shadow-sm overflow-hidden p-8">
        {gameState === 'idle' && (
          <div className="text-center space-y-6">
            <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto">
              <Play className="w-12 h-12 text-primary fill-current" />
            </div>
            <Button size="lg" className="px-12 h-14 text-lg font-bold rounded-2xl shadow-xl" onClick={onStart}>
              Start Session
            </Button>
            <Button variant="ghost" className="gap-2 text-muted-foreground" onClick={() => setShowInstructions(true)}>
              <Info className="w-4 h-4" /> How to play
            </Button>
          </div>
        )}

        {(gameState === 'playing' || gameState === 'paused') && children}

        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-black uppercase">Paused</h2>
            <Button size="lg" className="gap-2 rounded-2xl" onClick={onPauseToggle}>
              <Play className="w-5 h-5 fill-current" /> Resume
            </Button>
          </div>
        )}

        {gameState === 'complete' && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-4xl font-black uppercase tracking-tight">Session Complete!</h2>
              <p className="text-muted-foreground">Your performance metrics have been synced locally.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Final Score</p>
                <p className="text-3xl font-black">{score}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Accuracy</p>
                <p className="text-3xl font-black">95%</p>
              </div>
            </div>
            <div className="flex gap-3 justify-center pt-4">
              <Button variant="outline" size="lg" asChild className="rounded-2xl px-8 font-bold">
                <Link href="/music/listen">Menu</Link>
              </Button>
              <Button size="lg" onClick={onStart} className="rounded-2xl px-10 font-bold">Play Again</Button>
            </div>
          </div>
        )}
      </main>

      {showInstructions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full shadow-2xl rounded-3xl overflow-hidden border-none">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Instructions: {gameName}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {instructions.map((step, i) => (
                  <li key={i} className="flex gap-4 text-sm leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold h-12 rounded-2xl" onClick={handleDismissInstructions}>
                Got it, Let's Play
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
