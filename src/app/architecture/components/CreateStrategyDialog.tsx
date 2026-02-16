
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, BookPlus } from "lucide-react"
import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { toast } from '@/hooks/use-toast';

export default function CreateStrategyDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { addCustomStrategy } = usePlaybookStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [useFor, setUseFor] = useState('');
  const [steps, setSteps] = useState<string[]>(['']);

  const handleAddStep = () => setSteps([...steps, '']);
  const handleRemoveStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));
  const handleStepChange = (index: number, val: string) => {
    const newSteps = [...steps];
    newSteps[index] = val;
    setSteps(newSteps);
  };

  const handleSave = () => {
    if (!name || !description) {
      toast({ title: "Error", description: "Name and description are required.", variant: "destructive" });
      return;
    }
    
    addCustomStrategy({
      name,
      description,
      useFor,
      steps: steps.filter(s => s.trim() !== '')
    });

    toast({ title: "Strategy Created!", description: "Your custom protocol is now in the library." });
    setOpen(false);
    reset();
  };

  const reset = () => {
    setName('');
    setDescription('');
    setUseFor('');
    setSteps(['']);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-primary" />
            New Custom Strategy
          </DialogTitle>
          <DialogDescription>
            Formalize your personal success protocols into re-usable frameworks.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto py-4 space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Strategy Name</Label>
            <Input 
              id="name" 
              placeholder="e.g. Deep Work Deep Dive" 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="desc">Quick Description</Label>
            <Textarea 
              id="desc" 
              placeholder="What is the high-level philosophy of this strategy?" 
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="useFor">Ideal Context</Label>
            <Input 
              id="useFor" 
              placeholder="e.g. For complex debugging or creative blocks" 
              value={useFor}
              onChange={e => setUseFor(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>The Protocol (Steps)</Label>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-[10px] font-bold shrink-0">
                    {i + 1}
                  </div>
                  <Input 
                    placeholder={`Step ${i + 1} instructions...`}
                    value={step}
                    onChange={e => handleStepChange(i, e.target.value)}
                  />
                  {steps.length > 1 && (
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={() => handleRemoveStep(i)}>
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full border-dashed border h-8 text-[10px] uppercase font-bold" onClick={handleAddStep}>
                <Plus className="w-3 h-3 mr-1" /> Add Step
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="shrink-0 pt-4 border-t">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Initialize Strategy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
