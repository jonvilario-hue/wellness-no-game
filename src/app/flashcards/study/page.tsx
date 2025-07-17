
'use client';

import { useState, useEffect, useMemo, useCallback } from "react";
import { useFlashcardStore } from "@/hooks/use-flashcard-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: (isCorrect: boolean) => ({
      opacity: 0,
      x: isCorrect ? 50 : -50,
      transition: { duration: 0.3 }
  }),
};

const ReviewStatusIndicator = ({ status }: { status: 'correct' | 'incorrect' | null }) => {
  if (!status) return null;
  
  const Icon = status === 'correct' ? CheckCircle : XCircle;
  const color = status === 'correct' ? 'text-green-500' : 'text-red-500';

  return (
    <motion.div
      key={status + Date.now()}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <Icon className={cn("h-32 w-32", color)} />
    </motion.div>
  );
};


export default function StudyPage() {
  const { cards, reviewCard } = useFlashcardStore();
  const [studyDeck, setStudyDeck] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [lastReviewStatus, setLastReviewStatus] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    const dueCards = cards
      .filter(c => new Date(c.dueDate) <= new Date())
      .sort(() => Math.random() - 0.5); // Shuffle due cards
    setStudyDeck(dueCards);
  }, [cards]);
  
  const handleReview = useCallback((rating: 1 | 2 | 3 | 4) => {
    if (currentIndex >= studyDeck.length) return;
    
    const cardId = studyDeck[currentIndex].id;
    const { isCorrect } = reviewCard(cardId, rating);
    
    setLastReviewStatus(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
        setIsFlipped(false);
        setCurrentIndex(prev => prev + 1);
        setLastReviewStatus(null);
    }, 800);

  }, [currentIndex, studyDeck, reviewCard]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
      if (isFlipped) {
        if (e.key === '1') handleReview(1); // Again
        if (e.key === '2') handleReview(2); // Hard
        if (e.key === '3') handleReview(3); // Good
        if (e.key === '4') handleReview(4); // Easy
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, handleReview]);

  const currentCard = studyDeck[currentIndex];
  const progress = studyDeck.length > 0 ? ((currentIndex) / studyDeck.length) * 100 : 0;

  if (studyDeck.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold">All caught up!</h1>
        <p className="text-muted-foreground">You have no cards due for review today.</p>
        <Button asChild className="mt-6">
          <Link href="/flashcards">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Decks
          </Link>
        </Button>
      </div>
    );
  }
  
  if (currentIndex >= studyDeck.length) {
       return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold">Session Complete!</h1>
        <p className="text-muted-foreground">You reviewed all {studyDeck.length} due cards.</p>
        <Button asChild className="mt-6">
          <Link href="/flashcards">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Decks
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
       <div className="w-full max-w-2xl">
         <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-sm font-mono">{currentIndex + 1} / {studyDeck.length}</span>
         </div>
         <Progress value={progress} />
       </div>

      <div 
        className="w-full max-w-2xl h-[400px] cursor-pointer"
        onClick={() => !lastReviewStatus && setIsFlipped(f => !f)}
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence custom={lastReviewStatus}>
            {currentCard && (
                <motion.div
                    key={currentCard.id}
                    className="relative w-full h-full"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={lastReviewStatus === 'correct'}
                    variants={cardVariants}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className={cn("absolute w-full h-full transition-transform duration-500", isFlipped && "[transform:rotateY(180deg)]")} style={{ transformStyle: "preserve-3d" }}>
                     <Card className="absolute w-full h-full flex items-center justify-center p-6 text-center [backface-visibility:hidden]">
                        <p className="text-3xl">{currentCard.front}</p>
                     </Card>
                     <Card className="absolute w-full h-full flex flex-col items-center justify-center p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <p className="text-2xl">{currentCard.back}</p>
                     </Card>
                  </div>
                  <ReviewStatusIndicator status={lastReviewStatus} />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
      
      {isFlipped && !lastReviewStatus ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl animate-in fade-in">
           <Button onClick={() => handleReview(1)} variant="destructive" className="h-20 flex-col gap-1">
             <XCircle className="w-5 h-5"/>
             <span className="text-lg">Again</span>
             <span className="text-xs text-destructive-foreground/70">(1) &lt;10m</span>
           </Button>
           <Button onClick={() => handleReview(2)} variant="secondary" className="h-20 flex-col gap-1 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30">
              <span className="text-lg">Hard</span>
              <span className="text-xs text-amber-700/70">(2)</span>
           </Button>
            <Button onClick={() => handleReview(3)} variant="secondary" className="h-20 flex-col gap-1 bg-blue-500/20 text-blue-700 hover:bg-blue-500/30">
              <span className="text-lg">Good</span>
              <span className="text-xs text-blue-700/70">(3)</span>
           </Button>
           <Button onClick={() => handleReview(4)} variant="secondary" className="h-20 flex-col gap-1 bg-green-500/20 text-green-700 hover:bg-green-500/30">
              <CheckCircle className="w-5 h-5"/>
              <span className="text-lg">Easy</span>
              <span className="text-xs text-green-700/70">(4)</span>
           </Button>
        </div>
      ) : (
        <div className="w-full max-w-2xl h-20 flex items-center justify-center">
            {!lastReviewStatus && (
                <Button onClick={() => setIsFlipped(true)} variant="outline" className="animate-in fade-in">
                    Show Answer (Space)
                </Button>
            )}
        </div>
      )}
    </div>
  );
}
