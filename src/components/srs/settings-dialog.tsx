
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
import { Label } from '@/components/ui/label';
import { useFlashcardStore } from '@/store/srs-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { DeckSettings } from '@/types/srs-types';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deckId?: string | null;
}

export function SettingsDialog({ open, onOpenChange, deckId }: SettingsDialogProps) {
  const { globalSettings, decks, updateGlobalSettings, updateDeckSettings } = useFlashcardStore();
  
  const targetDeck = deckId ? decks.find(d => d.id === deckId) : null;
  const initialSettings = targetDeck?.settings || globalSettings;

  const [settings, setSettings] = useState<Partial<DeckSettings>>(initialSettings);
  const [stepsString, setStepsString] = useState(initialSettings.learningSteps?.join(' ') || '1 10');

  useEffect(() => {
    if (open) {
      const current = targetDeck?.settings || globalSettings;
      setSettings(current);
      setStepsString(current.learningSteps?.join(' ') || '1 10');
    }
  }, [open, targetDeck, globalSettings]);

  const handleSave = () => {
    const steps = stepsString.split(/\s+/).map(Number).filter(n => !isNaN(n) && n > 0);
    const finalSettings = { ...settings, learningSteps: steps };

    if (deckId) {
      updateDeckSettings(deckId, finalSettings);
    } else {
      updateGlobalSettings(finalSettings);
    }
    onOpenChange(false);
  };

  const updateField = (key: keyof DeckSettings, value: string | number) => {
    setSettings(prev => ({ ...prev, [key]: typeof value === 'string' ? parseFloat(value) : value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {deckId ? `Algorithm Settings for "${targetDeck?.name}"` : 'Global SRS Settings'}
          </DialogTitle>
          <DialogDescription>
            Fine-tune the Spaced Repetition behavior. These settings determine how card intervals are calculated.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>New Cards/Day</Label>
                <Input 
                  type="number" 
                  value={settings.newCardsPerDay ?? ''} 
                  onChange={(e) => updateField('newCardsPerDay', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum Reviews/Day</Label>
                <Input 
                  type="number" 
                  value={settings.reviewsPerDay ?? ''} 
                  onChange={(e) => updateField('reviewsPerDay', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Learning Steps (minutes)</Label>
              <Input 
                placeholder="e.g. 1 10 1440" 
                value={stepsString} 
                onChange={(e) => setStepsString(e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground italic">
                Space-separated delays. After finishing all steps, the card graduates to "Review" status.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label>Graduating Interval (days)</Label>
                <Input 
                  type="number" 
                  value={settings.graduatingInterval ?? ''} 
                  onChange={(e) => updateField('graduatingInterval', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Easy Interval (days)</Label>
                <Input 
                  type="number" 
                  value={settings.easyInterval ?? ''} 
                  onChange={(e) => updateField('easyInterval', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Starting Ease (default 2.5)</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={settings.startingEase ?? ''} 
                  onChange={(e) => updateField('startingEase', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Interval Modifier (1.0 = neutral)</Label>
                <Input 
                  type="number" 
                  step="0.05"
                  value={settings.intervalModifier ?? ''} 
                  onChange={(e) => updateField('intervalModifier', e.target.value)}
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
