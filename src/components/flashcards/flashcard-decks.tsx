
'use client';

import { useState } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, Layers, Play, Upload, Download, Settings } from 'lucide-react';
import { DeckDialog } from '@/components/flashcards/deck-dialog';
import type { Deck } from '@/types/flashcards';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Layers className="w-6 h-6 text-primary" /> Flashcard Decks
                </CardTitle>
                <CardDescription>Organize your cards into decks for focused study sessions.</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                     <Button onClick={handleImport} variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" /> Import
                    </Button>
                     <Button onClick={handleExport} variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button onClick={() => setIsDialogOpen(true)} variant="secondary" size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Deck
                    </Button>
                    <Button asChild disabled={totalDue === 0} size="sm">
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
                    <div key={deck.id} className="relative group">
                        <Link href={`/study/deck/${deck.id}`}>
                            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
                                <CardHeader>
                                    <div className="pr-8">
                                        <CardTitle>{deck.name}</CardTitle>
                                        <CardDescription className="line-clamp-2 min-h-[40px]">{deck.description || 'No description'}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow"></CardContent>
                                <CardFooter className="text-sm text-muted-foreground justify-between border-t pt-4">
                                    <span>{total} cards</span>
                                    <span className="font-bold text-primary">{due > 0 ? `${due} due` : 'Up to date'}</span>
                                </CardFooter>
                            </Card>
                        </Link>
                        
                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Button asChild variant="secondary" size="icon" className="h-8 w-8 shadow-sm">
                                            <Link href={`/study/deck/${deck.id}/settings`}>
                                                <Settings className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Deck Settings</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
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
