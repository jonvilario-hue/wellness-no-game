
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Target, Book, GanttChartSquare, Link2, Zap, Star, BrainCircuit, Lightbulb } from "lucide-react"

export default function ArchitectureHelp({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-2 text-2xl font-black uppercase tracking-tighter">
            <Info className="w-6 h-6 text-primary" />
            Architecture Guide
          </DialogTitle>
          <DialogDescription>
            Master the tools designed to turn vague ambitions into structural reality.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="blueprints" className="flex-grow flex flex-col overflow-hidden mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 shrink-0">
            <TabsTrigger value="blueprints">Lab & Blueprints</TabsTrigger>
            <TabsTrigger value="techniques">Vision Techniques</TabsTrigger>
          </TabsList>

          <div className="flex-grow overflow-y-auto mt-4 px-1">
            <TabsContent value="blueprints" className="space-y-6 mt-0 pb-6">
              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <Target className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Blueprint Lab</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Blueprints are active roadmaps. Each one is anchored to an <strong>Identity Statement</strong> (who you are becoming) and broken into sequential <strong>Milestones</strong>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 border rounded-xl space-y-2">
                  <h5 className="font-bold text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> Board & List Views
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Use the <strong>Board</strong> for high-level momentum and active blockers. Use the <strong>List</strong> to manage tasks, reflections, and dependencies within specific milestones.
                  </p>
                </div>
                <div className="p-4 border rounded-xl space-y-2">
                  <h5 className="font-bold text-sm flex items-center gap-2">
                    <GanttChartSquare className="w-4 h-4 text-primary" /> Gantt Timeline
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Visualizes your project schedule. The <strong>Critical Path</strong> highlights milestones that, if delayed, will delay your entire goal.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="techniques" className="space-y-6 mt-0 pb-6">
              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <Book className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Vision Library</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A repository of psychological frameworks. Don't just "plan"—use evidence-based protocols to structure your intent and handle resistance.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 border rounded-xl bg-card">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0 h-fit">
                    <Book className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-sm">Strategy Library</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Browse all available frameworks. Each guide provides a step-by-step <strong>Protocol</strong> and identifies the "Ideal Context" for that technique.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 border rounded-xl bg-card">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0 h-fit">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-sm">My Playbook</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your personal collection. Favorite a strategy to save it here. Track your <strong>Personal Notes</strong>, how many times you've used it, and its overall impact on your goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 border rounded-xl bg-card">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0 h-fit">
                    <BrainCircuit className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-sm">Architecture Advisor</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A logic engine that matches your progress with the right tools. It detects overdue milestones, high momentum, or specific tags to suggest the perfect strategy at the right time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-xl border border-dashed">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
                  <Lightbulb className="w-3 h-3 text-primary" /> Pro Tip
                </p>
                <p className="text-xs italic text-muted-foreground">
                  Use the <strong>Scenario Simulator</strong> if you have a vague goal but don't know which technique to start with. It will "stack" strategies based on your specific obstacles.
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
