'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAdaptiveDifficultyAction } from '@/app/actions';
import type { AdaptDifficultyOutput, AdaptDifficultyInput } from '@/ai/flows';
import { SlidersHorizontal, Loader2, Wand2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { chcDomains, type CHCDomain } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function AdaptiveDifficulty() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AdaptDifficultyOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState(50);
  const [domain, setDomain] = useState<CHCDomain>('Gf');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null); 
    setError(null);
    startTransition(async () => {
      const input: AdaptDifficultyInput = { chcDomain: domain, userSkillLevel: skillLevel };
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
          Find the right puzzle difficulty for your skill level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="chc-domain-select">Cognitive Domain</Label>
            <Select onValueChange={(value: CHCDomain) => setDomain(value)} defaultValue={domain}>
              <SelectTrigger id="chc-domain-select">
                <SelectValue placeholder="Select a domain" />
              </SelectTrigger>
              <SelectContent>
                {chcDomains.map(d => (
                  <SelectItem key={d.key} value={d.key}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="skill-level-slider" className="flex justify-between">
              <span>Skill Level</span>
              <span>{skillLevel}</span>
            </Label>
            <Slider
              id="skill-level-slider"
              min={0}
              max={100}
              step={1}
              value={[skillLevel]}
              onValueChange={(value) => setSkillLevel(value[0])}
            />
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
