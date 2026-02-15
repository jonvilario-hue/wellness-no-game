
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
import { Separator } from '@/components/ui/separator';

export default function PlanDetailPage() {
  const params = useParams();
  const planId = params.planId as string;
  const plan = wellnessPlans.find(p => p.id === planId);

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (dayIndex: number, practiceIndex: number) => {
    const key = `${dayIndex}-${practiceIndex}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
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
        <div className="max-w-2xl mx-auto py-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{plan.title}</h1>
            <p className="text-lg text-muted-foreground italic">“{plan.tagline}”</p>
            <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
          </div>

          <div className="space-y-4">
            {plan.steps.map((day, dayIndex) => (
              <Card key={dayIndex}>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">Day {day.day}: {day.title}</h3>
                  <Separator className="my-2" />
                  <div className="space-y-3 mt-3">
                    {day.practices.map((practice, practiceIndex) => {
                      const stepId = `step-${dayIndex}-${practiceIndex}`;
                      const isCompleted = completedSteps[stepId] || false;
                      return (
                        <div
                          key={practiceIndex}
                          className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                        >
                          <Checkbox
                            id={stepId}
                            checked={isCompleted}
                            onCheckedChange={() => toggleStep(dayIndex, practiceIndex)}
                          />
                          <Label htmlFor={stepId} className="cursor-pointer">
                            <span className="font-semibold">{practice.title}</span>
                            <p className="text-xs text-muted-foreground">{practice.type}</p>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full mt-6">Restart Plan</Button>
        </div>
      </main>
    </>
  );
}
