"use client";

import { useState } from "react";
import { FlashcardStudy, type Flashcard } from "@/components/flashcards/FlashcardStudy";
import { FlashcardEditor } from "@/components/flashcards/FlashcardEditor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const initialCards: Flashcard[] = [
  {
    id: "1",
    front: "What is the capital of France?",
    back: "Paris",
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    dueDate: new Date().toISOString(),
  },
  {
    id: "2",
    front: "Who developed General Relativity?",
    back: "Albert Einstein",
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    dueDate: new Date().toISOString(),
  },
];


export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);

  const handleAddCard = (card: Flashcard) => {
    setCards((prev) => [...prev, card]);
  };

  const handleUpdateCard = (updatedCard: Flashcard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Flashcards</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Internal Study Session</CardTitle>
                <CardDescription>Review your custom cards that are due for today.</CardDescription>
            </CardHeader>
            <CardContent>
                <FlashcardStudy cards={cards} onUpdate={handleUpdateCard} />
            </CardContent>
        </Card>
        <Card>
             <CardHeader>
                <CardTitle>Create New Card</CardTitle>
                <CardDescription>Add a new card to your internal collection.</CardDescription>
            </CardHeader>
            <CardContent>
                <FlashcardEditor onSave={handleAddCard} />
            </CardContent>
        </Card>
      </div>

      <Separator />

      <Card>
        <CardHeader>
            <CardTitle>AnkiWeb</CardTitle>
            <CardDescription>Access your existing AnkiWeb decks.</CardDescription>
        </CardHeader>
        <CardContent>
          <iframe
            src="https://ankiweb.net"
            title="AnkiWeb"
            className="w-full h-[600px] border rounded-xl"
          />
        </CardContent>
      </Card>

    </div>
  );
}
