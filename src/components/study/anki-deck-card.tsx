
'use client';

import { useState } from 'react';
import { srsDeleteAnki } from '@/lib/game/srs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Trash2, Clock, HardDrive, Play, Download, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { parseImportFile } from '@/lib/flashcard-import-export';
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
    userId: string;
    displayName: string;
    fileName: string;
    fileSize: number;
    downloadUrl: string;
    uploadedAt: string;
  };
}

export function AnkiDeckCard({ deck }: AnkiDeckCardProps) {
  const { addDeck, addCards } = useFlashcardStore();
  const { toast } = useToast();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const response = await fetch(deck.downloadUrl);
      const blob = await response.blob();
      const file = new File([blob], deck.fileName, { type: 'application/octet-stream' });

      const data = await parseImportFile(file);
      
      for (const importDeck of data.decks) {
        addDeck(deck.userId, { name: importDeck.name, description: `Imported from ${deck.fileName}` });
        
        // Wait for store to update slightly
        await new Promise(r => setTimeout(r, 500));
        const deckToImportTo = useFlashcardStore.getState().decks.find(d => d.name === importDeck.name) || { id: 'default' };
        
        const cardsToSave = importDeck.cards.map(c => ({
          front: c.front || '',
          back: c.back || '',
          deckId: deckToImportTo.id,
          type: (c.type as any) || 'basic',
          tags: c.tags
        }));

        addCards(cardsToSave);
      }

      toast({ title: "Import Successful!", description: `${deck.displayName} added to your study library.`, variant: 'success' });
    } catch (err) {
      console.error(err);
      toast({ title: "Import failed", description: "Could not process Anki package.", variant: "destructive" });
    } finally {
      setIsImporting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await srsDeleteAnki(deck.userId, deck.id, deck.fileSize);
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
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" disabled={isDeleting}>
                  <Trash2 className="w-4 h-4" />
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

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleImport} disabled={isImporting} className="gap-2 font-bold h-10 shadow-sm" variant="secondary">
            {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Import
          </Button>
          <Button asChild className="h-10 gap-2 font-bold shadow-sm" variant="outline">
            <a href={deck.downloadUrl} download={deck.fileName} target="_blank" rel="noopener noreferrer">
              <FileDown className="h-4 w-4" /> Get File
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
