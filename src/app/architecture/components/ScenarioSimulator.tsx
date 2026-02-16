
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { goalStrategies } from '@/data/goal-strategies';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { cn } from '@/lib/utils'

export default function ScenarioSimulator() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [type, setType] = useState('Career');
  const { settings } = useDashboardSettings();
  
  const { addProject } = useBlueprintStore();

  const getRecommendations = () => {
    const text = (goal + ' ' + obstacle).toLowerCase();
    const stack = [];

    if (text.includes('procrastination') || text.includes('motivation')) {
      stack.push({ id: 'woop', reason: "Break the 'freeze' response with If-Then planning." });
      stack.push({ id: 'gamified', reason: "Use dopamine micro-loops to maintain engagement." });
    } else if (text.includes('overwhelmed') || text.includes('too big')) {
      stack.push({ id: 'milestone_mapping', reason: "Deconstruct the giant vision into chunks." });
      stack.push({ id: 'backcasting', reason: "Reverse-engineer from the end state to find the path." });
    } else if (text.includes('unclear') || text.includes('start')) {
      stack.push({ id: 'smart', reason: "Convert vague intent into precise constraints." });
      stack.push({ id: 'backcasting', reason: "Define the 'Day 1' requirements from future success." });
    } else {
      stack.push({ id: 'okrs', reason: "Set ambitious measurable outputs for this period." });
      stack.push({ id: 'energy_mapping', reason: "Protect your deep focus blocks for high effort." });
    }

    return stack.map(s => ({
      ...goalStrategies.find(gs => gs.id === s.id)!,
      whyFits: s.reason
    }));
  };

  const handleCreate = () => {
    const recs = getRecommendations();
    addProject({
      title: goal,
      description: `Obstacle: ${obstacle}\nFramework: ${recs.map(r => r.name).join(' + ')}`,
      tags: [type.toUpperCase(), 'SIMULATED'],
      identityGoal: "Someone who overcomes challenges with strategic architecture.",
    });
    setStep(1);
    setGoal('');
    setObstacle('');
  };

  return (
    <AssistantTooltip text="Describe a goal and obstacle, and the simulator will recommend a combination of strategies tailored to your situation." side="bottom">
      <Card className="border-primary/20 shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
            Scenario Simulator
          </CardTitle>
          <CardTitle className="sr-only">Scenario Simulator Card</CardTitle>
          <CardDescription>Simulate a goal and find the perfect strategy stack to conquer it.</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          {step === 1 ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-primary">The Vision</Label>
                <Input placeholder="What do you want to achieve?" value={goal} onChange={e => setGoal(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-primary">The Primary Friction</Label>
                <Input placeholder="What is the biggest obstacle?" value={obstacle} onChange={e => setObstacle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-primary">Goal Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Career', 'Creative', 'Health', 'Learning', 'Business', 'Personal'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full h-12 text-sm font-bold" onClick={() => setStep(2)} disabled={!goal}>
                Generate Strategy Stack <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary">Recommended Stack:</h4>
                {getRecommendations().map((rec, i) => (
                  <div key={rec.id} className="p-3 bg-muted/50 rounded-lg border border-primary/10 flex gap-3">
                    <div className="p-2 bg-primary/10 rounded-md h-fit"><rec.icon className="w-4 h-4 text-primary" /></div>
                    <div>
                      <p className="font-bold text-sm">{rec.name}</p>
                      <p className="text-[11px] text-muted-foreground italic">{rec.whyFits}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={handleCreate}>Build Blueprint <Rocket className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AssistantTooltip>
  );
}
