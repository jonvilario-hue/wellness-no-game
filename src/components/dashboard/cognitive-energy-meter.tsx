import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Sun } from 'lucide-react';
import { Button } from '../ui/button';

export function CognitiveEnergyMeter() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="w-5 h-5 text-primary" />
          Performance Insights
        </CardTitle>
        <CardDescription>
          Personalized tips based on your training habits.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center items-center text-center space-y-3">
        <div className="p-3 bg-primary/10 rounded-full">
            <Sun className="w-8 h-8 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
            Morning sessions tend to show sharper <span className="font-bold text-primary">Executive Functioning</span>.
        </p>
        <Button variant="outline" size="sm">Schedule Another</Button>
      </CardContent>
    </Card>
  );
}
