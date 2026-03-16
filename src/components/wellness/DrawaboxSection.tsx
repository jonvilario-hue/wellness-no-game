'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, CheckCircle2, Circle, ChevronRight, Sparkles, 
  Layers, Lock, Info, RotateCcw, Box, Plus, InfoIcon
} from 'lucide-react';
import { useDrawaboxStore } from '@/hooks/use-drawabox-store';
import { drawaboxDrills } from '@/data/drawabox-drills';
import { cn } from '@/lib/utils';
import { AssistantTooltip } from '../assistant-tooltip';
import type { DrawingDrill } from '@/types/drawing';

interface DrawaboxSectionProps {
  onStartDrill: (drill: DrawingDrill) => void;
}

const lessons = [
  { id: 0, title: 'Getting Started', description: 'Tools, the 50% rule, and mindset.' },
  { id: 1, title: 'Lines, Ellipses, and Boxes', description: 'Mark-making and 3D foundations.' },
  { id: 2, title: 'Contour & Construction', description: 'Adding volume and texture.' },
  { id: 3, title: 'Plants', description: 'Applying construction to nature.' },
  { id: 4, title: 'Insects', description: 'Complex jointed structures.' },
  { id: 5, title: 'Animals', description: 'Organic masses and skeletal frames.' },
  { id: 6, title: 'Everyday Objects', description: 'Precision subdivision.' },
  { id: 7, title: 'Vehicles', description: 'Advanced perspective grids.' }
];

