import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Progress } from '../ui/progress';

export function IqProxyProgress() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <TrendingUp className="w-5 h-5 text-primary" />
          Cognitive Efficiency
        </CardTitle>
        <CardDescription>
          Estimated progress in fluid reasoning & working memory tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
                Your Gf-related efficiency has improved by <span className="font-bold text-primary">+14%</span> since Week 1.
            </p>
            <Progress value={78} aria-label="Cognitive efficiency progress is 78%" />
            <p className="text-xs text-muted-foreground text-right">On track to personal best</p>
        </div>
      </CardContent>
    </Card>
  );
}
