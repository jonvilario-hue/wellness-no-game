
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Card as CardType } from '@/types/flashcards';
import { applySpacedRepetition } from '@/lib/srs';
import { cn } from '@/lib/utils';

const renderCloze = (text: string, reveal: boolean) => {
  const clozeContent = text.replace(/\{\{c\d::(.*?)\}\}/g, (_, match) => 
    reveal ? `<span class="font-bold text-primary">${match}</span>` : `<span class="font-bold text-blue-500">[...]</span>`
  );
  return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: clozeContent }} />;
};

export default function StudyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams.get('deckId');

  const { cards, updateCard } = useFlashcardStore();

  const dueCards = useMemo(() => {
    const now = new Date();
    const filtered = cards.filter(card => 
      (!deckId || card.deckId === deckId) && new Date(card.dueDate) <= now
    );
    // Add some randomness to prevent seeing the same cards in the same order
    return filtered.sort(() => Math.random() - 0.5);
  }, [cards, deckId]);

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

  const currentCard = sessionCards[currentIndex];

  const handleRating = useCallback((rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    const updatedCard = applySpacedRepetition(currentCard, rating);
    updateCard(updatedCard);
    
    // Show feedback
    setFeedback(rating === 'again' ? 'incorrect' : 'correct');

    setTimeout(() => {
        if (currentIndex >= sessionCards.length - 1) {
            setSessionComplete(true);
        } else {
            setCurrentIndex(currentIndex + 1);
            setFlipped(false);
            setFeedback(null);
        }
    }, 800); // Shorter delay for a snappier feel
  }, [currentCard, currentIndex, sessionCards.length, updateCard]);
  
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
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <ThumbsUp className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Study Session Complete!</h1>
        <p className="text-muted-foreground mb-6">You've reviewed all due cards for this session. Great work!</p>
        <Button asChild>
          <Link href="/flashcards">Back to Decks</Link>
        </Button>
      </div>
    );
  }

  if (!currentCard) {
     return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <h1 className="text-2xl font-bold mb-2">Loading...</h1>
        </div>
     )
  }
  
  const progress = (currentIndex / sessionCards.length) * 100;

  const renderContent = () => {
    const isCloze = currentCard.type === 'cloze';

    if (isCloze) {
      if (!flipped) {
        return renderCloze(currentCard.front, false);
      } else {
        return (
          <div className="prose dark:prose-invert max-w-none text-left space-y-4">
            {renderCloze(currentCard.front, true)}
            <hr />
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentCard.back}</ReactMarkdown>
          </div>
        );
      }
    }
    
    const contentToShow = flipped ? currentCard.back : currentCard.front;
    return <ReactMarkdown className="prose dark:prose-invert max-w-none" remarkPlugins={[remarkGfm]}>{contentToShow}</ReactMarkdown>;
  };
  
  const cardBorderColor = cn({
      'border-green-500/80': feedback === 'correct',
      'border-destructive/80': feedback === 'incorrect',
      'border-transparent': !feedback,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Button asChild variant="outline">
          <Link href={deckId ? `/flashcards/deck/${deckId}` : '/flashcards'}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Exit Session
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        <Progress value={progress} />
        <Card 
            onClick={() => !feedback && setFlipped(!flipped)} 
            className={cn("cursor-pointer min-h-[400px] flex items-center justify-center p-6 text-center text-xl relative overflow-hidden border-4 transition-colors duration-300", cardBorderColor)}
        >
          <CardContent className="w-full">
            {renderContent()}
          </CardContent>
        </Card>

        {flipped && !feedback && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in">
            <Button onClick={() => handleRating("again")} variant="destructive" size="lg">Again <span className="ml-2 text-xs opacity-70">(1)</span></Button>
            <Button onClick={() => handleRating("hard")} variant="secondary" size="lg">Hard <span className="ml-2 text-xs opacity-70">(2)</span></Button>
            <Button onClick={() => handleRating("good")} size="lg">Good <span className="ml-2 text-xs opacity-70">(3)</span></Button>
            <Button onClick={() => handleRating("easy")} className="bg-green-600 hover:bg-green-700" size="lg">Easy <span className="ml-2 text-xs opacity-70">(4)</span></Button>
          </div>
        )}
      </div>
    </div>
  );
}
