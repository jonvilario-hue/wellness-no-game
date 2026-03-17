'use client';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, Info, ListChecks, 
  AlertTriangle, Clock, 
  Volume2, Eye, Link as LinkIcon,
  Zap, Target, SlidersHorizontal
} from "lucide-react";
import type { MusicReferenceEntry } from "@/types/music";
import { Badge } from "../ui/badge";

interface Props {
  entry: MusicReferenceEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MusicReferenceDialog({ entry, open, onOpenChange }: Props) {
  const { drill, theory, metadata } = entry;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden flex flex-col border-primary/10">
        <DialogHeader className="p-6 bg-primary/5 border-b shrink-0">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-70">
                <BookOpen className="w-3" />
                Instructional Reference
              </div>
              <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                {entry.title}
              </DialogTitle>
              <DialogDescription className="text-sm italic">
                {entry.summary}
              </DialogDescription>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="text-[9px] font-black uppercase bg-background border gap-1.5 h-6">
              <Clock className="w-3 h-3" /> {metadata.time}
            </Badge>
            <Badge variant="secondary" className="text-[9px] font-black uppercase bg-background border gap-1.5 h-6">
              <SlidersHorizontal className="w-3 h-3" /> {metadata.difficulty}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-8 space-y-10">
            {/* ACTIONABLE DRILL FIRST */}
            <section className="space-y-6">
              <div className="p-6 bg-primary/5 rounded-3xl border-2 border-primary/10 shadow-sm">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4" /> Try This Now
                </h4>
                <p className="text-lg font-bold leading-tight mb-6">
                  {drill.tryThisNow}
                </p>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <ListChecks className="w-3.5 h-3.5" /> Protocol Steps
                  </h5>
                  <ol className="space-y-3">
                    {drill.steps.map((step, i) => (
                      <li key={i} className="flex gap-4 items-start text-sm">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                        <p className="flex-1 pt-0.5 font-medium">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* CONTEXTUAL INFO SECOND */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-primary/5">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Info className="w-3.5 h-3.5" /> The Goal
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground italic">
                  {theory.what}
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> Blindspots
                </h4>
                <ul className="space-y-2">
                  {theory.mistakes.map((mistake, i) => (
                    <li key={i} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground">
                      <span className="shrink-0 w-1 h-1 rounded-full bg-destructive/40 mt-1.5" />
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* VISUAL/AUDIO AIDS */}
            {(entry.visualLabel || entry.audioLabel) && (
              <section className="pt-6 border-t border-primary/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {entry.visualLabel && (
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black uppercase tracking-widest opacity-40">Visual Reference</h4>
                    <div className="aspect-video bg-muted flex items-center justify-center rounded-xl border border-dashed">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{entry.visualLabel}</p>
                    </div>
                  </div>
                )}
                {entry.audioLabel && (
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black uppercase tracking-widest opacity-40">Audio Guide</h4>
                    <div className="p-3 bg-primary/5 rounded-xl border flex items-center justify-between">
                      <span className="text-[10px] font-bold">{entry.audioLabel}</span>
                      <Button size="sm" variant="secondary" className="h-7 w-7 rounded-full p-0">
                        <Volume2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* FOOTER METADATA */}
            <section className="pt-8 border-t border-primary/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Ideal Context</p>
                <p className="text-xs font-medium text-primary">{theory.when}</p>
              </div>
              {entry.relatedModule && (
                <div className="flex items-center gap-2 p-2 px-3 bg-muted/30 rounded-lg border">
                  <LinkIcon className="w-3 h-3 text-primary opacity-40" />
                  <p className="text-[10px] font-bold uppercase">
                    Linked Tool: <span className="text-primary">{entry.relatedModule.name}</span>
                  </p>
                </div>
              )}
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
