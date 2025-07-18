
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GoalCompletionTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">5 / 7</p>
        <p className="text-sm text-muted-foreground">Active goals completed</p>
      </CardContent>
    </Card>
  );
}
