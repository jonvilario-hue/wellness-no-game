
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Type for flashcard
export type Flashcard = {
  id: string;
  front: string;
  back: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  dueDate: string;
};

export function FlashcardStudy({ cards, onUpdateCards }: { cards: Flashcard[]; onUpdateCards: (cards: Flashcard[]) => void; }) {
  const [dueCards, setDueCards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const filteredDueCards = cards.filter(
      (card) => new Date(card.dueDate) <= new Date()
    );
    setDueCards(filteredDueCards);
    setCurrentCard(filteredDueCards[0] || null);
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
    
    // Update the card in the main list
    const updatedCardsList = cards.map(c => c.id === updatedCard.id ? updatedCard : c);
    onUpdateCards(updatedCardsList);

    const remaining = dueCards.slice(1);
    setDueCards(remaining);
    setCurrentCard(remaining[0] || null);
    setFlipped(false);
  };

  if (!currentCard) return <p className="text-center text-muted-foreground py-12">No cards due right now.</p>;

  return (
    <div className="space-y-4">
      <Card onClick={() => setFlipped(!flipped)} className="cursor-pointer min-h-[150px] flex items-center justify-center">
        <CardContent className="text-center py-12 text-xl">
          {flipped ? currentCard.back : currentCard.front}
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

