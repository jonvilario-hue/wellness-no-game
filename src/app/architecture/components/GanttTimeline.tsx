
'use client';

import { useMemo } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { differenceInDays, format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function GanttTimeline() {
  const { projects } = useBlueprintStore();
  const activeMilestones = projects.flatMap(p => 
    p.milestones
      .filter(m => m.dueDate)
      .map(m => ({ ...m, projectName: p.title }))
  ).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());

  // Topological sort / Critical path would happen here
  const criticalPathIds = useMemo(() => {
    // Simplified: highlight milestones with dependencies
    return activeMilestones.filter(m => m.dependsOn?.length).map(m => m.id);
  }, [activeMilestones]);

  const weekStart = startOfWeek(new Date());
  const days = Array.from({ length: 28 }, (_, i) => addDays(weekStart, i));

  if (activeMilestones.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <p className="text-muted-foreground">Add due dates to milestones to visualize your Gantt chart.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-primary/10 bg-card p-6">
      <div className="min-w-[1200px] space-y-1">
        {/* Header */}
        <div className="grid grid-cols-[250px_repeat(28,1fr)] mb-4 sticky top-0 bg-card z-10 border-b pb-2">
          <div className="text-xs font-black uppercase text-muted-foreground">Milestone</div>
          {days.map(day => (
            <div key={day.toISOString()} className={cn(
              "text-[10px] text-center font-bold",
              isSameDay(day, new Date()) ? "text-primary" : "text-muted-foreground/50"
            )}>
              {format(day, 'd')}
              <div className="text-[8px]">{format(day, 'MMM')}</div>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-4">
          {activeMilestones.map(m => {
            const dueDate = new Date(m.dueDate!);
            const startD = m.startDate ? new Date(m.startDate) : addDays(dueDate, -3);
            
            const startIdx = differenceInDays(startD, weekStart);
            const duration = Math.max(1, differenceInDays(dueDate, startD));
            const isCritical = criticalPathIds.includes(m.id);

            return (
              <div key={m.id} className="grid grid-cols-[250px_repeat(28,1fr)] items-center group">
                <div className="pr-4">
                  <p className="text-xs font-bold truncate">{m.title}</p>
                  <p className="text-[9px] text-muted-foreground truncate uppercase">{m.projectName}</p>
                </div>
                
                <div className="col-span-28 relative h-8">
                  {/* The Bar */}
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div 
                          className={cn(
                            "absolute top-1/2 -translate-y-1/2 h-4 rounded-full transition-all cursor-move",
                            isCritical ? "bg-primary shadow-[0_0_15px_rgba(45,212,191,0.3)]" : "bg-muted-foreground/20",
                            m.status === 'Completed' && "opacity-40"
                          )}
                          style={{ 
                            left: `${(startIdx / 28) * 100}%`,
                            width: `${(duration / 28) * 100}%`
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-bold text-xs">{m.title}</p>
                        <p className="text-[10px]">{format(startD, 'MMM d')} - {format(dueDate, 'MMM d')}</p>
                        {isCritical && <p className="text-[10px] text-primary font-black uppercase mt-1">Critical Path</p>}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Dependency Lines would be drawn here using a separate SVG layer */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
