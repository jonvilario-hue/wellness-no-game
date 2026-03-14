
'use client';

import { useMemo, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Clock, Trophy } from 'lucide-react';
import { format, startOfWeek, subDays, parseISO, isAfter } from 'date-fns';
import { AssistantTooltip } from '../assistant-tooltip';
import { initDB } from '@/lib/storage/db';

const legacyMathDomains: Record<string, string> = {
  'number-sense': 'Number Sense',
  'percentage-fluency': 'Ratio Fluency',
  'arithmetic-composure': 'Arithmetic Composure',
  'probabilistic-thinking': 'Probabilistic Thinking',
  'logical-structure': 'Logical Structure'
};

export function MathDashboard() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      const db = await initDB();
      const localSessions = await db.getAll('math-sessions');
      setSessions(localSessions);
      setIsLoading(false);
    }
    loadHistory();
  }, []);

  const stats = useMemo(() => {
    if (sessions.length === 0) return { streak: 0, weekCount: 0, topDomain: 'None' };
    
    // Streak calculation
    const dates = new Set(sessions.map(s => format(parseISO(s.timestamp), 'yyyy-MM-dd')));
    let streak = 0;
    let checkDate = new Date();
    if (!dates.has(format(checkDate, 'yyyy-MM-dd'))) {
        checkDate = subDays(checkDate, 1);
    }
    while (dates.has(format(checkDate, 'yyyy-MM-dd'))) {
      streak++;
      checkDate = subDays(checkDate, 1);
    }

    // Weekly stats
    const weekStart = startOfWeek(new Date());
    const weekSessions = sessions.filter(s => isAfter(parseISO(s.timestamp), weekStart));

    // Top Domain
    const domainCounts: Record<string, number> = {};
    sessions.forEach(s => {
      domainCounts[s.domainId] = (domainCounts[s.domainId] || 0) + 1;
    });
    const topDomainId = Object.entries(domainCounts).sort((a,b) => b[1] - a[1])[0]?.[0];
    const topDomain = (topDomainId ? legacyMathDomains[topDomainId] : null) || 'None yet';

    return { 
      streak, 
      weekCount: weekSessions.length,
      topDomain
    };
  }, [sessions]);

  if (isLoading) {
    return <div className="h-32 w-full bg-muted animate-pulse rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <AssistantTooltip text="Consecutive days practicing numerical intuition and composure. Local history only.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-orange-500 mb-1" />
            <p className="text-2xl font-black">{stats.streak}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Composure Streak</p>
          </CardContent>
        </Card>
      </AssistantTooltip>
      
      <AssistantTooltip text="Total math sessions completed this week. Consistent volume builds mental hardware.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Clock className="w-5 h-5 text-primary mb-1" />
            <p className="text-2xl font-black">{stats.weekCount}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Sessions</p>
          </CardContent>
        </Card>
      </AssistantTooltip>

      <AssistantTooltip text="The mathematical domain where you have invested the most deliberate practice.">
        <Card className="bg-primary/5 border-primary/10 h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Trophy className="w-5 h-5 text-primary opacity-80 mb-1" />
            <p className="text-sm font-bold truncate w-full">{stats.topDomain}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Domain</p>
          </CardContent>
        </Card>
      </AssistantTooltip>
    </div>
  );
}
