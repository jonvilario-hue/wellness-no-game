
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Deck } from '@/types/flashcards';
import { useState, useEffect } from 'react';

interface DeckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (deckData: Omit<Deck, 'id'>, id?: string) => void;
  deckToEdit: Deck | null;
}

export function DeckDialog({ open, onOpenChange, onSave, deckToEdit }: DeckDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (deckToEdit) {
      setName(deckToEdit.name);
      setDescription(deckToEdit.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [deckToEdit, open]);

  const handleSave = () => {
    if (!name) return;
    onSave({ name, description }, deckToEdit?.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{deckToEdit ? 'Edit Deck' : 'Create New Deck'}</AlertDialogTitle>
          <AlertDialogDescription>
            Decks help you organize your flashcards into topics.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="deck-name">Deck Name</Label>
            <Input
              id="deck-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Cognitive Biases"
            />
          </div>
          <div>
            <Label htmlFor="deck-description">Description (optional)</Label>
            <Textarea
              id="deck-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief summary of this deck's content."
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
