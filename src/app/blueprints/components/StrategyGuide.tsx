
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { goalStrategies, type GoalStrategy } from "@/data/goal-strategies";

type StrategyGuideProps = {
  strategy: GoalStrategy;
};

export function StrategyGuide({ strategy }: StrategyGuideProps) {
    const Icon = strategy.icon;
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
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                    {strategy.steps.map((step, index) => (
                        <li key={index}>{step}</li>
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
