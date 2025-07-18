
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeynmanTeachBackPerformanceTracker() {
  const [concepts, setConcepts] = useState(0);

  useEffect(() => {
    setConcepts(Math.floor(Math.random() * 20) + 5);
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Teach-Back Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{concepts}</p>
        <p className="text-sm text-muted-foreground">Concepts explained</p>
      </CardContent>
    </div>
  );
}
