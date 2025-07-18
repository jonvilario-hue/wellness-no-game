
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FocusDistractionRatioTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Focus / Distraction Ratio</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">8:1</p>
        <p className="text-sm text-muted-foreground">Focus sessions to distractions logged</p>
      </CardContent>
    </Card>
  );
}
