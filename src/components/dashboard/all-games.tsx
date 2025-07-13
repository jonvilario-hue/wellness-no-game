
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chcDomains } from '@/types';
import { ChcDomainCard } from './chc-domain-card';
import { Gamepad2 } from 'lucide-react';

export function AllGames() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Gamepad2 className="w-6 h-6 text-primary" />
          All Training Games
        </CardTitle>
        <CardDescription>
          Choose a game to train a specific cognitive skill.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {chcDomains.map((domain) => (
            <ChcDomainCard key={domain.key} domain={domain} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
