"use client"

import { useState, useMemo, useEffect } from "react"
import { movementExercises, type ExerciseCategory, type Exercise } from "@/data/exercises"
import { movementCategoryDetails } from "@/data/wellness-categories"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import { ChevronDown, HeartPulse, Zap, Play, PlusCircle, LayoutGrid, X, Plus, Save, Lightbulb } from "lucide-react"
import { MovementDashboard } from "./MovementDashboard"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { kits } from "@/data/wellness-kits"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { wellnessPlans } from "@/data/wellness-plans"
import Link from 'next/link'
import { cn } from "@/lib/utils"
import CategoryOverview from "./CategoryOverview"

const categories: ExerciseCategory[] = ['Mind-Body', 'Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'];

const AVAILABLE_TAGS = [
  "desk", "neck", "hips", "low-back", "low-energy", "morning", "sleep", "quick", "anxiety",
  "yoga", "tai-chi", "flow", "mindful", "flexibility", "strength", "balance", "stability", "core"
];

export default function MovementContent({ filterTags = [] }: { filterTags?: string[] }) {
  const { 
    lowEnergyMode, addMovementLog, customPractices, 
    addCustomPractice, updateCustomPractice, deleteCustomPractice,
    collapsedCategories, toggleCategoryCollapse
  } = useWellnessData();
  const { toast } = useToast();

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPractice, setEditingPractice] = useState<Exercise | null>(null);
  const [title, setTitle] = useState("");
  const [intention, setIntention] = useState("");
  const [category, setCategory] = useState<ExerciseCategory>('Mind-Body');
  const [steps, setSteps] = useState<string[]>(["", "", ""]);
  const [modEasier, setModEasier] = useState("");
  const [modHarder, setModHarder] = useState("");
  const [estTime, setEstTime] = useState("5");
  const [formTags, setFormTags] = useState<string[]>(["custom", "user-created"]);

  const allPractices = useMemo(() => [
    ...movementExercises, 
    ...customPractices.filter(p => ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down', 'Mind-Body', 'Custom'].includes(p.category))
  ], [customPractices]);

  const filteredExercises = useMemo(() => 
    allPractices.filter(e => filterTags.length === 0 || filterTags.every(t => e.tags.includes(t))),
    [allPractices, filterTags]
  );

  const filteredKits = useMemo(() => 
    kits.filter(k => filterTags.length === 0 || filterTags.every(t => k.tags.includes(t))),
    [filterTags]
  );

  const handleMVDLog = () => {
    addMovementLog({
      exerciseId: 'mvd_movement',
      exerciseName: 'MVD Movement (Maintenance)',
      duration: 1,
      timestamp: new Date().toISOString(),
      difficulty: 1,
      energyLevel: 'Low'
    });
    toast({ title: "Movement Logged", description: "Streak preserved. Rest is progress.", variant: 'success' });
  };

  const resetForm = () => {
    setTitle("");
    setIntention("");
    setCategory('Mind-Body');
    setSteps(["", "", ""]);
    setModEasier("");
    setModHarder("");
    setEstTime("5");
    setFormTags(["custom", "user-created"]);
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
      category: category,
      tags: formTags,
      intention,
      setup: ["Find a clear space.", "Check your form."],
      steps: steps.filter(s => s.trim() !== ""),
      modifications: [
        `Easier: ${modEasier || "Reduce range of motion."}`,
        `Harder: ${modHarder || "Add intensity or hold longer."}`
      ],
      completionCue: "Movement session recorded."
    };

    if (editingPractice) {
      updateCustomPractice(editingPractice.id, practiceData);
    } else {
      addCustomPractice(practiceData);
    }
    
    setIsFormOpen(false);
    resetForm();
  };

  const handleEdit = (p: Exercise) => {
    setEditingPractice(p);
    setTitle(p.name);
    setIntention(p.intention);
    setCategory(p.category as ExerciseCategory);
    setSteps(p.steps);
    setModEasier(p.modifications[0]?.replace("Easier: ", "") || "");
    setModHarder(p.modifications[1]?.replace("Harder: ", "") || "");
    setEstTime(p.estimatedMinutes.toString());
    setFormTags(p.tags);
    setIsFormOpen(true);
  };

  const openCategories = useMemo(() => {
    const list = [...categories, 'Custom'];
    return list.filter((cat, idx) => {
      const isCollapsed = collapsedCategories[cat];
      if (isCollapsed === undefined) return idx < 2; // Default first 2 open
      return !isCollapsed;
    });
  }, [collapsedCategories]);

  if (lowEnergyMode) {
    return (
      <div className="max-w-md mx-auto space-y-6 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="text-center p-8 bg-amber-500/5 border-amber-500/20 shadow-lg">
          <CardHeader>
            <HeartPulse className="mx-auto h-12 w-12 text-amber-500 mb-2" />
            <CardTitle className="text-2xl font-black uppercase tracking-tight">MVD Movement</CardTitle>
            <CardDescription className="font-medium text-amber-700/70">Minimum Viable Day mode active.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-background/50 rounded-xl border border-dashed border-amber-500/30 text-sm">
              <p className="italic text-muted-foreground">"One minute of mindful movement is enough to keep the neural pathways active."</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quick Action</p>
              <Button 
                onClick={handleMVDLog}
                className="w-full h-16 text-lg font-bold gap-3 bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/20"
              >
                <Zap className="w-5 h-5 fill-current" />
                Log 1-Min Movement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <MovementDashboard />
        
        {/* FILTERED RESULTS */}
        {(filterTags.length > 0) && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Filtered Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredKits.map(kit => (
                <Card key={kit.id} className="border-primary/20 bg-primary/5 hover:border-primary/40 transition-all flex flex-col group relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground font-bold text-[8px] uppercase tracking-widest">Session</Badge>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{kit.emoji}</span>
                      <CardTitle className="text-base">{kit.title}</CardTitle>
                    </div>
                    <CardDescription className="text-xs line-clamp-2 mt-1">{kit.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2 mt-auto">
                    <Button className="w-full h-8 text-xs font-bold gap-2">
                      <Play className="w-3 h-3 fill-current" /> Start Session ({kit.estimatedMinutes}m)
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {filteredExercises.map(exercise => (
                <div key={exercise.id} id={`practice-${exercise.id}`} className="scroll-mt-20">
                  <PracticeInstructionCard 
                    exercise={exercise} 
                    onEdit={exercise.id.startsWith('custom') ? () => handleEdit(exercise) : undefined}
                    onDelete={exercise.id.startsWith('custom') ? () => deleteCustomPractice(exercise.id) : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {filterTags.length === 0 && (
          <div className="space-y-8 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 px-1">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Movement Library</h2>
                <p className="text-xs text-muted-foreground">Functional routines for a high-performance baseline.</p>
              </div>
              <Dialog open={isFormOpen} onOpenChange={(o) => { setIsFormOpen(o); if(!o) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="font-bold gap-2">
                    <PlusCircle className="w-4 h-4" /> Create Practice
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
                  <DialogHeader className="p-6 bg-primary/5 border-b shrink-0">
                    <DialogTitle className="text-xl font-black uppercase tracking-tight">
                      {editingPractice ? "Edit Practice" : "New Custom Movement"}
                    </DialogTitle>
                    <DialogDescription>Design your own functional routine.</DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="flex-1">
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Title</Label>
                          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Desk Squats" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Category</Label>
                          <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Intention</Label>
                        <Input value={intention} onChange={e => setIntention(e.target.value)} placeholder="What is the goal?" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">The Protocol</Label>
                        {steps.map((step, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{i + 1}</span>
                            <Input value={step} onChange={e => {
                              const newSteps = [...steps];
                              newSteps[i] = e.target.value;
                              setSteps(newSteps);
                            }} />
                            {steps.length > 3 && (
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
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase text-primary">Form Tip</p>
                          <p className="text-xs text-muted-foreground italic">"Focus on slow, controlled eccentric movements to maximize neural adaptation."</p>
                        </div>
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
            </div>

            <Accordion type="multiple" value={openCategories} onValueChange={(vals) => {
              const list = [...categories, 'Custom'];
              list.forEach(cat => {
                const isNowOpen = vals.includes(cat);
                const wasOpen = !collapsedCategories[cat];
                const effectivelyWasOpen = wasOpen || (collapsedCategories[cat] === undefined && list.indexOf(cat) < 2);
                if (isNowOpen !== effectivelyWasOpen) toggleCategoryCollapse(cat);
              });
            }}>
              {categories.map(category => {
                const exercises = allPractices.filter(e => e.category === category);
                const details = movementCategoryDetails[category];
                if (!details) return null;
                const Icon = details.icon;

                return (
                  <AccordionItem key={category} value={category} className="border-b border-primary/5">
                    <AccordionTrigger className="hover:no-underline px-1">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-tight">
                            {category} ({exercises.length})
                          </h3>
                          <p className="text-[10px] text-muted-foreground italic line-clamp-1">"{details.tagline}"</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="mb-6">
                        <CategoryOverview 
                          title={details.title}
                          purpose={details.purpose}
                          useWhen={details.useWhen}
                          includes={details.includes}
                          tagline={details.tagline}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {exercises.map(exercise => (
                          <div key={exercise.id} className="scroll-mt-20">
                            <PracticeInstructionCard 
                              exercise={exercise} 
                              onEdit={exercise.id.startsWith('custom') ? () => handleEdit(exercise) : undefined}
                              onDelete={exercise.id.startsWith('custom') ? () => deleteCustomPractice(exercise.id) : undefined}
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}
    </div>
  )
}