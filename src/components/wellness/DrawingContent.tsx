
'use client';

import { useState, useMemo } from 'react';
import { useDrawingStore } from '@/hooks/use-drawing-store';
import { drawingDrills } from '@/data/drawing-drills';
import { drawingPlans } from '@/data/drawing-plans';
import { DrawingDashboard } from './DrawingDashboard';
import { DrawingDrillPlayer } from './DrawingDrillPlayer';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { TodayScheduleWidget } from './TodayScheduleWidget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, Play, ChevronRight, Sparkles, 
  Layers, Target, Pencil, Eye, LayoutGrid,
  Clock, CheckCircle2, Circle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AssistantTooltip } from '../assistant-tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { DrawingDrill, DrawingDiscipline } from '@/types/drawing';

const disciplines: DrawingDiscipline[] = [
  'Line Control', 'Gesture & Movement', 'Contour & Observation', 'Proportion & Measurement',
  'Perspective & Space', 'Value & Light', 'Form & Construction', 'Composition & Thumbnails'
];

export default function DrawingContent() {
  const { _hasHydrated, planProgress } = useDrawingStore();
  const [activeDrill, setActiveDrill] = useState<DrawingDrill | null>(null);

  if (!_hasHydrated) return null;

  if (activeDrill) {
    return <DrawingDrillPlayer drill={activeDrill} onClose={() => setActiveDrill(null)} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <DrawingDashboard />

      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Guided Curricula</h3>
          <Badge variant="outline" className="text-[10px] font-bold uppercase border-primary/20">5 Journey Plans Available</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingPlans.map((plan) => {
            const progress = planProgress[plan.id] || {};
            const done = Object.values(progress).filter(Boolean).length;
            const isFinished = done === plan.durationDays;

            return (
              <Link key={plan.id} href={`/exercises/plans/${plan.id}`}>
                <Card className="hover:border-primary/50 transition-all h-full group border-primary/5">
                  <CardHeader className="p-5 pb-2">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary" className="uppercase font-black text-[8px] tracking-widest px-2">
                        {plan.durationDays} Days
                      </Badge>
                      {isFinished && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    </div>
                    <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">{plan.title}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2 mt-1">{plan.tagline}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-5 pt-0 mt-auto flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground">
                    <span>{done} / {plan.durationDays} Steps</span>
                    <Play className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-5px] group-hover:translate-x-0" />
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

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
                                <Clock className="w-2.5 h-2.5" /> {drill.defaultTimerSeconds}s
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
                    {drills.length === 0 && (
                      <div className="col-span-full py-10 text-center border-2 border-dashed rounded-2xl opacity-20 italic text-xs">
                        Expanding library...
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <TodayScheduleWidget category="Custom" />
      <WellnessActivityCalendar categoryFilter="Custom" />
    </div>
  );
}
