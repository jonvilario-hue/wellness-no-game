
'use client';

import { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InterleavingSessionStats() {
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    setSessions(Math.floor(Math.random() * 15) + 3);
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Interleaving Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{sessions}</p>
        <p className="text-sm text-muted-foreground">Interleaved sessions completed</p>
      </CardContent>
    </div>
  );
}
