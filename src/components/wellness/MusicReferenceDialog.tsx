
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
  AlertTriangle, Clock, Star, 
  Volume2, Eye, Link as LinkIcon
} from "lucide-react";
import type { MusicReferenceEntry } from "@/data/music-references";

interface Props {
  entry: MusicReferenceEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MusicReferenceDialog({ entry, open, onOpenChange }: Props) {
  const { body } = entry;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden flex flex-col border-primary/10">
        <DialogHeader className="p-6 bg-primary/5 border-b shrink-0">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-70">
                <BookOpen className="w-3 h-3" />
                Instructional Reference
              </div>
              <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                {entry.title}
              </DialogTitle>
              <DialogDescription className="text-sm italic">
                {entry.summary}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Star className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-8 space-y-10">
            {/* Section: What This Is */}
            <section className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <Info className="w-3.5 h-3.5" /> What This Is
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {body.what}
              </p>
            </section>

            {/* Section: How To Do It */}
            <section className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <ListChecks className="w-3.5 h-3.5" /> How To Do It
              </h4>
              <div className="bg-muted/30 p-6 rounded-2xl border border-primary/5">
                <p className="text-sm leading-relaxed font-medium">
                  {body.how}
                </p>
              </div>
            </section>

            {/* Optional: Visual Aids Placeholder */}
            {entry.visualLabel && (
              <section className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" /> Visual Aid
                </h4>
                <div className="aspect-video bg-muted flex items-center justify-center rounded-xl border border-dashed">
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{entry.visualLabel}</p>
                </div>
              </section>
            )}

            {/* Optional: Audio Examples Placeholder */}
            {entry.audioLabel && (
              <section className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5" /> Audio Example
                </h4>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
                  <span className="text-xs font-bold">{entry.audioLabel}</span>
                  <Button size="sm" variant="secondary" className="h-8 w-8 rounded-full p-0">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
              </section>
            )}

            {/* Section: Common Mistakes */}
            <section className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-destructive flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Common Mistakes
              </h4>
              <ul className="space-y-3">
                {body.mistakes.map((mistake, i) => (
                  <li key={i} className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-destructive/40 mt-1.5" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section: When To Use This */}
            <section className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> When To Use This
              </h4>
              <p className="text-sm italic text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4">
                {body.when}
              </p>
            </section>

            {/* Section: Related Module */}
            {entry.relatedModule && (
              <section className="pt-6 border-t border-primary/5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <LinkIcon className="w-3 h-3" />
                  Related: <span className="text-primary">{entry.relatedModule.name}</span> in {entry.relatedModule.hub} lets you test this skill.
                </p>
              </section>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
