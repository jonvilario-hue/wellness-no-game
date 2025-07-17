
'use client';

import { useState } from 'react';
import { FlashcardStudy, type Flashcard } from '@/components/flashcards/FlashcardStudy';
import { FlashcardEditor } from '@/components/flashcards/FlashcardEditor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

  const handleSaveCard = (newCard: Flashcard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleUpdateCards = (updatedCards: Flashcard[]) => {
    setCards(updatedCards);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Flashcards</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Study Session</CardTitle>
                <CardDescription>Review your cards that are due for today.</CardDescription>
            </CardHeader>
            <CardContent>
                <FlashcardStudy cards={cards} onUpdateCards={handleUpdateCards} />
            </CardContent>
        </Card>
        <Card>
             <CardHeader>
                <CardTitle>Create New Card</CardTitle>
                <CardDescription>Add a new card to your collection.</CardDescription>
            </CardHeader>
            <CardContent>
                <FlashcardEditor onSave={handleSaveCard} />
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
