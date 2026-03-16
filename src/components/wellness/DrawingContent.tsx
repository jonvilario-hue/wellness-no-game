'use client';

import { useState, useMemo } from 'react';
import { useDrawingStore } from '@/hooks/use-drawing-store';
import { useDrawaboxStore } from '@/hooks/use-drawabox-store';
import { drawingDrills } from '@/data/drawing-drills';
import { drawaboxDrills } from '@/data/drawabox-drills';
import { DrawingDashboard, DrawingAnalytics } from './DrawingDashboard';
import { DrawingDrillPlayer } from './DrawingDrillPlayer';
import { DrawaboxSection } from './DrawaboxSection';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { TodayScheduleWidget } from './TodayScheduleWidget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Palette, Play, ChevronRight, Sparkles, 
  Layers, Target, Pencil, Eye, LayoutGrid,
  Clock, CheckCircle2, Circle, Activity, Info,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AssistantTooltip } from '../assistant-tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { DrawingDrill, DrawingDiscipline } from '@/types/drawing';
import { format, parseISO } from 'date-fns';

const groups = [
  { 
    id: 'Looseness', 
    label: 'Looseness', 
    desc: 'Focus on energy, speed, and raw observation.',
    disciplines: ['Gesture', 'Observation'] 
  },
  { 
    id: 'Rendering', 
    label: 'Rendering', 
    desc: 'Focus on light, value, and visual balance.',
    disciplines: ['Value', 'Composition'] 
  },
  { 
    id: 'Construction', 
    label: 'Construction', 
    desc: 'Focus on spatial reasoning, form, and precision.',
    disciplines: ['Proportion', 'Perspective', 'Form'] 
  },
];

const RecentSessions = ({ logs }: { logs: any[] }) => (
  <div className="space-y-3">
    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
      <History className="w-3.5 h-3.5" /> Recent Studio Logs
    </h4>
    <div className="grid grid-cols-1 gap-2">
      {logs.slice(0, 5).map(log => (
        <Card key={log.id} className="border-primary/5 hover:border-primary/10 transition-all">
          <CardContent className="p-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg text-muted-foreground"><Pencil className="w-3.5 h-3.5" /></div>
              <div>
                <p className="text-sm font-bold truncate">{log.drillName}</p>
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter">
                  {format(parseISO(log.timestamp), 'MMM d, p')}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="h-5 text-[9px] font-black uppercase border-primary/10">
              {log.durationMinutes}m
            </Badge>
          </CardContent>
        </Card>
      ))}
      {logs.length === 0 && (
        <div className="py-10 text-center border-2 border-dashed rounded-2xl opacity-20 italic text-xs">
          No sessions recorded in this lab yet.
        </div>
      )}
    </div>
  </div>
);

export default function DrawingContent() {
  const { _hasHydrated, logs } = useDrawingStore();
  const { mvdMode, toggleMvd, completeExercise } = useDrawaboxStore();
  const [activeDrill, setActiveDrill] = useState<DrawingDrill | null>(null);

  if (!_hasHydrated) return null;

  if (activeDrill) {
    return (
      <DrawingDrillPlayer 
        drill={activeDrill} 
        onClose={() => {
          if (activeDrill.id.startsWith('db-')) {
            completeExercise(activeDrill.id);
          }
          setActiveDrill(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 0. Top Bar: MVD Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-3xl border border-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary"><Activity className="w-5 h-5" /></div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-tight">Drawing Protocol Control</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Procedural Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-background rounded-full border border-primary/10">
          <Label htmlFor="drawing-mvd" className="text-[10px] font-black uppercase tracking-widest cursor-pointer">Minimal Viable Day</Label>
          <Switch id="drawing-mvd" checked={mvdMode} onCheckedChange={toggleMvd} />
        </div>
      </div>

      {/* 1. Drawabox Section (Pinned to Top) */}
      <div className="space-y-4">
        <DrawaboxSection onStartDrill={setActiveDrill} />
      </div>

      {!mvdMode && (
        <>
          {/* 3. Studio Dashboard (Stats) */}
          <DrawingDashboard />

          {/* 4. Supplemental Practice */}
          <div className="space-y-6">
            <div className="space-y-1 px-1">
              <h3 className="text-xl font-black uppercase tracking-tight">Supplemental Practice</h3>
              <p className="text-xs text-muted-foreground">Extra drills for skills Drawabox doesn't focus on.</p>
            </div>

            <Accordion type="multiple" className="space-y-2">
              {groups.map(group => (
                <AccordionItem key={group.id} value={group.id} className="border-b-0">
                  <AccordionTrigger className="hover:no-underline py-4 px-6 bg-muted/20 hover:bg-muted/40 rounded-2xl border border-primary/5 transition-all">
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-2 bg-primary/10 rounded-xl text-primary"><Layers className="w-4 h-4" /></div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-tight">{group.label}</h4>
                        <p className="text-[10px] text-muted-foreground">{group.desc}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {drawingDrills
                        .filter(d => group.disciplines.includes(d.discipline))
                        .map(drill => (
                          <Card key={drill.id} className="border-primary/5 hover:border-primary/20 transition-all group cursor-pointer" onClick={() => setActiveDrill(drill)}>
                            <CardHeader className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="text-[8px] font-black uppercase h-4 px-2">Drill</Badge>
                                {drill.defaultTimerSeconds && (
                                  <div className="flex items-center gap-1 text-[8px] font-bold text-primary">
                                    <Clock className="w-2.5 h-2.5" /> {Math.round(drill.defaultTimerSeconds/60)}m
                                  </div>
                                )}
                              </div>
                              <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">{drill.name}</CardTitle>
                              <CardDescription className="text-[10px] line-clamp-2 mt-1">{drill.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0 justify-end">
                              <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase gap-1 group-hover:bg-primary group-hover:text-primary-foreground">
                                Start <ChevronRight className="w-3 h-3" />
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* 5. Recent Sessions */}
          <RecentSessions logs={logs} />

          {/* 6. Drawing Analytics (Moved to bottom) */}
          <DrawingAnalytics />

          <WellnessActivityCalendar categoryFilter="Custom" />
        </>
      )}
    </div>
  );
}