
'use client';

import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { goalStrategies } from '@/data/goal-strategies';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Star, Clock, ListChecks, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PlaybookView() {
  const { entries, updateNotes, updateStatus, toggleFavorite } = usePlaybookStore();
  const favorites = Object.values(entries).filter(e => e.isFavorite);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <Star className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
        <p className="text-lg font-bold text-muted-foreground">Your Playbook is empty.</p>
        <p className="text-sm text-muted-foreground mt-2">Bookmark strategies in the Vision Library to add them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map(entry => {
          const strategy = goalStrategies.find(s => s.id === entry.strategyId)!;
          return (
            <Card key={entry.strategyId} className="flex flex-col border-primary/10">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><strategy.icon className="w-5 h-5" /></div>
                    <CardTitle>{strategy.name}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleFavorite(strategy.id, strategy.name)}>
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2 mt-2">{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Status</p>
                    <Select value={entry.status} onValueChange={(v) => updateStatus(entry.strategyId, v as any)}>
                      <SelectTrigger className="h-7 text-xs bg-transparent border-none p-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['Not tried', 'Currently using', 'Used before'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Impact Scale</p>
                    <p className="text-xs font-bold text-primary">{entry.timesUsed} Uses</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-primary">Personal Notes & Adaptations</Label>
                  <Textarea 
                    placeholder="Record how this strategy worked for you..."
                    value={entry.personalNotes}
                    onChange={e => updateNotes(entry.strategyId, e.target.value)}
                    className="text-xs min-h-[100px] bg-muted/20"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center text-[10px] font-bold text-muted-foreground border-t border-primary/5 p-4">
                {entry.lastUsedAt ? (
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last: {new Date(entry.lastUsedAt).toLocaleDateString()}</span>
                ) : (
                  <span>Not used yet</span>
                )}
                <Button variant="link" size="sm" className="h-auto p-0 text-primary text-[10px] font-black">
                  Open Guide <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