export function DrawaboxSection({ onStartDrill }: DrawaboxSectionProps) {
  const { 
    currentLesson, setLesson, completedExercises, completeExercise, 
    completedLessons, toggleLessonComplete, boxCount, addBoxes, 
    cylinderCount, addCylinders 
  } = useDrawaboxStore();

  const [boxLogCount, setBoxLogCount] = useState("5");
  const [cylLogCount, setCylLogCount] = useState("5");

  const currentLessonDrills = useMemo(() => 
    drawaboxDrills.filter(d => d.lesson === currentLesson),
  [currentLesson]);

  const nextDrill = useMemo(() => 
    currentLessonDrills.find(d => !completedExercises.includes(d.id)) || currentLessonDrills[0],
  [currentLessonDrills, completedExercises]);

  const startWarmup = () => {
    const pool = drawaboxDrills.filter(d => d.isWarmup);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    onStartDrill(shuffled[0]);
  };

  const isChallengeLocked = (lessonId: number) => {
    if (lessonId === 1.5) return !completedLessons.includes(1);
    if (lessonId === 5.5) return !completedLessons.includes(5);
    return false;
  };

  const isLessonLocked = (lessonId: number) => {
    if (lessonId === 0) return false;
    if (lessonId === 1) return !completedLessons.includes(0);
    if (lessonId === 2) return boxCount < 250;
    if (lessonId === 6) return cylinderCount < 250;
    return !completedLessons.includes(lessonId - 1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Progression */}
        <Card className="flex-grow border-primary/10 shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/5 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-2 uppercase font-black text-[10px] border-primary/20 text-primary">
                  Drawabox Curriculum
                </Badge>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                  Lesson {currentLesson}: {lessons.find(l => l.id === currentLesson)?.title}
                </CardTitle>
                <CardDescription className="max-w-md mt-1">
                  {lessons.find(l => l.id === currentLesson)?.description}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button onClick={startWarmup} variant="outline" size="sm" className="h-8 gap-2 font-black uppercase text-[10px] border-primary/20">
                  <RotateCcw className="w-3 h-3" /> Start Warm-up
                </Button>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-muted-foreground">Overall Path</span>
                  <div className="flex gap-1">
                    {lessons.map(l => (
                      <div 
                        key={l.id} 
                        className={cn(
                          "w-2 h-2 rounded-full transition-all cursor-pointer",
                          currentLesson === l.id ? "bg-primary scale-125" : 
                          completedLessons.includes(l.id) ? "bg-emerald-500" : "bg-muted"
                        )}
                        onClick={() => !isLessonLocked(l.id) && setLesson(l.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lesson 0 Content */}
              {currentLesson === 0 && (
                <div className="col-span-full space-y-6">
                  <div className="p-4 bg-muted/30 rounded-2xl border border-primary/5 space-y-4">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" /> Prerequisites & Mindset
                    </h4>
                    <ul className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                      <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Use fineliner or felt-tip pens. No pencils. No erasing.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Draw from the shoulder, not the wrist, for all marks.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Commit to the line. Confidence is more important than accuracy.</li>
                    </ul>
                  </div>
                  <Button className="w-full h-12 font-black uppercase" onClick={() => toggleLessonComplete(0)}>
                    Mark Intro Read & Unlock Lesson 1
                  </Button>
                </div>
              )}

              {/* Lesson Drills */}
              {currentLesson > 0 && (
                <>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Assigned Drills</h4>
                    <div className="space-y-2">
                      {currentLessonDrills.map(drill => {
                        const isDone = completedExercises.includes(drill.id);
                        return (
                          <div 
                            key={drill.id} 
                            className={cn(
                              "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group",
                              isDone ? "bg-muted/20 opacity-60" : "hover:border-primary/30 bg-card"
                            )}
                            onClick={() => onStartDrill(drill)}
                          >
                            <div className="flex items-center gap-3">
                              {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-muted-foreground" />}
                              <span className="text-sm font-bold">{drill.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-black text-muted-foreground uppercase opacity-40">{Math.round(drill.defaultTimerSeconds! / 60)}m</span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Button variant="ghost" className="w-full text-xs font-bold uppercase text-primary" onClick={() => toggleLessonComplete(currentLesson)}>
                      {completedLessons.includes(currentLesson) ? "Lesson Marked Done" : "Mark Full Lesson Complete"}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/10 overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" /> Active Goal
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-background rounded-xl shadow-sm"><Layers className="w-6 h-6 text-primary" /></div>
                          <div>
                            <p className="font-bold text-sm">{nextDrill?.name}</p>
                            <p className="text-[10px] text-muted-foreground line-clamp-1">{nextDrill?.description}</p>
                          </div>
                        </div>
                        <Button className="w-full h-10 font-bold gap-2" onClick={() => onStartDrill(nextDrill)}>
                          Continue Routine <ArrowRight className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="p-4 bg-muted/30 rounded-2xl border border-dashed flex items-start gap-3">
                      <InfoIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        <strong>The 50% Rule:</strong> Spend exactly half your drawing time on these exercises, and the other half drawing purely for the fun of it. 
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Side Panel: Challenges */}
        <div className="w-full md:w-80 space-y-4">
          <Card className={cn("border-primary/10 transition-all", isChallengeLocked(1.5) && "opacity-50 grayscale")}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-black uppercase">250 Box Challenge</CardTitle>
                {isChallengeLocked(1.5) && <Lock className="w-3.5 h-3.5" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Progress</span>
                  <span className="text-primary">{boxCount} / 250</span>
                </div>
                <Progress value={(boxCount / 250) * 100} className="h-1.5" />
              </div>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  value={boxLogCount} 
                  onChange={e => setBoxLogCount(e.target.value)} 
                  className="h-9 font-bold text-center w-20"
                  disabled={isChallengeLocked(1.5)}
                />
                <Button 
                  size="sm" 
                  className="flex-1 font-bold h-9 gap-2" 
                  onClick={() => addBoxes(parseInt(boxLogCount))}
                  disabled={isChallengeLocked(1.5)}
                >
                  <Plus className="w-3.5 h-3.5" /> Log Boxes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className={cn("border-primary/10 transition-all", isChallengeLocked(5.5) && "opacity-50 grayscale")}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-black uppercase">250 Cylinder Challenge</CardTitle>
                {isChallengeLocked(5.5) && <Lock className="w-3.5 h-3.5" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Progress</span>
                  <span className="text-primary">{cylinderCount} / 250</span>
                </div>
                <Progress value={(cylinderCount / 250) * 100} className="h-1.5" />
              </div>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  value={cylLogCount} 
                  onChange={e => setCylLogCount(e.target.value)} 
                  className="h-9 font-bold text-center w-20"
                  disabled={isChallengeLocked(5.5)}
                />
                <Button 
                  size="sm" 
                  className="flex-1 font-bold h-9 gap-2" 
                  onClick={() => addCylinders(parseInt(cylLogCount))}
                  disabled={isChallengeLocked(5.5)}
                >
                  <Plus className="w-3.5 h-3.5" /> Log Cyls
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
