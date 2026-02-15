
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function QuizAccuracyTracker() {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    setAccuracy(Math.floor(Math.random() * 25) + 70); // 70-95%
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Quiz Accuracy</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{accuracy}%</p>
        <p className="text-sm text-muted-foreground">Average score on self-quizzes</p>
        <Progress value={accuracy} className="mt-2" />
      </CardContent>
    </div>
  );
}
