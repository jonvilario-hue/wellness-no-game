'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock, SlidersHorizontal } from "lucide-react";
import type { MusicReferenceEntry } from "@/types/music";
import { MusicReferenceDialog } from "./MusicReferenceDialog";
import { useState } from "react";
import { AssistantTooltip } from "../assistant-tooltip";
import { cn } from "@/lib/utils";

export function MusicReferenceCard({ entry }: { entry: MusicReferenceEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = entry.icon;

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AssistantTooltip text="A tactical guide focused on specific instrumental or vocal mechanics. Tapping reveals a step-by-step drill." display="block">
        <Card 
          className={cn(
            "flex flex-col h-full border-2 transition-all cursor-pointer group relative overflow-hidden",
            "border-primary/10 bg-primary/[0.01] hover:border-primary/30 hover:bg-primary/[0.03]"
          )}
          onClick={handleOpen}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start mb-3">
              <div className={cn(
                "p-2 rounded-lg transition-all",
                "bg-primary/10 text-primary group-hover:scale-110"
              )}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <CardTitle className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">
              {entry.title}
            </CardTitle>
            <CardDescription className="text-[10px] leading-relaxed line-clamp-2 mt-1">
              {entry.summary}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 mt-auto">
            <div className="flex flex-wrap gap-2 pt-3 border-t border-primary/5">
              <div className="flex items-center gap-1 text-[8px] font-black uppercase text-muted-foreground">
                <Clock className="w-2.5 h-2.5" /> {entry.metadata.time}
              </div>
              <div className="flex items-center gap-1 text-[8px] font-black uppercase text-muted-foreground">
                <SlidersHorizontal className="w-2.5 h-2.5" /> {entry.metadata.difficulty}
              </div>
            </div>
          </CardContent>
        </Card>
      </AssistantTooltip>

      <MusicReferenceDialog 
        entry={entry} 
        open={isOpen} 
        onOpenChange={setIsOpen} 
      />
    </>
  );
}
