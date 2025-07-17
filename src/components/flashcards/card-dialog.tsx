
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
import type { Card } from '@/types/flashcards';
import { useState, useEffect } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';

interface CardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardToEdit: Card | null;
  deckId: string;
}

export function CardDialog({ open, onOpenChange, cardToEdit, deckId }: CardDialogProps) {
  const { addCard, updateCard } = useFlashcardStore();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (cardToEdit) {
      setFront(cardToEdit.front);
      setBack(cardToEdit.back);
      setTags(cardToEdit.tags.join(', '));
    } else {
      setFront('');
      setBack('');
      setTags('');
    }
  }, [cardToEdit, open]);

  const handleSave = () => {
    if (!front || !back) return;
    
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);

    const cardData = {
      front,
      back,
      tags: tagList,
      deckId,
    };

    if (cardToEdit) {
      updateCard(cardToEdit.id, cardData);
    } else {
      addCard(cardData);
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{cardToEdit ? 'Edit Card' : 'Create New Card'}</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the front and back of your flashcard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="card-front">Front</Label>
            <Textarea
              id="card-front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="e.g., What is the Dunning-Kruger effect?"
              className="h-48"
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="card-back">Back</Label>
            <Textarea
              id="card-back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="A cognitive bias where people with low ability at a task overestimate their ability."
              className="h-48"
            />
          </div>
        </div>
        <div>
            <Label htmlFor="card-tags">Tags (comma-separated)</Label>
            <Input
                id="card-tags"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="e.g., cognitive-bias, psychology"
            />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>Save Card</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
