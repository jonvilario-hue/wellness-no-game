'use client';

import { useState, useMemo, useEffect } from "react";
import { communicationPractices, type CommunicationCategory } from "@/data/communication-practices";
import { communicationCategoryDetails } from "@/data/wellness-categories";
import { communicationKits } from "@/data/communication-kits";
import { communicationPlans } from "@/data/communication-plans";
import { PracticeInstructionCard } from "./PracticeInstructionCard";
import { 
  ChevronDown, MessageSquare, Zap, Play, PlusCircle, 
  Trash2, Edit, Lightbulb, Save, X, Plus, LayoutGrid, BookOpen 
} from "lucide-react";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import type { Exercise } from "@/data/exercises";

const QUICK_PICKS = [
  { label: "Big Presentation", tags: ["public-speaking", "vocal", "confidence"] },
  { label: "Tough Conversation", tags: ["conflict", "de-escalation", "emotional-intelligence"] },
  { label: "Job Interview", tags: ["persuasion", "clarity", "vocal", "professional"] },
  { label: "Team Meeting", tags: ["listening", "professional", "clarity"] },
  { label: "Networking Event", tags: ["small-talk", "storytelling", "nonverbal"] },
  { label: "First Date", tags: ["listening", "storytelling", "nonverbal", "small-talk"] },
  { label: "Apology", tags: ["conflict", "emotional-intelligence", "vulnerability"] },
  { label: "Under 3 Min", tags: ["quick"] },
];

const categories: CommunicationCategory[] = [
  'Vocal Mechanics', 'Active Listening', 'Nonverbal', 'Conversation Structure', 
  'Persuasion', 'Clarity', 'Emotional Intelligence', 'Conflict Resolution', 
  'Storytelling', 'Public Speaking', 'Professional', 'Digital'
];

const AVAILABLE_TAGS = [
  "desk", "neck", "hips", "low-back", "low-energy", "morning", "sleep", "quick", "anxiety",
  "public-speaking", "vocal", "confidence", "conflict", "de-escalation", "emotional-intelligence",
  "persuasion", "professional", "listening", "small-talk", "storytelling", "vulnerability",
  "custom", "user-created"
];

