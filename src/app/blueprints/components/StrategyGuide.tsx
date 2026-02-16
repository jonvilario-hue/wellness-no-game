
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { type GoalStrategy } from "@/data/goal-strategies";
import { ListChecks, Check, Link as LinkIcon, Clock, PenLine, FileQuestion, Pilcrow, Users, Brain, Repeat, HelpCircle, Shuffle, GitBranch, BoxSelect, Palette, Image as ImageIcon, Eye, ShieldAlert, CheckSquare, Target, PieChart, Sparkles, Lightbulb, Trophy, CalendarCheck, Gamepad, Zap, BatteryCharging, Flag, Star, Trash2 } from "lucide-react";
import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { AssistantTooltip } from "@/components/assistant-tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type StrategyGuideProps = {
  strategy: GoalStrategy & { isCustom?: boolean };
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
  backcasting: "Start from your desired future and work backward to today. Instead of asking 'what should I do next?', ask 'what must have already happened for me to reach my goal?' — then build those steps into milestones.",
  woop: "Wish, Outcome, Obstacle, Plan. A research-backed method that pairs positive visualization with realistic obstacle planning. Proven to outperform pure positive thinking.",
  smart: "Specific, Measurable, Achievable, Relevant, Time-bound. The classic framework for turning vague intentions into concrete targets. Best used for defining individual milestones within a larger blueprint.",
  identity: "Instead of focusing on what you want to achieve, focus on who you want to become. Every action is a vote for the type of person you're building. This strategy aligns with the 'BECOMING' identity statement in your blueprints.",
  okrs: "Set a qualitative Objective (the 'what' and 'why'), then define 2-5 measurable Key Results that prove you've achieved it. Used by high-performing teams and individuals to maintain focus and alignment.",
  review_loop: "A recurring check-in ritual: review what you accomplished, what learned, and what you'll prioritize next week. Keeps blueprints from drifting and builds self-awareness over time.",
  milestone_mapping: "Break an overwhelming goal into a visual sequence of milestones with clear dependencies. Helps you see the full path, identify what's blocking progress, and celebrate incremental wins.",
  pre_mortem: "Before you start, imagine your goal has failed. Ask: 'What went wrong?' List every plausible reason, then build preventive actions into your plan. Turns anxiety into preparation.",
  energy_mapping: "Track when during the day and week your energy and focus peak. Schedule your hardest blueprint tasks during high-energy windows and routine tasks during low-energy periods.",
  gamified: "Apply game mechanics to your goals: points for completed tasks, streaks for consistency, levels for milestones reached. Adds a layer of immediate reward to long-term pursuits.",
};

export function StrategyGuide({ strategy }: StrategyGuideProps) {
    const { toggleFavorite, entries, deleteCustomStrategy } = usePlaybookStore();
    const { settings } = useDashboardSettings();
    const entry = entries[strategy.id];
    const isFavorite = entry?.isFavorite || false;
    const Icon = strategy.icon || Lightbulb;

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
    <AssistantTooltip text={strategyTooltips[strategy.id] || "A custom strategy you designed to support your unique workflow."} side="bottom">
      <Card className="flex flex-col h-full hover:shadow-md transition-shadow relative group border-primary/5">
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            <AssistantTooltip text="Add this strategy to your Personal Playbook for quick access and tracking.">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => toggleFavorite(strategy.id, strategy.name)}
              >
                <Star className={cn("w-4 h-4 transition-all", isFavorite ? "fill-primary text-primary" : "text-muted-foreground opacity-0 group-hover:opacity-100")} />
              </Button>
            </AssistantTooltip>

            {strategy.isCustom && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Custom Strategy?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove "{strategy.name}" from your library and playbook. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteCustomStrategy(strategy.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary"/>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    {strategy.isCustom && <Badge variant="outline" className="text-[8px] h-4 uppercase tracking-tighter bg-primary/5 text-primary border-primary/20">Custom</Badge>}
                  </div>
              </div>
              <CardDescription className="text-xs line-clamp-3">{strategy.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
              <div className="space-y-4">
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-3">The Protocol:</h4>
                  <ul className="space-y-4 text-xs">
                      {strategy.steps.map((step, index) => (
                        <div key={index}>{renderStepWithIcon(step)}</div>
                      ))}
                  </ul>
              </div>

               <div className="pt-4 border-t border-primary/5">
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Ideal Context:</h4>
                  <p className="text-xs italic text-muted-foreground">{strategy.useFor || "No specific context provided."}</p>
              </div>
          </CardContent>
          {entry?.status && (
            <AssistantTooltip text="Track your relationship with this strategy: Not Tried, Currently Using, or Used Before.">
              <div className="px-6 pb-4 w-fit">
                <Badge variant="secondary" className="text-[9px] uppercase tracking-widest">{entry.status}</Badge>
              </div>
            </AssistantTooltip>
          )}
      </Card>
    </AssistantTooltip>
  );
}
