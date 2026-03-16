
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, Brain, Play, 
  ChevronRight, Sparkles, Database, CheckCircle2,
  PenTool, Eye, LayoutGrid, BarChart3, Terminal,
  Shield, Activity, Wind, Layers, Zap
} from 'lucide-react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { CodingDashboard } from './CodingDashboard';
import { CodingDrillPlayer } from './CodingDrillPlayer';
import { CodingAnalytics } from './CodingAnalytics';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { LocalAnalytics } from '../LocalAnalytics';
import { cn } from '@/lib/utils';
import type { CodingTrack, CodingLanguage, CodingDrillType, CodingLane } from '@/types/coding';

const trackInfo = {
  Foundation: {
    title: "Foundation / Core",
    icon: Database,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "Master the logic that runs everywhere. Focus on Python, TypeScript, and SQL.",
    languages: [
      { id: 'Python', icon: Code2, desc: 'Data, AI, and Automation logic.' },
      { id: 'JavaScript', icon: Zap, desc: 'Web and interactive systems.' },
      { id: 'TypeScript', icon: Layers, desc: 'Type-safe scalable architecture.' },
      { id: 'SQL', icon: Database, desc: 'Relational data manipulation.' }
    ] as const
  },
  Specialist: {
    title: "Specialist / Edge",
    icon: Sparkles,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    description: "High-leverage systems languages for performance and precision.",
    languages: [
      { id: 'Rust', icon: Shield, desc: 'Memory-safe systems programming.' },
      { id: 'Go', icon: Activity, desc: 'Concurrent backend infrastructure.' },
      { id: 'Swift', icon: Wind, desc: 'Modern native app development.' },
      { id: 'Bash', icon: Terminal, desc: 'Shell scripting and system control.' }
    ] as const
  }
};

export default function CodingContent() {
  const { _hasHydrated, activeLanguage, setActiveLanguage, activeLoop, activeTrack, setActiveTrack, languageProgress, startLoop } = useCodingStore();
  const [showLocalAnalytics, setShowLocalAnalytics] = useState(false);

  if (!_hasHydrated) return null;

  if (activeLoop.active) {
    return (
      <CodingDrillPlayer 
        protocolId={(activeLoop.steps[activeLoop.currentStep]?.type) as any} 
        onClose={() => {}} 
      />
    );
  }

  const handleStartLanguageSession = (lang: CodingLanguage) => {
    setActiveLanguage(lang);
    
    // Create a 3-part loop for the chosen language
    const sessionLoop = [
      { lane: 'Read' as CodingLane, type: 'Output Prediction' as CodingDrillType },
      { lane: 'Write' as CodingLane, type: 'Syntax Sprints' as CodingDrillType },
      { lane: 'Build' as CodingLane, type: 'Timed Implementation' as CodingDrillType }
    ];
    
    startLoop(sessionLoop);
  };

  const currentTrack = trackInfo[activeTrack];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Select Track</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2 text-[10px] font-black uppercase text-primary"
            onClick={() => setShowLocalAnalytics(!showLocalAnalytics)}
          >
            <BarChart3 className="w-3 h-3" />
            {showLocalAnalytics ? 'Hide Analytics' : 'Local Velocity'}
          </Button>
        </div>
        
        {showLocalAnalytics ? (
          <LocalAnalytics />
        ) : (
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
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <CodingDashboard />

      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Language Laboratory</h3>
          <Badge variant="secondary" className="text-[10px] font-bold uppercase">{activeTrack} Track Active</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentTrack.languages.map((lang) => {
            const prog = languageProgress[lang.id] || { level: 1, avgAccuracy: 0 };
            const isActive = activeLanguage === lang.id;

            return (
              <Card 
                key={lang.id} 
                className={cn(
                  "flex flex-col group transition-all duration-300 border-primary/5 hover:border-primary/30 hover:shadow-md",
                  isActive && "border-primary/30 bg-primary/[0.02]"
                )}
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <lang.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="uppercase text-[8px] font-black">Level {prog.level}</Badge>
                  </div>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">{lang.id}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed line-clamp-2">{lang.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="p-5 pt-0 mt-auto">
                  <Button 
                    className="w-full h-10 font-black uppercase tracking-widest text-[10px] gap-2" 
                    onClick={() => handleStartLanguageSession(lang.id as CodingLanguage)}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Initialize Reps
                  </Button>
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
