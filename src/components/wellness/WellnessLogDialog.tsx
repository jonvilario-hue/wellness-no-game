'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { movementExercises, mindfulnessPractices } from "@/data/exercises";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, SlidersHorizontal, Clock, Target } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface WellnessLogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialType?: 'movement' | 'stillness';
  initialDate?: Date;
}

export function WellnessLogDialog({ 
  isOpen, 
  onOpenChange, 
  initialType = 'movement', 
  initialDate 
}: WellnessLogDialogProps) {
  const [type, setType] = useState<'movement' | 'stillness'>(initialType);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [selectedId, setSelectedId] = useState("");
  const [duration, setDuration] = useState("10");
  const [difficulty, setDifficulty] = useState(3);
  const [preStress, setPreStress] = useState("5");
  const [postCalm, setPostCalm] = useState("7");
  
  const { addMovementLog, addStillnessLog } = useWellnessData();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setDate(initialDate || new Date());
      setSelectedId("");
    }
  }, [isOpen, initialType, initialDate]);

  const handleLog = () => {
    if (!selectedId || !date) return;

    const list = type === 'movement' ? movementExercises : mindfulnessPractices;
    const item = list.find(i => i.id === selectedId);
    if (!item) return;

    const timestamp = date.toISOString();

    if (type === 'movement') {
      addMovementLog({
        exerciseId: item.id,
        exerciseName: item.name,
        duration: parseInt(duration),
        timestamp,
        difficulty
      });
    } else {
      addStillnessLog({
        techniqueId: item.id,
        techniqueName: item.name,
        duration: parseInt(duration),
        timestamp,
        preStress: parseInt(preStress),
        postCalm: parseInt(postCalm)
      });
    }

    toast({ 
      title: "Log Recorded!", 
      description: `${item.name} logged for ${format(date, 'MMM d')}.`,
      variant: 'success' 
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Log Wellness Activity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Tabs value={type} onValueChange={(v: any) => setType(v)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="movement">Movement</TabsTrigger>
              <TabsTrigger value="stillness">Stillness</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Activity Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

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
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                <span>Duration</span>
                <span>{duration} min</span>
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {['5', '10', '15', '20', '30', '45', '60'].map(m => (
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

            <div className="p-4 bg-muted/30 rounded-xl space-y-4">
              <h4 className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
                <SlidersHorizontal className="w-3 h-3" /> Post-Session Metrics
              </h4>
              {type === 'movement' ? (
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase">Difficulty (1-5)</Label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n => (
                      <Button key={n} variant={difficulty === n ? 'default' : 'outline'} size="sm" className="h-8 w-8 p-0" onClick={() => setDifficulty(n)}>
                        {n}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Pre-Stress (1-10)</Label>
                    <Input type="number" value={preStress} onChange={e => setPreStress(e.target.value)} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Post-Calm (1-10)</Label>
                    <Input type="number" value={postCalm} onChange={e => setPostCalm(e.target.value)} className="h-8" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!selectedId || !date} onClick={handleLog} className="min-w-[120px]">
            Save Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
