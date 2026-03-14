
'use client';

import { useMemo, useState } from 'react';
import { musicDomains, drillsData } from '@/data/music-drills';
import { useMusicStore } from '@/hooks/use-music-store';
import { MusicDashboard } from './MusicDashboard';
import { MusicAnalytics } from './MusicAnalytics';
import { MusicDrillPlayer } from './MusicDrillPlayer';
import { JourneyPlansSection } from './JourneyPlansSection';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { TodayScheduleWidget } from './TodayScheduleWidget';
import { MusicOpenPractice } from './MusicOpenPractice';
import { MusicSongAnalysis } from './MusicSongAnalysis';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { 
  Music, Sparkles, Brain, Ear, Eye, Headphones, 
  ChevronRight, Play, Info, ListChecks
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWellnessData } from '@/hooks/use-wellness-data';

export default function MusicContent() {
  const { logs, _hasHydrated } = useMusicStore();
  const { collapsedCategories, toggleCategoryCollapse } = useWellnessData();
  const [activeDrillId, setActiveDrillId] = useState<string | null>(null);

  const openCategories = useMemo(() => {
    return musicDomains.map(d => d.name).filter((name, idx) => {
      const isCollapsed = collapsedCategories[name];
      if (isCollapsed === undefined) return idx < 1;
      return !isCollapsed;
    });
  }, [collapsedCategories]);

  if (activeDrillId) {
    return <MusicDrillPlayer drillId={activeDrillId} onClose={() => setActiveDrillId(null)} />;
  }

  if (!_hasHydrated) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <MusicDashboard />

      <div className="flex flex-col gap-4 py-4 border-y border-primary/5 bg-muted/10 rounded-2xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <JourneyPlansSection category="Communication" mode="trigger" /> {/* Shared UI trigger */}
        </div>
      </div>

      <div className="space-y-6">
        <div className="px-1">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Protocol Library</h2>
          <p className="text-sm text-muted-foreground">Select a domain to explore specialized auditory and cognitive drills.</p>
        </div>

        <Accordion type="multiple" value={openCategories} onValueChange={(vals) => {
          musicDomains.forEach(dom => {
            const isNowOpen = vals.includes(dom.name);
            const wasOpen = !collapsedCategories[dom.name];
            const effectivelyWasOpen = wasOpen || (collapsedCategories[dom.name] === undefined && musicDomains.indexOf(dom) < 1);
            if (isNowOpen !== effectivelyWasOpen) toggleCategoryCollapse(dom.name);
          });
        }}>
          {musicDomains.map((domain) => {
            const domainDrills = drillsData.filter(d => d.domain === domain.name);
            const lastPracticed = logs.find(l => l.domain === domain.name)?.timestamp;

            return (
              <AccordionItem key={domain.name} value={domain.name} className="border-b border-primary/5">
                <AccordionTrigger className="hover:no-underline px-1 py-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <domain.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-tight">{domain.name}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">
                        {domain.drills.length} Drills • {lastPracticed ? `Last: ${new Date(lastPracticed).toLocaleDateString()}` : 'Never Practiced'}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {domain.drills.map((drillName) => {
                      const drillDef = drillsData.find(d => d.name === drillName);
                      return (
                        <Card 
                          key={drillName} 
                          className="bg-card border-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
                          onClick={() => drillDef && setActiveDrillId(drillDef.id)}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-bold group-hover:text-primary transition-colors">{drillName}</span>
                              <span className="text-[9px] font-black uppercase text-muted-foreground opacity-60">Adaptive Drill</span>
                            </div>
                            <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MusicOpenPractice />
        <MusicSongAnalysis />
      </div>

      <TodayScheduleWidget category="Communication" /> {/* Shared UI component */}
      
      <div className="pt-10">
        <WellnessActivityCalendar categoryFilter="Math" /> {/* Fallback history view */}
      </div>

      <div className="pt-6">
        <MusicAnalytics />
      </div>
    </div>
  );
}
