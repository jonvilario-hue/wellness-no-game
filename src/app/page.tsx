
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Brain, Zap, History, Target, 
  HeartPulse, GraduationCap, Sparkles, 
  Flame, Clock, ChevronRight, BarChart3,
  Waves, LayoutDashboard
} from 'lucide-react';
import { useWellnessData, calculateStreak } from '@/hooks/use-wellness-data';
import { useMusicStore } from '@/hooks/use-music-store';
import { useSpeedReadingStore } from '@/hooks/use-speedreading-store';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { usePerformanceStore } from '@/hooks/use-performance-store';
import { FullStrengthProfile } from '@/components/dashboard/full-strength-profile';
import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { cn } from '@/lib/utils';
import { isToday, parseISO } from 'date-fns';

export default function PolymathCommandCenter() {
  const [mounted, setMounted] = useState(false);
  
  // Data Sources
  const { allLogs, completions } = useWellnessData();
  const { streak: musicStreak, logs: musicLogs, getGlobalHAR } = useMusicStore();
  const { logs: readingLogs, getStreak: getReadingStreak } = useSpeedReadingStore();
  const { projects: blueprints } = useBlueprintStore();
  const { cards: flashcards } = useFlashcardStore();
  const { performance } = usePerformanceStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Aggregated Stats
  const stats = useMemo(() => {
    if (!mounted) return { wellnessStreak: 0, activeBlueprints: 0, totalCards: 0, globalHAR: 0 };
    
    return {
      wellnessStreak: calculateStreak(completions),
      activeBlueprints: blueprints.filter(p => p.status === 'Active' || p.status === 'active').length,
      totalCards: flashcards.length,
      globalHAR: getGlobalHAR()
    };
  }, [mounted, completions, blueprints, flashcards, getGlobalHAR]);

  if (!mounted) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Clock className="h-10 w-10 animate-spin text-primary/20" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black uppercase tracking-widest text-[10px] px-3 h-6">
              Neural Network Online
            </Badge>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">Polymath Command</h1>
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            Synchronized intelligence dashboard mapping your growth across physical, cognitive, and creative domains.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild variant="outline" size="lg" className="flex-1 md:flex-none h-14 px-8 font-bold border-2 rounded-2xl">
            <Link href="/calendar">
              <History className="mr-2 w-5 h-5" /> Analytics
            </Link>
          </Button>
          <Button asChild size="lg" className="flex-1 md:flex-none h-14 px-10 text-lg font-black shadow-xl shadow-primary/20 rounded-2xl">
            <Link href="/skills">
              <Play className="mr-2 w-6 h-6 fill-current" /> Initialize Training
            </Link>
          </Button>
        </div>
      </section>

      {/* --- QUICK STATS BAR --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Wellness Streak', val: stats.wellnessStreak, icon: Flame, color: 'text-orange-500', link: '/exercises' },
          { label: 'Global HAR', val: stats.globalHAR, icon: Zap, color: 'text-primary', link: '/skills?tab=music' },
          { label: 'Active Blueprints', val: stats.activeBlueprints, icon: Target, color: 'text-primary', link: '/architecture' },
          { label: 'Memory Vault', val: stats.totalCards, icon: GraduationCap, color: 'text-primary', link: '/study' }
        ].map((item, i) => (
          <Link key={i} href={item.link}>
            <Card className="bg-muted/30 hover:bg-primary/5 transition-all border-primary/5 group cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-background rounded-xl border border-primary/5 group-hover:border-primary/20">
                  <item.icon className={cn("w-5 h-5", item.color)} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  <p className="text-xl font-black">{item.val}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: CORE DASHBOARD --- */}
        <div className="lg:col-span-2 space-y-8">
          
          <DailyChallenge />

          <Card className="border-primary/10 rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2 uppercase tracking-tight">
                    <Brain className="w-5 h-5 text-primary" /> 8-Domain Strength Profile
                  </CardTitle>
                  <CardDescription>Holistic visualization of your current cognitive capacity.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild className="h-8 text-[10px] font-black uppercase">
                  <Link href="/skills">View Skills <ChevronRight className="ml-1 w-3 h-3" /></Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-8">
              <FullStrengthProfile />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Architecture Widget */}
            <Card className="border-primary/10 rounded-3xl hover:border-primary/30 transition-all group cursor-pointer overflow-hidden">
              <Link href="/architecture">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" /> Active Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {blueprints.filter(p => p.status === 'Active' || p.status === 'active').slice(0, 2).map(p => (
                    <div key={p.id} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span className="truncate max-w-[70%]">{p.title}</span>
                        <span className="text-primary">{p.momentumScore}%</span>
                      </div>
                      <Progress value={p.momentumScore} className="h-1" />
                    </div>
                  ))}
                  {blueprints.filter(p => p.status === 'Active' || p.status === 'active').length === 0 && (
                    <p className="text-xs text-muted-foreground italic text-center py-4">No active blueprints. Architect your first goal.</p>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/10 border-t p-3 justify-end">
                  <span className="text-[9px] font-black uppercase text-primary flex items-center gap-1">Open Lab <ChevronRight className="w-2.5 h-2.5" /></span>
                </CardFooter>
              </Link>
            </Card>

            {/* Health/Wellness Widget */}
            <Card className="border-primary/10 rounded-3xl hover:border-primary/30 transition-all group cursor-pointer overflow-hidden">
              <Link href="/exercises">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-primary" /> Biological Engine
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-around text-center">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-muted-foreground uppercase">Movement</p>
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none font-black text-xs">
                        {allLogs.filter(l => l.category === 'Movement' && isToday(parseISO(l.timestamp))).length > 0 ? 'LOGGED' : 'PENDING'}
                      </Badge>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-muted-foreground uppercase">Stillness</p>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-none font-black text-xs">
                        {allLogs.filter(l => l.category === 'Stillness' && isToday(parseISO(l.timestamp))).length > 0 ? 'LOGGED' : 'PENDING'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/10 border-t p-3 justify-end">
                  <span className="text-[9px] font-black uppercase text-primary flex items-center gap-1">View Health <ChevronRight className="w-2.5 h-2.5" /></span>
                </CardFooter>
              </Link>
            </Card>
          </div>
        </div>

        {/* --- RIGHT COLUMN: CONTEXTUAL AGENT & FEEDBACK --- */}
        <div className="space-y-8">
          <Card className="border-primary/20 shadow-lg relative overflow-hidden bg-primary/5 rounded-3xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-20 h-20 text-primary rotate-12" />
            </div>
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Brain className="w-4 h-4" /> Lab Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="p-4 bg-background rounded-2xl border border-primary/10">
                <p className="text-sm font-medium leading-relaxed italic">
                  "Your logic performance (Gf) is currently 15% above your baseline. This is an ideal window for Architecture planning or difficult technical study."
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Prioritized Action</h4>
                <Button asChild className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 shadow-lg">
                  <Link href="/study/session">
                    <Zap className="w-4 h-4 fill-current" /> Resume Review Queue
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-12 rounded-2xl font-bold uppercase text-[10px] tracking-tight border-primary/20">
                  <Link href="/architecture">Update Project Milestones</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">System Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold">Local Sync Status</span>
                </div>
                <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black h-4 px-2">ENCRYPTED</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed text-center px-4 italic">
                All training data is persisted in your browser's private IndexedDB. Performance metrics are calculated locally.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
