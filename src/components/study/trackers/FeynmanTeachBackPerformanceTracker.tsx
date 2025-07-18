
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeynmanTeachBackPerformanceTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teach-Back Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">15</p>
        <p className="text-sm text-muted-foreground">Concepts explained</p>
      </CardContent>
    </Card>
  );
}
