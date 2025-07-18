import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";

export function SmartGoalWizard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary"/>
            SMART Goal Wizard
        </CardTitle>
        <CardDescription>Clearly define your study goals for better focus and motivation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Specific goal (e.g., 'Learn Chapter 5')" />
        <Input placeholder="Time frame" type="date" />
        <Button className="w-full">Set Goal</Button>
      </CardContent>
    </Card>
  );
}