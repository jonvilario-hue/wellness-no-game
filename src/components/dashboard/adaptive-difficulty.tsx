
'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAdaptiveDifficultyAction } from '@/app/actions';
import type { AdaptDifficultyOutput, AdaptDifficultyInput } from '@/ai/flows';
import { SlidersHorizontal, Loader2, Wand2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { efficiencyData } from '@/data/efficiency-data';
import type { ChcFactor } from '@/data/efficiency-data';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const domainMap: Record<ChcFactor, string> = {
  'Gf': 'Problem-Solving Depth (Gf)',
  'Gwm': 'Working Memory Span (Gwm)',
  'EF': 'Cognitive Switching (EF)',
  'Gs': 'Processing Speed (Gs)',
  'Glr': 'Long-Term Retrieval (Glr)',
};

export function AdaptiveDifficulty() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AdaptDifficultyOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFactor, setSelectedFactor] = useState<ChcFactor>('Gf');
  
  const skillLevel = efficiencyData.weekly.subMetrics.find(m => m.key === selectedFactor)?.value || 50;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null); 
    setError(null);
    startTransition(async () => {
      const input: AdaptDifficultyInput = { chcDomain: selectedFactor, userSkillLevel: skillLevel };
      const res = await getAdaptiveDifficultyAction(input);
      if (res) {
        setResult(res);
      } else {
        setError('Failed to get difficulty suggestion. Please try again.');
      }
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          Adaptive Difficulty
        </CardTitle>
        <CardDescription>
          Find the right puzzle difficulty based on your current skill level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="chc-domain-select" className="text-sm font-medium text-muted-foreground">Cognitive Factor</label>
            <Select onValueChange={(value: ChcFactor) => setSelectedFactor(value)} defaultValue={selectedFactor}>
              <SelectTrigger id="chc-domain-select">
                <SelectValue placeholder="Select a factor" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(domainMap).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Your Current Skill Level</p>
            <p className="text-2xl font-bold text-primary">{skillLevel}</p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
               <>
                <Wand2 className="mr-2 h-4 w-4" />
                Suggest Difficulty
              </>
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {result && (
          <Alert className="mt-4">
            <AlertTitle className="flex items-center gap-2">
              Suggested Difficulty: 
              <span className="font-bold text-primary">{result.adjustedDifficulty}</span>
            </AlertTitle>
            <AlertDescription>
              {result.reasoning}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
