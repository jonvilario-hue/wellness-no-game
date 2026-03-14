'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSrsUser, useSrsCollection, getDueCardsQuery, srsUpdateCard, Flashcard, ensureSrsAuth } from '@/lib/game/srs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, Brain, Zap, Clock, 
  ArrowLeft, Loader2, Sparkles, Trophy
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ReviewPage() {
  const { user, loading: authLoading } = useSrsUser();
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Auto-auth on load
  useEffect(() => {
    ensureSrsAuth();
  }, []);

  const query = useMemo(() => {
    if (!user?.uid || !activeDeckId) return null;
    return getDueCardsQuery(user.uid, activeDeckId);
  }, [user?.uid, activeDeckId]);

  const { data: cards, isLoading } = useSrsCollection<Flashcard>(query as any);

  const currentCard = cards?.[currentIndex];

  const handleRating = async (rating: number) => {
    if (!user || !currentCard || !activeDeckId) return;

    await srsUpdateCard(user.uid, activeDeckId, currentCard.id, rating, currentCard);
    
    if (currentIndex < (cards?.length || 0) - 1) {
      setCurrentIndex(prev => prev + 1);
      setFlipped(false);
    } else {
      setIsFinished(true);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto">
          <Trophy className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight">Review Complete!</h1>
        <p className="text-muted-foreground">You've cleared your queue for this deck. Your cognitive map is up to date.</p>
        <Button asChild size="lg" className="w-full">
          <Link href="/study">Back to Scholar Hub</Link>
        </Button>
      </div>
    );
  }

  if (!activeDeckId) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-8 px-4">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 hover:bg-transparent">
            <Link href="/study"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
          </Button>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Review Laboratory</h1>
          <p className="text-muted-foreground italic">Select a deck to begin your session.</p>
        </div>

        <div className="grid gap-4">
          {/* Deck selection would typically come from another collection, 
              but for MVP we suggest picking from the Scholar Hub */}
          <Card className="p-8 text-center border-dashed bg-muted/20">
            <Brain className="mx-auto h-12 w-12 text-primary opacity-20 mb-4" />
            <p className="text-sm text-muted-foreground">
              Please open a deck from the Scholar Hub to start reviewing.
            </p>
            <Button asChild variant="secondary" className="mt-6">
              <Link href="/study">Open Scholar Hub</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold">No Cards Due!</h2>
        <p className="text-muted-foreground">Great job! You've completed all scheduled reviews for this deck.</p>
        <Button variant="outline" onClick={() => setActiveDeckId(null)}>Switch Deck</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => setActiveDeckId(null)} className="p-0 hover:bg-transparent text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Exit
        </Button>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="font-black uppercase text-[10px]">{currentIndex + 1} / {cards?.length}</Badge>
          <Progress value={((currentIndex + 1) / (cards?.length || 1)) * 100} className="w-32 h-1.5" />
        </div>
      </div>

      <Card 
        className={cn(
          "min-h-[400px] flex flex-col items-center justify-center p-12 text-center cursor-pointer transition-all duration-500 transform-gpu border-2",
          flipped ? "bg-card border-primary/20" : "bg-primary/[0.02] border-primary/5 hover:border-primary/20"
        )}
        onClick={() => !flipped && setFlipped(true)}
      >
        <CardContent className="space-y-8">
          <div className="text-3xl font-bold leading-tight">
            {currentCard.front}
          </div>
          
          <AnimatePresence>
            {flipped && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 border-t border-primary/10 w-full"
              >
                <p className="text-xl text-muted-foreground">{currentCard.back}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!flipped && (
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-40 animate-pulse mt-12">
              Click to reveal
            </p>
          )}
        </CardContent>
      </Card>

      {flipped && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2">
          <Button onClick={() => handleRating(1)} variant="destructive" className="h-16 flex flex-col gap-1">
            <span className="font-bold">Again</span>
            <span className="text-[9px] uppercase font-black opacity-60">(1 Day)</span>
          </Button>
          <Button onClick={() => handleRating(2)} variant="secondary" className="h-16 flex flex-col gap-1 border-primary/10">
            <span className="font-bold">Hard</span>
            <span className="text-[9px] uppercase font-black opacity-60">(4 Days)</span>
          </Button>
          <Button onClick={() => handleRating(3)} variant="secondary" className="h-16 flex flex-col gap-1 border-primary/10">
            <span className="font-bold">Good</span>
            <span className="text-[9px] uppercase font-black opacity-60">(7 Days)</span>
          </Button>
          <Button onClick={() => handleRating(4)} className="h-16 flex flex-col gap-1">
            <span className="font-bold">Easy</span>
            <span className="text-[9px] uppercase font-black opacity-60">(14 Days)</span>
          </Button>
        </div>
      )}
    </div>
  );
}
