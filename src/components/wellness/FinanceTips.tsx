
'use client';

import { useMemo, useState } from 'react';
import { useFinanceEngine } from '@/hooks/use-finance-engine';
import { SEED_TIPS } from '@/lib/finance-constants';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, X, RefreshCw, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FinanceTips() {
  const { seenTips, markTipSeen, settings } = useFinanceEngine();
  const [sessionTipId, setSessionTipId] = useState<string | null>(null);

  const activeTip = useMemo(() => {
    if (sessionTipId) return SEED_TIPS.find(t => t.id === sessionTipId);
    
    // Find a tip the user hasn't seen
    const unseen = SEED_TIPS.filter(t => !seenTips.includes(t.id));
    if (unseen.length === 0) {
      // If all seen, pick a random one
      return SEED_TIPS[Math.floor(Math.random() * SEED_TIPS.length)];
    }
    return unseen[0];
  }, [seenTips, sessionTipId]);

  if (!settings.showDailyTips || !activeTip) return null;

  return (
    <Card className="bg-primary/5 border-primary/10 overflow-hidden group">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Daily Financial Pulse
        </CardTitle>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setSessionTipId(SEED_TIPS[Math.floor(Math.random() * SEED_TIPS.length)].id)}
          >
            <RefreshCw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => markTipSeen(activeTip.id)}>
            <X className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h4 className="font-bold text-sm mb-1">{activeTip.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {activeTip.body}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center gap-2 border-t border-primary/5 mt-2 bg-primary/[0.02]">
        <Info className="w-3 h-3 text-primary opacity-40 shrink-0" />
        <p className="text-[9px] text-muted-foreground italic">
          "Educational information only — not personalized financial advice."
        </p>
      </CardFooter>
    </Card>
  );
}
