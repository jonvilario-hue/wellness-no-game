
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldAlert } from "lucide-react";

export function DistractionLog() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-primary"/>
                Distraction Log
            </CardTitle>
            <CardDescription>Record distractions to identify patterns and mitigate their impact.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Describe distraction..." />
        <Button className="w-full">Log Distraction</Button>
      </CardContent>
    </Card>
  );
}
