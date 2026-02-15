
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Coffee } from "lucide-react";

export function StudyBreakOptimizer() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-primary"/>
                Study Break Optimizer
            </CardTitle>
            <CardDescription>Automatically schedule short, restorative breaks to prevent burnout.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <Input type="number" placeholder="Study interval (minutes)" />
        <Button className="w-full">Set Schedule</Button>
      </CardContent>
    </Card>
  );
}
