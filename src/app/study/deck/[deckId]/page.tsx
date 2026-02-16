
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, PlusCircle, Edit, Trash2, Play, Settings, Tag } from 'lucide-react';
import { CardDialog } from '@/components/flashcards/card-dialog';
import { DeckDialog } from '@/components/flashcards/deck-dialog';
import type { Card as CardType } from '@/types/flashcards';
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
import { Badge } from '@/components/ui/badge';

export default function DeckPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;
  const { decks, cards, deleteDeck, deleteCard } = useFlashcardStore();
  
  const deck = decks.find(d => d.id === deckId);
  const cardsInDeck = cards.filter(c => c.deckId === deckId);

  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<CardType | null>(null);
  const [isDeckDialogOpen, setIsDeckDialogOpen] = useState(false);
  
  const handleOpenCardDialog = (card: CardType | null) => {
    setCardToEdit(card);
    setIsCardDialogOpen(true);
  };
  
  const handleDeleteDeck = () => {
    deleteDeck(deckId);
    router.push('/study');
  };

  if (!deck) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h1 className="text-2xl font-bold mb-4">Deck not found</h1>
        <Button asChild variant="outline">
          <Link href="/study">Return to Scholar Hub</Link>
        </Button>
      </div>
    );
  }
  
  const dueInDeck = cards.filter(card => 
      card.deckId === deckId && new Date(card.dueDate) <= new Date()
    ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <Button asChild variant="ghost" className="mb-2 p-0 hover:bg-transparent text-muted-foreground hover:text-primary">
            <Link href="/study"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Hub</Link>
          </Button>
          <h1 className="text-4xl font-bold font-headline tracking-tight">{deck.name}</h1>
          <p className="text-muted-foreground mt-1">{deck.description || "No description provided."}</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
            <Button asChild variant="outline" className="flex-1 sm:flex-none">
                <Link href={`/study/deck/${deckId}/settings`}>
                    <Settings className="mr-2 h-4 w-4" /> Algorithm
                </Link>
            </Button>
            <Button onClick={() => handleOpenCardDialog(null)} className="flex-1 sm:flex-none">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Card
            </Button>
        </div>
      </div>
      
      <Card className="border-primary/10">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Cards ({cardsInDeck.length})</CardTitle>
            <CardDescription className="text-xs">Individual concepts in this collection.</CardDescription>
          </div>
          <Badge variant={dueInDeck > 0 ? "default" : "secondary"}>
            {dueInDeck} due today
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {cardsInDeck.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/20">
                <p className="text-muted-foreground mb-4">This deck is currently empty.</p>
                <Button onClick={() => handleOpenCardDialog(null)} variant="secondary">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create First Card
                </Button>
            </div>
          )}
          {cardsInDeck.map(card => (
            <div key={card.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-xl group hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/10">
              <div className="flex-grow min-w-0 pr-4">
                <p className="font-bold text-sm truncate">{card.front}</p>
                <p className="text-xs text-muted-foreground truncate opacity-70">{card.back}</p>
                 {card.tags && card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {card.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[9px] h-4 py-0 uppercase tracking-tighter">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenCardDialog(card)}>
                  <Edit className="w-4 h-4" />
                </Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>Delete Card?</AlertDialogTitle></AlertDialogHeader>
                      <AlertDialogDescription>Permanently remove this card? This action cannot be undone.</AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteCard(card.id)} variant="destructive">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
              </div>
            </div>
          ))}
        </CardContent>
         <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-primary/5 pt-6">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-destructive font-bold uppercase text-[10px] tracking-widest hover:bg-destructive/5" disabled={deck.id === 'default'}>
                    <Trash2 className="mr-2 h-3 w-3"/> Delete Entire Deck
                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Delete Deck?</AlertDialogTitle></AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure? All cards within "{deck.name}" will be moved to the "Default" deck.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteDeck} variant="destructive">Delete Deck</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button asChild size="lg" disabled={dueInDeck === 0} className="w-full sm:w-auto px-12 h-14 text-lg font-black shadow-lg hover:scale-105 transition-transform">
                <Link href={`/study/session?deckId=${deckId}`}>
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    Study Now ({dueInDeck})
                </Link>
            </Button>
         </CardFooter>
      </Card>

      <CardDialog
        open={isCardDialogOpen}
        onOpenChange={setIsCardDialogOpen}
        cardToEdit={cardToEdit}
        deckId={deckId}
      />
      
      <DeckDialog
        open={isDeckDialogOpen}
        onOpenChange={setIsDeckDialogOpen}
        deckToEdit={isDeckDialogOpen ? deck : null}
      />
    </div>
  );
}
