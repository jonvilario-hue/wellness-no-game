
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BrainCircuit, MemoryStick, Shuffle, Lightbulb, Info, Zap, Archive } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const efficiencyData = {
  weekly: {
    overallScore: 78,
    trend: 14,
    subMetrics: [
      { name: 'Problem-Solving Depth (Gf)', value: 85, icon: BrainCircuit, description: "Ability to resolve multi-step problems without hints." },
      { name: 'Working Memory Span (Gwm)', value: 72, icon: MemoryStick, description: "Dynamic memory span under distraction or dual-tasking." },
      { name: 'Cognitive Switching (EF)', value: 77, icon: Shuffle, description: "Speed and accuracy when switching between tasks." },
      { name: 'Processing Speed (Gs)', value: 88, icon: Zap, description: "How fast simple cognitive tasks can be done accurately." },
      { name: 'Long-Term Retrieval (Glr)', value: 68, icon: Archive, description: "Efficient access to stored knowledge and patterns." },
    ],
    insight: "Your gains this week were driven by better interference control during complex tasks."
  },
  monthly: {
    overallScore: 72,
    trend: 8,
    subMetrics: [
      { name: 'Problem-Solving Depth (Gf)', value: 80, icon: BrainCircuit, description: "Ability to resolve multi-step problems without hints." },
      { name: 'Working Memory Span (Gwm)', value: 68, icon: MemoryStick, description: "Dynamic memory span under distraction or dual-tasking." },
      { name: 'Cognitive Switching (EF)', value: 71, icon: Shuffle, description: "Speed and accuracy when switching between tasks." },
      { name: 'Processing Speed (Gs)', value: 82, icon: Zap, description: "How fast simple cognitive tasks can be done accurately." },
      { name: 'Long-Term Retrieval (Glr)', value: 65, icon: Archive, description: "Efficient access to stored knowledge and patterns." },
    ],
    insight: "Your monthly trend shows strong, steady growth in processing speed."
  },
  overall: {
    overallScore: 65,
    trend: 65, // Or could be compared to a starting baseline
    subMetrics: [
      { name: 'Problem-Solving Depth (Gf)', value: 75, icon: BrainCircuit, description: "Ability to resolve multi-step problems without hints." },
      { name: 'Working Memory Span (Gwm)', value: 62, icon: MemoryStick, description: "Dynamic memory span under distraction or dual-tasking." },
      { name: 'Cognitive Switching (EF)', value: 65, icon: Shuffle, description: "Speed and accuracy when switching between tasks." },
      { name: 'Processing Speed (Gs)', value: 70, icon: Zap, description: "How fast simple cognitive tasks can be done accurately." },
      { name: 'Long-Term Retrieval (Glr)', value: 58, icon: Archive, description: "Efficient access to stored knowledge and patterns." },
    ],
    insight: "Overall, your biggest improvement has been in problem-solving depth since you started."
  }
};

type Timeframe = 'weekly' | 'monthly' | 'overall';

export function CognitiveEfficiency() {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly');

  const currentData = efficiencyData[timeframe];
  const trendText = timeframe === 'overall' ? 'since starting' : `since last ${timeframe.slice(0, -2)}`;

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
          <Tabs defaultValue="weekly" onValueChange={(value) => setTimeframe(value as Timeframe)}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="overall">Overall</TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-4xl font-bold text-primary">{currentData.overallScore}</p>
                <p className="text-sm font-semibold text-green-500">
                  +{currentData.trend}% {trendText}
                </p>
              </div>
              
              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-center text-muted-foreground">Efficiency Factors</h4>
                {currentData.subMetrics.map(metric => {
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
                  <p className="text-sm text-primary-foreground/90 flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 mt-0.5 text-primary shrink-0"/> 
                      <span className="text-foreground"><span className="font-bold">Insight:</span> {currentData.insight}</span>
                  </p>
              </div>
            </div>
          </Tabs>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
