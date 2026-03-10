'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Pause, Check, Goal, ClipboardCheck, SlidersHorizontal, 
  Trophy, Edit, Trash2, Clock, ChevronRight, X, Sparkles, BarChart3, Info
} from 'lucide-react';
import type { Exercise } from '@/data/exercises';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssistantTooltip } from '../assistant-tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const formatTime = (totalSeconds: number): string => {
  if (totalSeconds < 0) return '00:00';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

interface PracticeInstructionCardProps {
  exercise: Exercise;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PracticeInstructionCard = ({ exercise, onEdit, onDelete }: PracticeInstructionCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.duration);
  const [isComplete, setIsComplete] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  
  const [difficulty, setDifficulty] = useState<number>(3);
  const [energy, setEnergy] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [reps, setReps] = useState<string>('');
  const [holdTime, setHoldTime] = useState<string>('');
  const [preStress, setPreStress] = useState<string>('5');
  const [postCalm, setPostCalm] = useState<string>('7');
  const [trigger, setTrigger] = useState<string>('Proactive');
  const [commContext, setCommContext] = useState<string>('');

  const { 
    addMovementLog, addStillnessLog, addCommunicationLog, 
    movementProgress = {} 
  } = useWellnessData();
  const { syncFromTracker } = useCalendarPlansStore();
  const { toast } = useToast();
  
  // Tracking is now permanent
  const trackNumbers = true;

  const isMovement = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down', 'Mind-Body'].includes(exercise.category);
  const isStillness = ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'].includes(exercise.category);
  const isCommunication = !isMovement && !isStillness;

