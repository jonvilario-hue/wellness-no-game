
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExamReadinessTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Exam Readiness</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">Ready</p>
        <p className="text-sm text-muted-foreground">Based on recent simulations</p>
      </CardContent>
    </div>
  );
}
