
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hourglass, Coffee, Activity, ArrowRight } from "lucide-react";

export function TimeManagementGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Hourglass className="w-6 h-6 text-primary"/>
            Time Management & Breaks
        </CardTitle>
        <CardDescription>Optimize your study schedule by balancing focused work intervals with restorative breaks to maintain high energy and prevent burnout.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Activity className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Use Focused Intervals:</span> Work in timed, focused blocks (like the Pomodoro Technique) to minimize distractions and build momentum.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Coffee className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Schedule Breaks:</span> Intentionally schedule short, restorative breaks between focus sessions to let your brain rest and consolidate information.</div>
                </li>
            </ul>
        </div>
        <Button className="w-full" disabled>
            Try the Break Optimizer <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
