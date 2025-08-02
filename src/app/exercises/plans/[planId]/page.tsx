
'use client';

import { useParams } from 'next/navigation';
import { wellnessPlans, type WellnessPlan } from '@/data/wellness-plans';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Label } from '@/components/ui/label';

export default function PlanDetailPage() {
  const params = useParams();
  const planId = params.planId as string;
  const plan = wellnessPlans.find(p => p.id === planId);

  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    plan ? Array(plan.steps.length).fill(false) : []
  );

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  if (!plan) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Plan Not Found</h1>
        <p className="text-muted-foreground">The requested wellness plan could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto py-6 space-y-4">
          <h1 className="text-3xl font-bold">{plan.title}</h1>
          <p className="text-lg text-muted-foreground italic">“{plan.tagline}”</p>
          <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

          <div className="space-y-3">
            {plan.steps.map((step, index) => (
              <Card key={index} className={completedSteps[index] ? "bg-muted/50 opacity-70" : "bg-card"}>
                <CardContent className="flex items-start justify-between gap-4 p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox 
                        id={`step-${index}`} 
                        checked={completedSteps[index]} 
                        onCheckedChange={() => toggleStep(index)} 
                        className="mt-1"
                    />
                    <Label htmlFor={`step-${index}`} className="cursor-pointer">
                        <h3 className="font-semibold text-base">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.type} • {step.duration}</p>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full mt-6">Start from Beginning</Button>
        </div>
      </main>
    </>
  );
}
