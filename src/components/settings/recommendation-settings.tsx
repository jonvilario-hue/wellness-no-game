
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRecommendationsStore } from '@/hooks/use-recommendations-store';
import { Sparkles, BellOff, Sliders } from 'lucide-react';
import type { RecommendationType } from '@/types/recommendations';

const categories: { id: RecommendationType; label: string; desc: string }[] = [
  { id: 'streak_saver', label: 'Streak Savers', desc: 'Nudges when a habit streak is at risk.' },
  { id: 'recovery', label: 'Recovery Suggestions', desc: 'Prompts for rest after high activity.' },
  { id: 'milestone_nudge', label: 'Milestone Nudges', desc: 'Alerts for stalled or overdue goals.' },
  { id: 'celebration', label: 'Celebration Reminders', desc: 'Prompts to reflect on completed wins.' },
  { id: 'planning', label: 'Weekly Planning', desc: 'Guidance for Sunday/Monday resets.' },
];

export function RecommendationSettings() {
  const { preferences, updatePreferences } = useRecommendationsStore();

  const toggleCategory = (id: RecommendationType) => {
    const current = preferences.enabledCategories;
    const next = current.includes(id) 
      ? current.filter(c => c !== id)
      : [...current, id];
    updatePreferences({ enabledCategories: next });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Smart Recommendations
          </CardTitle>
          <CardDescription>
            Configure the AI-driven logic engine that personalizes your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">{cat.label}</Label>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </div>
              <Switch 
                checked={preferences.enabledCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Delivery Frequency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-dashed">
            <div className="space-y-0.5">
              <Label className="text-sm">Daily Maximum</Label>
              <p className="text-xs text-muted-foreground">Limit total cards shown per day.</p>
            </div>
            <div className="flex gap-1">
              {[1, 3, 5].map(n => (
                <Button 
                  key={n} 
                  variant={preferences.maxPerDay === n ? 'default' : 'outline'} 
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => updatePreferences({ maxPerDay: n })}
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
