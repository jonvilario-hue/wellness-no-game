
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ConsistencyStreakTracker() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStreak(Math.floor(Math.random() * 20) + 5); // Random streak between 5 and 25
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Consistency Streak</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{streak} days</p>
        <p className="text-sm text-muted-foreground">Consecutive days with study activity</p>
      </CardContent>
    </div>
  );
}
