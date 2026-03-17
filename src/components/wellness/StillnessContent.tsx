
"use client"

import { useMemo, useState } from "react"
import { mindfulnessPractices, type MindfulnessCategory, type Exercise } from "@/data/exercises"
import { stillnessCategoryDetails } from "@/data/wellness-categories"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import { Waves, Save, X, Plus } from "lucide-react"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { StillnessAnalytics } from "./StillnessAnalytics"
import { Badge } from "@/components/ui/badge"

const categories: MindfulnessCategory[] = ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion', 'Appreciation & Gratitude'];

export default function StillnessContent({ filterTags = [] }: { filterTags?: string[] }) {
    const { 
      lowEnergyMode, customPractices, 
      addCustomPractice, updateCustomPractice, deleteCustomPractice,
      collapsedCategories, toggleCategoryCollapse 
    } = useWellnessData();
    const { toast } = useToast();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPractice, setEditingPractice] = useState<Exercise | null>(null);
    const [title, setTitle] = useState("");
    const [intention, setIntention] = useState("");
    const [targetCategory, setTargetCategory] = useState<MindfulnessCategory>('Breathwork');
    const [steps, setSteps] = useState<string[]>(["", "", ""]);
    const [estTime, setEstTime] = useState("5");

    const allPractices = useMemo(() => [
      ...mindfulnessPractices,
      ...customPractices.filter(p => ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion', 'Appreciation & Gratitude'].includes(p.category))
    ], [customPractices]);

    const filteredPractices = useMemo(() => {
      let list = allPractices.filter(p => filterTags.length === 0 || filterTags.every(t => p.tags.includes(t)));
      if (lowEnergyMode) {
        list = list.filter(p => p.tags.includes('quick') || p.estimatedMinutes <= 2);
      }
      return list;
    }, [allPractices, filterTags, lowEnergyMode]);

    const resetForm = () => {
      setTitle("");
      setIntention("");
      setSteps(["", "", ""]);
      setEstTime("5");
      setEditingPractice(null);
    };

    const handleSaveCustom = () => {
      if (!title || !intention) return;
      
      const practiceData: Exercise = {
        id: editingPractice?.id || `custom-still-${Date.now()}`,
        name: title,
        description: intention,
        duration: parseInt(estTime) * 60,
        estimatedMinutes: parseInt(estTime),
        icon: Waves,
        category: targetCategory,
        tags: ["custom"],
        intention,
        setup: ["Find a quiet posture."],
        steps: steps.filter(s => s.trim() !== ""),
        modifications: ["Adjust depth as needed."],
        completionCue: "Technique recorded."
      };

      if (editingPractice) {
        updateCustomPractice(editingPractice.id, practiceData);
      } else {
        addCustomPractice(practiceData);
      }
      
      setIsFormOpen(false);
      resetForm();
      toast({ title: "Custom practice saved!" });
    };

    const handleEdit = (p: Exercise) => {
      setEditingPractice(p);
      setTitle(p.name);
      setIntention(p.intention);
      setTargetCategory(p.category as MindfulnessCategory);
      setSteps(p.steps);
      setEstTime(p.estimatedMinutes.toString());
      setIsFormOpen(true);
    };

    const openCategories = useMemo(() => {
      return categories.filter((cat, idx) => {
        const state = collapsedCategories[cat];
        if (state === undefined) return idx < 2;
        return !state;
      });
    }, [collapsedCategories]);

    return (
     <div className="space-y-8">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Stillness Library</h2>
        </div>

        <Accordion 
          type="multiple" 
          value={openCategories} 
          onValueChange={(newOpenVals) => {
            categories.forEach((cat) => {
              const isCurrentlyOpen = openCategories.includes(cat);
              const willBeOpen = newOpenVals.includes(cat);
              if (isCurrentlyOpen !== willBeOpen) {
                toggleCategoryCollapse(cat);
              }
            });
          }}
        >
          {categories.map(category => {
            const practices = filteredPractices.filter(p => p.category === category);
            const details = stillnessCategoryDetails[category];
            if (!details) return null;

            return (
              <AccordionItem 
                key={category} 
                value={category} 
                className={cn(
                  "border-b border-primary/5 transition-opacity",
                  practices.length === 0 && "opacity-40"
                )}
              >
                <AccordionTrigger className="hover:no-underline px-1 py-4 items-center">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <details.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold uppercase tracking-tight">
                          {category}
                        </h3>
                        <Badge variant="secondary" className="text-[10px] h-4 py-0">
                          {practices.length}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground italic mt-1">"{details.tagline}"</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0">
                  <div className="mb-8 p-4 bg-primary/[0.02] border-b border-primary/5 space-y-4 animate-in fade-in duration-500">
                    <p className="text-xs text-muted-foreground leading-relaxed">{details.purpose}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Use When:</p>
                        <ul className="list-disc list-inside text-[10px] text-muted-foreground space-y-0.5">
                          {details.useWhen.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Includes:</p>
                        <ul className="list-disc list-inside text-[10px] text-muted-foreground space-y-0.5">
                          {details.includes.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                    {practices.map((practice) => (
                      <div key={practice.id} id={`practice-${practice.id}`} className="scroll-mt-32">
                        <PracticeInstructionCard 
                          exercise={practice} 
                          onEdit={practice.id.startsWith('custom') ? () => handleEdit(practice) : undefined}
                          onDelete={practice.id.startsWith('custom') ? () => deleteCustomPractice(practice.id) : undefined}
                        />
                      </div>
                    ))}
                    {!lowEnergyMode && (
                      <Card 
                        className="border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors h-full min-h-[200px]"
                        onClick={() => { setTargetCategory(category); setIsFormOpen(true); }}
                      >
                        <Plus className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-bold">Add to {category}</p>
                      </Card>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <Dialog open={isFormOpen} onOpenChange={(o) => { setIsFormOpen(o); if(!o) resetForm(); }}>
          <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
            <DialogHeader className="p-6 bg-primary/5 border-b shrink-0">
              <DialogTitle className="text-xl font-black uppercase tracking-tight">
                {editingPractice ? "Edit Practice" : `Add Practice to ${targetCategory}`}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">Title</Label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Morning Reset" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">Intention</Label>
                  <Input value={intention} onChange={e => setIntention(e.target.value)} placeholder="What is the goal?" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">The Protocol (Steps)</Label>
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <Input value={step} onChange={e => {
                        const newSteps = [...steps];
                        newSteps[i] = e.target.value;
                        setSteps(newSteps);
                      }} />
                      {steps.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => setSteps(steps.filter((_, idx) => idx !== i))}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full border-dashed" onClick={() => setSteps([...steps, ""])}>
                    <Plus className="w-3 h-3 mr-2" /> Add Step
                  </Button>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">Estimated Time (Min)</Label>
                  <Input type="number" value={estTime} onChange={e => setEstTime(e.target.value)} />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="p-4 bg-muted/5 border-t">
              <Button variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveCustom} className="font-bold">
                <Save className="w-4 h-4 mr-2" /> Save Practice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <WellnessActivityCalendar categoryFilter="Stillness" />

        <div className="pt-6">
          <StillnessAnalytics />
        </div>
    </div>
)
}
