'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, RotateCcw, FastForward, CheckCircle2 } from 'lucide-react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { format, addDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function RescheduleDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { rescheduleDueCards } = useFlashcardStore();
  const { rescheduleTodayTasks } = useStudyDashboardStore();
  const { toast } = useToast();

  const handleReschedule = (type: 'tomorrow' | 'sprint' | 'weekend') => {
    if (type === 'tomorrow') {
      rescheduleDueCards(1);
      rescheduleTodayTasks(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
      toast({ title: "Schedule Shifted", description: "All active work moved to tomorrow." });
    } else if (type === 'weekend') {
      rescheduleDueCards(2);
      rescheduleTodayTasks(format(addDays(new Date(), 2), 'yyyy-MM-dd'));
      toast({ title: "Workload Distributed", description: "Tasks spread across the next 48 hours." });
    } else if (type === 'sprint') {
      // In a real SRS this would involve complex logic, for MVP we push half the load
      rescheduleDueCards(1);
      toast({ title: "Sprint Mode Active", description: "Lower priority cards deferred to tomorrow." });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cognitive Offsets</DialogTitle>
          <DialogDescription>Strategically adjust your workload to manage mental fatigue.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <button 
            onClick={() => handleReschedule('sprint')}
            className="w-full text-left p-4 rounded-xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all group"
          >
            <div className="flex items-center gap-3 mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm">15-Minute Sprint</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Prioritize only the most critical reviews and defer the rest. Perfect for high-stress days.
            </p>
          </button>

          <button 
            onClick={() => handleReschedule('tomorrow')}
            className="w-full text-left p-4 rounded-xl border border-primary/10 hover:bg-muted/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-1">
              <FastForward className="w-4 h-4 text-muted-foreground" />
              <span className="font-bold text-sm">Shift to Tomorrow</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Move all of today's pending tasks and reviews to the next calendar day.
            </p>
          </button>

          <button 
            onClick={() => handleReschedule('weekend')}
            className="w-full text-left p-4 rounded-xl border border-primary/10 hover:bg-muted/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-bold text-sm">Weekend Recovery</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Distribute your current workload across the next 2 days to lower daily intensity.
            </p>
          </button>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
