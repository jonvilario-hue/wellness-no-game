
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MindMapActivityTracker() {
  const [maps, setMaps] = useState(0);

  useEffect(() => {
    setMaps(Math.floor(Math.random() * 30) + 5);
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Mind Map Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{maps}</p>
        <p className="text-sm text-muted-foreground">Mind maps created</p>
      </CardContent>
    </div>
  );
}
