
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ConsistencyStreakTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consistency Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">14 days</p>
        <p className="text-sm text-muted-foreground">Consecutive days with study activity</p>
      </CardContent>
    </Card>
  );
}
