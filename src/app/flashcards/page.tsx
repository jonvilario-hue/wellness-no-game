
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Book, Layers, PlusCircle, Settings, Play } from 'lucide-react';
import { DeckDialog } from '@/components/flashcards/deck-dialog';
import type { Deck } from '@/types/flashcards';

export default function FlashcardsDashboardPage() {
  const { decks, cards } = useFlashcardStore();
  const [isDeckDialogOpen, setIsDeckDialogOpen] = useState(false);
  const [deckToEdit, setDeckToEdit] = useState<Deck | null>(null);

  const handleOpenDeckDialog = (deck: Deck | null) => {
    setDeckToEdit(deck);
    setIsDeckDialogOpen(true);
  };
  
  const getDueCardsCount = (deckId?: string) => {
    const now = new Date();
    return cards.filter(card => 
      (!deckId || card.deckId === deckId) && new Date(card.dueDate) <= now
    ).length;
  };
  
  const totalDueCount = getDueCardsCount();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Book className="w-8 h-8 text-primary" />
            Flashcard Decks
          </h1>
          <p className="text-muted-foreground">Organize your cards into decks for focused study.</p>
        </div>
        <div className='flex gap-2'>
            <Button onClick={() => handleOpenDeckDialog(null)} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Deck
            </Button>
            <Button asChild>
                <Link href="/flashcards/study">
                    <Play className="mr-2 h-4 w-4" />
                    Study All Due ({totalDueCount})
                </Link>
            </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => {
          const cardsInDeck = cards.filter(c => c.deckId === deck.id);
          const dueInDeck = getDueCardsCount(deck.id);
          return (
            <Card key={deck.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{deck.name}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2" onClick={() => handleOpenDeckDialog(deck)}>
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>{deck.description || 'No description.'}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Layers className="w-4 h-4 mr-2" />
                    {cardsInDeck.length} card{cardsInDeck.length === 1 ? '' : 's'}
                  </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/flashcards/deck/${deck.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Study Deck ({dueInDeck})
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <DeckDialog
        open={isDeckDialogOpen}
        onOpenChange={setIsDeckDialogOpen}
        deckToEdit={deckToEdit}
      />
    </div>
  );
}
