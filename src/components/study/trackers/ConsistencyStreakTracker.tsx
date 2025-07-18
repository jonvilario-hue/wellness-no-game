
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ConsistencyStreakTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Consistency Streak</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">14 days</p>
        <p className="text-sm text-muted-foreground">Consecutive days with study activity</p>
      </CardContent>
    </div>
  );
}
