
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useMusicStore } from "@/hooks/use-music-store";
import { Flame, Clock, Target, Trophy, Info, Sparkles } from "lucide-react";
import { AssistantTooltip } from "../assistant-tooltip";
import { Badge } from "../ui/badge";

export function MusicDashboard() {
  const { streak, getWeeklyVolume, getTopDomain, getGlobalHAR, achievements } = useMusicStore();

  const vaultItems = [
    { label: 'Ear Training', key: 'Ear Training' },
    { label: 'Rhythm', key: 'Rhythm & Timing' },
    { label: 'Theory', key: 'Theory & Harmony' },
    { label: 'Sight Reading', key: 'Sight Reading' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <AssistantTooltip text="Consecutive days practicing musical disciplines. Auditory neuroplasticity is highly dependent on daily consistency.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-orange-500 mb-1" />
              <p className="text-2xl font-black">{streak.current}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Practice Streak</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
        
        <AssistantTooltip text="Total minutes invested in music drills this week. Aim for at least 60 minutes of 'deep listening' or rhythmic practice.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{getWeeklyVolume()}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Volume</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="Harmonic Accuracy Rate: (Correct / Total) * Difficulty Multiplier. Beginner: 1.0x, Intermediate: 1.5x, Advanced: 2.0x.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1.5 mb-1">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-black text-primary">HAR</span>
              </div>
              <p className="text-2xl font-black">{getGlobalHAR()}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Avg accuracy</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="The musical domain where you have invested the most deliberate practice.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Trophy className="w-5 h-5 text-primary opacity-80 mb-1" />
              <p className="text-sm font-bold truncate w-full">{getTopDomain()}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Domain</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
      </div>

      <div className="space-y-2">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> Achievement Vault
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {vaultItems.map(item => (
            <Card key={item.key} className="bg-muted/20 border-primary/5 p-3 flex flex-col items-center text-center group hover:border-primary/20 transition-all">
              <p className="text-[8px] font-black uppercase opacity-60 mb-1">{item.label}</p>
              <p className="text-lg font-black text-primary group-hover:scale-110 transition-transform">
                {achievements[item.key]?.bestHAR || 0}
              </p>
              <p className="text-[7px] font-bold uppercase text-muted-foreground mt-1">BEST HAR</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
