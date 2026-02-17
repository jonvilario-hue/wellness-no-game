
'use client';

import { useSmartRecommendations } from "@/hooks/use-smart-recommendations";
import { useRecommendationsStore } from "@/hooks/use-recommendations-store";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Zap, Wind, Brain, Activity, X, Target, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { RecommendationType } from "@/types/recommendations";

const iconMap: Record<RecommendationType, any> = {
  recovery: Wind,
  momentum_booster: Flame,
  streak_saver: Zap,
  milestone_nudge: Target,
  learning: Brain,
  celebration: Trophy,
  planning: Activity,
  energy_management: Zap,
};

export function WellnessRecommendations() {
  const { recommendations } = useSmartRecommendations();
  const { dismiss, markActed } = useRecommendationsStore();

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-700">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Smart Recommendations</h3>
        </div>
        <span className="text-[10px] text-muted-foreground italic">Based on your activity patterns</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          const Icon = iconMap[rec.type] || Activity;
          
          return (
            <Card key={rec.id} className="bg-primary/[0.02] border-primary/10 overflow-hidden group hover:border-primary/30 transition-all relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => dismiss(rec.id)}
              >
                <X className="w-3 h-3" />
              </Button>
              
              <CardContent className="p-4 flex gap-4">
                <div className={cn(
                  "p-3 rounded-xl h-fit",
                  rec.priority > 80 ? "bg-primary/20" : "bg-primary/10"
                )}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-bold">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {rec.description}
                  </p>
                  <Button 
                    variant="link" 
                    asChild 
                    className="p-0 h-auto text-primary text-[10px] font-black uppercase group-hover:gap-2 transition-all"
                    onClick={() => markActed(rec.id)}
                  >
                    <Link href={rec.actionLink}>
                      {rec.actionLabel} <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
