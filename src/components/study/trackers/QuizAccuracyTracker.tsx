
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuizAccuracyTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Accuracy</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">92%</p>
        <p className="text-sm text-muted-foreground">Average score on self-quizzes</p>
      </CardContent>
    </Card>
  );
}
