
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function QuizAccuracyTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Quiz Accuracy</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">92%</p>
        <p className="text-sm text-muted-foreground">Average score on self-quizzes</p>
        <Progress value={92} className="mt-2" />
      </CardContent>
    </div>
  );
}
