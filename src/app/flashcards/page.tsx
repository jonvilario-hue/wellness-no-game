
'use client';

import { useState } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, Layers, Play } from 'lucide-react';
import { DeckDialog } from '@/components/flashcards/deck-dialog';
import type { Deck } from '@/types/flashcards';

export default function FlashcardsPage() {
  const { decks, cards } = useFlashcardStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const getDeckStats = (deckId: string) => {
    const deckCards = cards.filter(c => c.deckId === deckId);
    const dueCount = deckCards.filter(c => new Date(c.dueDate) <= new Date()).length;
    return {
      total: deckCards.length,
      due: dueCount,
    };
  };
  
  const totalDue = cards.filter(c => new Date(c.dueDate) <= new Date()).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Layers className="w-8 h-8 text-primary" /> Flashcard Decks
          </h1>
          <p className="text-muted-foreground">Organize your cards into decks for focused study sessions.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Deck
            </Button>
            <Button asChild>
                <Link href="/flashcards/study">
                    <Play className="mr-2 h-4 w-4" /> Study All ({totalDue})
                </Link>
            </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map(deck => {
          const { total, due } = getDeckStats(deck.id);
          return (
            <Link key={deck.id} href={`/flashcards/deck/${deck.id}`}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 hover:border-primary/50">
                  <CardHeader>
                    <CardTitle>{deck.name}</CardTitle>
                    <CardDescription>{deck.description || 'No description'}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow"></CardContent>
                  <CardFooter className="text-sm text-muted-foreground justify-between">
                    <span>{total} cards</span>
                    <span className="font-bold text-primary">{due} due</span>
                  </CardFooter>
                </Card>
            </Link>
          );
        })}
      </div>

      <DeckDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        deckToEdit={null}
      />
    </div>
  );
}
