
'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCodingStore } from '@/hooks/use-coding-store';
import { 
  Flame, Clock, Zap, Trophy, 
  LayoutGrid, ArrowRight, Sparkles,
  Terminal, Code2, Brain, Play, BookOpen, Layers, Info
} from 'lucide-react';
import { AssistantTooltip } from '../assistant-tooltip';
import { cn } from '@/lib/utils';

export function CodingDashboard() {
  const { streak, getWeeklyVolume, getFluencyScore, getTopLane, activeLanguage, activeTrack, activeLoop, startLoop } = useCodingStore();
  
  const weeklyVol = getWeeklyVolume();
  const fluency = getFluencyScore();
  const topLane = getTopLane();

  const recommendation = useMemo(() => {
    const day = new Date().getDay(); // 0-6
    
    // Foundation Track logic: heavily emphasize the Read lane
    if (activeTrack === 'Foundation') {
      const loop = [
        { lane: 'Write', type: 'Syntax Sprints' },
        { lane: 'Read', type: 'Output Prediction' },
        { lane: 'Read', type: 'Bug Hunt' }
      ];
      return { loop, time: 15, label: "Verification Mastery Loop" };
    } 
    
    // Specialist Track logic: emphasize Write and Build lanes
    const loop = [
      { lane: 'Write', type: 'Syntax Sprints' },
      { lane: 'Build', type: 'Timed Implementation' },
      { lane: 'Build', type: 'Timed Implementation' }
    ];
    return { loop, time: 22, label: "Systems Architecture Loop" };
    
  }, [activeTrack]);

  const handleStartLoop = () => {
    startLoop(recommendation.loop);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Neural Velocity</h3>
        <AssistantTooltip text="The drills in this lab are synthetically curated 'gym reps' based on official language specifications and common algorithmic patterns. They are designed to build muscle memory, not teach conceptual theory.">
          <Badge variant="secondary" className="gap-1.5 h-6 text-[9px] font-black uppercase cursor-help">
            <Info className="w-3 h-3" /> Content Origin
          </Badge>
        </AssistantTooltip>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <AssistantTooltip text="Consecutive days of active code drilling. Consistency builds automaticity.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-orange-500 mb-1" />
              <p className="text-2xl font-black">{streak.current}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Streak</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="Total minutes spent in active coding drills this week.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{weeklyVol}m</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Vol</p>
            </CardContent>
          </AssistantTooltip>

        <AssistantTooltip text="Primary growth metric: Calculated as Speed × Accuracy across all lanes.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Zap className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{fluency}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fluency</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="The lane where you've invested the most reps. Balance Write, Read, and Build for full-stack agility.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Layers className="w-5 h-5 text-primary opacity-80 mb-1" />
              <p className="text-[10px] font-bold truncate w-full">{topLane}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Lane</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="Active language context for today's sessions.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Code2 className="w-5 h-5 text-primary opacity-80 mb-1" />
              <p className="text-[10px] font-bold truncate w-full">{activeLanguage}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
      </div>

      <Card className="border-primary/20 bg-primary/5 shadow-md overflow-hidden group hover:border-primary/40 transition-all">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="p-6 md:w-2/3 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Today's Practice Loop</h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  {recommendation.loop.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold">{step.lane}</span>
                      <span className="text-[10px] text-muted-foreground">{step.type}</span>
                      {idx < recommendation.loop.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground/30" />}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-1 text-[10px] font-bold text-muted-foreground uppercase">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recommendation.time} Min Estimated</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {recommendation.label}</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 bg-primary/10 p-6 flex items-center justify-center border-l border-primary/5 group-hover:bg-primary/20 transition-colors">
              <Button onClick={handleStartLoop} className="w-full h-12 font-black uppercase tracking-widest gap-2 shadow-lg">
                <Play className="w-4 h-4 fill-current" /> {activeLoop.active ? 'Resume Daily Loop' : 'Start Daily Loop'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
