
"use client"

import { useMemo, useState } from "react"
import { communicationPractices, type CommunicationCategory } from "@/data/communication-practices"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import CategoryOverview from "./CategoryOverview"
import { communicationCategoryDetails } from "@/data/wellness-categories"
import { ChevronDown, MessageSquare, PlusCircle, Save, X, Plus, Zap } from "lucide-react"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select"
import type { Exercise } from "@/data/exercises"
import { CommunicationDashboard } from "./CommunicationDashboard"
import { CommunicationAnalytics } from "./CommunicationAnalytics"
import { cn } from "@/lib/utils"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"
import { JourneyPlansSection } from "./JourneyPlansSection"

const categories: CommunicationCategory[] = [
  'Vocal Mechanics', 
  'Active Listening', 
  'Nonverbal', 
  'Conversation Structure', 
  'Persuasion', 
  'clarity_language_craft', 
  'Storytelling', 
  'difficult_conversations', 
  'Public Speaking', 
  'professional_communication'
];

export default function CommunicationContent() {
    const { 
      lowEnergyMode, customPractices, addCustomPractice, updateCustomPractice, deleteCustomPractice,
      collapsedCategories, toggleCategoryCollapse 
    } = useWellnessData();
    const { toast } = useToast();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPractice, setEditingPractice] = useState<Exercise | null>(null);
    const [title, setTitle] = useState("");
    const [intention, setIntention] = useState("");
    const [targetCategory, setTargetCategory] = useState<CommunicationCategory>('Vocal Mechanics');
    const [steps, setSteps] = useState<string[]>(["", "", ""]);
    const [estTime, setEstTime] = useState("5");

    const allPractices = useMemo(() => [
      ...communicationPractices,
      ...customPractices.filter(p => !['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down', 'Mind-Body', 'Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'].includes(p.category))
    ], [customPractices]);

    const filteredPractices = useMemo(() => {
      let list = allPractices;
      if (lowEnergyMode) {
        list = list.filter(p => p.tags.includes('quick') || p.estimatedMinutes <= 2);
      }
      return list;
    }, [allPractices, lowEnergyMode]);

    const mvdSuggestion = useMemo(() => {
      return filteredPractices.find(p => p.id === 'listen_encouragers') || filteredPractices[0];
    }, [filteredPractices]);

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
        id: editingPractice?.id || `custom-comm-${Date.now()}`,
        name: title,
        description: intention,
        duration: parseInt(estTime) * 60,
        estimatedMinutes: parseInt(estTime),
        icon: MessageSquare,
        category: targetCategory,
        tags: ["custom"],
        intention,
        setup: ["Find a conversation context."],
        steps: steps.filter(s => s.trim() !== ""),
        modifications: ["Adapt to your audience."],
        completionCue: "Interaction logged."
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
      setTargetCategory(p.category as CommunicationCategory);
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
        <CommunicationDashboard />

        <JourneyPlansSection category="Communication" />

        {lowEnergyMode && (
          <Card className="bg-purple-500/5 border-purple-500/20 border-dashed animate-in fade-in slide-in-from-top-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-purple-600 flex items-center gap-2">
                <Zap className="w-3 h-3 fill-current" /> Minimum Viable Day active
              </CardTitle>
              <CardDescription>Small interpersonal check-ins to stay socially Sharp.</CardDescription>
            </CardHeader>
            <CardContent>
              {mvdSuggestion && (
                <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-purple-500/10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <mvdSuggestion.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{mvdSuggestion.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{mvdSuggestion.estimatedMinutes} MIN • {mvdSuggestion.category}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" className="font-bold" asChild>
                    <a href={`#practice-${mvdSuggestion.id}`}>Save Streak</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Communication Library</h2>
          <Button onClick={() => { setTargetCategory('Vocal Mechanics'); setIsFormOpen(true); }} className="font-bold gap-2">
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
            const practices = filteredPractices.filter(p => p.category === category);
            const details = communicationCategoryDetails[category];
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
                <AccordionTrigger className="hover:no-underline px-1">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <details.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-tight">
                        {details.title} ({practices.length})
                      </h3>
                      <p className="text-[10px] text-muted-foreground italic">"{details.tagline}"</p>
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
                  {practices.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed rounded-xl opacity-50">
                      <p className="text-xs font-bold uppercase text-muted-foreground">No quick practices in this category</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                          <p className="text-sm font-bold">Add to {details.title}</p>
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
                {editingPractice ? "Edit Practice" : `Add Practice to ${communicationCategoryDetails[targetCategory]?.title || targetCategory}`}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">Title</Label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Listening Drill" />
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

        <WellnessActivityCalendar categoryFilter="Communication" />

        <div className="pt-6">
          <CommunicationAnalytics />
        </div>
    </div>
  )
}
