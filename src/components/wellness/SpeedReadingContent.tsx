
'use client';

import { useState, useMemo, useEffect } from "react"
import { useSpeedReadingStore } from "@/hooks/use-speedreading-store"
import { readingPassages as curatedPassages } from "@/data/speedreading-passages"
import { SpeedReadingStats, SpeedReadingAnalytics } from "./SpeedReadingDashboard"
import { SpeedReadingDrillPlayer } from "./SpeedReadingDrillPlayer"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"
import { TodayScheduleWidget } from "./TodayScheduleWidget"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { 
  Zap, MousePointer2, 
  Eye, Play, BookCopy, X, Trash2, PlusCircle
} from "lucide-react"
import type { ReadingPassage, DrillType, ReadingTier, ReadingDifficulty } from "@/types/speedreading"
import { cn } from "@/lib/utils"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { speedReadingCategoryDetails } from "@/data/wellness-categories"
import { CustomTextImportModal } from "./CustomTextImportModal"
import { getCustomPassages, deleteCustomPassage } from "@/lib/indexedDBUtils"
import { useToast } from "@/hooks/use-toast"

const DRILLS: { id: DrillType; icon: any; title: string; desc: string; tagline: string }[] = [
  { 
    id: 'Pacer', 
    icon: MousePointer2, 
    title: 'Pacer Drills', 
    desc: 'Keep up with a moving highlight to suppress subvocalization.',
    tagline: 'Set the tempo for your brain.'
  },
  { 
    id: 'Peripheral Expansion', 
    icon: Eye, 
    title: 'Peripheral Expansion', 
    desc: 'Widen your fixation span with centered-column text.',
    tagline: 'Widen your window of focus.'
  }
];

export default function SpeedReadingContent() {
  const { lowEnergyMode, collapsedCategories, toggleCategoryCollapse } = useWellnessData();
  const [activeDrill, setActiveDrill] = useState<{ type: DrillType; passage: ReadingPassage } | null>(null);
  const [selectedTier, setSelectedTier] = useState<ReadingTier | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ReadingDifficulty | 'All'>('All');
  const [customPassages, setCustomPassages] = useState<ReadingPassage[]>([]);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const { toast } = useToast();

  const hydrateCustom = async () => {
    const list = await getCustomPassages();
    setCustomPassages(list);
  };

  useEffect(() => {
    hydrateCustom();
  }, []);

  const allPassages = useMemo(() => [
    ...curatedPassages,
    ...customPassages
  ], [customPassages]);

  const filteredPassages = useMemo(() => {
    let list = allPassages;
    if (lowEnergyMode) {
      list = list.filter(p => p.difficulty === 'Beginner');
    }
    if (selectedTier !== 'All') {
      list = list.filter(p => p.tier === selectedTier);
    }
    if (selectedDifficulty !== 'All') {
      list = list.filter(p => p.difficulty === selectedDifficulty);
    }
    return list;
  }, [allPassages, selectedTier, selectedDifficulty, lowEnergyMode]);

  const handleDeleteCustom = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await deleteCustomPassage(id);
    await hydrateCustom();
    toast({ title: "Custom passage removed" });
  };

  const getDifficultyColor = (d: ReadingDifficulty) => {
    switch (d) {
      case 'Beginner': return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
      case 'Intermediate': return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
      case 'Advanced': return 'text-rose-500 border-rose-500/20 bg-rose-500/5';
      default: return '';
    }
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
          
          <Button onClick={() => setIsImportOpen(true)} variant="outline" className="h-10 gap-2 border-primary/20 font-bold shadow-sm">
            <PlusCircle className="w-4 h-4 text-primary" /> Import Custom Text
          </Button>
        </div>

        <div className="space-y-4 p-4 bg-muted/30 rounded-2xl border border-primary/5">
          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Content Category</Label>
            <div className="flex flex-wrap gap-2">
              {(['Narrative', 'Dense Data', 'Technical', 'Casual', 'All'] as const).map(tier => (
                <Button 
                  key={tier}
                  variant={selectedTier === tier ? 'default' : 'outline'}
                  size="sm"
                  className={cn("h-8 text-[10px] font-black uppercase px-4 rounded-full", selectedTier === tier ? "shadow-md" : "border-primary/10 bg-background/50")}
                  onClick={() => setSelectedTier(tier)}
                >
                  {tier}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Cognitive Load (Difficulty)</Label>
            <div className="flex flex-wrap gap-2">
              {(['Beginner', 'Intermediate', 'Advanced', 'All'] as const).map(diff => (
                <Button 
                  key={diff}
                  variant={selectedDifficulty === diff ? 'default' : 'outline'}
                  size="sm"
                  className={cn("h-8 text-[10px] font-black uppercase px-4 rounded-full", selectedDifficulty === diff ? "shadow-md" : "border-primary/10 bg-background/50")}
                  onClick={() => setSelectedDifficulty(diff)}
                  disabled={lowEnergyMode && diff !== 'Beginner' && diff !== 'All'}
                >
                  {diff}
                </Button>
              ))}
            </div>
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
            return (
              <AccordionItem key={drill.id} value={drill.id} className="border-b border-primary/5">
                <AccordionTrigger className="hover:no-underline px-1 py-4 items-center">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <drill.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-tight">
                        {drill.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground italic mt-1">"{details.tagline}"</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0">
                  <div className="mb-8 p-4 bg-primary/[0.02] border-b border-primary/5 space-y-4 animate-in fade-in duration-500">
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
                  </div>

                  <div className="space-y-2 pb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Available Passages ({filteredPassages.length})</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPassages.length === 0 ? (
                        <div className="col-span-full py-10 text-center border-2 border-dashed rounded-xl opacity-30 italic text-xs">No passages match filters.</div>
                      ) : (
                        filteredPassages.map(p => (
                          <button
                            key={p.id}
                            onClick={() => setActiveDrill({ type: drill.id, passage: p })}
                            className="flex flex-col p-4 rounded-xl bg-card border border-primary/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all text-left group/btn relative overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex gap-1.5">
                                <Badge variant="outline" className={cn("text-[8px] font-black uppercase h-4 px-2", getDifficultyColor(p.difficulty))}>
                                  {p.difficulty}
                                </Badge>
                                {p.isCustom && <Badge className="text-[8px] font-black uppercase h-4 px-2 bg-primary text-white border-none">Custom</Badge>}
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="secondary" className="text-[8px] font-black uppercase h-4 bg-muted text-muted-foreground">
                                  {p.tier}
                                </Badge>
                                {p.isCustom && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 text-muted-foreground hover:text-destructive transition-opacity opacity-0 group-hover/btn:opacity-100"
                                    onClick={(e) => handleDeleteCustom(e, p.id)}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold truncate group-hover/btn:text-primary transition-colors">{p.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{p.author}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/5 w-full">
                              <span className="text-[9px] font-black text-muted-foreground uppercase">{p.wordCount} WORDS</span>
                              <Play className="w-3.5 h-3.5 text-primary opacity-0 group-hover/btn:opacity-100 transition-all translate-x-[-5px] group-hover/btn:translate-x-0" />
                            </div>
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

      <CustomTextImportModal 
        open={isImportOpen} 
        onOpenChange={setIsImportOpen} 
        onImportComplete={hydrateCustom} 
      />

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
