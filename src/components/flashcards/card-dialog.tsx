
'use client';

import { useState, useEffect, useTransition } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { Card, CardType } from '@/types/flashcards';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface CardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardToEdit: Card | null;
  deckId?: string;
}

export function CardDialog({ open, onOpenChange, cardToEdit, deckId }: CardDialogProps) {
  const { addCard, updateCard, decks } = useFlashcardStore();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [type, setType] = useState<CardType>('basic');
  const [currentDeckId, setCurrentDeckId] = useState(deckId || 'default');
  const [tags, setTags] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (cardToEdit && open) {
      setFront(cardToEdit.front);
      setBack(cardToEdit.back);
      setType(cardToEdit.type);
      setCurrentDeckId(cardToEdit.deckId);
      setTags(cardToEdit.tags?.join(', ') || '');
    } else if (open) {
      // Reset for new card
      setFront('');
      setBack('');
      setType('basic');
      setCurrentDeckId(deckId || 'default');
      setTags('');
    }
  }, [cardToEdit, open, deckId]);

  const handleSave = () => {
    if (!front || !back || !currentDeckId) return;
    
    startTransition(() => {
        const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);

        if (cardToEdit) {
        updateCard({
            ...cardToEdit,
            front,
            back,
            type,
            deckId: currentDeckId,
            tags: tagArray,
        });
        toast({ title: "Card Updated!", description: "Your changes have been saved.", variant: "success" });
        } else {
        addCard({
            front,
            back,
            type,
            deckId: currentDeckId,
            tags: tagArray,
        });
        toast({ title: "Card Created!", description: "A new card has been added to your deck.", variant: "success" });
        }
        onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cardToEdit ? 'Edit Card' : 'Create New Card'}</DialogTitle>
          <DialogDescription>
            {cardToEdit ? 'Modify the details of your card.' : 'Add a new card to your collection.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="card-type">Card Type</Label>
              <Select value={type} onValueChange={(value: CardType) => setType(value)}>
                <SelectTrigger id="card-type">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="cloze">Cloze Deletion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deck-select">Deck</Label>
              <Select value={currentDeckId} onValueChange={setCurrentDeckId}>
                <SelectTrigger id="deck-select">
                  <SelectValue placeholder="Select a deck" />
                </SelectTrigger>
                <SelectContent>
                  {decks.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="front-content">Front</Label>
            <Textarea
              id="front-content"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder={type === 'cloze' ? 'The capital of France is {{c1::Paris}}.' : 'Front of the card...'}
              rows={5}
            />
          </div>
          <div>
            <Label htmlFor="back-content">Back</Label>
            <Textarea
              id="back-content"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Back of the card..."
              rows={5}
            />
          </div>
           <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., biology, chapter-1, important"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
