
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import WellnessTabs from '@/components/wellness/WellnessTabs';
import WellnessHeatmap from '@/components/wellness/WellnessHeatmap';
import RoutineBuilderModal from '@/components/wellness/RoutineBuilderModal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, HeartPulse, Zap, ZapOff, Flame, Info } from 'lucide-react';
import { useWellnessData, calculateStreak } from '@/hooks/use-wellness-data';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { QuickLogBar } from '@/components/wellness/QuickLogBar';
import { format } from 'date-fns';

export default function ExercisesPage() {
  const [isOpen, setIsOpen] = useState(true);
  const { lowEnergyMode, setLowEnergyMode, movementLogs, stillnessLogs } = useWellnessData();

  useEffect(() => {
    const savedState = localStorage.getItem('health-check-collapsible-state');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('health-check-collapsible-state', JSON.stringify(open));
  };

  const wellnessStats = useMemo(() => {
    const combinedLogs = [...movementLogs, ...stillnessLogs];
    const streak = calculateStreak(combinedLogs);
    
    const today = format(new Date(), 'yyyy-MM-dd');
    const moveToday = movementLogs.some(l => format(new Date(l.timestamp), 'yyyy-MM-dd') === today);
    const stillToday = stillnessLogs.some(l => format(new Date(l.timestamp), 'yyyy-MM-dd') === today);
    
    return { streak, moveToday, stillToday };
  }, [movementLogs, stillnessLogs]);

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24">
        <div className="mx-auto max-w-7xl space-y-6">
            
            <div className="flex justify-center mb-4">
              <Card className="bg-primary/5 border-primary/10 rounded-full py-2 px-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-xl font-black">{wellnessStats.streak}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Wellness Streak</span>
                  </div>
                  <div className="h-4 w-[1px] bg-border" />
                  <TooltipProvider>
                    <div className="flex gap-3">
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className={cn("w-3 h-3 rounded-full transition-colors", wellnessStats.moveToday ? "bg-primary" : "bg-muted")} />
                        </TooltipTrigger>
                        <TooltipContent><p>Movement: {wellnessStats.moveToday ? 'Done' : 'Pending'}</p></TooltipContent>
                      </Tooltip>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className={cn("w-3 h-3 rounded-full transition-colors", wellnessStats.stillToday ? "bg-blue-400" : "bg-muted")} />
                        </TooltipTrigger>
                        <TooltipContent><p>Stillness: {wellnessStats.stillToday ? 'Done' : 'Pending'}</p></TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
              </Card>
            </div>

            <div className="flex flex-col gap-4">
                <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
                  <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <CollapsibleContent>
                            <div className="flex flex-col items-center text-center pb-4">
                                <HeartPulse className="mx-auto h-12 w-12 text-primary mb-2"/>
                                <h1 className="text-4xl font-bold font-headline tracking-tight">Health Check</h1>
                                <p className="text-lg text-muted-foreground">Actionable wellness practices for body and mind. Train your reps.</p>
                            </div>
                        </CollapsibleContent>
                      </div>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon">
                            {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                  </div>
                </Collapsible>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-full border transition-all",
                        lowEnergyMode ? "bg-amber-500/10 border-amber-500/30" : "bg-muted/50 border-transparent"
                    )}>
                        {lowEnergyMode ? <ZapOff className="w-4 h-4 text-amber-500" /> : <Zap className="w-4 h-4 text-primary" />}
                        <Label htmlFor="mvd-toggle" className="text-sm font-bold cursor-pointer">
                            Low Energy Mode (MVD)
                        </Label>
                        <Switch 
                            id="mvd-toggle" 
                            checked={lowEnergyMode} 
                            onCheckedChange={setLowEnergyMode}
                        />
                    </div>
                    {!lowEnergyMode && <RoutineBuilderModal />}
                </div>
            </div>
            
            <WellnessTabs />
            <WellnessHeatmap activityData={[]} />
        </div>
      </main>
      <QuickLogBar />
    </>
  );
}
