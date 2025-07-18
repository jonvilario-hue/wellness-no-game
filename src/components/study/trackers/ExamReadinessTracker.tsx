
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExamReadinessTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Readiness</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">Ready</p>
        <p className="text-sm text-muted-foreground">Based on recent simulations</p>
      </CardContent>
    </Card>
  );
}
