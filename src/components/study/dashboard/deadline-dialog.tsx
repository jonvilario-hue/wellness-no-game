
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { format, parseISO, differenceInDays } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Target, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function DeadlineDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { addDeadline } = useStudyDashboardStore();
  const { decks, cards } = useFlashcardStore();
  
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [selectedDecks, setSelectedDecks] = useState<string[]>([]);

  const paceAnalysis = () => {
    if (!date || selectedDecks.length === 0) return null;
    const daysRemaining = differenceInDays(date, new Date());
    if (daysRemaining <= 0) return null;

    const totalUnseen = cards.filter(c => selectedDecks.includes(c.deckId) && c.repetitions === 0).length;
    const currentDailyPace = decks
      .filter(d => selectedDecks.includes(d.id))
      .reduce((s, d) => s + d.settings.newCardsPerDay, 0);
    
    const requiredPace = Math.ceil(totalUnseen / daysRemaining);
    const isBehind = requiredPace > currentDailyPace;

    return { daysRemaining, totalUnseen, currentDailyPace, requiredPace, isBehind };
  };

  const analysis = paceAnalysis();

  const handleSave = () => {
    if (!name || !date) return;
    addDeadline({
      name,
      date: format(date, 'yyyy-MM-dd'),
      linkedDeckIds: selectedDecks
    });
    onOpenChange(false);
    setName('');
    setSelectedDecks([]);
  };

  const toggleDeck = (id: string) => {
    setSelectedDecks(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Add Exam / Deadline
          </DialogTitle>
          <DialogDescription>Track your biggest milestones and get pace recommendations.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Exam Name</Label>
            <Input placeholder="e.g. Final Exam: Biology" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground">When is it?</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground">Linked Decks</Label>
            <div className="flex flex-wrap gap-2">
              {decks.map(deck => (
                <Badge 
                  key={deck.id}
                  variant={selectedDecks.includes(deck.id) ? 'default' : 'outline'}
                  className="cursor-pointer py-1.5 px-3 uppercase text-[9px] font-black"
                  onClick={() => toggleDeck(deck.id)}
                >
                  {deck.name}
                </Badge>
              ))}
            </div>
          </div>

          {analysis && (
            <div className={cn(
              "p-4 rounded-2xl border flex gap-4 transition-all",
              analysis.isBehind ? "bg-destructive/5 border-destructive/20" : "bg-primary/5 border-primary/10"
            )}>
              {analysis.isBehind ? <ShieldAlert className="w-6 h-6 text-destructive shrink-0" /> : <Target className="w-6 h-6 text-primary shrink-0" />}
              <div className="space-y-1">
                <p className="text-sm font-bold">{analysis.isBehind ? 'Behind Schedule' : 'On Track'}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You have {analysis.totalUnseen} unseen cards and {analysis.daysRemaining} days left. 
                  You need to learn <span className="font-bold text-foreground">{analysis.requiredPace}/day</span> to finish. 
                  Your current pace is {analysis.currentDailyPace}/day.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name || !date}>Set Deadline</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
