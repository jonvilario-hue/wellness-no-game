'use client';

import { useMemo, useState, useEffect } from 'react';
import { getHistory } from '@/engine/history';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, LayoutGrid, Terminal, Activity, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LocalAnalytics() {
  const [mounted, setMounted] = useState(false);
  const history = useMemo(() => mounted ? getHistory() : [], [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = useMemo(() => {
    if (history.length === 0) return null;

    const langCounts: Record<string, number> = {};
    const laneCounts: Record<string, number> = {};
    const concepts = new Set<string>();

    history.forEach(entry => {
      langCounts[entry.language] = (langCounts[entry.language] || 0) + 1;
      laneCounts[entry.lane] = (laneCounts[entry.lane] || 0) + 1;
      concepts.add(entry.concept);
    });

    return {
      total: history.length,
      languages: Object.entries(langCounts).sort((a, b) => b[1] - a[1]),
      lanes: Object.entries(laneCounts).sort((a, b) => b[1] - a[1]),
      concepts: Array.from(concepts).slice(0, 8)
    };
  }, [history]);

  if (!mounted) return null;

  if (!stats) {
    return (
      <Card className="border-dashed bg-muted/10">
        <CardContent className="py-12 text-center space-y-2">
          <Activity className="w-8 h-8 mx-auto text-muted-foreground opacity-30" />
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No local history available</p>
          <p className="text-xs text-muted-foreground italic">Complete drills to populate your personal velocity dashboard.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Breakdown */}
        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" /> Language Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {stats.languages.map(([lang, count]) => (
              <div key={lang} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span>{lang}</span>
                  <span className="text-muted-foreground">{count} reps</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: `${(count / stats.total) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lane Breakdown */}
        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-primary" /> Cognitive Lane Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {stats.lanes.map(([lane, count]) => (
              <div key={lane} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span>{lane}</span>
                  <span className="text-muted-foreground">{count} reps</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      lane === 'Read' ? "bg-blue-500" : lane === 'Write' ? "bg-emerald-500" : "bg-amber-500"
                    )} 
                    style={{ width: `${(count / stats.total) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Concepts */}
      <Card className="bg-primary/5 border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" /> Synaptic Consolidation
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold">Recently Mastered Concepts</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 flex flex-wrap gap-2">
          {stats.concepts.map(concept => (
            <Badge key={concept} variant="outline" className="bg-background border-primary/20 text-primary gap-1.5 py-1 px-3">
              <CheckCircle2 className="w-3 h-3" />
              {concept.replace('-', ' ')}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
