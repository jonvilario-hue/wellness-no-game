
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Check, Goal, ClipboardCheck, SlidersHorizontal, Star, Activity, History, Edit, Trash2, Trophy } from 'lucide-react';
import type { Exercise } from '@/data/exercises';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '../ui/switch';

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
  const [showRatings, setShowAdditions] = useState(false);
  
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
    movementProgress, trackingEnabled, toggleTracking 
  } = useWellnessData();
  const { syncFromTracker } = useCalendarPlansStore();
  const { toast } = useToast();
  
  const isMovement = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down', 'Mind-Body'].includes(exercise.category);
  const isStillness = ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'].includes(exercise.category);
  const isCommunication = !isMovement && !isStillness;

  const trackNumbers = trackingEnabled[exercise.id] || false;
  const bestProgress = movementProgress[exercise.id];
  const ExerciseIcon = exercise.icon;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsComplete(true);
      setShowAdditions(true);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleLog = () => {
    const duration = Math.ceil((exercise.duration - timeLeft) / 60) || 1;
    const timestamp = new Date().toISOString();

    if (isMovement) {
      addMovementLog({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        duration,
        timestamp,
        difficulty,
        energyLevel: energy,
        reps: reps ? parseInt(reps) : undefined,
        holdTime: holdTime ? parseInt(holdTime) : undefined
      });
      syncFromTracker('Movement', exercise.name);
    } else if (isStillness) {
      addStillnessLog({
        techniqueId: exercise.id,
        techniqueName: exercise.name,
        duration,
        timestamp,
        preStress: parseInt(preStress),
        postCalm: parseInt(postCalm),
        trigger: trigger as any
      });
      syncFromTracker('Stillness', exercise.name);
    } else {
      addCommunicationLog({
        practiceId: exercise.id,
        practiceName: exercise.name,
        duration,
        timestamp,
        effectiveness: difficulty,
        context: commContext
      });
      syncFromTracker('Communication', exercise.name);
    }
    
    toast({ title: "Session Recorded!", description: "Synchronized with Master Calendar.", variant: 'success' });
    setIsComplete(true);
    setShowAdditions(false);
  };

  const toggleTimer = useCallback(() => {
    if (isComplete || timeLeft === 0) {
        setTimeLeft(exercise.duration);
        setIsComplete(false);
        setShowAdditions(false);
    }
    setIsActive(!isActive);
  }, [isActive, timeLeft, exercise.duration, isComplete]);

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 h-full group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3 flex-grow min-w-0">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <ExerciseIcon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="leading-tight pt-1">{exercise.name}</CardTitle>
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
            <div className="flex items-center gap-2 ml-2">
              <Label htmlFor={`track-toggle-${exercise.id}`} className="text-[10px] font-bold uppercase opacity-60">Track</Label>
              <Switch 
                id={`track-toggle-${exercise.id}`} 
                checked={trackNumbers} 
                onCheckedChange={() => toggleTracking(exercise.id)} 
              />
            </div>
          </div>
        </div>
        <CardDescription className="flex-grow pt-2">{exercise.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div className="p-3 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm flex items-center gap-2"><Goal className="w-4 h-4"/>Intention</h4>
            <p className="text-xs text-muted-foreground">{exercise.intention}</p>
        </div>

        {trackNumbers && isMovement && bestProgress && (
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 py-2 border-t mt-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <SlidersHorizontal className="w-3 h-3" /> Post-Session Survey
              </h4>
              
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
                  {trackNumbers && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold uppercase">Reps</Label>
                        <Input type="number" value={reps} onChange={e => setReps(e.target.value)} className="h-7 text-xs" placeholder="0" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold uppercase">Hold (Sec)</Label>
                        <Input type="number" value={holdTime} onChange={e => setHoldTime(e.target.value)} className="h-7 text-xs" placeholder="0" />
                      </div>
                    </>
                  )}
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

              <Button className="w-full h-8 text-xs font-bold" onClick={handleLog}>Save Log Details</Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                  {exercise.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                  ))}
              </ol>

              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="setup" className="border-primary/10">
                      <AccordionTrigger className="text-sm font-semibold">Quick Setup</AccordionTrigger>
                      <AccordionContent>
                          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                              {exercise.setup.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="modifications" className="border-primary/10">
                      <AccordionTrigger className="text-sm font-semibold">Modifications</AccordionTrigger>
                      <AccordionContent>
                          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
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
          <div className="w-full h-8 text-center text-sm font-semibold">
            <AnimatePresence>
              {isComplete && !showRatings ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="w-4 h-4" /> Practice Logged
                  </motion.div>
              ) : (
                  <div className="italic text-muted-foreground text-xs">{exercise.completionCue}</div>
              )}
            </AnimatePresence>
          </div>
          {!showRatings && (
            <div className="w-full grid grid-cols-2 gap-2">
              <Button onClick={toggleTimer} size="lg">
              {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isActive ? formatTime(timeLeft) : 'Start'}
              </Button>
              <Button onClick={() => setShowAdditions(true)} variant="outline" size="lg">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Log Now
              </Button>
            </div>
          )}
      </CardFooter>
    </Card>
  );
};
