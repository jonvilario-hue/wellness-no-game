
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { type GoalStrategy } from "@/data/goal-strategies";
import { ListChecks, Check, Link as LinkIcon, Clock, PenLine, FileQuestion, Pilcrow, Users, Brain, Repeat, HelpCircle, Shuffle, GitBranch, BoxSelect, Palette, Image as ImageIcon, Eye, ShieldAlert, CheckSquare, Target, PieChart, Sparkles, Lightbulb, Trophy, CalendarCheck, Gamepad, Zap, BatteryCharging, Flag, Star, Trash2 } from "lucide-react";
import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
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
  backcasting: "Start from your desired future and work backward to today. Build milestones based on what must have already happened for success.",
  woop: "Wish, Outcome, Obstacle, Plan. A research-backed method that pairs positive visualization with realistic obstacle planning.",
  smart: "Specific, Measurable, Achievable, Relevant, Time-bound. Best used for defining individual milestones within a larger blueprint.",
  identity: "Focus on who you want to become rather than just what you want to achieve. Every action is a vote for your new identity.",
  okrs: "Set an ambitious Objective and 2-5 measurable Key Results. Used by high-performance teams to maintain focus.",
  review_loop: "A weekly ritual to review accomplishments, lessons, and set next week's top priorities.",
  milestone_mapping: "Break overwhelming goals into a visual sequence of checkpoints with clear dependencies.",
  pre_mortem: "Imagine your goal has failed. Identify why, and build preventive actions into your plan today.",
  energy_mapping: "Track when your energy peaks. Schedule hardest tasks during high-energy windows and routine tasks during low energy.",
  gamified: "Apply game mechanics: points, levels, and streaks to maintain dopamine during long-term pursuits.",
};

export function StrategyGuide({ strategy }: StrategyGuideProps) {
    const { toggleFavorite, entries, deleteCustomStrategy } = usePlaybookStore();
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
    <AssistantTooltip text={strategyTooltips[strategy.id] || "A personalized strategy designed to support your unique architectural workflow."} side="bottom">
      <Card className="flex flex-col h-full hover:shadow-md transition-shadow relative group border-primary/5 overflow-hidden">
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            <AssistantTooltip text="Toggle bookmark for your Personal Playbook.">
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
                      This will permanently remove "{strategy.name}" from your library and playbook.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteCustomStrategy(strategy.id)} className="bg-destructive hover:bg-destructive/90 text-white border-none">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{strategy.name}</CardTitle>
                    {strategy.isCustom && <Badge variant="outline" className="text-[8px] h-4 uppercase tracking-tighter bg-primary/5 text-primary border-primary/20">Custom</Badge>}
                  </div>
              </div>
              <CardDescription className="text-xs line-clamp-3 leading-relaxed">{strategy.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
              <div className="space-y-4">
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">Protocol Sequence</h4>
                  <ul className="space-y-4 text-xs">
                      {strategy.steps.map((step, index) => (
                        <div key={index}>{renderStepWithIcon(step)}</div>
                      ))}
                  </ul>
              </div>

               <div className="pt-4 border-t border-primary/5">
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Optimal Context</h4>
                  <p className="text-xs italic text-muted-foreground leading-relaxed">{strategy.useFor || "General goal achievement."}</p>
              </div>
          </CardContent>
      </Card>
    </AssistantTooltip>
  );
}
