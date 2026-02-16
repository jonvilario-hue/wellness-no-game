
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Utensils, DollarSign, Brain, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SynergyInsight {
    title: string;
    description: string;
    icon: React.ElementType;
    action: string;
    link: string;
}

export function SynergyPanel() {
    // In a real app, this logic would live in a utility that compares 
    // transactions vs meal logs. Here we provide high-fidelity placeholders.
    const insights: SynergyInsight[] = [
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
