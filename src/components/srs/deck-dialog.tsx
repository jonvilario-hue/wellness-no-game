
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useFlashcardStore } from '@/store/srs-store';

interface DeckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deckId?: string | null;
}

export function DeckDialog({ open, onOpenChange, deckId }: DeckDialogProps) {
  const { decks, addDeck, updateDeck } = useFlashcardStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const targetDeck = deckId ? decks.find(d => d.id === deckId) : null;

  useEffect(() => {
    if (open) {
      setName(targetDeck?.name || '');
      setDescription(targetDeck?.description || '');
    }
  }, [open, targetDeck]);

  const handleSave = () => {
    if (!name.trim()) return;

    if (deckId) {
      updateDeck(deckId, { name, description });
    } else {
      addDeck({ name, description });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deckId ? 'Edit Deck' : 'Create New Deck'}</DialogTitle>
          <DialogDescription>
            Organize your cards into topics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="deck-name">Deck Name</Label>
            <Input 
              id="deck-name"
              placeholder="e.g. Japanese Kanji"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deck-desc">Description</Label>
            <Textarea 
              id="deck-desc"
              placeholder="What are you learning in this deck?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
