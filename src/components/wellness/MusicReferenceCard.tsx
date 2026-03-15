
'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import type { MusicReferenceEntry } from "@/data/music-references";
import { MusicReferenceDialog } from "./MusicReferenceDialog";
import { useState } from "react";

export function MusicReferenceCard({ entry }: { entry: MusicReferenceEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = entry.icon;

  return (
    <>
      <Card 
        className="flex flex-col h-full border-2 border-primary/10 bg-background hover:bg-primary/[0.02] hover:border-primary/30 transition-all cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:text-primary transition-all">
              <Icon className="w-5 h-5" />
            </div>
            <BookOpen className="w-3.5 h-3.5 text-muted-foreground opacity-40" />
          </div>
          <CardTitle className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">
            {entry.title}
          </CardTitle>
          <CardDescription className="text-[10px] leading-relaxed line-clamp-2 mt-1">
            {entry.summary}
          </CardDescription>
        </CardHeader>
      </Card>

      <MusicReferenceDialog 
        entry={entry} 
        open={isOpen} 
        onOpenChange={setIsOpen} 
      />
    </>
  );
}
