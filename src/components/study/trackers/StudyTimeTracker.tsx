
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function StudyTimeTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Study Time</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">45 hours</p>
        <p className="text-sm text-muted-foreground">Total study time</p>
        <Progress value={70} className="mt-2" />
      </CardContent>
    </div>
  );
}
