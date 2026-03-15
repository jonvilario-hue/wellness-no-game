
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal, Code2, Bug, Brain, Play, 
  History, Clock, Target, ArrowRight,
  MousePointer2, Zap, LayoutGrid
} from 'lucide-react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { CodingDashboard } from './CodingDashboard';
import { CodingDrillPlayer } from './CodingDrillPlayer';
import { CodingAnalytics } from './CodingAnalytics';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { cn } from '@/lib/utils';
import { AssistantTooltip } from '../assistant-tooltip';

const protocols = [
  {
    id: 'Syntax Sprints',
    icon: Terminal,
    desc: 'Build muscle memory for code syntax by typing snippets accurately and fast.',
    est: '2-3 min'
  },
  {
    id: 'Output Prediction',
    icon: Eye,
    desc: 'Train your mental compiler by predicting exact code results without running it.',
    est: '3-5 min'
  },
  {
    id: 'Bug Hunt',
    icon: Bug,
    desc: 'Sharpen pattern recognition for 6 categories of logical and syntax errors.',
    est: '4-6 min'
  },
  {
    id: 'Code Reconstruction',
    icon: Brain,
    desc: 'Strengthen structural memory by rewriting snippets from memory after a brief study.',
    est: '5-8 min'
  },
  {
    id: 'Timed Implementation',
    icon: Clock,
    desc: 'Execute common coding patterns under pressure. Speed up your baseline.',
    est: '5-10 min'
  }
];

import { Eye } from 'lucide-react';

export default function CodingContent() {
  const { _hasHydrated, languageProgress, activeLanguage, setActiveLanguage } = useCodingStore();
  const [activeDrill, setActiveDrill] = useState<string | null>(null);

  if (!_hasHydrated) return null;

  if (activeDrill) {
    return <CodingDrillPlayer protocolId={activeDrill as any} onClose={() => setActiveDrill(null)} />;
  }

  const langs = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
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
            {langs.map(lang => (
              <Button 
                key={lang} 
                variant={activeLanguage === lang ? 'default' : 'outline'}
                size="sm"
                className="h-8 text-[10px] font-black uppercase"
                onClick={() => setActiveLanguage(lang as any)}
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocols.map((p) => {
            const progress = languageProgress[activeLanguage] || { level: 1 };
            return (
              <Card 
                key={p.id} 
                className="group cursor-pointer hover:border-primary/30 transition-all border-primary/5 flex flex-col"
                onClick={() => setActiveDrill(p.id)}
              >
                <CardHeader className="p-5 pb-2">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="uppercase text-[8px] font-black px-2">Level {progress.level}</Badge>
                      <span className="text-[8px] font-bold text-muted-foreground mt-1 uppercase">{p.est}</span>
                    </div>
                  </div>
                  <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors uppercase tracking-tight">{p.id}</CardTitle>
                  <CardDescription className="text-[10px] leading-relaxed line-clamp-2 mt-1">{p.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="p-5 pt-4 mt-auto border-t border-primary/5 justify-end">
                  <Play className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-5px] group-hover:translate-x-0" />
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
