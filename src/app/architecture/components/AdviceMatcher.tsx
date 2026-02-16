
'use client';

import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { goalStrategies } from '@/data/goal-strategies';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { toast } from '@/hooks/use-toast';

export default function AdviceMatcher() {
  const { projects } = useBlueprintStore();
  const { linkToBlueprint } = usePlaybookStore();
  const activeProjects = projects.filter(p => p.status === 'Active');

  const getAdvice = (project: any) => {
    const allTasks = project.milestones.flatMap((m: any) => m.tasks);
    const progress = allTasks.length > 0 ? (allTasks.filter((t: any) => t.completed).length / allTasks.length) * 100 : 0;
    const hasOverdue = project.milestones.some((m: any) => 
      m.dueDate && new Date(m.dueDate) < new Date() && m.status !== 'Completed'
    );

    if (hasOverdue) return { sId: 'pre_mortem', reason: "You have overdue milestones. Use a Pre-Mortem to identify what's blocking you." };
    if (progress > 50) return { sId: 'review_loop', reason: "You're over halfway! The Review Loop will help you finish strong." };
    if (project.tags.includes('CREATIVE')) return { sId: 'energy_mapping', reason: "Creative output is energy-sensitive. Map your peak focus hours." };
    if (progress < 20) return { sId: 'smart', reason: "Early stages benefit from high precision. Set SMART targets for your next move." };
    
    return { sId: 'woop', reason: "Use WOOP to stay resilient against sudden obstacles." };
  };

  const handleApply = (strategyId: string, bId: string) => {
    linkToBlueprint(strategyId, bId);
    toast({ title: "Applied!", description: "Strategy linked to your blueprint." });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2 mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <BrainCircuit className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Architecture Advisory</h2>
        <p className="text-muted-foreground max-w-lg">Rule-based insights to match your goals with the right planning protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeProjects.map(project => {
          const advice = getAdvice(project);
          const strategy = goalStrategies.find(s => s.id === advice.sId)!;
          
          return (
            <Card key={project.id} className="bg-primary/5 border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Insight for "{project.title}"
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-background rounded-lg border text-xs">
                  {advice.reason}
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <strategy.icon className="w-5 h-5 text-primary" />
                    <span className="font-bold text-sm">{strategy.name}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 text-[10px] uppercase font-black" onClick={() => handleApply(strategy.id, project.id)}>
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
