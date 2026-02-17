
'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { movementExercises, mindfulnessPractices } from "@/data/exercises";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, SlidersHorizontal, Clock, Target, Utensils, Wallet } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface WellnessLogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialType?: 'movement' | 'stillness' | 'nutrition' | 'finance';
  initialDate?: Date;
}

export function WellnessLogDialog({ 
  isOpen, 
  onOpenChange, 
  initialType = 'movement', 
  initialDate 
}: WellnessLogDialogProps) {
  const [type, setType] = useState<'movement' | 'stillness' | 'nutrition' | 'finance'>(initialType);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [selectedId, setSelectedId] = useState("");
  const [duration, setDuration] = useState("10");
  const [difficulty, setDifficulty] = useState(3);
  const [preStress, setPreStress] = useState("5");
  const [postCalm, setPostCalm] = useState("7");
  
  // Finance fields
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [finCategory, setFinCategory] = useState("misc");

  // Nutrition fields
  const [mealType, setMealType] = useState("Breakfast");
  const [calories, setCalories] = useState("");

  const { addMovementLog, addStillnessLog, addMealLog, addTransaction } = useWellnessData();
  const { toast } = useToast();
  
  const lastOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !lastOpenRef.current) {
      setType(initialType);
      setDate(initialDate || new Date());
      setSelectedId("");
    }
    lastOpenRef.current = isOpen;
  }, [isOpen, initialType, initialDate]);

  const handleLog = () => {
    if (!date) return;

    const timestamp = date.toISOString();
    const dateStr = format(date, 'yyyy-MM-dd');

    if (type === 'movement') {
      const item = movementExercises.find(i => i.id === selectedId);
      if (!item) return;
      addMovementLog({
        exerciseId: item.id,
        exerciseName: item.name,
        duration: parseInt(duration),
        timestamp,
        difficulty
      });
    } else if (type === 'stillness') {
      const item = mindfulnessPractices.find(i => i.id === selectedId);
      if (!item) return;
      addStillnessLog({
        techniqueId: item.id,
        techniqueName: item.name,
        duration: parseInt(duration),
        timestamp,
        preStress: parseInt(preStress),
        postCalm: parseInt(postCalm)
      });
    } else if (type === 'nutrition') {
      addMealLog({
        date: dateStr,
        mealType: mealType as any,
        calories: parseInt(calories) || 0,
        protein: 0,
        carbs: 0,
        fat: 0
      });
    } else if (type === 'finance') {
      addTransaction({
        amount: parseFloat(amount) || 0,
        merchant: merchant || "Manual Entry",
        category: finCategory,
        date: dateStr,
        type: 'expense'
      });
    }

    toast({ 
      title: "Log Recorded!", 
      description: `Activity logged for ${format(date, 'MMM d')}.`,
      variant: 'success' 
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-background/10 backdrop-blur-md border-primary/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Universal Wellness Log
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Tabs value={type} onValueChange={(v: any) => setType(v)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/20">
              <TabsTrigger value="movement" className="text-[10px] uppercase">Move</TabsTrigger>
              <TabsTrigger value="stillness" className="text-[10px] uppercase">Still</TabsTrigger>
              <TabsTrigger value="nutrition" className="text-[10px] uppercase">Food</TabsTrigger>
              <TabsTrigger value="finance" className="text-[10px] uppercase">Cash</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Activity Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal border-primary/10 bg-background/5", !date && "text-muted-foreground")}
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

            {type === 'movement' && (
              <>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Practice</Label>
                  <Select value={selectedId} onValueChange={setSelectedId}>
                    <SelectTrigger className="border-primary/10 bg-background/5">
                      <SelectValue placeholder="Choose one..." />
                    </SelectTrigger>
                    <SelectContent>
                      {movementExercises.map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                    <span>Duration (Min)</span>
                    <span>{duration} min</span>
                  </Label>
                  <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="border-primary/10 bg-background/5" />
                </div>
              </>
            )}

            {type === 'stillness' && (
              <>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Technique</Label>
                  <Select value={selectedId} onValueChange={setSelectedId}>
                    <SelectTrigger className="border-primary/10 bg-background/5">
                      <SelectValue placeholder="Choose one..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mindfulnessPractices.map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration (Min)</Label>
                  <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="border-primary/10 bg-background/5" />
                </div>
              </>
            )}

            {type === 'nutrition' && (
              <>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Meal Type</Label>
                  <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger className="border-primary/10 bg-background/5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Calories</Label>
                  <Input type="number" value={calories} onChange={e => setCalories(e.target.value)} placeholder="e.g. 500" className="border-primary/10 bg-background/5" />
                </div>
              </>
            )}

            {type === 'finance' && (
              <>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Merchant / Item</Label>
                  <Input value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Grocery Store" className="border-primary/10 bg-background/5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Amount ($)</Label>
                  <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="border-primary/10 bg-background/5" />
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleLog} className="min-w-[120px] bg-primary text-primary-foreground font-bold">
            Select to Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
