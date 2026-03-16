
'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDrawingStore } from '@/hooks/use-drawing-store';
import { 
  Flame, Clock, Target, 
  Sparkles, Palette, BarChart3, Trophy
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip 
} from 'recharts';
import { AssistantTooltip } from '../assistant-tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { DrawingDiscipline } from '@/types/drawing';
import { format, startOfWeek, parseISO, isAfter } from 'date-fns';

export function DrawingDashboard() {
  const [mounted, setMounted] = useState(false);
  const { logs, streak, getTopDiscipline, getDisciplineBalance, getDaysSinceLastPractice } = useDrawingStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const radarData = useMemo(() => getDisciplineBalance(), [getDisciplineBalance]);
  const topDiscipline = getTopDiscipline();

  const weeklySessions = useMemo(() => {
    if (!mounted) return 0;
    const start = startOfWeek(new Date());
    return logs.filter(l => isAfter(parseISO(l.timestamp), start)).length;
  }, [logs, mounted]);

  const disciplineInsight = useMemo(() => {
    const disciplines: DrawingDiscipline[] = [
      'Line Control', 'Gesture', 'Observation', 'Proportion',
      'Perspective', 'Value', 'Form', 'Composition'
    ];
    
    const neglected = disciplines
      .map(d => ({ name: d, days: getDaysSinceLastPractice(d) }))
      .filter(d => d.days !== null && d.days >= 7)
      .sort((a, b) => (b.days || 0) - (a.days || 0))[0];

    if (neglected) {
      return {
        text: `${neglected.name} has been inactive for ${neglected.days} days. Try a quick 10-minute drill to rebalance your foundations.`,
        discipline: neglected.name
      };
    }
    return {
      text: "Your studio balance is optimal. Maintain current velocity across all active Journey Plans.",
      discipline: null
    };
  }, [getDaysSinceLastPractice]);

  if (!mounted) {
    return <div className="h-32 w-full animate-pulse bg-muted/20 rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AssistantTooltip text="Your current consecutive days of drawing practice. Motor-perceptual skills degrade without daily hand-eye recalibration.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-orange-500 mb-1" />
              <p className="text-2xl font-black">{streak.current}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Studio Streak</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
        
        <AssistantTooltip text="Total drawing sessions completed this week. Consistent volume builds technical automaticity.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{weeklySessions}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Sessions</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="The drawing discipline where you have invested the most deliberate practice.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Trophy className="w-5 h-5 text-primary opacity-80 mb-1" />
              <p className="text-sm font-bold truncate w-full text-center">{topDiscipline}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Discipline</p>
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
            <CardDescription>Relative time distribution across the 8 core disciplines.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 9, fontBold: true, fill: 'hsl(var(--muted-foreground))' }} />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} hide />
                <Radar
                  name="Volume"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.15}
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
            <div className="p-4 bg-background rounded-2xl border shadow-sm space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Studio Strategy
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {disciplineInsight.text}
              </p>
            </div>
            <Button variant="outline" className="w-full h-10 font-bold border-primary/20 hover:bg-primary/5">
              Refresh Analysis
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
