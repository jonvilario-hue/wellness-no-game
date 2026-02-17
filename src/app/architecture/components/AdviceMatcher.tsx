
'use client';

import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { goalStrategies } from '@/data/goal-strategies';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Lightbulb, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { toast } from '@/hooks/use-toast';
import { isBefore, startOfDay, subDays, parseISO } from 'date-fns';

export default function AdviceMatcher() {
  const { projects } = useBlueprintStore();
  const { linkToBlueprint, toggleFavorite } = usePlaybookStore();
  const activeProjects = projects.filter(p => p.status === 'Active' || p.status === 'active');

  const getAdvice = (project: any) => {
    const allTasks = project.milestones.flatMap((m: any) => m.tasks);
    const progress = allTasks.length > 0 ? (allTasks.filter((t: any) => t.completed).length / allTasks.length) * 100 : 0;
    const hasOverdue = project.milestones.some((m: any) => 
      m.dueDate && isBefore(new Date(m.dueDate), startOfDay(new Date())) && m.status !== 'Completed'
    );
    
    const lastActivity = project.streaks.lastActivityDate;
    const isStagnant = lastActivity && isBefore(parseISO(lastActivity), subDays(new Date(), 7));

    if (hasOverdue) return { sId: 'pre_mortem', reason: "Priority: Friction Detected. You have overdue milestones. Use a Pre-Mortem to identify and neutralize the blockers." };
    if (isStagnant) return { sId: 'woop', reason: "Momentum: Stagnation Alert. This blueprint hasn't moved in a week. Use WOOP to bridge the gap between your wish and action." };
    if (progress > 50) return { sId: 'review_loop', reason: "Growth: Velocity High. You're over halfway! The Review Loop will help you audit your path and finish strong." };
    if (project.tags.includes('CREATIVE')) return { sId: 'energy_mapping', reason: "Focus: Context Match. Creative output is energy-sensitive. Map your peak focus hours to protect this goal." };
    if (progress < 20) return { sId: 'smart', reason: "Foundations: Precision Needed. Early stages benefit from high clarity. Set SMART targets for your very next milestone." };
    
    return { sId: 'identity', reason: "Refinement: Core Anchor. Anchor this goal to your evolving self-image to make consistency feel effortless." };
  };

  const handleApply = (strategyId: string, strategyName: string, bId: string) => {
    // Ensure it's in the playbook first
    toggleFavorite(strategyId, strategyName);
    // Link it
    linkToBlueprint(strategyId, bId);
    toast({ title: "Applied!", description: "Strategy added to your Playbook and linked to this blueprint." });
  };

  if (activeProjects.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <AlertCircle className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
        <p className="text-lg font-bold text-muted-foreground">No active blueprints found.</p>
        <p className="text-sm text-muted-foreground mt-2">The Advisor needs an active project to analyze your progress.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2 mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <BrainCircuit className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Architecture Advisory</h2>
        <p className="text-muted-foreground max-w-lg">Real-time matching of your project state with evidence-based achievement protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeProjects.map(project => {
          const advice = getAdvice(project);
          const strategy = goalStrategies.find(s => s.id === advice.sId)!;
          
          return (
            <Card key={project.id} className="bg-primary/5 border-primary/10 hover:border-primary/20 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Insight for "{project.title}"
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-background rounded-lg border text-xs leading-relaxed font-medium">
                  {advice.reason}
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg group">
                  <div className="flex items-center gap-3">
                    <strategy.icon className="w-5 h-5 text-primary" />
                    <div>
                      <span className="font-bold text-sm block">{strategy.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-black">Suggested Framework</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 text-[10px] uppercase font-black hover:bg-primary hover:text-primary-foreground transition-all" 
                    onClick={() => handleApply(strategy.id, strategy.name, project.id)}
                  >
                    Apply Strategy <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
