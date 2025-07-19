
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { goalStrategies, type GoalStrategy } from "@/data/goal-strategies";
import { ListChecks, Check, Link as LinkIcon, Clock, PenLine, FileQuestion, Pilcrow, Users, Brain, Repeat, HelpCircle, Shuffle, GitBranch, BoxSelect, Palette, Image as ImageIcon } from "lucide-react";

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
    "default": HelpCircle,
};


export function StrategyGuide({ strategy }: StrategyGuideProps) {
    const Icon = strategy.icon;

    const renderStepWithIcon = (step: string) => {
        const [keyword, ...rest] = step.split(':');
        const StepIcon = iconMap[keyword.replace(/<[^>]*>/g, '')] || iconMap.default;
        
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
    <Card className="flex flex-col">
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
            <div>
                <h4 className="font-semibold text-sm mb-2">How it works:</h4>
                <ul className="space-y-3 text-sm">
                    {strategy.steps.map((step, index) => (
                       <div key={index}>{renderStepWithIcon(step)}</div>
                    ))}
                </ul>
            </div>
             <div>
                <h4 className="font-semibold text-sm mb-2">Best for:</h4>
                <p className="text-sm text-muted-foreground">{strategy.useFor}</p>
            </div>
        </CardContent>
    </Card>
  );
}
