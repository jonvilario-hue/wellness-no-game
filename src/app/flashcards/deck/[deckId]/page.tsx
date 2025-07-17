
'use client';

import { useParams, useRouter } from "next/navigation";
import { useFlashcardStore } from "@/hooks/use-flashcard-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlusCircle, Play, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Card as CardType } from "@/types/flashcards";
import { CardDialog } from "@/components/flashcards/card-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";

export default function DeckPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;
  
  const { decks, cards, deleteCard } = useFlashcardStore();
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<CardType | null>(null);

  const deck = decks.find(d => d.id === deckId);
  const cardsInDeck = cards.filter(c => c.deckId === deckId);

  if (!deck) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">Deck not found</h1>
        <Button asChild variant="link">
          <Link href="/flashcards">Go back to decks</Link>
        </Button>
      </div>
    );
  }

  const handleOpenCardDialog = (card: CardType | null) => {
    setCardToEdit(card);
    setIsCardDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/flashcards">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold">{deck.name}</h1>
            <p className="text-muted-foreground">{deck.description}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Cards in Deck ({cardsInDeck.length})</CardTitle>
            <CardDescription>Manage the cards in this deck.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild disabled={cardsInDeck.length === 0}>
                <Link href="/flashcards/study">
                    <Play className="mr-2 h-4 w-4" /> Study Deck
                </Link>
            </Button>
            <Button onClick={() => handleOpenCardDialog(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Front</TableHead>
                <TableHead>Back</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cardsInDeck.length > 0 ? cardsInDeck.map(card => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium max-w-xs truncate">{card.front}</TableCell>
                  <TableCell className="max-w-xs truncate">{card.back}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {card.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(card.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenCardDialog(card)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" onClick={() => deleteCard(card.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">No cards in this deck yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CardDialog 
        open={isCardDialogOpen}
        onOpenChange={setIsCardDialogOpen}
        cardToEdit={cardToEdit}
        deckId={deckId}
      />
    </div>
  );
}
