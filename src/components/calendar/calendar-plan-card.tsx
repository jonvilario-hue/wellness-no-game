
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type CalendarPlan } from "@/data/calendar-plans";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export function CalendarPlanCard({ plan }: { plan: CalendarPlan }) {
  const weekChunks = chunkArray(plan.tasks, 7);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Labels for sub-sections to avoid hydration issues and improve UX
  const subjectName = plan.title.replace(/\s*\(\d+-Day\)/, '');

  return (
    <Card className="w-full overflow-hidden" id={plan.id}>
        <details className="group block" open={isClient}>
            <summary className="list-none cursor-pointer p-6 flex justify-between items-start focus:outline-none hover:bg-muted/30 transition-colors">
                 <div className="flex-grow">
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    <CardDescription>{plan.goal}</CardDescription>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {plan.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                </div>
                <ChevronDown className="w-6 h-6 m-2 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            
            <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
                <CardContent className="p-6 pt-0">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-muted/50">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <th key={day} className="p-2 border font-semibold text-muted-foreground">{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {weekChunks.map((week, weekIndex) => (
                                    <tr key={weekIndex}>
                                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                                            const task = week[dayIndex];
                                            return (
                                                <td key={dayIndex} className="p-2 border align-top h-24 w-[14%]">
                                                    {task ? (
                                                        <div className="flex flex-col h-full">
                                                            <span className="font-bold text-xs text-primary">{task.day}</span>
                                                            <span className="text-xs flex-grow">{task.task}</span>
                                                        </div>
                                                    ) : null}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 space-y-4">
                        <details className="group/inner" open={isClient}>
                            <summary className="list-none cursor-pointer flex justify-between items-center font-semibold text-lg p-3 bg-muted/50 rounded-lg focus:outline-none">
                                <span>{subjectName} Instructions</span>
                                <ChevronDown className="w-5 h-5 transition-transform duration-200 group-open/inner:rotate-180" />
                            </summary>
                            <div className="p-4 border border-t-0 rounded-b-lg">
                                <p className="text-sm text-muted-foreground">{plan.instructions}</p>
                            </div>
                        </details>
                        <details className="group/inner">
                            <summary className="list-none cursor-pointer flex justify-between items-center font-semibold text-lg p-3 bg-muted/50 rounded-lg focus:outline-none">
                                <span>Advanced {subjectName} Plan</span>
                                <ChevronDown className="w-5 h-5 transition-transform duration-200 group-open/inner:rotate-180" />
                            </summary>
                            <div className="p-4 border border-t-0 rounded-b-lg">
                                <p className="text-sm text-muted-foreground">{plan.advanced}</p>
                            </div>
                        </details>
                        {plan.enhancements && (
                            <details className="group/inner">
                                <summary className="list-none cursor-pointer flex justify-between items-center font-semibold text-lg p-3 bg-muted/50 rounded-lg focus:outline-none">
                                    <span>Enhancements & Notes</span>
                                    <ChevronDown className="w-5 h-5 transition-transform duration-200 group-open/inner:rotate-180" />
                                </summary>
                                <div className="p-4 border border-t-0 rounded-b-lg">
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                                    {plan.enhancements.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            </details>
                        )}
                    </div>

                </CardContent>
            </div>
        </details>
    </Card>
  );
}
