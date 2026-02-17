
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TaskDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { addTask } = useStudyDashboardStore();
  const { decks } = useFlashcardStore();
  
  const [name, setName] = useState('');
  const [mins, setMins] = useState('30');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [deckId, setDeckId] = useState<string | 'none'>('none');
  const [repeat, setRepeat] = useState<'none' | 'daily' | 'weekly'>('none');

  const handleSave = () => {
    if (!name || !date) return;
    
    addTask({
      name,
      estimatedMinutes: parseInt(mins),
      date: format(date, 'yyyy-MM-dd'),
      linkedDeckId: deckId === 'none' ? null : deckId,
      repeat
    });

    onOpenChange(false);
    setName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Study Task</DialogTitle>
          <DialogDescription>Plan a non-flashcard activity for your daily agenda.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">What are you studying?</Label>
            <Input 
              placeholder="e.g. Read Chapter 7 Biology" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Estimated Time</Label>
              <Select value={mins} onValueChange={setMins}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[15, 30, 45, 60, 90, 120].map(m => (
                    <SelectItem key={m} value={m.toString()}>{m} mins</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMM do") : <span>Pick date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground">Link to Deck (Optional)</Label>
            <Select value={deckId} onValueChange={setDeckId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Link</SelectItem>
                {decks.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name}>Add to Agenda</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
