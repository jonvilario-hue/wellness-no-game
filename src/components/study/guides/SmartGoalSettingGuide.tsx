
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, ListChecks, Check, Link as LinkIcon, Clock, ArrowRight } from "lucide-react";

export function SmartGoalSettingGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary"/>
            SMART Goal Setting
        </CardTitle>
        <CardDescription>Create effective, actionable goals by making them Specific, Measurable, Achievable, Relevant, and Time-bound.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">The SMART Framework:</h4>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-3"><ListChecks className="w-4 h-4 text-primary"/><div><strong>S</strong>pecific: Clearly define what you want to accomplish.</div></li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary"/><div><strong>M</strong>easurable: How will you track progress?</div></li>
                <li className="flex items-center gap-3"><LinkIcon className="w-4 h-4 text-primary"/><div><strong>A</strong>chievable: Is the goal realistic?</div></li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary"/><div><strong>R</strong>elevant: Does it align with your broader objectives?</div></li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary"/><div><strong>T</strong>ime-bound: When will you achieve it?</div></li>
            </ul>
        </div>
         <Button className="w-full" disabled>
            Try the SMART Goal Wizard <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
