
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { type GoalStrategy } from "@/data/goal-strategies";
import { ListChecks, Check, Link as LinkIcon, Clock, PenLine, FileQuestion, Pilcrow, Users, Brain, Repeat, HelpCircle, Shuffle, GitBranch, BoxSelect, Palette, Image as ImageIcon, Eye, ShieldAlert, CheckSquare, Target, PieChart, Sparkles, Lightbulb, Trophy, CalendarCheck, Gamepad, Zap, BatteryCharging, Flag, Star } from "lucide-react";
import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';

type StrategyGuideProps = {
  strategy: GoalStrategy;
};

const iconMap: Record<string, React.ElementType> = {
    "Specific": ListChecks,
    "Measurable": Check,
    "Achievable": LinkIcon,
    "Relevant": Clock,
    "Time-bound": Clock,
    "Wish": HelpCircle,
    "Outcome": Eye,
    "Obstacle": ShieldAlert,
    "Plan": CheckSquare,
    "Objective": Target,
    "Key Results": PieChart,
    "Take Notes": PenLine,
    "Write Cues": FileQuestion,
    "Summarize": Pilcrow,
    "Frame": Users,
    "Define habits": Brain,
    "Review weekly": Repeat,
    "Celebrate": Sparkles,
    "Centralize Topic": BoxSelect,
    "Branch Out": GitBranch,
    "Use Visuals": ImageIcon,
    "Challenge": Gamepad,
    "Level Up": Zap,
    "Streaks": Flag,
    "Rewards": Trophy,
    "Predict": Lightbulb,
    "Analyze": PieChart,
    "Prevent": ShieldAlert,
    "Review": CalendarCheck,
    "Observe": Eye,
    "Tag Tasks": Target,
    "Schedule": Clock,
    "Protect": ShieldAlert,
    "default": HelpCircle,
};

const strategyTooltips: Record<string, string> = {
  backcasting: "Start from your desired future and work backward to today. Ask 'what must have already happened for me to reach my goal?'",
  woop: "Wish, Outcome, Obstacle, Plan. A research-backed method that pairs positive visualization with realistic obstacle planning.",
  smart: "Specific, Measurable, Achievable, Relevant, Time-bound. Best used for defining individual milestones within a larger blueprint.",
  identity: "Focus on who you want to become. Every action is a vote for the type of person you're building.",
  okrs: "Set a qualitative Objective and define 2-5 measurable Key Results. Used to maintain focus and alignment.",
  review_loop: "A recurring check-in ritual: review what you accomplished, what learned, and what you'll prioritize next week.",
  milestone_mapping: "Break an overwhelming goal into a visual sequence of milestones with clear dependencies.",
  pre_mortem: "Imagine your goal has failed. Ask: 'What went wrong?' List every reason, then build preventive actions.",
  energy_mapping: "Track when your energy peaks. Schedule hardest tasks during high-energy windows.",
  gamified: "Apply game mechanics to your goals: points, streaks, and levels to add immediate reward to long-term pursuits.",
};

export function StrategyGuide({ strategy }: StrategyGuideProps) {
    const { toggleFavorite, entries } = usePlaybookStore();
    const { settings } = useDashboardSettings();
    const entry = entries[strategy.id];
    const isFavorite = entry?.isFavorite || false;
    const Icon = strategy.icon;

    const renderStepWithIcon = (step: string) => {
        const [keyword, ...rest] = step.split(':');
        const cleanKeyword = keyword.replace(/<[^>]*>/g, '').trim();
        const StepIcon = iconMap[cleanKeyword] || iconMap.default;
        
        if (rest.length > 0) {
            return (
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1">
                        <StepIcon className="w-4 h-4 text-primary"/>
                    </div>
                    <div>
                        <strong dangerouslySetInnerHTML={{ __html: keyword }}></strong>:
                        <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: rest.join(':') }}></span>
                    </div>
                </li>
            )
        }
        
        return <li dangerouslySetInnerHTML={{ __html: step }}></li>;
    }


  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Card className="flex flex-col h-full hover:shadow-md transition-shadow relative group cursor-help">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 z-10" 
                    onClick={() => toggleFavorite(strategy.id, strategy.name)}
                  >
                    <Star className={cn("w-4 h-4 transition-all", isFavorite ? "fill-primary text-primary" : "text-muted-foreground opacity-0 group-hover:opacity-100")} />
                  </Button>
                </TooltipTrigger>
                {settings.assistantMode && <TooltipContent>Add this strategy to your Personal Playbook for quick access and tracking.</TooltipContent>}
              </Tooltip>

              <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary"/>
                      </div>
                      <CardTitle>{strategy.name}</CardTitle>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <div>
                          <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">The Protocol:</h4>
                          <ul className="space-y-4 text-sm">
                              {strategy.steps.map((step, index) => (
                                <div key={index}>{renderStepWithIcon(step)}</div>
                              ))}
                          </ul>
                      </div>
                    </TooltipTrigger>
                    {settings.assistantMode && <TooltipContent>The core steps of this strategy, distilled into a clear sequence you can follow.</TooltipContent>}
                  </Tooltip>

                   <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <div className="pt-4 border-t">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-1">Ideal Context:</h4>
                          <p className="text-sm italic">{strategy.useFor}</p>
                      </div>
                    </TooltipTrigger>
                    {settings.assistantMode && <TooltipContent>When this strategy works best — the type of goal or situation it's designed for.</TooltipContent>}
                  </Tooltip>
              </CardContent>
              {entry?.status && (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="px-6 pb-4">
                      <Badge variant="secondary" className="text-[9px] uppercase tracking-widest">{entry.status}</Badge>
                    </div>
                  </TooltipTrigger>
                  {settings.assistantMode && <TooltipContent>Track your relationship with this strategy: Not Tried, Currently Using, or Used Before.</TooltipContent>}
                </Tooltip>
              )}
          </Card>
        </TooltipTrigger>
        {settings.assistantMode && <TooltipContent className="max-w-xs" side="bottom">{strategyTooltips[strategy.id]}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
