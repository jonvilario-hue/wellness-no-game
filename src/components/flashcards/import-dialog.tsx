'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { parseImportFile, type ImportPreviewData } from '@/lib/flashcard-import-export';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function ImportDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<'upload' | 'preview' | 'importing'>('upload');
  const [preview, setPreview] = useState<ImportPreviewData | null>(null);
  const [progress, setProgress] = useState(0);
  const [overwrite, setOverwrite] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { decks: existingDecks, addDeck, addCard, updateCard, cards: existingCards } = useFlashcardStore();
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await parseImportFile(file);
      setPreview(data);
      setStep('preview');
    } catch (err) {
      console.error(err);
      toast({ title: "Import Failed", description: "Could not parse the file. Please check the format.", variant: "destructive" });
    }
  };

  const startImport = async () => {
    if (!preview) return;
    setStep('importing');
    
    let processed = 0;
    const totalCards = preview.decks.reduce((sum, d) => sum + d.cards.length, 0);

    for (const importDeck of preview.decks) {
      // 1. Find or create deck
      let deckId = existingDecks.find(d => d.name.toLowerCase() === importDeck.name.toLowerCase())?.id;
      if (!deckId) {
        const id = crypto.randomUUID();
        // Since useFlashcardStore is using persist, we use its actions
        // To avoid internal state issues during loops, we assume sequential execution
        // Or in a real app, use a dedicated batch action
        addDeck({ name: importDeck.name, description: importDeck.description });
        // Refresh deckId from updated store would be better, for MVP we re-query
        const updatedDecks = useFlashcardStore.getState().decks;
        deckId = updatedDecks.find(d => d.name === importDeck.name)?.id || 'default';
      }

      // 2. Import cards
      for (const importCard of importDeck.cards) {
        const existing = existingCards.find(c => c.front === importCard.front && c.deckId === deckId);
        
        if (existing && overwrite) {
          updateCard({ ...existing, ...importCard });
        } else if (!existing) {
          addCard({
            front: importCard.front || '',
            back: importCard.back || '',
            deckId: deckId,
            type: (importCard.type as any) || 'basic',
            tags: importCard.tags
          });
        }
        
        processed++;
        setProgress((processed / totalCards) * 100);
        // Add artificial delay for UI if very fast
        if (totalCards > 100) await new Promise(r => setTimeout(r, 0));
      }
    }

    toast({ title: "Import Successful", description: `Processed ${totalCards} cards across ${preview.decks.length} decks.`, variant: "success" });
    onOpenChange(false);
    reset();
  };

  const reset = () => {
    setStep('upload');
    setPreview(null);
    setProgress(0);
    setOverwrite(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if(!o) reset(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Import Decks
          </DialogTitle>
          <DialogDescription>
            Import your knowledge from Anki, CSV, or Markdown.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-hidden flex flex-col py-4">
          {step === 'upload' && (
            <div 
              className="flex-grow border-2 border-dashed rounded-2xl flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-4 bg-primary/10 rounded-full">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-bold">Click or drag to upload</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">.apkg, .csv, .json, .md, .txt</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".apkg,.csv,.json,.md,.txt" 
                onChange={handleFileSelect}
              />
            </div>
          )}

          {step === 'preview' && preview && (
            <div className="space-y-6 flex-grow flex flex-col min-h-0">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-primary/10">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Source File</p>
                  <p className="font-bold">{preview.fileName}</p>
                </div>
                <Badge className="bg-primary/20 text-primary uppercase text-[10px]">{preview.format}</Badge>
              </div>

              <div className="flex-grow min-h-0">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2 ml-1">Deck Preview</p>
                <ScrollArea className="h-full border rounded-xl bg-card p-4">
                  <div className="space-y-6">
                    {preview.decks.map((deck, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm">{deck.name}</h4>
                          <span className="text-[10px] text-muted-foreground font-black uppercase">{deck.cards.length} Cards</span>
                        </div>
                        <div className="space-y-1.5 pl-2 border-l-2 border-primary/10">
                          {deck.cards.slice(0, 3).map((card, cIdx) => (
                            <div key={cIdx} className="text-xs p-2 bg-muted/30 rounded">
                              <span className="font-bold">F: </span> {card.front}
                            </div>
                          ))}
                          {deck.cards.length > 3 && <p className="text-[10px] text-muted-foreground italic pl-2">...and {deck.cards.length - 3} more</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                <Checkbox id="overwrite" checked={overwrite} onCheckedChange={(v) => setOverwrite(!!v)} />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="overwrite" className="text-xs font-bold">Update existing cards</Label>
                  <p className="text-[10px] text-muted-foreground">If a card with the same front exists, overwrite its content.</p>
                </div>
              </div>
            </div>
          )}

          {step === 'importing' && (
            <div className="flex-grow flex flex-col items-center justify-center space-y-6">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span>Importing...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground animate-pulse">Syncing with local vault...</p>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t">
          {step === 'preview' && (
            <>
              <Button variant="ghost" onClick={() => setStep('upload')}>Back</Button>
              <Button onClick={startImport} className="gap-2">
                <CheckCircle2 className="w-4 h-4" /> Start Import
              </Button>
            </>
          )}
          {step === 'upload' && <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
