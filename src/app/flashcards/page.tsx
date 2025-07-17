
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BrainCircuit, Play, BarChart2 } from "lucide-react";
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { DeckDialog } from "@/components/flashcards/deck-dialog";
import { useState } from "react";
import type { Deck } from "@/types/flashcards";
import Link from "next/link";
import { DeckListItem } from "@/components/flashcards/deck-list-item";
import { StudySummary } from "@/components/flashcards/study-summary";

export default function FlashcardsPage() {
  const { decks, cards, addDeck, updateDeck, deleteDeck } = useFlashcardStore();
  const [isDeckDialogOpen, setIsDeckDialogOpen] = useState(false);
  const [deckToEdit, setDeckToEdit] = useState<Deck | null>(null);

  const handleOpenDeckDialog = (deck: Deck | null) => {
    setDeckToEdit(deck);
    setIsDeckDialogOpen(true);
  };

  const handleSaveDeck = (deckData: Omit<Deck, 'id'>, id?: string) => {
    if (id) {
      updateDeck(id, deckData);
    } else {
      addDeck(deckData);
    }
  };

  const dueCardsCount = cards.filter(c => new Date(c.dueDate) <= new Date()).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Decks</CardTitle>
              <CardDescription>Manage your flashcard decks or create a new one.</CardDescription>
            </div>
            <Button onClick={() => handleOpenDeckDialog(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Deck
            </Button>
          </CardHeader>
          <CardContent>
            {decks.length > 0 ? (
              <div className="space-y-2">
                {decks.map(deck => (
                  <DeckListItem 
                    key={deck.id}
                    deck={deck}
                    cardCount={cards.filter(c => c.deckId === deck.id).length}
                    onEdit={() => handleOpenDeckDialog(deck)}
                    onDelete={() => deleteDeck(deck.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <p>No decks yet.</p>
                <p>Click "New Deck" to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle>Study Session</CardTitle>
              <CardDescription>Review all cards that are due today.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                  <p className="text-6xl font-bold text-primary">{dueCardsCount}</p>
                  <p className="text-muted-foreground">cards due</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" disabled={dueCardsCount === 0}>
                <Link href="/flashcards/study">
                  <Play className="mr-2 h-4 w-4" /> Start Studying
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <StudySummary />
        </div>
      </div>

      <DeckDialog
        open={isDeckDialogOpen}
        onOpenChange={setIsDeckDialogOpen}
        onSave={handleSaveDeck}
        deckToEdit={deckToEdit}
      />
    </div>
  );
}
