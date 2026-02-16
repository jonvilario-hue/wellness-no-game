
'use client';

import { Button } from "@/components/ui/button";
import { HeartPulse, Waves } from "lucide-react";
import { useState } from "react";
import { WellnessLogDialog } from "./WellnessLogDialog";

export function QuickLogBar() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'movement' | 'stillness'>('movement');

  const handleOpen = (t: 'movement' | 'stillness') => {
    setType(t);
    setOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-background/80 backdrop-blur-md border rounded-full shadow-2xl p-1 flex gap-1 animate-in slide-in-from-bottom-10 duration-500">
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full gap-2 px-4 hover:bg-primary/10"
          onClick={() => handleOpen('movement')}
        >
          <HeartPulse className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold">Log Movement</span>
        </Button>
        <div className="w-[1px] bg-border my-1" />
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full gap-2 px-4 hover:bg-primary/10"
          onClick={() => handleOpen('stillness')}
        >
          <Waves className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold">Log Stillness</span>
        </Button>
      </div>

      <WellnessLogDialog 
        isOpen={open} 
        onOpenChange={setOpen} 
        initialType={type} 
      />
    </>
  );
}
