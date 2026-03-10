
'use client';

import { useState, useMemo } from "react"
import { useSpeedReadingStore } from "@/hooks/use-speedreading-store"
import { readingPassages } from "@/data/speedreading-passages"
import { SpeedReadingStats, SpeedReadingAnalytics } from "./SpeedReadingDashboard"
import { SpeedReadingDrillPlayer } from "./SpeedReadingDrillPlayer"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"
import { TodayScheduleWidget } from "./TodayScheduleWidget"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Zap, BookOpen, Layers, MousePointer2, 
  Eye, Play, BookCopy, X
} from "lucide-react"
import type { ReadingPassage, DrillType, ReadingTier } from "@/types/speedreading"
import { AssistantTooltip } from "@/components/assistant-tooltip"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { speedReadingCategoryDetails } from "@/data/wellness-categories"

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
  const { logs } = useSpeedReadingStore();
  const { lowEnergyMode, collapsedCategories, toggleCategoryCollapse } = useWellnessData();
  const [activeDrill, setActiveDrill] = useState<{ type: DrillType; passage: ReadingPassage; isCustom?: boolean } | null>(null);
  const [selectedTier, setSelectedTier] = useState<ReadingTier | 'All'>('All');
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const [customTitle, setCustomName] = useState("");

  const filteredPassages = useMemo(() => {
    let list = readingPassages;
    if (lowEnergyMode) {
      list = list.filter(p => p.tier === 'Casual');
    }
    return list.filter(p => selectedTier === 'All' || p.tier === selectedTier);
  }, [selectedTier, lowEnergyMode]);

  const handleStartCustom = (type: DrillType) => {
    if (!customText) return;
    const passage: ReadingPassage = {
      id: 'custom',
      title: customTitle || "Personal Text",
      content: customText,
      wordCount: customText.split(/\s+/).length,
      tier: 'Casual', 
      quiz: []
    };
    setActiveDrill({ type, passage, isCustom: true });
    setIsCustomOpen(false);
  };

  const openCategories = useMemo(() => {
    const drillIds = DRILLS.map(d => d.id);
    return drillIds.filter((id, idx) => {
      const isCollapsed = collapsedCategories[id];
      if (isCollapsed === undefined) return idx < 1;
      return !isCollapsed;
    });
  }, [collapsedCategories]);

  if (activeDrill) {
    return (
      <SpeedReadingDrillPlayer 
        drillType={activeDrill.type}
        passage={activeDrill.passage}
        isCustomText={activeDrill.isCustom}
        onClose={() => setActiveDrill(null)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-1">
          <div className="space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Drill Laboratory</h2>
            <p className="text-sm text-muted-foreground">Select a protocol and passage to begin training.</p>
          </div>
          
          <div className="flex gap-2">
            {!lowEnergyMode && (
              <Dialog open={isCustomOpen} onOpenChange={setIsCustomOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-10 gap-2 border-primary/20 font-bold">
                    <BookCopy className="w-4 h-4" /> Open Drill
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Bring Your Own Text</DialogTitle>
                    <DialogDescription>Paste an article or snippet to practice with your own material.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase">Passage Title</Label>
                      <Input value={customTitle} onChange={e => setCustomName(e.target.value)} placeholder="e.g. Research Paper Notes" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase">Paste Text</Label>
                      <Textarea 
                        className="min-h-[200px]" 
                        value={customText} 
                        onChange={e => setCustomText(e.target.value)} 
                        placeholder="Paste your text here..."
                      />
                    </div>
                  </div>
                  <DialogFooter className="grid grid-cols-2 gap-2">
                    {DRILLS.slice(0, 2).map(d => (
                      <Button key={d.id} onClick={() => handleStartCustom(d.id)} disabled={!customText} variant="secondary" className="gap-2">
                        <Play className="w-3 h-3 fill-current" /> {d.title}
                      </Button>
                    ))}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <AssistantTooltip text="Filter passages by cognitive load tier. Your PBs are tracked separately for each tier.">
              <div className="flex items-center gap-2 p-1 bg-muted rounded-lg border">
                {(['Narrative', 'Dense Data', 'Technical', 'Casual', 'All'] as const).map(tier => (
                  <Button 
                    key={tier}
                    variant={selectedTier === tier ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn("h-7 text-[10px] font-black uppercase px-3", selectedTier === tier && "bg-background shadow-sm")}
                    onClick={() => setSelectedTier(tier)}
                    disabled={lowEnergyMode && tier !== 'Casual' && tier !== 'All'}
                  >
                    {tier}
                  </Button>
                ))}
              </div>
            </AssistantTooltip>
          </div>
        </div>

        <Accordion type="multiple" value={openCategories} onValueChange={(vals) => {
          DRILLS.forEach(drill => {
            const isNowOpen = vals.includes(drill.id);
            const wasOpen = !collapsedCategories[drill.id];
            const effectivelyWasOpen = wasOpen || (collapsedCategories[drill.id] === undefined && DRILLS.indexOf(drill) < 1);
            if (isNowOpen !== effectivelyWasOpen) toggleCategoryCollapse(drill.id);
          });
        }}>
          {DRILLS.map((drill) => {
            const details = speedReadingCategoryDetails[drill.id];
            const isOpen = openCategories.includes(drill.id);
            return (
              <AccordionItem key={drill.id} value={drill.id} className="border-b border-primary/5">
                <AccordionTrigger className="hover:no-underline px-1 py-4 items-start">
                  <div className="flex flex-col w-full text-left">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <drill.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold uppercase tracking-tight">
                            {drill.title}
                          </h3>
                        </div>
                        {!isOpen && (
                          <p className="text-[10px] text-muted-foreground italic mt-1">"{details.tagline}"</p>
                        )}
                        
                        {isOpen && (
                          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-1 duration-300 pr-8">
                            <p className="text-xs text-muted-foreground leading-relaxed">{details.purpose}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Use When:</p>
                                <ul className="list-disc list-inside text-[10px] text-muted-foreground space-y-0.5">
                                  {details.useWhen.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Includes:</p>
                                <ul className="list-disc list-inside text-[10px] text-muted-foreground space-y-0.5">
                                  {details.includes.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <p className="text-xs italic text-primary mt-2">“{details.tagline}”</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Available Passages</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPassages.length === 0 ? (
                        <div className="col-span-full py-10 text-center border-2 border-dashed rounded-xl opacity-30 italic text-xs">No passages match filters.</div>
                      ) : (
                        filteredPassages.map(p => (
                          <button
                            key={p.id}
                            onClick={() => setActiveDrill({ type: drill.id, passage: p, isCustom: false })}
                            className="flex items-center justify-between p-3 rounded-xl bg-card border border-primary/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all text-left group/btn"
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                p.tier === 'Narrative' ? 'bg-amber-500' : 'bg-primary/40'
                              )} />
                              <div>
                                <p className="text-sm font-bold">{p.title}</p>
                                <p className="text-[9px] text-muted-foreground uppercase">{p.wordCount} words • {p.tier}</p>
                              </div>
                            </div>
                            <Play className="w-4 h-4 text-muted-foreground opacity-0 group-hover/btn:opacity-100 transition-all translate-x-[-10px] group-hover/btn:translate-x-0" />
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <TodayScheduleWidget category="Speed Reading" />

      <div className="pt-10">
        <WellnessActivityCalendar categoryFilter="Speed Reading" /> 
      </div>

      <div className="pt-6">
        <SpeedReadingAnalytics />
      </div>
    </div>
  )
}
