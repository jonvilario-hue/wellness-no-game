
'use client';

import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Flame, 
  Zap, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  PlusCircle, 
  MessageSquare,
  Lock,
  ChevronRight
} from 'lucide-react';
import type { Blueprint, Milestone, Task } from '@/types/blueprint';
import { cn } from '@/lib/utils';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MomentumGauge = ({ score }: { score: number }) => {
  const colorClass = score > 60 ? 'text-green-500' : score > 30 ? 'text-yellow-500' : 'text-red-500';
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
        <circle 
          cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
          strokeDasharray="283" strokeDashoffset={283 - (283 * score) / 100}
          strokeLinecap="round" className={cn("transition-all duration-1000", colorClass)}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black">{score}</span>
        <span className="text-[8px] font-bold uppercase text-muted-foreground">Momentum</span>
      </div>
    </div>
  );
};

export default function BlueprintDashboard({ project }: { project: Blueprint }) {
  const { logMetric, toggleHabit, logBlocker, resolveBlocker, toggleTask, completeMilestone } = useBlueprintStore();
  const [metricModal, setMetricModal] = useState<{ open: boolean; metricId: string | null }>({ open: false, metricId: null });
  const [metricValue, setMetricValue] = useState("");

  const activeMilestones = project.milestones.filter(m => m.status !== 'Locked');
  const upcomingMilestone = project.milestones.find(m => m.status === 'Not Started' || m.status === 'In Progress');

  const handleMetricLog = () => {
    if (metricModal.metricId && metricValue) {
      logMetric(project.id, metricModal.metricId, parseFloat(metricValue));
      setMetricModal({ open: false, metricId: null });
      setMetricValue("");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Col: Core Stats */}
        <div className="w-full md:w-80 space-y-6">
          <Card className="bg-primary/5 border-primary/10 text-center p-6">
            <MomentumGauge score={project.momentumScore} />
            <div className="mt-4 flex items-center justify-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-xl font-black">{project.streaks.currentStreak} Day Streak</span>
            </div>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className={cn("w-2 h-2 rounded-full", i < project.streaks.thisWeekCount ? "bg-primary" : "bg-muted")} />
              ))}
            </div>
          </Card>

          {/* Metrics */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Live Metrics</h4>
            {Object.entries(project.metricValues).map(([id, val]) => (
              <Card key={id} className="p-4 border-primary/5 hover:border-primary/20 transition-all group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-muted-foreground">{id}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => setMetricModal({ open: true, metricId: id })}>
                    <PlusCircle className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black">{val}</span>
                  <span className="text-[10px] text-muted-foreground font-bold">Total</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Col: Timeline & Habits */}
        <div className="flex-1 space-y-6">
          <Card className="bg-muted/30 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Active Phase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMilestone ? (
                <div className="p-4 bg-background border rounded-xl shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold">{upcomingMilestone.title}</h3>
                      <p className="text-xs text-muted-foreground">{upcomingMilestone.description}</p>
                    </div>
                    <Badge variant="secondary" className="uppercase text-[9px]">{upcomingMilestone.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    {upcomingMilestone.tasks.map(t => (
                      <div key={t.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg group transition-all">
                        <Button 
                          variant="ghost" size="icon" className="h-5 w-5" 
                          onClick={() => toggleTask(project.id, upcomingMilestone.id, t.id)}
                        >
                          {t.completed ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-muted-foreground" />}
                        </Button>
                        <span className={cn("text-sm", t.completed && "line-through text-muted-foreground")}>{t.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 opacity-50 italic">No active milestones. Unlock one by completing dependencies.</div>
              )}
            </CardContent>
          </Card>

          {/* Blockers */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Friction & Blockers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.blockers.filter(b => b.status === 'active').map(b => (
                <Card key={b.id} className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{b.description}</p>
                      <Button variant="outline" size="sm" className="h-7 text-[10px]" onClick={() => resolveBlocker(project.id, b.id)}>Mark Resolved</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="h-full border-dashed text-muted-foreground hover:text-foreground py-8" onClick={() => logBlocker(project.id, "Stuck on research loop")}>
                <PlusCircle className="w-4 h-4 mr-2" /> Log a Blocker
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={metricModal.open} onOpenChange={(o) => setMetricModal({ ...metricModal, open: o })}>
        <DialogContent>
          <DialogHeader><DialogTitle>Update {metricModal.metricId}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Value</Label>
              <Input type="number" value={metricValue} onChange={e => setMetricValue(e.target.value)} autoFocus />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleMetricLog}>Save Progress</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Circle({ className }: { className?: string }) {
  return <div className={cn("w-4 h-4 rounded-full border-2", className)} />;
}
