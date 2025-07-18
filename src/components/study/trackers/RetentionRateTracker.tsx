
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function RetentionRateTracker() {
  const [retention, setRetention] = useState(0);

  useEffect(() => {
    setRetention(Math.floor(Math.random() * 30) + 65); // 65-95%
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Retention Rate</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{retention}%</p>
        <p className="text-sm text-muted-foreground">Estimated knowledge retention</p>
        <Progress value={retention} className="mt-2" />
      </CardContent>
    </div>
  );
}
