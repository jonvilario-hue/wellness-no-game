'use client';

import { useState, useMemo } from 'react';
import { useDrawingStore } from '@/hooks/use-drawing-store';
import { useDrawaboxStore } from '@/hooks/use-drawabox-store';
import { drawingDrills } from '@/data/drawing-drills';
import { drawaboxDrills } from '@/data/drawabox-drills';
import { DrawingDashboard } from './DrawingDashboard';
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
  Clock, CheckCircle2, Circle, Activity, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AssistantTooltip } from '../assistant-tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { DrawingDrill, DrawingDiscipline } from '@/types/drawing';

const disciplines: DrawingDiscipline[] = [
  'Line Control', 'Gesture', 'Observation', 'Proportion',
  'Perspective', 'Value', 'Form', 'Composition'
];

export default function DrawingContent() {
  const { _hasHydrated, getDaysSinceLastPractice } = useDrawingStore();
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

  // Recommendation logic: find a drill in a neglected discipline
  const recommendedDrill = (() => {
    const neglected = disciplines
      .map(d => ({ name: d, days: getDaysSinceLastPractice(d) }))
      .filter(d => d.days !== null)
      .sort((a, b) => (b.days || 0) - (a.days || 0))[0];
    
    if (neglected) {
      return drawingDrills.find(d => d.discipline === neglected.name) || drawingDrills[0];
    }
    return drawingDrills[0];
  })();

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
        <div className="flex items-center gap-2 px-1">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Procedural Focus</h3>
        </div>
        <DrawaboxSection onStartDrill={setActiveDrill} />
      </div>

      {!mvdMode && (
        <>
          {/* 2. Today's Focus Recommendation */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Laboratory Insight</h3>
            <Card className="border-primary/20 bg-primary/5 shadow-md overflow-hidden group hover:border-primary/40 transition-all">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="p-6 md:w-2/3 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-primary/10 rounded text-primary"><Sparkles className="w-4 h-4 animate-pulse" /></span>
                      <h3 className="text-sm font-black uppercase tracking-widest text-primary">Recommended Practice</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xl font-black">{recommendedDrill.name}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{recommendedDrill.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-muted-foreground uppercase">
                        <span className="flex items-center gap-1.5"><LayoutGrid className="w-3 h-3" /> {recommendedDrill.discipline}</span>
                        {recommendedDrill.defaultTimerSeconds && <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {recommendedDrill.defaultTimerSeconds}s Duration</span>}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 bg-primary/10 p-6 flex items-center justify-center border-l border-primary/5 group-hover:bg-primary/20 transition-colors">
                    <Button onClick={() => setActiveDrill(recommendedDrill)} className="w-full h-12 font-black uppercase tracking-widest gap-2 shadow-lg">
                      <Play className="w-4 h-4 fill-current" /> Start Focus Drill
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3. Studio Dashboard */}
          <DrawingDashboard />

          {/* 4. Discipline Library */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Discipline Library</h3>
            </div>

            <Accordion type="multiple" defaultValue={[disciplines[0]]}>
              {disciplines.map(discipline => {
                const drills = drawingDrills.filter(d => d.discipline === discipline);
                return (
                  <AccordionItem key={discipline} value={discipline} className="border-b border-primary/5">
                    <AccordionTrigger className="hover:no-underline py-4 px-1">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary"><Pencil className="w-4 h-4" /></div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-tight">{discipline}</h4>
                          <p className="text-[10px] text-muted-foreground">{drills.length} Drills Available</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {drills.map(drill => (
                          <Card key={drill.id} className="border-primary/5 hover:border-primary/20 transition-all group cursor-pointer" onClick={() => setActiveDrill(drill)}>
                            <CardHeader className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="text-[8px] font-black uppercase h-4 px-2">{drill.displayMode}</Badge>
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
                );
              })}
            </Accordion>
          </div>

          <TodayScheduleWidget category="Custom" />
          <WellnessActivityCalendar categoryFilter="Custom" />
        </>
      )}
    </div>
  );
}
