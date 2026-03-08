
'use client';

import { useState, useMemo } from "react"
import { useSpeedReadingStore } from "@/hooks/use-speedreading-store"
import { readingPassages } from "@/data/speedreading-passages"
import { SpeedReadingDashboard } from "./SpeedReadingDashboard"
import { SpeedReadingDrillPlayer } from "./SpeedReadingDrillPlayer"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Zap, BookOpen, Layers, MousePointer2, 
  Eye, Target, Play, BarChart3, Clock,
  Flame, Filter, Info
} from "lucide-react"
import type { ReadingPassage, DrillType, ReadingTier } from "@/types/speedreading"
import { AssistantTooltip } from "@/components/assistant-tooltip"
import { cn } from "@/lib/utils"

const DRILLS: { id: DrillType; icon: any; title: string; desc: string; tip: string }[] = [
  { 
    id: 'Chunk Training', 
    icon: Layers, 
    title: 'Chunk Training', 
    desc: 'Absorb 2-4 words at once to expand your perceptual span.',
    tip: 'Focus on the white space just above the line to see the whole chunk.'
  },
  { 
    id: 'Pacer', 
    icon: MousePointer2, 
    title: 'Pacer Drills', 
    desc: 'Keep up with a moving highlight to suppress subvocalization.',
    tip: 'Trust your peripheral vision. Don\'t try to "hear" every word.'
  },
  { 
    id: 'Peripheral Expansion', 
    icon: Eye, 
    title: 'Peripheral Expansion', 
    desc: 'Widen your fixation span with centered-column text.',
    tip: 'Keep your eyes in the center. Let the words on the edges bleed in.'
  },
  { 
    id: 'Regression Eliminator', 
    icon: Zap, 
    title: 'Regression Eliminator', 
    desc: 'Words disappear after display to break the habit of re-reading.',
    tip: 'The goal is forward momentum. If you miss a word, keep going.'
  }
];

export default function SpeedReadingContent() {
  const { logs, targetWpm, setTargetWpm } = useSpeedReadingStore();
  const [activeDrill, setActiveDrill] = useState<{ type: DrillType; passage: ReadingPassage } | null>(null);
  const [selectedTier, setSelectedTier] = useState<ReadingTier | 'All'>('All');

  const filteredPassages = useMemo(() => {
    return readingPassages.filter(p => selectedTier === 'All' || p.tier === selectedTier);
  }, [selectedTier]);

  if (activeDrill) {
    return (
      <SpeedReadingDrillPlayer 
        drillType={activeDrill.type}
        passage={activeDrill.passage}
        onClose={() => setActiveDrill(null)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <SpeedReadingDashboard />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-1">
          <div className="space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Drill Laboratory</h2>
            <p className="text-sm text-muted-foreground">Select a protocol and passage to begin training.</p>
          </div>
          
          <div className="flex gap-2">
            <AssistantTooltip text="Filter passages by cognitive load tier. Your PBs are tracked separately for each tier.">
              <div className="flex items-center gap-2 p-1 bg-muted rounded-lg border">
                {(['All', 'Casual', 'Technical', 'Dense Data'] as const).map(tier => (
                  <Button 
                    key={tier}
                    variant={selectedTier === tier ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn("h-7 text-[10px] font-black uppercase px-3", selectedTier === tier && "bg-background shadow-sm")}
                    onClick={() => setSelectedTier(tier)}
                  >
                    {tier}
                  </Button>
                ))}
              </div>
            </AssistantTooltip>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {DRILLS.map((drill) => (
            <Card key={drill.id} className="group hover:border-primary/30 transition-all overflow-hidden border-primary/5">
              <CardHeader className="bg-primary/5 pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-background rounded-xl text-primary shadow-sm">
                    <drill.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">{drill.title}</CardTitle>
                    <CardDescription className="text-xs">{drill.desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="p-3 bg-muted/30 rounded-lg border border-dashed flex gap-3">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">{drill.tip}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Available Passages</p>
                  <div className="grid gap-2">
                    {filteredPassages.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setActiveDrill({ type: drill.id, passage: p })}
                        className="flex items-center justify-between p-3 rounded-xl bg-card border border-primary/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all text-left group/btn"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/btn:bg-primary transition-colors" />
                          <div>
                            <p className="text-sm font-bold">{p.title}</p>
                            <p className="text-[9px] text-muted-foreground uppercase">{p.wordCount} words • {p.tier}</p>
                          </div>
                        </div>
                        <Play className="w-4 h-4 text-muted-foreground opacity-0 group-hover/btn:opacity-100 transition-all translate-x-[-10px] group-hover/btn:translate-x-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <WellnessActivityCalendar categoryFilter="Movement" /> 
      {/* Note: In a production app we'd add a 'Reading' filter to the generic calendar, 
          but for now we use the isolated history below. */}
      
      <div className="pt-10">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Isolated Reading History
        </h3>
        {logs.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed rounded-3xl bg-muted/20">
            <BookOpen className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
            <p className="text-lg font-bold text-muted-foreground">Library Empty</p>
            <p className="text-sm text-muted-foreground mt-2">Complete your first drill to populate the history.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {logs.slice(0, 6).map(log => (
              <Card key={log.id} className="border-primary/5 hover:border-primary/10 transition-all">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[8px] h-4 uppercase">{log.drillType}</Badge>
                    <span className="text-[9px] font-bold text-muted-foreground">{format(parseISO(log.timestamp), 'MMM d, h:mm a')}</span>
                  </div>
                  <CardTitle className="text-sm font-bold mt-2">{readingPassages.find(p => p.id === log.passageId)?.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <p className="text-[8px] font-black uppercase text-muted-foreground">WPM</p>
                      <p className="text-xs font-black">{log.wpm}</p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <p className="text-[8px] font-black uppercase text-muted-foreground">Comp</p>
                      <p className="text-xs font-black">{log.comprehensionScore}%</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <p className="text-[8px] font-black uppercase text-primary">ERR</p>
                      <p className="text-xs font-black text-primary">{log.err}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
