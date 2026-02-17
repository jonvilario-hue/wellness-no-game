'use client';

import { useMemo } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, Layers, Play, BookOpen, Sparkles, RefreshCw, BarChart3, ArrowRight } from 'lucide-react';
import { format, parseISO, isToday } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AssistantTooltip } from '@/components/assistant-tooltip';

export function TodayPlan() {
  const { decks, cards } = useFlashcardStore();
  const { tasks, toggleTask } = useStudyDashboardStore();

  const today = format(new Date(), 'yyyy-MM-dd');

  const deckRows = useMemo(() => {
    return decks.map(deck => {
      const deckCards = cards.filter(c => c.deckId === deck.id);
      const dueCount = deckCards.filter(c => new Date(c.dueDate) <= new Date()).length;
      const newCount = deckCards.filter(c => c.repetitions === 0).slice(0, deck.settings.newCardsPerDay).length;
      
      // Calculate progress for today
      // In MVP, we can look at the card's lastReviewDate
      const completedToday = deckCards.filter(c => c.lastReviewDate && isToday(parseISO(c.lastReviewDate))).length;
      const totalGoal = dueCount + completedToday;
      const progress = totalGoal > 0 ? (completedToday / totalGoal) * 100 : 100;

      return {
        id: deck.id,
        name: deck.name,
        dueCount,
        newCount,
        completedToday,
        totalGoal,
        progress,
        estimatedMinutes: Math.ceil((dueCount * 8) / 60)
      };
    }).filter(d => d.dueCount > 0 || d.completedToday > 0);
  }, [decks, cards]);

  const dailyTasks = useMemo(() => {
    return tasks.filter(t => t.date === today);
  }, [tasks, today]);

  const totalMinutes = useMemo(() => {
    const deckMins = deckRows.reduce((acc, d) => acc + d.estimatedMinutes, 0);
    const taskMins = dailyTasks.filter(t => !t.completed).reduce((acc, t) => acc + t.estimatedMinutes, 0);
    return deckMins + taskMins;
  }, [deckRows, dailyTasks]);

  const allDone = deckRows.every(d => d.dueCount === 0) && dailyTasks.every(t => t.completed);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <BookOpen className="w-3 h-3 text-primary" /> Today's Protocol
            </h3>
            <span className="text-[10px] font-bold text-primary">~{totalMinutes} min estimated</span>
          </div>

          <div className="space-y-3">
            {deckRows.map(deck => (
              <Card key={deck.id} className={cn("group transition-all hover:border-primary/30", deck.dueCount === 0 && "opacity-60")}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/20" />
                      <circle 
                        cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" 
                        strokeDasharray={113} strokeDashoffset={113 - (113 * deck.progress) / 100}
                        strokeLinecap="round" className="text-primary transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-sm truncate">{deck.name}</p>
                    <div className="flex gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[8px] h-4 py-0 uppercase font-black">{deck.dueCount} reviews</Badge>
                      {deck.newCount > 0 && <Badge variant="outline" className="text-[8px] h-4 py-0 uppercase border-primary/20 text-primary">{deck.newCount} new</Badge>}
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-black uppercase text-muted-foreground">~{deck.estimatedMinutes}m</p>
                    </div>
                    {deck.dueCount > 0 ? (
                      <Button asChild size="sm" className="h-8 px-4 font-bold shadow-sm">
                        <Link href={`/study/session?deckId=${deck.id}`}>Study <ArrowRight className="ml-1.5 w-3.5 h-3.5" /></Link>
                      </Button>
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {dailyTasks.map(task => (
              <Card key={task.id} className={cn("border-dashed transition-all", task.completed && "opacity-60")}>
                <CardContent className="p-4 flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 shrink-0" 
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
                  </Button>
                  <div className="flex-grow">
                    <p className={cn("font-bold text-sm", task.completed && "line-through text-muted-foreground")}>{task.name}</p>
                    <p className="text-[9px] font-black uppercase opacity-60 mt-0.5">{task.estimatedMinutes} MIN • TASK</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {allDone && (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-500">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">All Caught Up! 🎉</h3>
                  <p className="text-sm text-muted-foreground">Your cognitive map is synced. Ready for tomorrow?</p>
                </div>
                <Button variant="outline" className="border-primary/20 gap-2 h-10 font-bold">
                  <RefreshCw className="w-4 h-4" /> Study Ahead
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Reschedule Day
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Feeling overwhelmed? Use cognitive offsets to redistribute your workload without breaking your streak.
              </p>
              <Button variant="outline" className="w-full h-9 text-[10px] font-black uppercase border-primary/20 hover:bg-primary/10">
                Reschedule Options
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-60">Pro Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs italic text-muted-foreground leading-relaxed">
                "Interleaving different topics today will increase your long-term retention by forcing your brain to reset between contexts."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
