
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
import { ChevronUp, ChevronDown, HeartPulse, Zap, ZapOff, Flame, InfoIcon, Lightbulb } from 'lucide-react';
import { useWellnessData, calculateStreak } from '@/hooks/use-wellness-data';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { QuickLogBar } from '@/components/wellness/QuickLogBar';
import { WellnessRecommendations } from '@/components/wellness/WellnessRecommendations';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { WellnessActivityCalendar } from '@/components/wellness/WellnessActivityCalendar';

export default function ExercisesPage() {
  const [isOpen, setIsOpen] = useState(true);
  const { lowEnergyMode, setLowEnergyMode, movementLogs, stillnessLogs } = useWellnessData();
  const { settings } = useDashboardSettings();

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
    
    const moveDates = new Set(movementLogs.map(l => format(new Date(l.timestamp), 'yyyy-MM-dd')));
    const stillDates = new Set(stillnessLogs.map(l => format(new Date(l.timestamp), 'yyyy-MM-dd')));
    
    let bothCount = 0;
    moveDates.forEach(date => {
        if (stillDates.has(date)) bothCount++;
    });

    return { 
        streak, 
        moveToday, 
        stillToday,
        moveDays: moveDates.size,
        stillDays: stillDates.size,
        bothCount
    };
  }, [movementLogs, stillnessLogs]);

  const activityData = useMemo(() => {
    const combined = [...movementLogs, ...stillnessLogs];
    const counts: Record<string, number> = {};
    combined.forEach(l => {
        const d = format(new Date(l.timestamp), 'yyyy-MM-dd');
        counts[d] = (counts[d] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [movementLogs, stillnessLogs]);

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24">
        <div className="mx-auto max-w-7xl space-y-8">
            
            <div className="flex justify-center">
              <Popover>
                <PopoverTrigger asChild>
                    <Card className="bg-primary/5 border-primary/10 rounded-full py-2 px-6 cursor-pointer hover:bg-primary/10 transition-colors shadow-sm">
                        <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-500" />
                            <span className="text-xl font-black">{wellnessStats.streak}</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Wellness Streak</span>
                        </div>
                        <div className="h-4 w-[1px] bg-border" />
                        <div className="flex gap-3">
                            <div className={cn("w-3 h-3 rounded-full transition-colors border", wellnessStats.moveToday ? "bg-primary border-primary" : "bg-muted border-transparent")} />
                            <div className={cn("w-3 h-3 rounded-full transition-colors border", wellnessStats.stillToday ? "bg-blue-400 border-blue-400" : "bg-muted border-transparent")} />
                        </div>
                        <InfoIcon className="w-3 h-3 text-muted-foreground opacity-40" />
                        </div>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                    <div className="space-y-3">
                        <h4 className="font-bold text-sm uppercase tracking-wider">Streak Analytics</h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Movement Days</span>
                                <span className="font-bold">{wellnessStats.moveDays}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400" /> Stillness Days</span>
                                <span className="font-bold">{wellnessStats.stillDays}</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">
                            Keep either streak going to maintain your combined Wellness momentum.
                        </p>
                    </div>
                </PopoverContent>
              </Popover>
            </div>

            {!lowEnergyMode && <WellnessRecommendations />}

            <div className="flex flex-col gap-4">
                <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
                  <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <CollapsibleContent>
                            <div className="flex flex-col items-center text-center pb-4">
                                <HeartPulse className="mx-auto h-12 w-12 text-primary mb-2"/>
                                <h1 className="text-4xl font-bold font-headline tracking-tight">Health Check</h1>
                                <p className="text-lg text-muted-foreground">Actionable wellness for body and brain. Log your daily reps.</p>
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

                <div className="flex flex-col items-center gap-4">
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
                    
                    {settings.assistantMode && (
                        <div className="max-w-md p-3 bg-primary/10 rounded-lg text-center relative animate-in fade-in slide-in-from-top-1">
                            <p className="text-xs flex items-start gap-2 text-left">
                                <Lightbulb className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                                <span className="text-foreground">
                                    <span className="font-bold">MVD Logic:</span> Minimum Viable Day mode preserves your streak with low-friction check-ins when energy is low.
                                </span>
                            </p>
                        </div>
                    )}

                    {!lowEnergyMode && <RoutineBuilderModal />}
                </div>
            </div>
            
            <WellnessTabs />

            <div className="space-y-8 pt-8 border-t border-primary/5">
              <WellnessActivityCalendar />
              <WellnessHeatmap activityData={activityData} />
            </div>
        </div>
      </main>
      <QuickLogBar />
    </>
  );
}
