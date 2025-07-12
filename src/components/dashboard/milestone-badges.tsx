import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Star, Trophy, BrainCircuit } from 'lucide-react';

const badges = [
  { icon: Trophy, color: 'text-amber-400', title: 'Gf Master', description: 'Reached level 10 in Fluid Reasoning' },
  { icon: Award, color: 'text-sky-500', title: 'Memory Marathon', description: 'Completed 20 Gwm sessions' },
  { icon: Star, color: 'text-rose-500', title: 'Speed Demon', description: 'Top 10% in a Gs task' },
  { icon: BrainCircuit, color: 'text-green-500', title: 'Perfect Week', description: 'Trained every day for 7 days' },
  { icon: Trophy, color: 'text-slate-400', title: 'Novice Explorer', description: 'Completed first session in all domains' },
  { icon: Star, color: 'text-indigo-500', title: 'Consistent Learner', description: 'Maintained a 14-day streak' },
];

export function MilestoneBadges() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Award className="w-5 h-5 text-primary" />
          Milestone Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-4 gap-4 text-center">
            {badges.map((badge, index) => (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="p-2 bg-muted/50 rounded-lg flex justify-center items-center aspect-square cursor-pointer transition-transform hover:scale-110">
                    <badge.icon className={`w-8 h-8 ${badge.color}`} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{badge.title}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
