
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useMusicStore } from "@/hooks/use-music-store";
import { Flame, Clock, Target, Trophy, Sparkles } from "lucide-react";
import { AssistantTooltip } from "../assistant-tooltip";

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
        <AssistantTooltip text="Consecutive days of engagement. Musical skills—especially pitch and rhythm—decay quickly without frequent use. Daily practice maintains the high sensitivity required in your auditory cortex.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-orange-500 mb-1" />
              <p className="text-2xl font-black">{streak.current}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Practice Streak</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
        
        <AssistantTooltip text="Total minutes spent in active training this week. Cognitive load theory suggests that 15–30 minutes of deep, focused practice is significantly more effective for memory encoding than longer periods of passive listening.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{getWeeklyVolume()}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Volume</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="A weighted index calculated as (Correct / Total) * Difficulty Multiplier. Beginner tasks use a 1.0x multiplier, while Advanced tasks use 2.0x, rewarding you for attempting more complex harmonic and rhythmic structures.">
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

        <AssistantTooltip text="The discipline where you have logged the most deliberate practice. Concentrating effort in one domain (e.g. Ear Training) builds specialized neural pathways, which later serve as a foundation for broader musicality.">
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
            <AssistantTooltip key={item.key} text={`Your all-time highest Harmonic Accuracy Rate (HAR) achieved in ${item.label}. This represents your peak performance ceiling for this specific discipline.`}>
              <Card className="bg-muted/20 border-primary/5 p-3 flex flex-col items-center text-center group hover:border-primary/20 transition-all">
                <p className="text-[8px] font-black uppercase opacity-60 mb-1">{item.label}</p>
                <p className="text-lg font-black text-primary group-hover:scale-110 transition-transform">
                  {achievements[item.key]?.bestHAR || 0}
                </p>
                <p className="text-[7px] font-bold uppercase text-muted-foreground mt-1">BEST HAR</p>
              </Card>
            </AssistantTooltip>
          ))}
        </div>
      </div>
    </div>
  );
}
