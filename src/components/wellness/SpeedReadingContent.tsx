
'use client';

import { useState, useMemo } from "react"
import { useSpeedReadingStore } from "@/hooks/use-speedreading-store"
import { readingPassages } from "@/data/speedreading-passages"
import { SpeedReadingStats, SpeedReadingAnalytics } from "./SpeedReadingDashboard"
import { SpeedReadingDrillPlayer } from "./SpeedReadingDrillPlayer"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Zap, BookOpen, Layers, MousePointer2, 
  Eye, Target, Play, BarChart3, Clock,
  Flame, Filter, Info, PlusCircle, BookCopy
} from "lucide-react"
import type { ReadingPassage, DrillType, ReadingTier } from "@/types/speedreading"
import { AssistantTooltip } from "@/components/assistant-tooltip"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { useWellnessData } from "@/hooks/use-wellness-data"

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
  const { lowEnergyMode } = useWellnessData();
  const [activeDrill, setActiveDrill] = useState<{ type: DrillType; passage: ReadingPassage; isCustom?: boolean } | null>(null);
  const [selectedTier, setSelectedTier] = useState<ReadingTier | 'All'>('All');
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const [customTitle, setCustomName] = useState("");

  const filteredPassages = useMemo(() => {
    let list = readingPassages;
    if (lowEnergyMode) {
      // In low energy mode, we only show Casual tier to keep cognitive load low
      list = list.filter(p => p.tier === 'Casual');
    }
    return list.filter(p => selectedTier === 'All' || p.tier === selectedTier);
  }, [selectedTier, lowEnergyMode]);

  const mvdSuggestion = useMemo(() => {
    return filteredPassages.find(p => p.tier === 'Casual') || filteredPassages[0];
  }, [filteredPassages]);

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
      <SpeedReadingStats />

      {lowEnergyMode && (
        <Card className="bg-amber-500/5 border-amber-500/20 border-dashed animate-in fade-in slide-in-from-top-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
              <Zap className="w-3 h-3 fill-current" /> Minimum Viable Day active
            </CardTitle>
            <CardDescription>Maintaining literacy momentum with low-complexity content.</CardDescription>
          </CardHeader>
          <CardContent>
            {mvdSuggestion && (
              <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-amber-500/10 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{mvdSuggestion.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{mvdSuggestion.wordCount} WORDS • {mvdSuggestion.tier}</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary" className="font-bold" onClick={() => setActiveDrill({ type: 'Pacer', passage: mvdSuggestion, isCustom: false })}>
                  Start Easy Pacer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
                    {filteredPassages.length === 0 ? (
                      <div className="py-10 text-center border-2 border-dashed rounded-xl opacity-30 italic text-xs">No passages match the current energy profile.</div>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-10">
        <WellnessActivityCalendar categoryFilter="Speed Reading" /> 
      </div>

      <div className="pt-6">
        <SpeedReadingAnalytics />
      </div>
    </div>
  )
}
