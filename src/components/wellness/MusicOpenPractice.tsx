
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, Pause, X, Check, ArrowRight,
  Clock, Activity, Sparkles, RotateCcw,
  Mic, Piano, Music
} from 'lucide-react';
import { useMusicStore } from '@/hooks/use-music-store';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function MusicOpenPractice() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [instrument, setInstrument] = useState('Voice');
  const [focusArea, setFocusArea] = useState('Technique');
  const timerRef = useRef<NodeJS.Timeout>();
  
  const { logDrill } = useMusicStore();
  const { toast } = useToast();

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const handleStop = () => {
    setIsActive(false);
    const mins = Math.ceil(seconds / 60);
    
    logDrill({
      domain: 'Improvisation & Composition',
      drillName: `Open Practice: ${instrument}`,
      difficulty: 'Intermediate',
      difficultyMultiplier: 1.5,
      focusLevel: 3,
      score: 10,
      har: 150,
      averageResponseTime: 0,
      effectivenessRating: 4,
      context: 'Midday',
      durationMinutes: mins,
      questions: []
    });

    toast({ title: "Practice Logged", description: `${mins} minutes of ${instrument} synced.`, variant: 'success' });
    setSeconds(0);
  };

  const formatDisplay = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-primary/10 overflow-hidden group">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Open Practice Timer</CardTitle>
            <CardDescription>Log instrument or vocal sessions outside of drills.</CardDescription>
          </div>
          <Clock className={cn("w-5 h-5 transition-colors", isActive ? "text-primary animate-pulse" : "text-muted-foreground")} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-6xl font-mono font-black tracking-tighter tabular-nums">
            {formatDisplay(seconds)}
          </div>
          <div className="flex gap-2 w-full">
            <Button 
              className={cn("flex-1 h-14 text-lg font-black rounded-2xl gap-3 shadow-lg", isActive && "bg-destructive hover:bg-destructive/90")}
              onClick={() => isActive ? handleStop() : setIsActive(true)}
            >
              {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
              {isActive ? 'STOP' : 'START SESSION'}
            </Button>
            {seconds > 0 && !isActive && (
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-primary/20" onClick={() => setSeconds(0)}>
                <RotateCcw className="w-6 h-6" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/5">
          <div className="space-y-1.5">
            <Label className="text-[9px] font-black uppercase text-muted-foreground">Instrument</Label>
            <Select value={instrument} onValueChange={setInstrument}>
              <SelectTrigger className="h-8 text-[10px] font-bold"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Voice', 'Piano', 'Guitar', 'Drums', 'Bass', 'Wind', 'Strings', 'Other'].map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[9px] font-black uppercase text-muted-foreground">Focus Area</Label>
            <Select value={focusArea} onValueChange={setFocusArea}>
              <SelectTrigger className="h-8 text-[10px] font-bold"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Technique', 'Repertoire', 'Improvisation', 'Warm-Up', 'Performance Prep'].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
