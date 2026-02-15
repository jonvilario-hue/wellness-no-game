
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shuffle } from "lucide-react";

export function InterleavingPlanner() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Shuffle className="w-5 h-5 text-primary"/>
                Interleaving Planner
            </CardTitle>
            <CardDescription>Plan study sessions that mix related topics to boost retention.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter topics separated by commas..." />
        <Button className="w-full">Generate Plan</Button>
      </CardContent>
    </Card>
  );
}
