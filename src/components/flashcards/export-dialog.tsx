'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileDown, Layers, Loader2 } from 'lucide-react';
import { exportDecks, type ExportFormat } from '@/lib/flashcard-import-export';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deckId?: string | null;
}

export function ExportDialog({ open, onOpenChange, deckId }: ExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>('json');
  const [includeScheduling, setIncludeScheduling] = useState(true);
  const [includeSettings, setIncludeSettings] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  
  const { decks, cards } = useFlashcardStore();
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const selectedDecks = deckId 
        ? decks.filter(d => d.id === deckId)
        : decks;
      
      const selectedCards = cards.filter(c => selectedDecks.some(d => d.id === c.deckId));

      await exportDecks(format, selectedDecks, selectedCards, { includeScheduling, includeSettings });
      
      toast({ title: "Export Successful", description: `Exported ${selectedCards.length} cards.`, variant: "success" });
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Export Failed", description: "Something went wrong during export.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export {deckId ? 'Deck' : 'All Decks'}
          </DialogTitle>
          <DialogDescription>
            {deckId ? 'Export this specific deck to another format.' : 'Export your entire collection for backup or sharing.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Export Format</Label>
            <Select value={format} onValueChange={(v: ExportFormat) => setFormat(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON (Full Fidelity)</SelectItem>
                <SelectItem value="csv">CSV (Excel Compatible)</SelectItem>
                <SelectItem value="markdown">Markdown (.md)</SelectItem>
                <SelectItem value="text">Plain Text (.txt)</SelectItem>
                <SelectItem value="anki">Anki Package (.apkg)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="scheduling" checked={includeScheduling} onCheckedChange={(v) => setIncludeScheduling(!!v)} />
                <Label htmlFor="scheduling" className="text-sm">Include scheduling data (due dates, ease)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="settings" checked={includeSettings} onCheckedChange={(v) => setIncludeSettings(!!v)} />
                <Label htmlFor="settings" className="text-sm">Include deck algorithm settings</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleExport} disabled={isExporting} className="gap-2">
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
            Generate Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
