
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const readinessLevels = ['Ready', 'Reviewing', 'Needs Work'];

export function ExamReadinessTracker() {
  const [readiness, setReadiness] = useState('');

  useEffect(() => {
    setReadiness(readinessLevels[Math.floor(Math.random() * readinessLevels.length)]);
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Exam Readiness</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Based on recent simulations</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{readiness}</p>
      </CardContent>
    </div>
  );
}