  const bestProgress = movementProgress[exercise.id];
  const ExerciseIcon = exercise.icon;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      finishSession(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const performLog = (isAuto = false) => {
    const duration = Math.ceil((exercise.duration - timeLeft) / 60) || 1;
    const timestamp = new Date().toISOString();

    if (isMovement) {
      addMovementLog({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        duration,
        timestamp,
        difficulty: isAuto ? 3 : difficulty,
        energyLevel: isAuto ? 'Medium' : energy,
        reps: !isAuto && reps ? parseInt(reps) : undefined,
        holdTime: !isAuto && holdTime ? parseInt(holdTime) : undefined
      });
      syncFromTracker('Movement', exercise.name);
    } else if (isStillness) {
      addStillnessLog({
        techniqueId: exercise.id,
        techniqueName: exercise.name,
        duration,
        timestamp,
        preStress: isAuto ? 5 : parseInt(preStress),
        postCalm: isAuto ? 7 : parseInt(postCalm),
        trigger: isAuto ? 'Proactive' : trigger as any
      });
      syncFromTracker('Stillness', exercise.name);
    } else {
      addCommunicationLog({
        practiceId: exercise.id,
        practiceName: exercise.name,
        duration,
        timestamp,
        effectiveness: isAuto ? 3 : difficulty,
        context: isAuto ? '' : commContext
      });
      syncFromTracker('Communication', exercise.name);
    }
  };

  const finishSession = (forceQuick: boolean = false) => {
    setIsActive(false);
    if (!forceQuick) {
      setShowRatings(true);
      setIsComplete(false);
    } else {
      performLog(true);
      setIsComplete(true);
      setShowRatings(false);
    }
  };

  const handleFinalizeLog = () => {
    performLog(false);
    setIsComplete(true);
    setShowRatings(false);
  };

  const toggleTimer = useCallback(() => {
    if (isComplete || timeLeft === 0) {
        setTimeLeft(exercise.duration);
        setIsComplete(false);
        setShowRatings(false);
    }
    setIsActive(!isActive);
  }, [isActive, timeLeft, exercise.duration, isComplete]);

  const getTrackingPreview = () => {
    if (isMovement) return "Will track: Intensity, Reps, PBs";
    if (isStillness) return "Will track: Stress, Calmness, Trigger";
    if (isCommunication) return "Will track: Effectiveness, Context";
    return "";
  };

  const getDataDestinationLink = () => {
    if (isStillness) return "View Calmness Trends →";
    if (isMovement) return "View Intensity Trends →";
    return "View Performance History →";
  };

  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow duration-300 h-full group relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3 flex-grow min-w-0">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <ExerciseIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="leading-tight truncate">{exercise.name}</CardTitle>
                  <Badge variant="secondary" className="text-[8px] font-black h-4 px-1.5 uppercase tracking-tighter shrink-0">
                    📊 Tracking
                  </Badge>
                </div>
                <Link href="/calendar" className="text-[9px] font-bold text-primary hover:underline flex items-center gap-1">
                  {getDataDestinationLink()} <ChevronRight className="w-2.5 h-2.5" />
                </Link>
              </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            {onEdit && (
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={onEdit}>
                <Edit className="w-3.5 h-3.5" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive" onClick={onDelete}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
        <CardDescription className="flex-grow pt-2 text-xs">{exercise.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div className="p-3 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-xs flex items-center gap-2"><Goal className="w-3.5 h-3.5"/>Intention</h4>
            <p className="text-[11px] text-muted-foreground">{exercise.intention}</p>
        </div>

        {isMovement && bestProgress && (
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 space-y-2 animate-in fade-in zoom-in-95">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" /> Achievement Records
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {bestProgress.bestReps !== undefined && (
                <div className="p-2 bg-background rounded-lg text-center border">
                  <p className="text-[8px] font-bold text-muted-foreground uppercase">Best Reps</p>
                  <p className="text-lg font-black">{bestProgress.bestReps}</p>
                </div>
              )}
              {bestProgress.bestHoldTime !== undefined && (
                <div className="p-2 bg-background rounded-lg text-center border">
                  <p className="text-[8px] font-bold text-muted-foreground uppercase">Best Hold</p>
                  <p className="text-lg font-black">{bestProgress.bestHoldTime}s</p>
                </div>
              )}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {showRatings ? (
            <motion.div key="survey" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 py-2 border-t mt-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <SlidersHorizontal className="w-3 h-3" /> Post-Session Survey
                </h4>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowRatings(false)}><X className="w-3 h-3" /></Button>
              </div>
              
              {isMovement && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Difficulty (1-5)</Label>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(n => (
                        <Button key={n} variant={difficulty === n ? 'default' : 'outline'} size="sm" className="h-7 w-7 p-0" onClick={() => setDifficulty(n)}>
                          {n}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Energy</Label>
                    <Select value={energy} onValueChange={v => setEnergy(v as any)}>
                      <SelectTrigger className="h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['Low', 'Medium', 'High'].map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Reps</Label>
                    <Input type="number" value={reps} onChange={e => setReps(e.target.value)} className="h-7 text-xs" placeholder="0" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Hold (Sec)</Label>
                    <Input type="number" value={holdTime} onChange={e => setHoldTime(e.target.value)} className="h-7 text-xs" placeholder="0" />
                  </div>
                </div>
              )}

              {isStillness && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold uppercase">Pre-Stress (1-10)</Label>
                      <Input type="number" value={preStress} onChange={e => setPreStress(e.target.value)} className="h-7 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold uppercase">Post-Calm (1-10)</Label>
                      <Input type="number" value={postCalm} onChange={e => setPostCalm(e.target.value)} className="h-7 text-xs" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Primary Trigger</Label>
                    <Select value={trigger} onValueChange={setTrigger}>
                      <SelectTrigger className="h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['Proactive', 'Stress', 'Anxiety', "Can't Sleep", 'Other'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {isCommunication && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Effectiveness (1-5)</Label>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(n => (
                        <Button key={n} variant={difficulty === n ? 'default' : 'outline'} size="sm" className="h-7 w-7 p-0" onClick={() => setDifficulty(n)}>
                          {n}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Context (Optional)</Label>
                    <Input value={commContext} onChange={e => setCommContext(e.target.value)} className="h-7 text-xs" placeholder="e.g. Work call, First date..." />
                  </div>
                </div>
              )}

              <Button className="w-full h-10 font-bold gap-2" onClick={handleFinalizeLog}>
                <Check className="w-4 h-4" /> Save Data
              </Button>
            </motion.div>
          ) : (
            <div key="instructions" className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-xs">
                  {exercise.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                  ))}
              </ol>

              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="setup" className="border-b-0">
                      <AccordionTrigger className="text-[11px] font-semibold">Quick Setup</AccordionTrigger>
                      <AccordionContent>
                          <ul className="list-disc list-inside text-[10px] text-muted-foreground space-y-1">
                              {exercise.setup.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="modifications" className="border-b-0">
                      <AccordionTrigger className="text-[11px] font-semibold">Modifications</AccordionTrigger>
                      <AccordionContent>
                          <ul className="list-disc list-inside text-[10px] text-muted-foreground space-y-1">
                              {exercise.modifications.map((mod, i) => <li key={i}>{mod}</li>)}
                          </ul>
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
            </div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex-col gap-3">
          <div className="w-full min-h-8 text-center text-sm font-semibold">
            <AnimatePresence mode="wait">
              {isComplete && !showRatings ? (
                  <motion.div key="complete" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-4 h-4" /> 
                      <span className="text-xs">
                        ✓ Session logged with full tracking
                      </span>
                    </div>
                    <Link href="/calendar" className="text-[10px] text-primary hover:underline flex items-center gap-1">
                      View in Hall of Fame <ChevronRight className="w-2.5 h-2.5" />
                    </Link>
                  </motion.div>
              ) : (
                  <div key="cue" className="italic text-muted-foreground text-[10px]">{exercise.completionCue}</div>
              )}
            </AnimatePresence>
          </div>
          {!showRatings && (
            <div className="w-full flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={toggleTimer} size="lg" className="w-full">
                {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isActive ? formatTime(timeLeft) : 'Detailed Log'}
                </Button>
                <Button onClick={() => finishSession(true)} variant="outline" size="lg" className="w-full">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Quick Log
                </Button>
              </div>
              <p className="text-[9px] font-bold text-center text-primary uppercase tracking-widest opacity-80 animate-pulse">
                {getTrackingPreview()}
              </p>
            </div>
          )}
      </CardFooter>
    </Card>
  );
};
