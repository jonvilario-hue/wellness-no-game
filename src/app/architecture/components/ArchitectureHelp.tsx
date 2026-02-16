
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Target, Book, GanttChartSquare, Link2, Zap } from "lucide-react"

export default function ArchitectureHelp({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-black uppercase tracking-tighter">
            <Info className="w-6 h-6 text-primary" />
            Architecture Guide
          </DialogTitle>
          <DialogDescription>
            Master the tools designed to turn vague ambitions into structural reality.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="blueprints" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="blueprints">Blueprints</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
            <TabsTrigger value="gantt">Gantt Logic</TabsTrigger>
          </TabsList>

          <div className="py-6 overflow-y-auto">
            <TabsContent value="blueprints" className="space-y-4 mt-0">
              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <Target className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Your Active Blueprints</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A Blueprint is a specific roadmap for a major goal. Each one is anchored to an <strong>Identity Goal</strong> (who you are becoming) and broken down into <strong>Milestones</strong>.
                  </p>
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-2 text-sm">
                <li className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                  <Zap className="w-4 h-4 text-primary" /> 
                  <span><strong>Board View:</strong> High-level dashboard for priority alerts and weekly deadlines.</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                  <Link2 className="w-4 h-4 text-primary" /> 
                  <span><strong>Dependencies:</strong> Link milestones so you know which "blockers" to clear first.</span>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="library" className="space-y-4 mt-0">
              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <Book className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">The Vision Library</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This is your repository of psychological frameworks. Don't just "plan"—use strategies like <strong>Backcasting</strong> or <strong>OKRs</strong> to structure your intent.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic px-2">
                <strong>Pro Tip:</strong> Use the "Advisor" tab to match your current progress with the best strategy for your situation.
              </p>
            </TabsContent>

            <TabsContent value="gantt" className="space-y-4 mt-0">
              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <GanttChartSquare className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Gantt Visualizer</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A Gantt chart maps your milestones over time. Horizontal bars show the <strong>Duration</strong> and <strong>Deadline</strong> of each phase.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="text-xs font-black text-primary uppercase mb-1">The Critical Path</p>
                  <p className="text-xs text-muted-foreground">The longest chain of dependent milestones. These are shown in bright teal/accent because delaying them delays your entire goal.</p>
                </div>
                <div className="p-3 border rounded-lg bg-muted/20">
                  <p className="text-xs font-black uppercase mb-1">Non-Critical Tasks</p>
                  <p className="text-xs text-muted-foreground">Muted bars represent tasks that have "float" time—they can move slightly without breaking your final deadline.</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
