'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Pause, Check, Goal, ClipboardCheck, SlidersHorizontal, 
  Trophy, Edit, Trash2, Clock, ChevronRight, X, Sparkles, BarChart3, Info, Plus, ListChecks,
  Activity, HeartPulse, Waves
} from 'lucide-react';
import type { Exercise } from '@/data/exercises';
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
  variant?: 'card' | 'flat';
}

export const PracticeInstructionCard = ({ exercise, onEdit, onDelete, variant = 'card' }: PracticeInstructionCardProps) => {
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
  const { syncFromTracker, addCustomPlan } = useCalendarPlansStore();
  const { toast } = useToast();
  
  const isMovement = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down', 'Mind-Body'].includes(exercise.category);
  const isStillness = ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'].includes(exercise.category);
  const isCommunication = !isMovement && !isStillness;

  const bestProgress = movementProgress[exercise.id];
  const ExerciseIcon = exercise.icon;
  const isCard = variant === 'card';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
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

  const handleAddToCalendar = () => {
    const category = isMovement ? 'Movement' : isStillness ? 'Stillness' : 'Communication';
    const color = isMovement ? '#14b8a6' : isStillness ? '#60a5fa' : '#a855f7';

    addCustomPlan({
      id: `routine-${exercise.id}-${Date.now()}`,
      name: `${exercise.name} Routine`,
      description: `Daily practice of ${exercise.name} synchronized from Health Check.`,
      isPreset: false,
      isActive: true,
      durationType: 'ongoing',
      startDate: new Date().toISOString(),
      categories: [category as any],
      color: color,
      activities: [
        {
          id: `act-${exercise.id}-${Date.now()}`,
          name: exercise.name,
          category: category as any,
          recurrence: 'daily',
          duration: exercise.estimatedMinutes,
          reminderEnabled: true,
          linkedTracker: exercise.id
        }
      ]
    });

    toast({ 
      title: "Added to Calendar", 
      description: `"${exercise.name}" is now a daily routine.`, 
      variant: 'success' 
    });
  };

  const toggleTimer = useCallback(() => {
    if (isComplete || timeLeft === 0) {
        setTimeLeft(exercise.duration);
        setIsComplete(false);
        setShowRatings(false);
    }
    setIsActive(!isActive);
  }, [isActive, timeLeft, exercise.duration, isComplete]);

  const getDataDestinationLink = () => {
    if (isStillness) return "View Calmness Trends →";
    if (isMovement) return "View Intensity Trends →";
    return "View Performance History →";
  };

  const InstructionBody = (
    <div className="space-y-6">
      <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-xs flex items-center gap-2"><Goal className="w-3.5 h-3.5"/>Intention</h4>
          <p className="text-[11px] text-muted-foreground">{exercise.intention}</p>
      </div>

      {isMovement && bestProgress && (
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
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

      {showRatings ? (
        <div className="space-y-4 py-2 border-t mt-4">
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
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <ListChecks className="w-3.5 h-3.5" /> Instructions
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-xs">
                {exercise.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-primary/5">
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                <Activity className="w-3 h-3" /> Quick Setup
              </h5>
              <ul className="list-disc list-inside text-[10px] text-muted-foreground/80 space-y-1">
                  {exercise.setup.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Modifications
              </h5>
              <ul className="list-disc list-inside text-[10px] text-muted-foreground/80 space-y-1">
                  {exercise.modifications.map((mod, i) => <li key={i}>{mod}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const FooterControls = (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full min-h-8 text-center text-sm font-semibold">
        {isComplete && !showRatings ? (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-4 h-4" /> 
                <span className="text-xs">
                  ✓ Session logged with full tracking
                </span>
              </div>
              <Link href="/calendar" className="text-[10px] text-primary hover:underline flex items-center gap-1">
                View in Hall of Fame <ChevronRight className="w-2.5 h-2.5" />
              </Link>
            </div>
        ) : (
            <div className="italic text-muted-foreground text-[10px]">{exercise.completionCue}</div>
        )}
      </div>
      {!showRatings && (
        <div className="w-full flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={toggleTimer} size="lg" className="w-full">
            {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isActive ? formatTime(timeLeft) : 'Start'}
            </Button>
            <Button onClick={() => finishSession(true)} variant="outline" size="lg" className="w-full">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Quick Log
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  if (!isCard) {
    return (
      <div className="space-y-4 py-6 border-t border-primary/5 first:border-t-0 animate-in fade-in duration-300">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-3 flex-grow min-w-0">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <ExerciseIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <h4 className="font-bold text-sm leading-tight truncate">{exercise.name}</h4>
                <Link href="/calendar" className="text-[9px] font-bold text-primary hover:underline flex items-center gap-1">
                  {getDataDestinationLink()} <ChevronRight className="w-2.5 h-2.5" />
                </Link>
              </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            {!showRatings && (
              <Button onClick={toggleTimer} size="sm" variant={isActive ? "default" : "outline"} className="h-8 rounded-full gap-2 px-4 shadow-sm">
                {isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span className="font-mono text-xs">{formatTime(timeLeft)}</span>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" onClick={handleAddToCalendar}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {InstructionBody}
        
        {isComplete && !showRatings && (
          <div className="flex items-center justify-center gap-2 p-2 bg-green-500/10 text-green-600 rounded-lg text-[10px] font-black uppercase">
            <Check className="w-3 h-3" /> Step Synced
          </div>
        )}
      </div>
    );
  }

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
                </div>
                <Link href="/calendar" className="text-[9px] font-bold text-primary hover:underline flex items-center gap-1">
                  {getDataDestinationLink()} <ChevronRight className="w-2.5 h-2.5" />
                </Link>
              </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <AssistantTooltip text="Add this practice as a daily routine to your Calendar.">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={handleAddToCalendar}>
                <Plus className="w-4 h-4" />
              </Button>
            </AssistantTooltip>
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
      
      <CardContent className="flex-grow">
        {InstructionBody}
      </CardContent>

      <CardFooter>
        {FooterControls}
      </CardFooter>
    </Card>
  );
};
