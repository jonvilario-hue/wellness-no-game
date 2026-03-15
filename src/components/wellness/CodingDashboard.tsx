
'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCodingStore } from '@/hooks/use-coding-store';
import { 
  Flame, Clock, Zap, Trophy, 
  LayoutGrid, ArrowRight, Sparkles,
  Terminal, Code2, Brain, Play
} from 'lucide-react';
import { AssistantTooltip } from '../assistant-tooltip';
import { cn } from '@/lib/utils';

export function CodingDashboard() {
  const { streak, getWeeklyVolume, getFluencyScore, getTopProtocol, getLanguageDistribution } = useCodingStore();
  
  const weeklyVol = getWeeklyVolume();
  const fluency = getFluencyScore();
  const topProtocol = getTopProtocol();
  const langDist = getLanguageDistribution();

  const recommendation = useMemo(() => {
    const day = new Date().getDay(); // 0-6 (Sun-Sat)
    let focus = "";
    let time = 22;

    if (day === 1 || day === 4) focus = "1 Syntax Sprint • 3 Bug Hunts • 1 Output Prediction";
    else if (day === 2 || day === 5) focus = "1 Syntax Sprint • 2 Timed Impl • 1 Output Prediction";
    else if (day === 3 || day === 6) focus = "1 Output Prediction • 2 Reconstruction • 1 Syntax Sprint";
    else focus = "Mixed Recovery Session";

    return { focus, time };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <AssistantTooltip text="Consecutive days of active code drilling. Consistency builds automaticity in syntax and pattern recognition.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-orange-500 mb-1" />
              <p className="text-2xl font-black">{streak.current}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Streak</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="Total minutes spent in coding drills this week. High-intensity reps are more effective than passive reading.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{weeklyVol}m</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Vol</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="Primary growth metric: Calculated as Speed × Accuracy. High scores reflect accurate, zero-latency execution.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Zap className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{fluency}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fluency</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="The protocol where you exhibit the highest relative frequency and performance.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Trophy className="w-5 h-5 text-primary opacity-80 mb-1" />
              <p className="text-[10px] font-bold truncate w-full">{topProtocol}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Protocol</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="Weekly breakdown of languages drilled. Balance your stack across multiple paradigms.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col justify-center h-full">
              <div className="space-y-1">
                {Object.entries(langDist).slice(0, 3).map(([lang, count]) => (
                  <div key={lang} className="flex justify-between items-center text-[8px] font-black uppercase">
                    <span className="truncate">{lang}</span>
                    <span className="text-primary">{count}</span>
                  </div>
                ))}
                {Object.keys(langDist).length === 0 && <p className="text-[8px] text-center opacity-40">No data</p>}
              </div>
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
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Today's Coding Drill</h3>
              </div>
              <div>
                <p className="text-lg font-bold">{recommendation.focus}</p>
                <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-muted-foreground uppercase">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recommendation.time} Min</span>
                  <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> 3-Phase Structure</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 bg-primary/10 p-6 flex items-center justify-center border-l border-primary/5 group-hover:bg-primary/20 transition-colors">
              <Button className="w-full h-12 font-black uppercase tracking-widest gap-2 shadow-lg">
                <Play className="w-4 h-4 fill-current" /> Initialize Flow
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
