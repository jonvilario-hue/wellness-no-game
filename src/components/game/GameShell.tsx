'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Settings, ArrowLeft, Play, Info, Trophy, ChevronRight, Activity, Sparkles } from 'lucide-react';
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
  variant?: 'drill' | 'flow';
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
  backHref,
  breadcrumb,
  variant = 'drill'
}: GameShellProps) {
  const router = useRouter();
  const isFlow = variant === 'flow';

  const resolvedBackHref = backHref || "/skills?tab=music";
  const resolvedBreadcrumb = breadcrumb || ["Music", "Freeflow", gameName];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
          {resolvedBreadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              {i < resolvedBreadcrumb.length - 1 ? (
                <Link href={i === 0 ? "/skills?tab=music" : resolvedBackHref} className="hover:text-primary transition-colors">
                  {crumb}
                </Link>
              ) : (
                <span>{crumb}</span>
              )}
              {i < resolvedBreadcrumb.length - 1 && <ChevronRight className="w-2 h-2" />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href={resolvedBackHref}><ArrowLeft className="w-5 h-5" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{gameName}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          {!isFlow && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-muted-foreground">Score</p>
                <p className="text-2xl font-black text-primary">{score}</p>
              </div>
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          )}
          {isFlow && gameState === 'playing' && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 animate-pulse">
              <Activity className="w-4 h-4 text-destructive" />
              <span className="text-[10px] font-black uppercase text-destructive tracking-widest">Live Capture</span>
            </div>
          )}
        </div>
      </header>

      {!isFlow && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
            <span>Progress</span>
            <span>{currentRound} / {totalRounds}</span>
          </div>
          <Progress value={(currentRound / totalRounds) * 100} className="h-1.5" />
        </div>
      )}

      <main className="relative min-h-[500px] flex items-center justify-center bg-card rounded-2xl border shadow-sm overflow-hidden p-8">
        {gameState === 'idle' && (
          <div className="max-w-md mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-4">
              <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto">
                <Play className="w-12 h-12 text-primary fill-current" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight">{isFlow ? "Ready to Flow?" : "Ready to Start?"}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            </div>

            <div className="space-y-4 bg-muted/30 p-6 rounded-2xl border border-primary/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 mb-4">
                <Info className="w-3 h-3" /> {isFlow ? "Flow Protocol" : "Protocol Instructions"}
              </h4>
              <ul className="space-y-3 text-left">
                {instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-xs leading-relaxed">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                    <p className="flex-1 pt-0.5">{step}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl" onClick={onStart}>
              {isFlow ? "Drop In" : "Begin Session"}
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
            {isFlow ? (
              <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto">
                <Sparkles className="w-20 h-20 text-primary" />
              </div>
            ) : (
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
            )}
            <div className="space-y-2">
              <h2 className="text-4xl font-black uppercase tracking-tight">{isFlow ? "Flow Captured" : "Session Complete!"}</h2>
              <p className="text-muted-foreground">{isFlow ? "Session synced. Time to hear your creative choices." : "Your performance metrics have been synced locally."}</p>
            </div>
            {!isFlow && (
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-[10px] font-black uppercase text-muted-foreground">Final Score</p>
                  <p className="text-3xl font-black">{score}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-[10px] font-black uppercase text-muted-foreground">Accuracy</p>
                  <p className="text-3xl font-black">{Math.round((score / totalRounds) * 100) || 0}%</p>
                </div>
              </div>
            )}
            <div className="flex gap-3 justify-center pt-4">
              <Button variant="outline" size="lg" asChild className="rounded-2xl px-8 font-bold">
                <Link href={resolvedBackHref}>Return to Hub</Link>
              </Button>
              <Button size="lg" onClick={onStart} className="rounded-2xl px-10 font-bold">{isFlow ? "Drop In Again" : "Play Again"}</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
