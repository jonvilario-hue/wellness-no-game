
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useMusicStore } from "@/hooks/use-music-store";
import { Flame, Clock, Target, Trophy, Sparkles, Wand2 } from "lucide-react";
import { AssistantTooltip } from "../assistant-tooltip";
import { cn } from '@/lib/utils';

export function MusicGlobalHeader() {
  const { streak, getWeeklyVolume } = useMusicStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-32 w-full animate-pulse bg-muted/20 rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <AssistantTooltip text="Consecutive days of engagement. Musical skills—especially pitch and rhythm—decay quickly without frequent use. Daily practice maintains the high sensitivity required in your auditory cortex.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-orange-500 mb-1" />
            <p className="text-2xl font-black">{streak.current}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Practice Streak</p>
          </CardContent>
        </Card>
      </AssistantTooltip>
      
      <AssistantTooltip text="Total minutes spent in active training this week across all tabs (Listen, Sing, Voice, Play, Create). Consistent volume builds deep neural efficiency.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Clock className="w-5 h-5 text-primary mb-1" />
            <p className="text-2xl font-black">{getWeeklyVolume()}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Volume</p>
          </CardContent>
        </Card>
      </AssistantTooltip>
    </div>
  );
}

export function MusicAccuracyTracker() {
  const { getGlobalHAR } = useMusicStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AssistantTooltip text="Global Weighted Accuracy: calculated as (Correct / Total) * Difficulty Multiplier. This integrates scores from Listen games and Theory challenges into a single laboratory index.">
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
  );
}

export function MusicCreationTracker() {
  const { getTotalCreations } = useMusicStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AssistantTooltip text="Total number of improvisational sandboxes or original compositions logged. This tracks your 'Creative Muscle' and spontaneous musical problem-solving.">
      <Card className="bg-primary/5 border-primary/10 h-full">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <Wand2 className="w-5 h-5 text-primary opacity-80 mb-1" />
          <p className="text-2xl font-black">{getTotalCreations()}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Creative Acts</p>
        </CardContent>
      </Card>
    </AssistantTooltip>
  );
}

export function MusicAchievementVault({ filter }: { filter?: string[] }) {
  const { achievements } = useMusicStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const vaultItems = [
    { label: 'Ear Training', key: 'Ear Training' },
    { label: 'Rhythm', key: 'Rhythm & Timing' },
    { label: 'Theory', key: 'Theory & Harmony' },
    { label: 'Notation', key: 'Sight Reading' },
    { label: 'Vocal Mech', key: 'Vocal Mechanics' },
    { label: 'Improvisation', key: 'Improvisation & Composition' },
    { label: 'Critical List', key: 'Critical Listening' },
  ].filter(item => !filter || filter.includes(item.key));

  if (!mounted || vaultItems.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
        <Sparkles className="w-3 h-3" /> {filter ? 'Related Achievements' : 'Laboratory Achievement Vault'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {vaultItems.map(item => (
          <AssistantTooltip key={item.key} text={`Your peak performance in ${item.label}. This accounts for difficulty level and accuracy, mapping your current skill ceiling.`}>
            <Card className="bg-muted/20 border-primary/5 p-3 flex flex-col items-center text-center group hover:border-primary/20 transition-all h-full">
              <p className="text-[8px] font-black uppercase opacity-60 mb-1 leading-tight">{item.label}</p>
              <p className="text-lg font-black text-primary group-hover:scale-110 transition-transform">
                {achievements[item.key]?.bestHAR || 0}
              </p>
              <p className="text-[7px] font-bold uppercase text-muted-foreground mt-1">BEST HAR</p>
            </Card>
          </AssistantTooltip>
        ))}
      </div>
    </div>
  );
}

export function MusicDashboard() {
  // Legacy component - redirecting to sub-components
  return (
    <div className="space-y-6">
      <MusicGlobalHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MusicAccuracyTracker />
        <MusicCreationTracker />
      </div>
      <MusicAchievementVault />
    </div>
  );
}
