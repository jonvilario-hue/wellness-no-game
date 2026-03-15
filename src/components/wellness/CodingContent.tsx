
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, Brain, Play, 
  ChevronRight, Sparkles, Database, CheckCircle2,
  PenTool, Eye, LayoutGrid
} from 'lucide-react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { CodingDashboard } from './CodingDashboard';
import { CodingDrillPlayer } from './CodingDrillPlayer';
import { CodingAnalytics } from './CodingAnalytics';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { cn } from '@/lib/utils';
import type { CodingLane, CodingDrillType, CodingTrack, CodingLanguage } from '@/types/coding';

const lanes: { id: CodingLane; title: string; subtitle: string; icon: any; drills: { id: CodingDrillType; desc: string }[] }[] = [
  {
    id: 'Write',
    title: 'Write — Produce Code',
    subtitle: 'Build muscle memory and structural recall.',
    icon: PenTool,
    drills: [
      { id: 'Syntax Sprints', desc: 'Type code snippets exactly to build character-level automaticity.' },
      { id: 'Code Reconstruction', desc: 'Study a snippet, then rewrite it from memory to build structural recall.' }
    ]
  },
  {
    id: 'Read',
    title: 'Read — Understand Code',
    subtitle: 'Train your mental compiler and bug detection.',
    icon: Eye,
    drills: [
      { id: 'Output Prediction', desc: 'Read code and predict exact output without execution.' },
      { id: 'Bug Hunt', desc: 'Identify syntax and logic errors across core categories.' }
    ]
  },
  {
    id: 'Build',
    title: 'Build — Solve from Spec',
    subtitle: 'Implement logic under time pressure.',
    icon: LayoutGrid,
    drills: [
      { id: 'Timed Implementation', desc: 'Solve algorithm and data pattern problems within a strict time limit.' }
    ]
  }
];

const trackInfo = {
  Foundation: {
    title: "Foundation / Core",
    icon: Database,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "The essentials. These are the languages you will read, review, debug, and verify every day. Master the logic that runs everywhere.",
    languages: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
    focus: "Verification & Reading (Read Emphasis)"
  },
  Specialist: {
    title: "Specialist / Edge",
    icon: Sparkles,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    description: "High-leverage, precision languages. These demand strict thinking, systems awareness, and real fluency. Mastering these builds transferrable mental models.",
    languages: ['Rust', 'Bash', 'Swift', 'Go'],
    focus: "Production & Execution (Write/Build Emphasis)"
  }
};

export default function CodingContent() {
  const { _hasHydrated, activeLanguage, setActiveLanguage, activeLoop, activeTrack, setActiveTrack, laneProgress } = useCodingStore();
  const [activeDrill, setActiveDrill] = useState<CodingDrillType | null>(null);

  if (!_hasHydrated) return null;

  if (activeDrill || activeLoop.active) {
    return (
      <CodingDrillPlayer 
        protocolId={(activeLoop.active ? activeLoop.steps[activeLoop.currentStep]?.type : activeDrill) as any} 
        onClose={() => setActiveDrill(null)} 
      />
    );
  }

  const currentTrack = trackInfo[activeTrack];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Practice Strategy</h3>
          <Badge variant="outline" className={cn("h-6 px-3 uppercase font-black text-[9px]", currentTrack.border, currentTrack.color)}>
            {activeTrack} Track Active
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['Foundation', 'Specialist'] as CodingTrack[]).map((t) => {
            const info = trackInfo[t];
            const isActive = activeTrack === t;
            return (
              <Card 
                key={t}
                onClick={() => setActiveTrack(t)}
                className={cn(
                  "cursor-pointer transition-all border-2 relative overflow-hidden group",
                  isActive ? cn(info.border, info.bg, "ring-1 ring-primary/10") : "border-primary/5 hover:border-primary/20 bg-muted/20 opacity-70"
                )}
              >
                {isActive && <div className="absolute top-0 right-0 p-2"><CheckCircle2 className={cn("w-4 h-4", info.color)} /></div>}
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", isActive ? "bg-background shadow-sm" : "bg-muted")}>
                      <info.icon className={cn("w-5 h-5", info.color)} />
                    </div>
                    <CardTitle className="text-sm font-black uppercase tracking-tight">{info.title}</CardTitle>
                  </div>
                  <CardDescription className="text-xs leading-relaxed mt-2">{info.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {info.languages.map(lang => (
                      <Badge key={lang} variant="outline" className="text-[8px] font-bold uppercase border-primary/5 bg-background/50">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground italic">
                    Emphasis: <span className={cn("font-black uppercase", info.color)}>{info.focus}</span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <CodingDashboard />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-primary/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><Code2 className="w-5 h-5" /></div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1">Active Environment</p>
              <h3 className="text-sm font-bold uppercase tracking-tight">{activeLanguage} Context</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {currentTrack.languages.map(lang => (
              <Button 
                key={lang} 
                variant={activeLanguage === lang ? 'default' : 'outline'}
                size="sm"
                className="h-8 text-[10px] font-black uppercase"
                onClick={() => setActiveLanguage(lang as CodingLanguage)}
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {lanes.map((lane) => {
            const prog = laneProgress[lane.id];
            return (
              <Card key={lane.id} className="border-primary/5 flex flex-col h-full bg-card shadow-sm group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <lane.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="uppercase text-[8px] font-black">Level {prog.level}</Badge>
                  </div>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">{lane.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">{lane.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <div className="grid gap-2">
                    {lane.drills.map(drill => (
                      <button 
                        key={drill.id}
                        onClick={() => setActiveDrill(drill.id)}
                        className="w-full text-left p-3 rounded-xl border border-primary/5 bg-muted/20 hover:bg-primary/[0.02] hover:border-primary/20 transition-all group/item"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold group-hover/item:text-primary transition-colors">{drill.id}</span>
                          <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-all" />
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-tight">{drill.desc}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-primary/5 text-[10px] font-bold text-muted-foreground uppercase flex justify-between">
                  <span>{prog.totalSessions} sessions</span>
                  <span className="text-primary">{Math.round(prog.avgAccuracy)}% Accuracy</span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="pt-6">
        <CodingAnalytics />
      </div>

      <WellnessActivityCalendar categoryFilter="Custom" />
    </div>
  );
}
