
'use client';

import { useState } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, Layers, Play, Upload, Download, Settings, Trash2 } from 'lucide-react';
import { DeckDialog } from '@/components/flashcards/deck-dialog';
import { ImportDialog } from '@/components/flashcards/import-dialog';
import { ExportDialog } from '@/components/flashcards/export-dialog';
import { useToast } from '@/hooks/use-toast';
import { AddToCalendarDialog } from '../study/add-to-calendar-dialog';
import { AssistantTooltip } from '../assistant-tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function FlashcardDecks() {
  const { decks, cards, deleteDeck } = useFlashcardStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
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

  return (
     <Card className="border-primary/10">
        <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <Layers className="w-6 h-6 text-primary" /> Flashcard Decks
                </CardTitle>
                <CardDescription>Organize your cards into decks for focused study sessions.</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setIsImportOpen(true)} variant="outline" size="sm" className="font-bold border-primary/20">
                        <Upload className="mr-2 h-4 w-4" /> Import
                    </Button>
                    <Button onClick={() => setIsExportOpen(true)} variant="outline" size="sm" className="font-bold border-primary/20">
                        <Download className="mr-2 h-4 w-4" /> Export All
                    </Button>
                    <Button onClick={() => setIsDialogOpen(true)} variant="secondary" size="sm" className="font-bold">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Deck
                    </Button>
                    <AssistantTooltip text="Launch a session with all cards currently scheduled for review across all your decks.">
                      <Button asChild disabled={totalDue === 0} size="sm" className="font-bold bg-primary shadow-md hover:scale-105 transition-transform">
                          <Link href="/study/session">
                              <Play className="mr-2 h-4 w-4 fill-current" /> Study All ({totalDue})
                          </Link>
                      </Button>
                    </AssistantTooltip>
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
                            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer border-primary/5">
                                <CardHeader className="pb-2">
                                    <div className="pr-8">
                                        <CardTitle className="text-xl font-bold">{deck.name}</CardTitle>
                                        <CardDescription className="line-clamp-2 min-h-[40px] text-xs">{deck.description || 'No description'}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardFooter className="text-[10px] uppercase font-bold text-muted-foreground justify-between border-t border-primary/5 pt-4 mt-auto">
                                    <span>{total} cards</span>
                                    <AssistantTooltip text="'Complete' means you've reviewed everything currently due. The algorithm will show these cards again when your retention probability drops.">
                                      <span className={due > 0 ? "text-primary" : ""}>{due > 0 ? `${due} due` : 'Complete'}</span>
                                    </AssistantTooltip>
                                </CardFooter>
                            </Card>
                        </Link>
                        
                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <AssistantTooltip text="Add this deck to your study calendar.">
                              <AddToCalendarDialog 
                                toolId="Flashcards" 
                                resourceId={deck.id} 
                                resourceName={deck.name} 
                                buttonSize="icon"
                                buttonVariant="ghost"
                              />
                            </AssistantTooltip>
                            
                            <AssistantTooltip text="Configure the Spaced Repetition settings for this specific deck.">
                                <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                                    <Link href={`/study/deck/${deck.id}/settings`}>
                                        <Settings className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </AssistantTooltip>

                            {deck.id !== 'default' && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive transition-all">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Deck?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will remove "{deck.name}". All cards within will be moved to the "Default" deck so you don't lose your progress.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => { deleteDeck(deck.id); toast({ title: "Deck deleted" }); }} variant="destructive">Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
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
        <ImportDialog 
          open={isImportOpen}
          onOpenChange={setIsImportOpen}
        />
        <ExportDialog 
          open={isExportOpen}
          onOpenChange={setIsExportOpen}
        />
    </Card>
  );
}
