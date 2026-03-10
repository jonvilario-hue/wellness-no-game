
"use client"

import { useState, useMemo } from "react"
import { movementExercises, type ExerciseCategory, type Exercise } from "@/data/exercises"
import { movementCategoryDetails } from "@/data/wellness-categories"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import { ChevronDown, HeartPulse, Zap, Play, PlusCircle, Save, X, Plus } from "lucide-react"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import CategoryOverview from "./CategoryOverview"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"
import { MovementAnalytics } from "./MovementAnalytics"

const categories: ExerciseCategory[] = ['Mind-Body', 'Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'];

export default function MovementContent({ filterTags = [] }: { filterTags?: string[] }) {
  const { 
    lowEnergyMode, addMovementLog, customPractices, 
    addCustomPractice, updateCustomPractice, deleteCustomPractice,
    collapsedCategories, toggleCategoryCollapse
  } = useWellnessData();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPractice, setEditingPractice] = useState<Exercise | null>(null);
  const [title, setTitle] = useState("");
  const [intention, setIntention] = useState("");
  const [targetCategory, setTargetCategory] = useState<ExerciseCategory>('Mind-Body');
  const [steps, setSteps] = useState<string[]>(["", "", ""]);
  const [estTime, setEstTime] = useState("5");

  const allPractices = useMemo(() => [
    ...movementExercises, 
    ...customPractices.filter(p => ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down', 'Mind-Body'].includes(p.category))
  ], [customPractices]);

  const filteredExercises = useMemo(() => {
    let list = allPractices.filter(e => filterTags.length === 0 || filterTags.every(t => e.tags.includes(t)));
    if (lowEnergyMode) {
      list = list.filter(e => e.tags.includes('low-energy') || e.tags.includes('quick'));
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
      id: editingPractice?.id || `custom-move-${Date.now()}`,
      name: title,
      description: intention,
      duration: parseInt(estTime) * 60,
      estimatedMinutes: parseInt(estTime),
      icon: HeartPulse,
      category: targetCategory,
      tags: ["custom"],
      intention,
      setup: ["Check your environment."],
      steps: steps.filter(s => s.trim() !== ""),
      modifications: ["Adjust as needed for comfort."],
      completionCue: "Movement recorded."
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
    setTargetCategory(p.category as ExerciseCategory);
    setSteps(p.steps);
    setEstTime(p.estimatedMinutes.toString());
    setIsFormOpen(true);
  };

  const openCategories = useMemo(() => {
    const list = [...categories];
    return list.filter((cat, idx) => {
      const isCollapsed = collapsedCategories[cat];
      if (isCollapsed === undefined) return idx < 2;
      return !isCollapsed;
    });
  }, [collapsedCategories]);

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Movement Library</h2>
          <Button onClick={() => { setTargetCategory('Mind-Body'); setIsFormOpen(true); }} className="font-bold gap-2">
            <PlusCircle className="w-4 h-4" /> Create Practice
          </Button>
        </div>

        <Accordion type="multiple" value={openCategories} onValueChange={(vals) => {
          categories.forEach(cat => {
            const isNowOpen = vals.includes(cat);
            const wasOpen = !collapsedCategories[cat];
            const effectivelyWasOpen = wasOpen || (collapsedCategories[cat] === undefined && categories.indexOf(cat) < 2);
            if (isNowOpen !== effectivelyWasOpen) toggleCategoryCollapse(cat);
          });
        }}>
          {categories.map(category => {
            const exercises = filteredExercises.filter(e => e.category === category);
            const details = movementCategoryDetails[category];
            if (!details) return null;

            return (
              <AccordionItem 
                key={category} 
                value={category} 
                className={cn(
                  "border-b border-primary/5 transition-opacity",
                  exercises.length === 0 && "opacity-40"
                )}
              >
                <AccordionTrigger className="hover:no-underline px-1">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <details.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-tight">
                        {category} ({exercises.length})
                      </h3>
                      <p className="text-[10px] text-muted-foreground italic">"{details.tagline}"</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="mb-6">
                    <CategoryOverview 
                      title={details.title}
                      icon={details.icon}
                      purpose={details.purpose}
                      useWhen={details.useWhen}
                      includes={details.includes}
                      tagline={details.tagline}
                    />
                  </div>
                  {exercises.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed rounded-xl opacity-50">
                      <p className="text-xs font-bold uppercase text-muted-foreground">No low-energy practices in this category</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {exercises.map(exercise => (
                        <div key={exercise.id} id={`practice-${exercise.id}`} className="scroll-mt-32">
                          <PracticeInstructionCard 
                            exercise={exercise} 
                            onEdit={exercise.id.startsWith('custom') ? () => handleEdit(exercise) : undefined}
                            onDelete={exercise.id.startsWith('custom') ? () => deleteCustomPractice(exercise.id) : undefined}
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
                  )}
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
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Desk Squats" />
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

        <WellnessActivityCalendar categoryFilter="Movement" />

        <div className="pt-6">
          <MovementAnalytics />
        </div>
    </div>
  )
}
