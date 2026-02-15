'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFlashcardStore } from '@/store/srs-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import type { Rating } from '@/types/srs-types';

export default function StudySessionPage() {
  const router = useRouter();
  const { 
    studySession, 
    getCurrentCard, 
    flipCard, 
    rateCard, 
    endStudySession,
    getPreviewIntervalsForCurrent 
  } = useFlashcardStore();

  const currentCard = getCurrentCard();
  const intervals = getPreviewIntervalsForCurrent();

  // Redirect if session is empty or deck not selected
  useEffect(() => {
    if (!studySession.deckId) {
      router.push('/srs');
    }
  }, [studySession.deckId, router]);

  if (!currentCard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-black uppercase">Session Complete</h1>
        <p className="text-muted-foreground">You've finished all due cards in this queue.</p>
        <Button onClick={() => { endStudySession(); router.push('/srs'); }} size="lg">
          Return to Decks
        </Button>
      </div>
    );
  }

  const progress = (studySession.currentIndex / studySession.queue.length) * 100;

  const handleRating = (rating: Rating) => {
    rateCard(rating);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => { endStudySession(); router.push('/srs'); }}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Exit
        </Button>
        <div className="text-xs font-mono opacity-50">
          Card {studySession.currentIndex + 1} of {studySession.queue.length}
        </div>
      </div>

      <Progress value={progress} className="h-1" />

      <Card 
        className={`min-h-[400px] flex items-center justify-center p-12 text-center text-2xl font-medium cursor-pointer transition-all duration-500 transform ${studySession.isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => !studySession.isFlipped && flipCard()}
      >
        <CardContent>
          {studySession.isFlipped ? currentCard.back : currentCard.front}
          {!studySession.isFlipped && (
            <p className="text-xs absolute bottom-8 left-0 right-0 opacity-30 uppercase tracking-widest">
              Click to flip
            </p>
          )}
        </CardContent>
      </Card>

      {studySession.isFlipped && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4">
          {(['again', 'hard', 'good', 'easy'] as Rating[]).map((r) => (
            <Button
              key={r}
              onClick={() => handleRating(r)}
              variant={r === 'again' ? 'destructive' : 'secondary'}
              className="flex flex-col h-16"
            >
              <span className="capitalize">{r}</span>
              <span className="text-[10px] opacity-60">{intervals?.[r] || '-'}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
