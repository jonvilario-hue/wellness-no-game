import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, CalendarCheck2, Target } from 'lucide-react';

export function HabitTracker() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Target className="w-5 h-5 text-primary" />
          Habit Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-primary" />
            <span className="font-medium">Current Streak</span>
          </div>
          <span className="font-bold text-lg">14 Days</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <CalendarCheck2 className="w-6 h-6 text-accent" />
            <span className="font-medium">Sessions this week</span>
          </div>
          <span className="font-bold text-lg">5 / 7</span>
        </div>
      </CardContent>
    </Card>
  );
}
