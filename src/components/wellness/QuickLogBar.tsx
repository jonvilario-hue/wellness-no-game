
'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle, HeartPulse, Waves, Clock } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { movementExercises, mindfulnessPractices } from "@/data/exercises";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function QuickLogBar() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'movement' | 'stillness' | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [duration, setDuration] = useState("5");
  const { addMovementLog, addStillnessLog } = useWellnessData();
  const { toast } = useToast();

  const handleOpen = (t: 'movement' | 'stillness') => {
    setType(t);
    setOpen(true);
  };

  const handleLog = () => {
    const list = type === 'movement' ? movementExercises : mindfulnessPractices;
    const item = list.find(i => i.id === selectedId);
    
    if (!item) return;

    if (type === 'movement') {
      addMovementLog({
        exerciseId: item.id,
        exerciseName: item.name,
        duration: parseInt(duration),
        timestamp: new Date().toISOString()
      });
    } else {
      addStillnessLog({
        techniqueId: item.id,
        techniqueName: item.name,
        duration: parseInt(duration),
        timestamp: new Date().toISOString()
      });
    }

    toast({ title: "✅ Practice Logged!", variant: 'success' });
    setOpen(false);
    setSelectedId("");
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-background/80 backdrop-blur-md border rounded-full shadow-2xl p-1 flex gap-1">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-primary" />
              Quick Log {type === 'movement' ? 'Movement' : 'Stillness'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Practice</Label>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose one..." />
                </SelectTrigger>
                <SelectContent>
                  {(type === 'movement' ? movementExercises : mindfulnessPractices).map(item => (
                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration (Minutes)</Label>
              <div className="grid grid-cols-4 gap-2">
                {['1', '5', '10', '15', '20', '30', '45', '60'].map(m => (
                  <Button 
                    key={m} 
                    variant={duration === m ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setDuration(m)}
                    className="h-8 text-xs"
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" disabled={!selectedId} onClick={handleLog}>
              Complete Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