export default function CommunicationContent() {
  const { 
    lowEnergyMode, customPractices, addCustomPractice, 
    updateCustomPractice, deleteCustomPractice, collapsedCategories, toggleCategoryCollapse 
  } = useWellnessData();
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPractice, setEditingPractice] = useState<Exercise | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [intention, setIntention] = useState("");
  const [steps, setSteps] = useState<string[]>(["", "", ""]);
  const [modEasier, setModEasier] = useState("");
  const [modHarder, setModHarder] = useState("");
  const [estTime, setEstTime] = useState("5");
  const [formTags, setFormTags] = useState<string[]>(["custom", "user-created"]);

  const allPractices = useMemo(() => [...communicationPractices, ...customPractices], [customPractices]);

  const filteredPractices = useMemo(() => {
    return allPractices.filter(p => 
      selectedTags.length === 0 || selectedTags.some(t => p.tags.includes(t))
    );
  }, [allPractices, selectedTags]);

  const filteredKits = useMemo(() => {
    return communicationKits.filter(k => 
      selectedTags.length === 0 || selectedTags.some(t => k.tags.includes(t))
    );
  }, [selectedTags]);

  const handleToggleTag = (tags: string[]) => {
    setSelectedTags(prev => {
      const allTags = new Set(prev);
      const isPresent = tags.every(t => allTags.has(t));
      if (isPresent) {
        tags.forEach(t => allTags.delete(t));
      } else {
        tags.forEach(t => allTags.add(t));
      }
      return Array.from(allTags);
    });
  };

  const resetForm = () => {
    setTitle("");
    setIntention("");
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
      id: editingPractice?.id || `custom-${Date.now()}`,
      name: title,
      description: intention,
      duration: parseInt(estTime) * 60,
      estimatedMinutes: parseInt(estTime),
      icon: MessageSquare,
      category: 'Custom',
      tags: formTags,
      intention,
      setup: ["Find a quiet space.", "Prepare your mindset."],
      steps: steps.filter(s => s.trim() !== ""),
      modifications: [
        `Easier: ${modEasier || "Reduce intensity or duration."}`,
        `Harder: ${modHarder || "Practice in a high-stakes setting."}`
      ],
      completionCue: "Reflection complete."
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
    setSteps(p.steps);
    setModEasier(p.modifications[0]?.replace("Easier: ", "") || "");
    setModHarder(p.modifications[1]?.replace("Harder: ", "") || "");
    setEstTime(p.estimatedMinutes.toString());
    setFormTags(p.tags);
    setIsFormOpen(true);
  };

  // Derive expanded accordion items from collapsedCategories
  // First 3 categories expanded by default
  const openCategories = useMemo(() => {
    const list = [...categories, 'Custom'];
    return list.filter((cat, idx) => {
      const isCollapsed = collapsedCategories[cat];
      if (isCollapsed === undefined) return idx < 3; // Default first 3 to open
      return !isCollapsed;
    });
  }, [collapsedCategories]);

  return (
    <div className="space-y-10">
      {/* LAYER 1: PLANS */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Journey Plans</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {communicationPlans.map((plan) => (
            <Link key={plan.id} href={`/exercises/plans/${plan.id}`} className="min-w-[280px]">
              <Card className="hover:border-primary/50 transition-all h-full group bg-primary/5 border-primary/10">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{plan.title}</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-black">{plan.steps.length} DAYS</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground line-clamp-2">{plan.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* QUICK PICKS FILTER */}
      <div className="w-full overflow-x-auto no-scrollbar py-2">
        <div className="flex gap-2 w-max">
          {QUICK_PICKS.map((pick) => {
            const isActive = pick.tags.every(t => selectedTags.includes(t));
            return (
              <Button
                key={pick.label}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={cn("rounded-full font-bold transition-all", isActive && "shadow-md")}
                onClick={() => handleToggleTag(pick.tags)}
              >
                {pick.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* FILTERED VIEW */}
      {(selectedTags.length > 0) && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Filtered Results</h3>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold" onClick={() => setSelectedTags([])}>CLEAR ALL</Button>
          </div>
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
            {filteredPractices.map(practice => (
              <PracticeInstructionCard 
                key={practice.id} 
                exercise={practice} 
                onEdit={practice.category === 'Custom' ? () => handleEdit(practice) : undefined}
                onDelete={practice.category === 'Custom' ? () => deleteCustomPractice(practice.id) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* LAYER 2: STACKS */}
      {selectedTags.length === 0 && (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Situational Stacks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {communicationKits.map(kit => (
              <Card key={kit.id} className="border-primary/5 bg-card hover:bg-muted/30 transition-all cursor-pointer">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{kit.emoji}</span>
                    <CardTitle className="text-sm font-bold">{kit.title}</CardTitle>
                  </div>
                  <CardDescription className="text-xs">{kit.description}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <span className="text-[10px] font-bold text-primary uppercase">{kit.estimatedMinutes} MIN FLOW</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* LAYER 3: FULL LIBRARY */}
      {selectedTags.length === 0 && (
        <div className="space-y-8 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 px-1">
            <div className="space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Communication Library</h2>
              <p className="text-xs text-muted-foreground">Master the soft skills of high-performance cognition.</p>
            </div>
            
            <Dialog open={isFormOpen} onOpenChange={(o) => { setIsFormOpen(o); if(!o) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="font-bold gap-2">
                  <PlusCircle className="w-4 h-4" /> Create Your Own
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
                <DialogHeader className="p-6 bg-primary/5 border-b shrink-0">
                  <DialogTitle className="text-xl font-black uppercase tracking-tight">
                    {editingPractice ? "Edit Practice" : "New Custom Practice"}
                  </DialogTitle>
                  <DialogDescription>Define your behavioral protocol for communication mastery.</DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Practice Title</Label>
                        <Input placeholder="e.g. 3-Second Wait" value={title} onChange={e => setTitle(e.target.value)} className="font-bold" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Intention / Goal</Label>
                        <Input placeholder="What skill are you building?" value={intention} onChange={e => setIntention(e.target.value)} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground">The Protocol (3-8 Steps)</Label>
                      {steps.map((step, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{i + 1}</span>
                          <Input 
                            placeholder={`Step ${i + 1}...`} 
                            value={step} 
                            onChange={e => {
                              const newSteps = [...steps];
                              newSteps[i] = e.target.value;
                              setSteps(newSteps);
                            }}
                          />
                          {steps.length > 3 && (
                            <Button variant="ghost" size="icon" onClick={() => setSteps(steps.filter((_, idx) => idx !== i))}>
                              <X className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          )}
                        </div>
                      ))}
                      {steps.length < 8 && (
                        <Button variant="outline" size="sm" className="w-full border-dashed" onClick={() => setSteps([...steps, ""])}>
                          <Plus className="w-3 h-3 mr-2" /> Add Step
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Make it Easier</Label>
                        <Input placeholder="Low stakes version..." value={modEasier} onChange={e => setModEasier(e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Make it Harder</Label>
                        <Input placeholder="Challenge version..." value={modHarder} onChange={e => setModHarder(e.target.value)} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Estimated Time (Min)</Label>
                        <Input type="number" value={estTime} onChange={e => setEstTime(e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Tags</Label>
                        <div className="flex flex-wrap gap-1">
                          {AVAILABLE_TAGS.slice(0, 8).map(tag => (
                            <Badge 
                              key={tag} 
                              variant={formTags.includes(tag) ? 'default' : 'outline'}
                              className="text-[8px] cursor-pointer"
                              onClick={() => setFormTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
                      <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase text-primary">Pro Tip</p>
                        <p className="text-xs leading-relaxed text-muted-foreground italic">
                          "Keep steps observable and behavioral. Instead of 'be more confident,' try 'lower voice pitch by one note' or 'maintain eye contact for 3 seconds.'"
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter className="p-4 bg-muted/5 border-t">
                  <Button variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveCustom} className="font-bold">
                    <Save className="w-4 h-4 mr-2" /> Save Protocol
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
              // Default logic for missing states (first 3 open)
              const effectivelyWasOpen = wasOpen || (collapsedCategories[cat] === undefined && list.indexOf(cat) < 3);
              
              if (isNowOpen !== effectivelyWasOpen) {
                toggleCategoryCollapse(cat);
              }
            });
          }}>
            {/* Custom Category */}
            {customPractices.length > 0 && (
              <AccordionItem value="Custom" className="border-b border-primary/10">
                <AccordionTrigger className="hover:no-underline px-1">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <LayoutGrid className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-tight">Custom Protocols ({customPractices.length})</h3>
                      <p className="text-[10px] text-muted-foreground italic">Your specialized routines.</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {customPractices.map(p => (
                      <PracticeInstructionCard 
                        key={p.id} 
                        exercise={p} 
                        onEdit={() => handleEdit(p)}
                        onDelete={() => deleteCustomPractice(p.id)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {categories.map((category) => {
              const practices = communicationPractices.filter(p => p.category === category);
              const details = communicationCategoryDetails[category];
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
                          {category} ({practices.length})
                        </h3>
                        <p className="text-[10px] text-muted-foreground italic line-clamp-1">"{details.tagline}"</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {practices.map(p => (
                        <PracticeInstructionCard key={p.id} exercise={p} />
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
  );
}
