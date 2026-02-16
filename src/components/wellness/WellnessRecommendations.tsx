
'use client';

import { useWellnessData } from "@/hooks/use-wellness-data";
import { movementExercises, mindfulnessPractices } from "@/data/exercises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Zap, Wind, Brain, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";

export function WellnessRecommendations() {
  const { movementLogs, stillnessLogs } = useWellnessData();

  const recommendations = useMemo(() => {
    const recs = [];
    const weekStart = startOfWeek(new Date());
    
    const weekMovementMins = movementLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);

    const weekStillnessMins = stillnessLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);

    // 1. Balance Recommendation
    const total = weekMovementMins + weekStillnessMins;
    if (total > 15) {
        const ratio = weekMovementMins / total;
        if (ratio > 0.75) {
            recs.push({
                title: "Prioritize Recovery",
                description: "You've been moving a lot! A stillness practice like 'Box Breathing' can help lower cortisol and improve muscle recovery.",
                icon: Wind,
                link: "/exercises?tab=stillness#practice-breath_box"
            });
        } else if (ratio < 0.25) {
            recs.push({
                title: "Spark some Energy",
                description: "You've mastered stillness this week. Try '1-Min High Knees' to boost your heart rate and wake up your nervous system.",
                icon: Zap,
                link: "/exercises?tab=movement#practice-energizer_high_knees"
            });
        }
    }

    // 2. Trigger-Response Recommendation
    const stressLogs = stillnessLogs.filter(l => l.trigger === 'Stress' && l.preStress !== undefined && l.postCalm !== undefined);
    if (stressLogs.length >= 3) {
        const techniques: Record<string, { totalImprovement: number, count: number, name: string }> = {};
        stressLogs.forEach(l => {
            if (!techniques[l.techniqueId]) {
                techniques[l.techniqueId] = { totalImprovement: 0, count: 0, name: l.techniqueName };
            }
            // Improvement = reduction in stress (roughly)
            const improvement = l.postCalm! - (10 - l.preStress!); 
            techniques[l.techniqueId].totalImprovement += improvement;
            techniques[l.techniqueId].count++;
        });

        const best = Object.entries(techniques).sort((a, b) => (b[1].totalImprovement / b[1].count) - (a[1].totalImprovement / a[1].count))[0];
        if (best) {
            recs.push({
                title: `Proven Stress Reliever: ${best[1].name}`,
                description: `Data shows this technique is your most effective tool for lowering stress. Consider a session if things feel heavy today.`,
                icon: Brain,
                link: `/exercises?tab=stillness#practice-${best[0]}`
            });
        }
    }

    // 3. Variety / Exploration
    const categoriesTried = new Set([...movementLogs, ...stillnessLogs].map(l => {
        const p = [...movementExercises, ...mindfulnessPractices].find(ex => ex.id === (('exerciseId' in l) ? l.exerciseId : l.techniqueId));
        return p?.category;
    }));

    if (!categoriesTried.has('Self-Compassion')) {
        recs.push({
            title: "Explore Self-Compassion",
            description: "You haven't logged any self-compassion practices lately. A brief check-in with your inner needs can build deep resilience.",
            icon: Activity,
            link: "/exercises?tab=stillness#practice-compassion_journal"
        });
    }

    return recs.slice(0, 2); // Show top 2
  }, [movementLogs, stillnessLogs]);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-700">
      <div className="flex items-center gap-2 px-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Smart Recommendations</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, i) => (
          <Card key={i} className="bg-primary/[0.02] border-primary/10 overflow-hidden group hover:border-primary/30 transition-all">
            <CardContent className="p-4 flex gap-4">
              <div className="p-3 bg-primary/10 rounded-xl h-fit">
                <rec.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-bold">{rec.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {rec.description}
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-primary text-[10px] font-black uppercase group-hover:gap-2 transition-all">
                  <Link href={rec.link}>
                    Try Now <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
