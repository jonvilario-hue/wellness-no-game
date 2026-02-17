'use client';

import { useState, useMemo } from "react";
import { communicationPractices, type CommunicationCategory } from "@/data/communication-practices";
import { communicationCategoryDetails } from "@/data/wellness-categories";
import { communicationKits } from "@/data/communication-kits";
import { communicationPlans } from "@/data/communication-plans";
import { PracticeInstructionCard } from "./PracticeInstructionCard";
import CategoryOverview from "./CategoryOverview";
import { ChevronDown, MessageSquare, Zap, Play, ArrowRight } from "lucide-react";
import { useWellnessData, calculateStreak } from "@/hooks/use-wellness-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { cn } from "@/lib/utils";

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

export default function CommunicationContent() {
  const { lowEnergyMode, planProgress } = useWellnessData();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPractices = useMemo(() => {
    return communicationPractices.filter(p => 
      selectedTags.length === 0 || selectedTags.some(t => p.tags.includes(t))
    );
  }, [selectedTags]);

  const filteredKits = useMemo(() => {
    return communicationKits.filter(k => 
      selectedTags.length === 0 || selectedTags.some(t => k.tags.includes(t))
    );
  }, [selectedTags]);

  const activePlan = useMemo(() => {
    return communicationPlans.find(plan => {
      const progress = planProgress[plan.id];
      if (!progress) return false;
      const completedCount = Object.values(progress).filter(Boolean).length;
      return completedCount > 0 && completedCount < plan.steps.length;
    });
  }, [planProgress]);

  const toggleTag = (tags: string[]) => {
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
                onClick={() => toggleTag(pick.tags)}
              >
                {pick.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* FILTERED VIEW (KITS + CARDS) */}
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
              <PracticeInstructionCard key={practice.id} exercise={practice} />
            ))}
          </div>
        </div>
      )}

      {/* LAYER 2: STACKS (Only if no tags selected) */}
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

      {/* LAYER 3: FULL LIBRARY (Only if no tags selected) */}
      {selectedTags.length === 0 && (
        <div className="space-y-12 pt-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Communication Library</h2>
            <p className="text-sm text-muted-foreground">The complete taxonomy of evidence-based dialogue techniques.</p>
          </div>
          
          <div className="space-y-16">
            {categories.map(category => {
              const practices = communicationPractices.filter(p => p.category === category);
              const details = communicationCategoryDetails[category];
              if (!details) return null;
              const Icon = details.icon;

              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-4 border-b pb-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">{category}</h3>
                      <p className="text-sm text-muted-foreground italic">"{details.tagline}"</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {practices.map(p => (
                      <PracticeInstructionCard key={p.id} exercise={p} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
