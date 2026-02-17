
'use client';

import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { goalStrategies } from '@/data/goal-strategies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Lightbulb, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { toast } from '@/hooks/use-toast';
import { isBefore, startOfDay, subDays, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export default function AdviceMatcher() {
  const { projects } = useBlueprintStore();
  const { linkToBlueprint, toggleFavorite, entries } = usePlaybookStore();
  const activeProjects = projects.filter(p => p.status === 'Active' || p.status === 'active');

  const getAdvice = (project: any) => {
    const allTasks = project.milestones.flatMap((m: any) => m.tasks);
    const progress = allTasks.length > 0 ? (allTasks.filter((t: any) => t.completed).length / allTasks.length) * 100 : 0;
    
    const hasOverdue = project.milestones.some((m: any) => 
      m.dueDate && isBefore(new Date(m.dueDate), startOfDay(new Date())) && m.status !== 'Completed'
    );
    
    const lastActivity = project.streaks.lastActivityDate;
    const isStagnant = lastActivity && isBefore(parseISO(lastActivity), subDays(new Date(), 7));

    // 1. Structural Integrity Check
    if (!project.identityGoal || project.identityGoal.length < 5) {
      return { sId: 'identity', reason: "Foundation: Your 'Becoming' statement is missing. Anchor this goal to your identity to increase sustainability by 65%." };
    }

    if (hasOverdue) {
      return { sId: 'pre_mortem', reason: "Friction: You have overdue milestones. Use a Pre-Mortem to anticipate why this is stalling and create a prevention plan." };
    }

    if (!project.implementationIntentions || project.implementationIntentions.length === 0) {
      return { sId: 'woop', reason: "Planning: You haven't set any 'If-Then' protocols. Create an implementation intention to handle common distractions." };
    }

    // 2. Momentum Check
    if (isStagnant) {
      return { sId: 'gamified', reason: "Momentum: This blueprint is stagnant. Use Dopamine micro-loops or streaks to rebuild your daily engagement." };
    }

    if (progress > 50) {
      return { sId: 'review_loop', reason: "Growth: You're in the 'Long Middle.' The Weekly Review Ritual will help you audit your path and finish strong." };
    }

    // 3. Contextual Check
    if (project.tags.includes('CREATIVE')) {
      return { sId: 'energy_mapping', reason: "Context: Creative work is energy-sensitive. Map your peak focus hours to protect your deepest work." };
    }

    return { sId: 'smart', reason: "Refinement: Your path is clear. Use SMART constraints for your very next milestone to maintain high precision." };
  };

  const handleApply = (strategyId: string, strategyName: string, bId: string) => {
    const isAlreadyFavorite = !!entries[strategyId];
    if (!isAlreadyFavorite) {
      toggleFavorite(strategyId, strategyName);
    }
    linkToBlueprint(strategyId, bId);
    toast({ title: "Strategy Applied", description: `"${strategyName}" is now in your Playbook and linked to this project.`, variant: "success" });
  };

  if (activeProjects.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20 animate-in fade-in">
        <AlertCircle className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
        <p className="text-lg font-bold text-muted-foreground">The Advisor is Idle</p>
        <p className="text-sm text-muted-foreground mt-2">Activate or create a blueprint to receive structural coaching.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="p-3 bg-primary/10 rounded-full">
          <BrainCircuit className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Architecture Advisory</h2>
        <p className="text-muted-foreground max-w-lg text-sm">Real-time matching of your project state with evidence-based achievement protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeProjects.map(project => {
          const advice = getAdvice(project);
          const strategy = goalStrategies.find(s => s.id === advice.sId);
          if (!strategy) return null;
          
          return (
            <Card key={project.id} className="bg-primary/5 border-primary/10 hover:border-primary/20 transition-all group overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Context: "{project.title}"
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-background rounded-xl border text-xs leading-relaxed font-medium italic">
                  "{advice.reason}"
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border border-primary/5">
                  <div className="flex items-center gap-3">
                    <strategy.icon className="w-5 h-5 text-primary" />
                    <div>
                      <span className="font-bold text-sm block">{strategy.name}</span>
                      <span className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter">Prescribed Framework</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 text-[10px] uppercase font-black hover:bg-primary hover:text-primary-foreground transition-all" 
                    onClick={() => handleApply(strategy.id, strategy.name, project.id)}
                  >
                    Apply <ArrowRight className="ml-1 w-3 h-3" />
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
