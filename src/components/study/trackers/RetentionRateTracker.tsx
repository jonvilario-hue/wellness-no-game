
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function RetentionRateTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Retention Rate</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">88%</p>
        <p className="text-sm text-muted-foreground">Estimated knowledge retention</p>
        <Progress value={88} className="mt-2" />
      </CardContent>
    </div>
  );
}
