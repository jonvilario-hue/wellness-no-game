
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BrainCircuit, MemoryStick, Shuffle, Lightbulb, Info, Zap } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const efficiencyData = {
  overallScore: 78,
  trend: 14,
  subMetrics: [
    { name: 'Problem-Solving Depth (Gf)', value: 85, icon: BrainCircuit, description: "Ability to resolve multi-step problems without hints." },
    { name: 'Working Memory Span (Gwm)', value: 72, icon: MemoryStick, description: "Dynamic memory span under distraction or dual-tasking." },
    { name: 'Cognitive Switching (EF)', value: 77, icon: Shuffle, description: "Speed and accuracy when switching between tasks." },
    { name: 'Processing Speed (Gs)', value: 88, icon: Zap, description: "How fast simple cognitive tasks can be done accurately." },
  ],
  insight: "Your gains were driven by better interference control during complex tasks."
};

export function CognitiveEfficiency() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <TrendingUp className="w-5 h-5 text-primary" />
          Cognitive Efficiency
        </CardTitle>
        <CardDescription>
          Your integrated performance in core cognitive areas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <p className="text-4xl font-bold text-primary">{efficiencyData.overallScore}</p>
              <p className="text-sm font-semibold text-green-500">
                +{efficiencyData.trend}% since last week
              </p>
            </div>
            
            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-center text-muted-foreground">Efficiency Factors</h4>
              {efficiencyData.subMetrics.map(metric => {
                const Icon = metric.icon;
                return (
                  <div key={metric.name}>
                    <div className="flex justify-between items-center mb-1">
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 cursor-help">
                            <Icon className="w-4 h-4" />
                            {metric.name}
                            <Info className="w-3 h-3 opacity-50" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{metric.description}</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className="text-sm font-bold">{metric.value}</span>
                    </div>
                    <Progress value={metric.value} aria-label={`${metric.name} score is ${metric.value}`} />
                  </div>
                );
              })}
            </div>
            
            <Separator />

            <div className="p-3 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-primary-foreground/80 flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 mt-0.5 text-primary shrink-0"/> 
                    <span><span className="font-bold text-primary-foreground">Weekly Insight:</span> {efficiencyData.insight}</span>
                </p>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
