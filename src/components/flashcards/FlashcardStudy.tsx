
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  dueDate: string;
  type: 'basic' | 'cloze';
};

const renderCloze = (text: string, reveal: boolean) => {
    return text.replace(/\{\{c\d::(.*?)\}\}/g, (_, match) => 
        reveal ? `<span class="font-bold text-blue-500">${match}</span>` : `<span class="font-bold text-primary">[...]</span>`
    );
};

export function FlashcardStudy({ cards, onUpdate }: { cards: Flashcard[]; onUpdate: (updatedCard: Flashcard) => void }) {
  const [currentCards, setCurrentCards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const dueCards = cards.filter(
      (card) => new Date(card.dueDate) <= new Date()
    );
    setCurrentCards(dueCards);
    setCurrentCard(dueCards[0] || null);
    setFlipped(false);
  }, [cards]);

  const rateCard = (rating: "again" | "hard" | "good" | "easy") => {
    if (!currentCard) return;

    let { interval, easeFactor, repetitions } = currentCard;

    if (rating === "again") {
      interval = 1;
      repetitions = 0;
    } else if (rating === "hard") {
      interval = Math.max(1, interval * 1.2);
    } else if (rating === "good") {
      repetitions += 1;
      interval = interval * easeFactor;
      easeFactor += 0.1;
    } else if (rating === "easy") {
      interval = interval * easeFactor * 1.3;
      easeFactor += 0.15;
    }

    const updatedCard = {
      ...currentCard,
      interval,
      easeFactor,
      repetitions,
      dueDate: new Date(Date.now() + interval * 24 * 60 * 60 * 1000).toISOString(),
    };

    onUpdate(updatedCard);
    setFlipped(false);
  };

  const renderContent = () => {
    if (!currentCard) return null;
    const isCloze = currentCard.type === 'cloze';
    const contentToShow = flipped ? currentCard.back : currentCard.front;

    if (isCloze && !flipped) {
      const html = renderCloze(contentToShow, flipped);
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    } else if (isCloze && flipped) {
       const revealedFront = renderCloze(currentCard.front, true);
       return (
            <div>
                <div className="mb-4 pb-4 border-b" dangerouslySetInnerHTML={{ __html: revealedFront }} />
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentCard.back}</ReactMarkdown>
            </div>
       )
    }

    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentToShow}</ReactMarkdown>;
  };

  if (!currentCard) return <div className="text-center text-muted-foreground py-12">No cards due for review.</div>;

  return (
    <div className="space-y-4">
      <Card onClick={() => setFlipped(!flipped)} className="cursor-pointer min-h-[150px] flex items-center justify-center">
        <CardContent className="text-center py-12 text-xl prose dark:prose-invert max-w-none">
          {renderContent()}
        </CardContent>
      </Card>

      {flipped && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button onClick={() => rateCard("again")} variant="destructive">Again</Button>
          <Button onClick={() => rateCard("hard")} variant="secondary">Hard</Button>
          <Button onClick={() => rateCard("good")}>Good</Button>
          <Button onClick={() => rateCard("easy")} className="bg-green-600 hover:bg-green-700">Easy</Button>
        </div>
      )}
    </div>
  );
}
