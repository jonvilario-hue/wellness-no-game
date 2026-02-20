
'use client';

import { useFinanceEngine } from '@/hooks/use-finance-engine';
import { SEED_PLAYBOOKS } from '@/lib/finance-constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle2, Circle, ArrowRight, Clock, Star, LayoutGrid, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function PlaybookLibrary() {
  const { playbookProgress, updatePlaybookStep } = useFinanceEngine();
  const [selectedPlaybook, setSelectedPlaybook] = useState<typeof SEED_PLAYBOOKS[0] | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Strategic Playbooks</h2>
          <p className="text-sm text-muted-foreground">Step-by-step architectural guides for financial mastery.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 h-8 px-3 font-bold uppercase text-[9px] tracking-widest">
            {SEED_PLAYBOOKS.length} Protocols Available
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SEED_PLAYBOOKS.map((pb) => {
          const progress = playbookProgress.find(p => p.playbookId === pb.id);
          const completedCount = progress?.completedSteps.length || 0;
          const percent = (completedCount / pb.steps.length) * 100;
          const isComplete = percent === 100;

          return (
            <Card key={pb.id} className={cn(
              "group cursor-pointer hover:border-primary/50 transition-all flex flex-col border-primary/5",
              isComplete && "bg-emerald-500/5 border-emerald-500/20"
            )} onClick={() => setSelectedPlaybook(pb)}>
              <CardHeader className="p-5 pb-3">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="text-[8px] uppercase tracking-widest bg-primary/10 text-primary border-none">
                    {pb.category}
                  </Badge>
                  {isComplete ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <BookOpen className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />}
                </div>
                <CardTitle className="text-lg font-black leading-tight group-hover:text-primary transition-colors">{pb.name}</CardTitle>
                <CardDescription className="text-xs line-clamp-2 mt-1">{pb.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 flex-grow">
                <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mt-4">
                  <span className="flex items-center gap-1.5"><LayoutGrid className="w-3 h-3" /> {pb.steps.length} Steps</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {pb.estimatedMinutes} Mins</span>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 mt-auto flex flex-col gap-3">
                <div className="w-full space-y-1.5">
                  <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground opacity-60">
                    <span>Progress</span>
                    <span>{Math.round(percent)}%</span>
                  </div>
                  <Progress value={percent} className={cn("h-1", isComplete && "[&>div]:bg-emerald-500")} />
                </div>
                <Button variant="ghost" size="sm" className="w-full h-8 text-[10px] font-black uppercase border border-primary/5 hover:bg-primary/5">
                  {percent === 0 ? 'Start Execution' : percent < 100 ? 'Resume Protocol' : 'Review Protocol'} <ChevronRight className="ml-1 w-3 h-3" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selectedPlaybook} onOpenChange={(o) => !o && setSelectedPlaybook(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
          {selectedPlaybook && (
            <>
              <DialogHeader className="p-6 bg-primary/5 border-b shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl font-black uppercase tracking-tighter">{selectedPlaybook.name}</DialogTitle>
                    <DialogDescription className="text-base mt-1">{selectedPlaybook.description}</DialogDescription>
                  </div>
                  <Badge variant="outline" className="border-primary/20 bg-background text-primary font-bold">
                    {selectedPlaybook.category}
                  </Badge>
                </div>
              </DialogHeader>
              
              <ScrollArea className="flex-grow">
                <div className="p-6 space-y-6">
                  {selectedPlaybook.steps.map((step) => {
                    const isDone = playbookProgress.find(p => p.playbookId === selectedPlaybook.id)?.completedSteps.includes(step.stepNumber);
                    return (
                      <div key={step.stepNumber} className={cn(
                        "p-4 rounded-2xl border transition-all flex gap-4",
                        isDone ? "bg-emerald-500/5 border-emerald-500/20" : "bg-muted/30 border-primary/5"
                      )}>
                        <div className="shrink-0 pt-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full border-2"
                            onClick={() => updatePlaybookStep(selectedPlaybook.id, step.stepNumber, !isDone)}
                          >
                            {isDone ? <Check className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] font-black">{step.stepNumber}</span>}
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <h4 className={cn("font-bold text-sm", isDone && "text-emerald-700 line-through")}>{step.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{step.explanation}</p>
                          {step.actionType === 'external-link' && (
                            <Button variant="link" size="sm" className="p-0 h-auto text-[10px] font-black uppercase text-primary">Open Resource →</Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <DialogFooter className="p-4 border-t bg-muted/5">
                <div className="flex justify-between items-center w-full">
                  <p className="text-[10px] text-muted-foreground italic px-2">
                    "Educational information only — not personalized financial advice."
                  </p>
                  <Button onClick={() => setSelectedPlaybook(null)} className="font-bold px-8">Close Playbook</Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
