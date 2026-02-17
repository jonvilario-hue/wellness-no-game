
'use client';

import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { goalStrategies } from '@/data/goal-strategies';
import { Star, Library } from 'lucide-react';
import { StrategyGuide } from '@/app/blueprints/components/StrategyGuide';

export default function PlaybookView() {
  const { entries, orderedFavoriteIds, customStrategies } = usePlaybookStore();
  
  const favorites = orderedFavoriteIds
    .map(id => entries[id])
    .filter(e => e?.isFavorite);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20 animate-in fade-in">
        <Star className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
        <p className="text-lg font-bold text-muted-foreground">Your Playbook is empty.</p>
        <p className="text-sm text-muted-foreground mt-2">Bookmark strategies in the Library to curate your personal success stack.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center space-y-2 mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Library className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">My Playbook</h2>
        <p className="text-muted-foreground text-sm max-w-md">Your personalized collection of success protocols, mirrored from the main library.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(entry => {
          const strategy = [...goalStrategies, ...customStrategies].find(s => s.id === entry.strategyId);
          if (!strategy) return null;
          return (
            <StrategyGuide key={entry.strategyId} strategy={strategy as any} />
          );
        })}
      </div>
    </div>
  );
}
