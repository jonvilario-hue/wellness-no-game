
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { WellnessPlan } from "@/data/wellness-plans";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";

interface PlanCardProps {
    plan: WellnessPlan;
}

export function PlanCard({ plan }: { plan: WellnessPlan }) {

    return (
        <Link href={`/exercises/plans/${plan.id}`} className="flex">
            <Card className="flex flex-col w-full hover:shadow-lg transition-shadow duration-300 hover:border-primary/50">
                <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground font-semibold">
                    <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>{plan.steps.length} days</span>
                    </div>
                     <ArrowRight className="w-5 h-5 text-primary"/>
                </CardFooter>
            </Card>
        </Link>
    );
}
