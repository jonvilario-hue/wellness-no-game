
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { Blueprint } from '@/types/blueprint';

type AddProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (project: Omit<Blueprint, 'id' | 'milestones' | 'archived'>) => void;
};

export default function AddProjectDialog({ open, onOpenChange, onAdd }: AddProjectDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [identityGoal, setIdentityGoal] = useState('');
  const [tags, setTags] = useState('');

  const handleAdd = () => {
    if (!title) return;
    onAdd({
      title,
      description,
      identityGoal,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    // Reset form
    setTitle('');
    setDescription('');
    setIdentityGoal('');
    setTags('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Blueprint</DialogTitle>
          <DialogDescription>Map out your next big vision or long-term goal.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div>
            <Label htmlFor="title">What is the outcome you care about?</Label>
            <Input id="title" placeholder="e.g., Become a Published Author" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="identity">Who are you becoming through this?</Label>
            <Input id="identity" placeholder="e.g., A disciplined writer who shares ideas." value={identityGoal} onChange={e => setIdentityGoal(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="description">Brief description</Label>
            <Textarea id="description" placeholder="A summary of the vision." value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" placeholder="e.g., career, creative, learning" value={tags} onChange={e => setTags(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAdd}>Create Blueprint</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
