
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GoalCompletionTracker() {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalGoals = Math.floor(Math.random() * 5) + 5; // 5-10 total goals
    const completedGoals = Math.floor(Math.random() * totalGoals);
    setTotal(totalGoals);
    setCompleted(completedGoals);
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Goal Completion</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{completed} / {total}</p>
        <p className="text-sm text-muted-foreground">Active goals completed</p>
      </CardContent>
    </div>
  );
}
