'use client';

import { useState, useMemo } from 'react';
import { useDrawingStore } from '@/hooks/use-drawing-store';
import { useDrawaboxStore } from '@/hooks/use-drawabox-store';
import { drawingDrills } from '@/data/drawing-drills';
import { DrawingDashboard, DrawingAnalytics } from './DrawingDashboard';
import { DrawingDrillPlayer } from './DrawingDrillPlayer';
import { DrawaboxSection } from './DrawaboxSection';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, Play, ChevronRight, Sparkles, 
  Layers, Target, Pencil, Eye, LayoutGrid,
  Clock, CheckCircle2, Circle, Activity, Info,
  History, Wind
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import type { DrawingDrill } from '@/types/drawing';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const groups = [
  { 
    id: 'seeing-motion', 
    label: 'SEEING & MOTION', 
    desc: 'Train your eye-hand connection and mark-making instincts.',
    disciplines: ['Gesture', 'Observation', 'Line Control'] 
  },
  { 
    id: 'construction-space', 
    label: 'CONSTRUCTION & SPACE', 
    desc: 'Build spatial reasoning and structural accuracy.',
    disciplines: ['Proportion', 'Perspective', 'Form'] 
  },
  { 
    id: 'rendering-design', 
    label: 'RENDERING & DESIGN', 
    desc: 'Control light, value, and visual hierarchy.',
    disciplines: ['Value', 'Composition'] 
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
  const { mvdMode } = useDrawaboxStore();
  const [activeDrill, setActiveDrill] = useState<DrawingDrill | null>(null);

  if (!_hasHydrated) return null;

  if (activeDrill) {
    return (
      <DrawingDrillPlayer 
        drill={activeDrill} 
        onClose={() => setActiveDrill(null)} 
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 1. Drawabox Module (Always First) */}
      <DrawaboxSection onStartDrill={setActiveDrill} />

      {/* Hide everything else in MVD mode */}
      {!mvdMode && (
        <>
          {/* 2. Quick Stats Bar */}
          <DrawingDashboard />

          {/* 3. Supplemental Drills */}
          <div className="space-y-6">
            <div className="space-y-1 px-1">
              <h3 className="text-xl font-black uppercase tracking-tight">Supplemental Practice</h3>
              <p className="text-xs text-muted-foreground">Extra drills for skills Drawabox doesn't focus on.</p>
            </div>

            <Accordion type="multiple" defaultValue={['seeing-motion', 'construction-space', 'rendering-design']} className="space-y-2">
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
                          <Card key={drill.id} className="border-primary/5 hover:border-primary/20 transition-all group cursor-pointer flex flex-col" onClick={() => setActiveDrill(drill)}>
                            <CardHeader className="p-4 pb-2">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className={cn("text-[8px] font-black uppercase h-4 px-2", 
                                  drill.difficulty === 'Foundation' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 
                                  drill.difficulty === 'Developing' ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' :
                                  'text-rose-500 border-rose-500/20 bg-rose-500/5'
                                )}>
                                  {drill.difficulty}
                                </Badge>
                                {drill.defaultTimerSeconds && (
                                  <div className="flex items-center gap-1 text-[8px] font-bold text-primary">
                                    <Clock className="w-2.5 h-2.5" /> {Math.round(drill.defaultTimerSeconds/60)}m
                                  </div>
                                )}
                              </div>
                              <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">{drill.name}</CardTitle>
                              
                              <div className="flex flex-wrap gap-1.5 mt-2 mb-1">
                                <Badge variant="secondary" className="text-[7px] h-3.5 py-0 uppercase font-bold text-muted-foreground bg-muted/30">
                                  {drill.originTag}
                                </Badge>
                                <Badge variant="secondary" className="text-[7px] h-3.5 py-0 uppercase font-bold">
                                  {drill.useCaseTag}
                                </Badge>
                                <Badge variant="secondary" className="text-[7px] h-3.5 py-0 uppercase font-bold">
                                  {drill.inputTag}
                                </Badge>
                              </div>

                              <CardDescription className="text-[10px] line-clamp-2 mt-1">{drill.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0 mt-auto justify-end">
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

          {/* 4. Recent Sessions */}
          <RecentSessions logs={logs} />

          {/* 5. Drawing Analytics */}
          <DrawingAnalytics />

          <WellnessActivityCalendar categoryFilter="Custom" />
        </>
      )}
    </div>
  );
}
