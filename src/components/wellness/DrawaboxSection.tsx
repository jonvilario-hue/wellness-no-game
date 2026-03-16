
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Play, RotateCcw, Box, Plus, Info, 
  ChevronRight, Sparkles, LayoutGrid, Layers, Clock
} from 'lucide-react';
import { useDrawaboxStore } from '@/hooks/use-drawabox-store';
import { drawingDrills } from '@/data/drawing-drills';
import { cn } from '@/lib/utils';
import { AssistantTooltip } from '../assistant-tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { DrawingDrill, DrawaboxGroup } from '@/types/drawing';

const DRAWABOX_GROUPS: DrawaboxGroup[] = ['Lines', 'Ellipses', 'Boxes', 'Contour & Form', 'Texture', 'Construction'];

interface DrawaboxSectionProps {
  onStartDrill: (drill: DrawingDrill) => void;
}

const DrawaboxBrandIcon = ({ className }: { className?: string }) => (
  <div className={cn("w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center border border-amber-500/20 shadow-2xl", className)}>
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-amber-500" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Visible Front Edges */}
      <path d="M12 12L2 7.5L12 3L22 7.5L12 12Z" fill="currentColor" fillOpacity="0.05" />
      <path d="M12 12L2 7.5L12 3L22 7.5L12 12Z" />
      <path d="M2 7.5V17.5L12 22V12L2 7.5Z" />
      <path d="M22 7.5V17.5L12 22V12L22 7.5Z" />
      
      {/* Draw-through Rear Edges */}
      <path d="M2 7.5L7 9.5M22 7.5L17 9.5M12 3L12 10" strokeOpacity="0.3" strokeDasharray="1 1" />
      <path d="M7 9.5V19.5M17 9.5V19.5M12 22L7 19.5M12 22L17 19.5" strokeOpacity="0.3" strokeDasharray="1 1" />
    </svg>
  </div>
);

export function DrawaboxSection({ onStartDrill }: DrawaboxSectionProps) {
  const { boxCount, addBoxes, cylinderCount, addCylinders } = useDrawaboxStore();
  const [boxLog, setBoxLog] = useState("5");
  const [cylLog, setCylLog] = useState("5");

  const handleWarmup = () => {
    const warmupPool = drawingDrills.filter(d => d.isWarmup && (d.dbGroup === 'Lines' || d.dbGroup === 'Ellipses'));
    const selected = [...warmupPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    if (selected.length > 0) onStartDrill(selected[0]);
  };

  return (
    <Card className="border-primary/10 shadow-xl overflow-hidden bg-background">
      <CardHeader className="bg-primary/5 p-8 pb-10 relative">
        {/* Centered Brand Stack */}
        <div className="flex flex-col items-center text-center space-y-6 w-full max-w-2xl mx-auto">
          <DrawaboxBrandIcon />
          
          <div className="space-y-1.5">
            <CardTitle className="text-4xl font-black uppercase tracking-tighter">Drawabox</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Fundamentals you never stop practicing.
            </CardDescription>
          </div>

          <Button 
            onClick={handleWarmup} 
            className="w-full h-14 text-lg font-black uppercase shadow-lg shadow-primary/20 gap-3 rounded-2xl"
          >
            <RotateCcw className="w-5 h-5" /> Start Warm-Up
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        <Accordion type="multiple" defaultValue={DRAWABOX_GROUPS} className="space-y-4">
          {DRAWABOX_GROUPS.map(group => {
            const drills = drawingDrills.filter(d => d.dbGroup === group);
            return (
              <AccordionItem key={group} value={group} className="border-none">
                <AccordionTrigger className="hover:no-underline py-2 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">{group}</span>
                    <div className="h-px bg-primary/10 flex-grow w-32" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drills.map(drill => (
                      <Card key={drill.id} className="border-primary/5 hover:border-primary/20 transition-all cursor-pointer group flex flex-col" onClick={() => onStartDrill(drill)}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-1.5">
                              {drill.lesson && (
                                <Badge variant="secondary" className="text-[8px] font-black uppercase h-4 bg-muted/50 text-muted-foreground border-none">
                                  {drill.lesson}
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-[8px] font-black uppercase h-4 px-2">
                                {drill.difficulty}
                              </Badge>
                            </div>
                            {drill.defaultTimerSeconds && (
                              <div className="text-[8px] font-bold text-primary flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> {Math.round(drill.defaultTimerSeconds/60)}m
                              </div>
                            )}
                          </div>
                          <CardTitle className="text-sm font-bold truncate group-hover:text-primary transition-colors">{drill.name}</CardTitle>
                          <CardDescription className="text-[10px] leading-relaxed line-clamp-2 mt-1">{drill.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 mt-auto flex justify-end">
                          <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase group-hover:bg-primary group-hover:text-primary-foreground">
                            Start <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                    {/* Challenges embedded in groups */}
                    {group === 'Boxes' && (
                      <Card className="border-primary/10 bg-primary/5 p-4 flex flex-col justify-between min-h-[140px] relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-[8px] font-black uppercase h-4 bg-muted/50 text-muted-foreground border-none">L1–L2</Badge>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[10px] font-black uppercase tracking-widest">250 Box Challenge</h4>
                          <p className="text-[9px] text-muted-foreground italic leading-tight">Draw a box. Extend all lines to vanishing points. Check convergence. Repeat.</p>
                        </div>
                        <div className="space-y-3 mt-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-black">
                              <span>Progress</span>
                              <span className="text-primary">{boxCount} / 250</span>
                            </div>
                            <Progress value={(boxCount/250)*100} className="h-1" />
                          </div>
                          <div className="flex gap-2">
                            <Input type="number" value={boxLog} onChange={e => setBoxLog(e.target.value)} className="h-8 w-16 text-[10px] font-bold text-center" />
                            <Button size="sm" className="flex-1 h-8 text-[9px] font-black uppercase" onClick={(e) => { e.stopPropagation(); addBoxes(parseInt(boxLog)); }}>Log Boxes</Button>
                          </div>
                        </div>
                      </Card>
                    )}

                    {group === 'Contour & Form' && (
                      <Card className="border-primary/10 bg-primary/5 p-4 flex flex-col justify-between min-h-[140px] relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-[8px] font-black uppercase h-4 bg-muted/50 text-muted-foreground border-none">L5–L6</Badge>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[10px] font-black uppercase tracking-widest">250 Cylinder Challenge</h4>
                          <p className="text-[9px] text-muted-foreground italic leading-tight">Half in boxes, half freehand. Train ellipse consistency and minor axis alignment.</p>
                        </div>
                        <div className="space-y-3 mt-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-black">
                              <span>Progress</span>
                              <span className="text-primary">{cylinderCount} / 250</span>
                            </div>
                            <Progress value={(cylinderCount/250)*100} className="h-1" />
                          </div>
                          <div className="flex gap-2">
                            <Input type="number" value={cylLog} onChange={e => setCylLog(e.target.value)} className="h-8 w-16 text-[10px] font-bold text-center" />
                            <Button size="sm" className="flex-1 h-8 text-[9px] font-black uppercase" onClick={(e) => { e.stopPropagation(); addCylinders(parseInt(cylLog)); }}>Log Cylinders</Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>

      <CardFooter className="bg-muted/10 p-4 border-t border-primary/5 flex justify-center items-center">
        <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-primary" />
          Remember the 50% rule — spend half your drawing time on fun, not just drills.
        </p>
      </CardFooter>
    </Card>
  );
}
