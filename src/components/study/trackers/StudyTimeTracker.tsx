
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function StudyTimeTracker() {
  const [hours, setHours] = useState(0);

  useEffect(() => {
    setHours(Math.floor(Math.random() * 50) + 10);
  }, []);
  
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Study Time</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{hours} hours</p>
        <p className="text-sm text-muted-foreground">Total study time</p>
        <Progress value={(hours / 70) * 100} className="mt-2" />
      </CardContent>
    </div>
  );
}
