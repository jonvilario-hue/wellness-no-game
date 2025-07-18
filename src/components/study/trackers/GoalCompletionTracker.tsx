
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GoalCompletionTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Goal Completion</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">5 / 7</p>
        <p className="text-sm text-muted-foreground">Active goals completed</p>
      </CardContent>
    </div>
  );
}
