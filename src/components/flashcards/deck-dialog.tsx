
'use client';

import { useState, useEffect } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Deck } from '@/types/flashcards';

interface DeckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deckToEdit: Deck | null;
}

export function DeckDialog({ open, onOpenChange, deckToEdit }: DeckDialogProps) {
  const { addDeck, updateDeck } = useFlashcardStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (deckToEdit && open) {
      setName(deckToEdit.name);
      setDescription(deckToEdit.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [deckToEdit, open]);

  const handleSave = () => {
    if (!name) return;

    if (deckToEdit) {
      updateDeck(deckToEdit.id, { name, description });
    } else {
      addDeck({ name, description });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deckToEdit ? 'Edit Deck' : 'Create New Deck'}</DialogTitle>
           <DialogDescription>
            Decks help you organize your flashcards into topics for focused study.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="deck-name">Deck Name</Label>
            <Input
              id="deck-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Biology Chapter 1"
            />
          </div>
          <div>
            <Label htmlFor="deck-description">Description (Optional)</Label>
            <Textarea
              id="deck-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief summary of what this deck contains."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Deck</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
