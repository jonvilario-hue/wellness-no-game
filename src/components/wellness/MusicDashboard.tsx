
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useMusicStore } from "@/hooks/use-music-store";
import { Flame, Clock, Target, Trophy, Sparkles, Wand2 } from "lucide-react";
import { AssistantTooltip } from "../assistant-tooltip";
import { cn } from '@/lib/utils';

export function MusicGlobalHeader() {
  const { streak, getWeeklyVolume, getGlobalHAR, getTotalCreations } = useMusicStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-32 w-full animate-pulse bg-muted/20 rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AssistantTooltip text="Measures consecutive days of engagement across any Music module. Consistency is the primary driver of neuroplasticity in the auditory cortex; missing 48 hours results in noticeable regression in pitch sensitivity.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-orange-500 mb-1" />
            <p className="text-2xl font-black">{streak.current}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Practice Streak</p>
          </CardContent>
        </Card>
      </AssistantTooltip>
      
      <AssistantTooltip text="The sum of all minutes spent in active technical drills and creative sandboxes this week. Aggregated from technical time-logs across Listen, Sing, Voice, Play, and Create sub-tabs.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Clock className="w-5 h-5 text-primary mb-1" />
            <p className="text-2xl font-black">{getWeeklyVolume()}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Volume</p>
          </CardContent>
        </Card>
      </AssistantTooltip>

      <AssistantTooltip text="Weighted Harmonic Accuracy Rate (HAR): calculated as (Correct Answers / Total) * Difficulty Multiplier. A 70% score on 'Advanced' yields a higher HAR than 100% on 'Beginner,' rewarding you for training at your cognitive ceiling.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 mb-1">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-black text-primary">HAR</span>
            </div>
            <p className="text-2xl font-black">{getGlobalHAR()}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Avg Accuracy</p>
          </CardContent>
        </Card>
      </AssistantTooltip>

      <AssistantTooltip text="A cumulative tally of sessions logged in Vocal Improv, Flow Trainer, Beatbox Lab, and the Freestyle Sandbox. Measures your shift from rote technical practice to spontaneous creative application.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Wand2 className="w-5 h-5 text-primary opacity-80 mb-1" />
            <p className="text-2xl font-black">{getTotalCreations()}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Creative Acts</p>
          </CardContent>
        </Card>
      </AssistantTooltip>
    </div>
  );
}

export function MusicDashboard() {
  return (
    <div className="space-y-6">
      <MusicGlobalHeader />
    </div>
  );
}
