
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
import type { Card as CardType, Deck } from '@/types/flashcards';
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
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Deck not found</h1>
        <Button asChild variant="link">
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
      <div className="flex justify-between items-start">
        <div>
          <Button asChild variant="outline" className="mb-4">
            <Link href="/study"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Scholar Hub</Link>
          </Button>
          <h1 className="text-3xl font-bold">{deck.name}</h1>
          <p className="text-muted-foreground">{deck.description}</p>
        </div>
        <div className="flex gap-2">
            <Button asChild variant="secondary">
                <Link href={`/study/deck/${deckId}/settings`}>
                    <Settings className="mr-2 h-4 w-4" /> Deck Settings
                </Link>
            </Button>
            <Button onClick={() => handleOpenCardDialog(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Card
            </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Cards in this Deck ({cardsInDeck.length})</CardTitle>
          <CardDescription>Review and manage the cards in this deck.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {cardsInDeck.length === 0 && (
            <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">This deck is empty. Add a card to get started!</p>
                <Button onClick={() => handleOpenCardDialog(null)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add First Card
                </Button>
            </div>
          )}
          {cardsInDeck.map(card => (
            <div key={card.id} className="flex justify-between items-center p-3 pr-0 bg-muted/50 rounded-lg group">
              <div>
                <p className="font-medium">{card.front.length > 50 ? `${card.front.substring(0, 50)}...` : card.front}</p>
                <p className="text-sm text-muted-foreground">{card.back.length > 60 ? `${card.back.substring(0, 60)}...` : card.back}</p>
                 {card.tags && card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 items-center">
                    <Tag className="w-3 h-3 text-muted-foreground" />
                    {card.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenCardDialog(card)}>
                  <Edit className="w-4 h-4" />
                </Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>Delete Card?</AlertDialogTitle></AlertDialogHeader>
                      <AlertDialogDescription>Are you sure you want to delete this card? This action cannot be undone.</AlertDialogDescription>
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
         <CardFooter className="flex justify-between items-center">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-destructive" disabled={deck.id === 'default'}>
                    <Trash2 className="mr-2 h-4 w-4"/> Delete Deck
                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Delete Deck?</AlertDialogTitle></AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to delete this deck? All cards within it will be moved to the "Default" deck. This action cannot be undone.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteDeck} variant="destructive">Delete Deck</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button asChild size="lg" disabled={dueInDeck === 0}>
                <Link href={`/study/session?deckId=${deckId}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Study This Deck ({dueInDeck})
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
