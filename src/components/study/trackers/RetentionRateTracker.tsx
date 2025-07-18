
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function RetentionRateTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retention Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">88%</p>
        <p className="text-sm text-muted-foreground">Estimated knowledge retention</p>
        <Progress value={88} className="mt-2" />
      </CardContent>
    </Card>
  );
}
