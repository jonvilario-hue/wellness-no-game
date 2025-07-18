
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeynmanTeachBackPerformanceTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Teach-Back Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">15</p>
        <p className="text-sm text-muted-foreground">Concepts explained</p>
      </CardContent>
    </div>
  );
}
