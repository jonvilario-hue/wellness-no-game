
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { goalStrategies, type GoalStrategy } from "@/data/goal-strategies";
import { ScrollArea } from "@/components/ui/scroll-area";

type StrategySelectionProps = {
  onSelectStrategy: (strategy: GoalStrategy) => void;
};

export function StrategySelection({ onSelectStrategy }: StrategySelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Choose a Planning Strategy</h1>
        <p className="text-muted-foreground mt-2">Select a framework to guide the creation of your new blueprint.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goalStrategies.map(strategy => {
            const Icon = strategy.icon;
            return (
                <Card 
                    key={strategy.id} 
                    onClick={() => onSelectStrategy(strategy)}
                    className="cursor-pointer hover:shadow-lg hover:border-primary transition-all flex flex-col group"
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon className="w-6 h-6"/>
                            </div>
                            {strategy.name}
                        </CardTitle>
                        <CardDescription>{strategy.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Best for:</p>
                        <p className="text-sm">{strategy.useFor}</p>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
