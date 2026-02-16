
'use client';

import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calendar, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { differenceInDays, isBefore, startOfDay } from 'date-fns';

export default function BlueprintDashboard() {
  const { projects } = useBlueprintStore();
  const activeProjects = projects.filter(p => p.status === 'Active');
  
  const today = startOfDay(new Date());
  
  const stats = activeProjects.reduce((acc, p) => {
    const allTasks = p.milestones.flatMap(m => m.tasks);
    const overdueTasks = allTasks.filter(t => t.dueDate && isBefore(new Date(t.dueDate), today) && !t.completed).length;
    
    const upcomingMilestones = p.milestones
      .filter(m => m.dueDate && m.status !== 'Completed')
      .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
      
    const nextMilestone = upcomingMilestones[0];
    const daysLeft = nextMilestone ? differenceInDays(new Date(nextMilestone.dueDate!), today) : null;

    acc.overdue += overdueTasks;
    if (daysLeft !== null && daysLeft <= 3 && daysLeft >= 0) acc.nearDeadline++;
    
    return acc;
  }, { overdue: 0, nearDeadline: 0 });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-bold uppercase text-destructive flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Priority Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-black">{stats.overdue}</p>
            <p className="text-xs text-muted-foreground">Overdue tasks across all blueprints</p>
          </CardContent>
        </Card>
        
        <Card className="bg-warning/5 border-warning/20">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-bold uppercase text-warning flex items-center gap-2">
              <Clock className="w-4 h-4" /> Approaching Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-black">{stats.nearDeadline}</p>
            <p className="text-xs text-muted-foreground">Milestones due within 3 days</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Momentum
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-black">4</p>
            <p className="text-xs text-muted-foreground">Milestones completed this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Active Blueprints
          </h3>
          <div className="space-y-3">
            {activeProjects.map(project => {
              const allTasks = project.milestones.flatMap(m => m.tasks);
              const progress = allTasks.length > 0 ? (allTasks.filter(t => t.completed).length / allTasks.length) * 100 : 0;
              const nextM = project.milestones
                .filter(m => m.dueDate && m.status !== 'Completed')
                .sort((a,b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())[0];

              return (
                <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-sm">{project.title}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">
                        {project.tags[0]}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px] h-5">{Math.round(progress)}%</Badge>
                  </div>
                  <Progress value={progress} className="h-1 mb-4" />
                  {nextM ? (
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground italic truncate max-w-[60%]">Next: {nextM.title}</span>
                      <span className="font-bold flex items-center gap-1 text-primary">
                        <Calendar className="w-3 h-3" /> {new Date(nextM.dueDate!).toLocaleDateString()}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[10px] text-muted-foreground italic">No upcoming milestones</p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> This Week
          </h3>
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-muted-foreground opacity-20 mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">Focus on your next 3 major tasks to maintain velocity.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
