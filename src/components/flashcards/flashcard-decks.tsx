
'use client';

import { useState } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, Layers, Play, Upload, Download } from 'lucide-react';
import { DeckDialog } from '@/components/flashcards/deck-dialog';
import type { Deck } from '@/types/flashcards';
import { useToast } from '@/hooks/use-toast';

export function FlashcardDecks() {
  const { decks, cards } = useFlashcardStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const getDeckStats = (deckId: string) => {
    const deckCards = cards.filter(c => c.deckId === deckId);
    const dueCount = deckCards.filter(c => new Date(c.dueDate) <= new Date()).length;
    return {
      total: deckCards.length,
      due: dueCount,
    };
  };
  
  const totalDue = cards.filter(c => new Date(c.dueDate) <= new Date()).length;

  const handleImport = () => {
    toast({
        title: "Import Coming Soon",
        description: "This feature will allow you to import decks from other apps like Anki. For now, please add cards manually.",
        variant: 'default',
    });
  }

  const handleExport = () => {
      toast({
        title: "Export Coming Soon",
        description: "This feature will allow you to export your decks to a file compatible with other flashcard apps.",
        variant: 'default',
    });
  }

  return (
     <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Layers className="w-6 h-6 text-primary" /> Flashcard Decks
                </CardTitle>
                <CardDescription>Organize your cards into decks for focused study sessions.</CardDescription>
                </div>
                <div className="flex gap-2">
                     <Button onClick={handleImport} variant="outline">
                        <Upload className="mr-2 h-4 w-4" /> Import
                    </Button>
                     <Button onClick={handleExport} variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button onClick={() => setIsDialogOpen(true)} variant="secondary">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Deck
                    </Button>
                    <Button asChild disabled={totalDue === 0}>
                        <Link href="/study/session">
                            <Play className="mr-2 h-4 w-4" /> Study All ({totalDue})
                        </Link>
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map(deck => {
                const { total, due } = getDeckStats(deck.id);
                return (
                    <Link key={deck.id} href={`/study/deck/${deck.id}`}>
                        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 hover:border-primary/50">
                        <CardHeader>
                            <CardTitle>{deck.name}</CardTitle>
                            <CardDescription>{deck.description || 'No description'}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow"></CardContent>
                        <CardFooter className="text-sm text-muted-foreground justify-between">
                            <span>{total} cards</span>
                            <span className="font-bold text-primary">{due > 0 ? `${due} due` : 'Up to date'}</span>
                        </CardFooter>
                        </Card>
                    </Link>
                );
                })}
            </div>
        </CardContent>
        <DeckDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            deckToEdit={null}
        />
    </Card>
  );
}
