'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal, Code2, Bug, Brain, Play, 
  History, Clock, Target, ArrowRight,
  MousePointer2, Zap, LayoutGrid, Eye, Layers, PenTool,
  ChevronRight
} from 'lucide-react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { CodingDashboard } from './CodingDashboard';
import { CodingDrillPlayer } from './CodingDrillPlayer';
import { CodingAnalytics } from './CodingAnalytics';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { cn } from '@/lib/utils';
import { AssistantTooltip } from '../assistant-tooltip';
import type { CodingLane, CodingDrillType } from '@/types/coding';

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
      { id: 'Bug Hunt', desc: 'Identify syntax and logic errors across 6 core categories.' }
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

export default function CodingContent() {
  const { _hasHydrated, activeLanguage, setActiveLanguage, activeLoop, startLoop, laneProgress } = useCodingStore();
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

  const languages: any[] = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
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
            {languages.map(lang => (
              <Button 
                key={lang} 
                variant={activeLanguage === lang ? 'default' : 'outline'}
                size="sm"
                className="h-8 text-[10px] font-black uppercase"
                onClick={() => setActiveLanguage(lang)}
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
