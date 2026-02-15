
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLibraryStore } from '@/hooks/use-library-store';
import type { LibraryItem } from '@/types/library';

interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemToEdit: LibraryItem | null;
}

export function NoteDialog({ open, onOpenChange, itemToEdit }: NoteDialogProps) {
  const { addItem, updateItem } = useLibraryStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (itemToEdit && open) {
      setTitle(itemToEdit.title);
      setContent(itemToEdit.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [itemToEdit, open]);

  const handleSave = () => {
    if (!title) {
        toast({
            title: 'Title is required',
            description: 'Please provide a title for your note.',
            variant: 'destructive',
        });
        return;
    }

    if (itemToEdit) {
      updateItem(itemToEdit.id, { title, content });
      toast({ title: 'Note Updated!', variant: 'success' });
    } else {
      addItem({
        type: 'note',
        title,
        content,
      });
      toast({ title: 'Note Saved!', variant: 'success' });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{itemToEdit ? 'Edit Note' : 'Create New Note'}</DialogTitle>
          <DialogDescription>
            Save your thoughts, ideas, or snippets of information here.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="note-title">Title</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A title for your note..."
            />
          </div>
          <div>
            <Label htmlFor="note-content">Content</Label>
            <Textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={10}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
