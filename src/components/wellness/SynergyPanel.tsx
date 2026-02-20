
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Utensils, DollarSign, Brain, HeartPulse, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { useMemo } from "react";

export function SynergyPanel() {
    const { transactions, mealLogs } = useWellnessData();

    const anomalies = useMemo(() => {
        return transactions.filter(t => t.isAnomaly);
    }, [transactions]);

    const insights = [
        {
            title: "Dining vs. Wellness",
            description: "You've spent $145 on dining out this week. Home-cooked meals dropped by 30% correlate with your reported 'Lower Energy' days.",
            icon: Utensils,
            action: "Schedule Meal Prep",
            link: "/calendar"
        },
        {
            title: "Budget-Friendly Nutrition",
            description: "Swap your $12 daily lunch for a batch-cooked quinoa bowl ($2.50). This saves $190/month, moving your 'Vacation Goal' 3 weeks closer.",
            icon: DollarSign,
            action: "View Budget Meals",
            link: "/library"
        }
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 flex gap-1.5 py-1 px-3">
                    <Sparkles className="w-3 h-3" />
                    <span className="uppercase tracking-tighter font-bold text-[10px]">Synergy Engine</span>
                </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {anomalies.length > 0 && (
                    <Card className="bg-destructive/5 border-destructive/20 col-span-full">
                        <CardHeader className="p-4 flex flex-row items-center gap-3">
                            <ShieldAlert className="w-5 h-5 text-destructive" />
                            <CardTitle className="text-sm font-bold text-destructive">Anomaly Detected: High Variance Spending</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-xs">Your spend at "{anomalies[0].merchant}" is significantly higher than your historical average for this category.</p>
                        </CardContent>
                    </Card>
                )}
                {insights.map((insight, i) => (
                    <Card key={i} className="bg-primary/[0.02] border-primary/10 overflow-hidden group">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <insight.icon className="w-4 h-4 text-primary" />
                                {insight.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {insight.description}
                            </p>
                            <Button variant="link" asChild className="p-0 h-auto text-primary text-xs font-bold group-hover:gap-2 transition-all">
                                <Link href={insight.link}>
                                    {insight.action} <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
