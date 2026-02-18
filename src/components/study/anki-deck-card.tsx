'use client';

import { useState } from 'react';
import { useFirebase } from '@/firebase';
import { ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Trash2, Clock, HardDrive, Play, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
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

interface AnkiDeckCardProps {
  deck: {
    id: string;
    displayName: string;
    fileName: string;
    fileSize: number;
    downloadUrl: string;
    uploadedAt: string;
  };
}

export function AnkiDeckCard({ deck }: AnkiDeckCardProps) {
  const { user, storage, firestore } = useFirebase();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!user || !storage || !firestore) return;
    setIsDeleting(true);

    try {
      // 1. Delete from Storage
      const storageRef = ref(storage, `users/${user.uid}/anki-decks/${deck.id}.apkg`);
      await deleteObject(storageRef);

      // 2. Delete from Firestore
      const deckRef = doc(firestore, 'users', user.uid, 'anki-decks', deck.id);
      await deleteDoc(deckRef);

      // 3. Update User Stats
      const userProfileRef = doc(firestore, 'users', user.uid);
      await updateDoc(userProfileRef, {
        storageUsedBytes: increment(-deck.fileSize),
        deckCount: increment(-1)
      });

      toast({ title: "Deck deleted from vault." });
    } catch (err) {
      console.error(err);
      toast({ title: "Deletion failed", variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  const sizeMB = (deck.fileSize / (1024 * 1024)).toFixed(2);

  return (
    <Card className="border-primary/5 hover:border-primary/20 transition-all overflow-hidden group">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Play className="h-5 w-5 fill-current" />
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove from Vault?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{deck.displayName}" from your storage.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-sm truncate">{deck.displayName}</h4>
          <p className="text-[10px] text-muted-foreground truncate">{deck.fileName}</p>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span className="flex items-center gap-1"><HardDrive className="h-3 w-3" /> {sizeMB} MB</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {format(new Date(deck.uploadedAt), 'MMM d')}</span>
        </div>

        <Button asChild className="w-full h-10 gap-2 font-bold shadow-sm" variant="outline">
          <a href={deck.downloadUrl} download={deck.fileName} target="_blank" rel="noopener noreferrer">
            <FileDown className="h-4 w-4" /> Download .apkg
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
