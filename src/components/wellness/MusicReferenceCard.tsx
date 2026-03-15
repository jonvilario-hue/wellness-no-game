
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, SlidersHorizontal, Eye } from "lucide-react";
import type { MusicReferenceEntry } from "@/types/music";
import { MusicReferenceDialog } from "./MusicReferenceDialog";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { AssistantTooltip } from "../assistant-tooltip";

export function MusicReferenceCard({ entry }: { entry: MusicReferenceEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const Icon = entry.icon;

  const handleOpen = () => {
    setIsOpen(true);
    setIsViewed(true);
    // Lightweight local state for the session
    const viewed = JSON.parse(sessionStorage.getItem('music-refs-viewed') || '[]');
    if (!viewed.includes(entry.id)) {
      sessionStorage.setItem('music-refs-viewed', JSON.stringify([...viewed, entry.id]));
    }
  };

  useEffect(() => {
    const viewed = JSON.parse(sessionStorage.getItem('music-refs-viewed') || '[]');
    if (viewed.includes(entry.id)) setIsViewed(true);
  }, [entry.id]);

  return (
    <>
      <AssistantTooltip text="A tactical guide focused on specific instrumental or vocal mechanics. Tapping reveals a step-by-step drill." display="block">
        <Card 
          className={cn(
            "flex flex-col h-full border-2 transition-all cursor-pointer group relative overflow-hidden",
            isViewed ? "border-primary/5 bg-background opacity-80" : "border-primary/10 bg-primary/[0.01] hover:border-primary/30 hover:bg-primary/[0.03]"
          )}
          onClick={handleOpen}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start mb-3">
              <div className={cn(
                "p-2 rounded-lg transition-all",
                isViewed ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary group-hover:scale-110"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              {isViewed && (
                <Badge variant="outline" className="text-[8px] font-black uppercase h-4 px-1.5 opacity-40">Viewed</Badge>
              )}
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
