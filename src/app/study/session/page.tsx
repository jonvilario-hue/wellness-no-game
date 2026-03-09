'use client';

import { useEffect, useState, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ThumbsUp, Loader2, Zap, Brain, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Card as CardType } from '@/types/flashcards';
import { applySpacedRepetition } from '@/lib/srs';
import { cn } from '@/lib/utils';
import { useStatsStore } from '@/hooks/use-stats-store';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';

const processContent = (text: string) => {
  if (!text) return '';
  // Support Anki sound tags if they haven't been processed by the importer
  return text.replace(/\[sound:(.*?)\]/g, (_, filename) => {
    return `<audio controls src="${filename}" class="w-full mt-4"></audio>`;
  });
};

const renderCloze = (text: string, reveal: boolean) => {
  const clozeContent = text.replace(/\{\{c\d::(.*?)\}\}/g, (_, match) => 
    reveal ? `<span class="font-bold text-primary border-b-2 border-primary/30">${match}</span>` : `<span class="font-bold text-primary bg-primary/10 px-2 rounded">[...]</span>`
  );
  return (
    <div className="prose dark:prose-invert max-w-none text-center">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({node, ...props}) => <img {...props} className="max-w-full h-auto rounded-xl mx-auto my-4 shadow-md" />,
          audio: ({node, ...props}) => <audio {...props} className="w-full mt-4" controls />
        }}
      >
        {processContent(clozeContent)}
      </ReactMarkdown>
    </div>
  );
};

function SessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams.get('deckId');

  const { cards, updateCard, decks } = useFlashcardStore();
  const { addReview } = useStatsStore();
  const { markStudySessionComplete } = useCalendarPlansStore();

  const dueCards = useMemo(() => {
    const now = new Date();
    const filtered = cards.filter(card => 
      (!deckId || card.deckId === deckId) && 
      new Date(card.dueDate) <= now &&
      !card.suspended
    );
    
    const deck = decks.find(d => d.id === deckId);
    if (deck?.settings.insertionOrder === 'random') {
        return filtered.sort(() => Math.random() - 0.5);
    }
    return filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [cards, deckId, decks]);

  const [sessionCards, setSessionCards] = useState<CardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    setSessionCards(dueCards);
    if (dueCards.length === 0) {
        setSessionComplete(true);
    }
  }, [dueCards]);

  // Handle completion tracking
  useEffect(() => {
    if (sessionComplete && deckId) {
      markStudySessionComplete('Flashcards', deckId);
    }
  }, [sessionComplete, deckId, markStudySessionComplete]);

  const currentCard = sessionCards[currentIndex];

  const handleRating = useCallback((rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    const deck = decks.find(d => d.id === currentCard.deckId);
    if (!deck) return;

    const updatedCard = applySpacedRepetition(currentCard, rating, deck.settings);
    updateCard(updatedCard);
    
    addReview({
        cardId: currentCard.id,
        deckId: currentCard.deckId,
        tag: currentCard.tags?.[0],
        rating,
        ease: updatedCard.easeFactor,
        interval: updatedCard.interval,
        lapses: rating === 'again' ? 1 : 0
    });
    
    setFeedback(rating === 'again' ? 'incorrect' : 'correct');

    setTimeout(() => {
        if (currentIndex >= sessionCards.length - 1) {
            setSessionComplete(true);
        } else {
            setCurrentIndex(currentIndex + 1);
            setFlipped(false);
            setFeedback(null);
        }
    }, 600);
  }, [currentCard, currentIndex, sessionCards.length, updateCard, addReview, decks]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (sessionComplete || !currentCard || feedback) return;
      
      if (event.key === ' ') {
        event.preventDefault();
        setFlipped(f => !f);
      }
      
      if (flipped) {
        if (event.key === '1') handleRating('again');
        if (event.key === '2') handleRating('hard');
        if (event.key === '3') handleRating('good');
        if (event.key === '4') handleRating('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipped, currentCard, sessionComplete, handleRating, feedback]);


  if (sessionComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-md mx-auto space-y-6">
        <div className="p-6 bg-primary/10 rounded-full">
            <Sparkles className="w-16 h-16 text-primary" />
        </div>
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight mb-2">Session Complete!</h1>
            <p className="text-muted-foreground">Your cognitive map has been updated. All due cards have been processed.</p>
        </div>
        <Button asChild size="lg" className="w-full h-14 text-lg font-bold">
          <Link href="/study">Return to Scholar Hub</Link>
        </Button>
      </div>
    );
  }

  if (!currentCard) {
     return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <Loader2 className="animate-spin h-10 w-10 text-primary mb-4" />
            <h1 className="text-2xl font-bold">Loading Session...</h1>
        </div>
     )
  }
  
  const progress = (currentIndex / sessionCards.length) * 100;

  const renderContent = () => {
    const isCloze = currentCard.type === 'cloze';

    if (isCloze) {
      return renderCloze(currentCard.front, flipped);
    }
    
    const contentToShow = flipped ? currentCard.back : currentCard.front;
    return (
        <div className="prose dark:prose-invert max-w-none text-center">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({node, ...props}) => <img {...props} className="max-w-full h-auto rounded-xl mx-auto my-4 shadow-md" />,
                audio: ({node, ...props}) => <audio {...props} className="w-full mt-4" controls />
              }}
            >
              {processContent(contentToShow)}
            </ReactMarkdown>
        </div>
    );
  };
  
  const cardBorderColor = cn({
      'border-green-500/50 shadow-lg shadow-green-500/10': feedback === 'correct',
      'border-destructive/50 shadow-lg shadow-destructive/10': feedback === 'incorrect',
      'border-primary/10': !feedback,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary p-0">
          <Link href={deckId ? `/study/deck/${deckId}` : '/study'}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Exit Session
          </Link>
        </Button>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Brain className="w-3 h-3" />
            Card {currentIndex + 1} of {sessionCards.length}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
            <Progress value={progress} className="h-1.5" />
            <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter text-muted-foreground/60 px-1">
                <span>Beginning</span>
                <span>{Math.round(progress)}% Complete</span>
                <span>Destination</span>
            </div>
        </div>

        <Card 
            onClick={() => !feedback && setFlipped(!flipped)} 
            className={cn(
                "cursor-pointer min-h-[450px] flex items-center justify-center p-12 text-center text-2xl relative overflow-hidden border-2 transition-all duration-500 transform-gpu", 
                cardBorderColor,
                flipped ? "bg-card" : "bg-primary/[0.02]"
            )}
        >
          <CardContent className="w-full">
            {renderContent()}
            
            {!flipped && (
                <div className="absolute bottom-8 left-0 right-0 animate-pulse text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-40">
                    Tap to reveal
                </div>
            )}
          </CardContent>
        </Card>

        <div className="h-24">
            {flipped && !feedback && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2">
                <Button onClick={() => handleRating("again")} variant="destructive" className="h-16 flex flex-col items-center justify-center group">
                    <span className="font-bold">Again</span>
                    <span className="text-[9px] opacity-60 uppercase font-black group-hover:opacity-100">(1)</span>
                </Button>
                <Button onClick={() => handleRating("hard")} variant="secondary" className="h-16 flex flex-col items-center justify-center group border-primary/10">
                    <span className="font-bold">Hard</span>
                    <span className="text-[9px] opacity-60 uppercase font-black group-hover:opacity-100">(2)</span>
                </Button>
                <Button onClick={() => handleRating("good")} variant="secondary" className="h-16 flex flex-col items-center justify-center group border-primary/10">
                    <span className="font-bold">Good</span>
                    <span className="text-[9px] opacity-60 uppercase font-black group-hover:opacity-100">(3)</span>
                </Button>
                <Button onClick={() => handleRating("easy")} className="h-16 flex flex-col items-center justify-center group bg-primary">
                    <span className="font-bold">Easy</span>
                    <span className="text-[9px] opacity-60 uppercase font-black group-hover:opacity-100">(4)</span>
                </Button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default function StudySessionPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>}>
      <SessionContent />
    </Suspense>
  );
}
