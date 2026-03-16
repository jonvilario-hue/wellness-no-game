
'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDrawingStore } from '@/hooks/use-drawing-store';
import { 
  Flame, Clock, Trophy, Target, 
  Sparkles, Palette, Info, BarChart3 
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip 
} from 'recharts';
import { AssistantTooltip } from '../assistant-tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function DrawingDashboard() {
  const [mounted, setMounted] = useState(false);
  const { streak, getWeeklyVolume, getTopDiscipline, getDisciplineBalance } = useDrawingStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const radarData = useMemo(() => getDisciplineBalance(), [getDisciplineBalance]);
  const weeklyVol = getWeeklyVolume();
  const topDiscipline = getTopDiscipline();

  if (!mounted) {
    return <div className="h-32 w-full animate-pulse bg-muted/20 rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Studio Health</h3>
        <Badge variant="outline" className="gap-1.5 h-6 text-[9px] font-black uppercase border-primary/20 bg-primary/5">
          <Sparkles className="w-3 h-3" /> Growth Engine v1.0
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AssistantTooltip text="Consecutive days of active practice. Drawing is a highly perishable motor skill; daily recalibration of the eye and hand prevents atrophy.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-orange-500 mb-1" />
              <p className="text-2xl font-black">{streak.current}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Studio Streak</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
        
        <AssistantTooltip text="Total minutes spent in structured drills and open studio this week. Consistency in volume leads to automaticity in technical execution.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{weeklyVol}m</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Vol</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="The foundational discipline where you have invested the most reps. Specializing builds deep competence, but true mastery requires a balanced wheel.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Target className="w-5 h-5 text-primary opacity-80 mb-1" />
              <p className="text-[10px] font-bold truncate w-full">{topDiscipline}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Discipline</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="A normalized score of your hand-eye coordination based on recent drill accuracy and self-reported focus.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <BarChart3 className="w-5 h-5 text-primary opacity-80 mb-1" />
              <p className="text-2xl font-black">74</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Coordination</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" /> Skill Wheel
            </CardTitle>
            <CardDescription>Relative balance across core disciplines. Avoid neglecting foundations.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} hide />
                <Radar
                  name="Repetition Volume"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-primary/10 bg-primary/5 flex flex-col justify-center p-6 text-center">
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-2xl border shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Studio Insight
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your <b>Line Control</b> is at its historical peak, but <b>Value & Light</b> hasn't been touched in 12 days. 
                <br /><br />
                <span className="font-bold text-foreground">Next Step:</span> Try a 5-minute Shadow Mapping drill to rebalance your observational map.
              </p>
            </div>
            <Button variant="outline" className="w-full h-10 font-bold border-primary/20">
              Refresh Analysis
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
