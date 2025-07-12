
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Award } from 'lucide-react';
import { badges, type Badge } from '@/data/badges';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FilterType = 'all' | 'unlocked' | 'locked';

export default function BadgesPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredBadges = badges.filter(badge => {
    if (filter === 'unlocked') return !badge.locked;
    if (filter === 'locked') return badge.locked;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
              Milestone Badges
            </h1>
          </div>
          <div className="flex-1"></div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex justify-center">
            <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unlocked">Unlocked ({badges.filter(b => !b.locked).length})</TabsTrigger>
                <TabsTrigger value="locked">Locked ({badges.filter(b => b.locked).length})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Card>
            <CardContent className="p-6">
              <TooltipProvider>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
                  {filteredBadges.map((badge, index) => (
                    <Tooltip key={index} delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center gap-2 text-center">
                          <div
                            className={cn(
                              'p-3 rounded-lg flex justify-center items-center aspect-square w-24 h-24 cursor-pointer transition-transform hover:scale-105',
                              badge.locked ? 'bg-muted/30' : 'bg-primary/10'
                            )}
                          >
                            <badge.icon
                              className={cn(
                                'w-12 h-12',
                                badge.locked ? 'text-muted-foreground/50' : 'text-primary'
                              )}
                            />
                          </div>
                          <p className={cn(
                              "text-sm font-medium",
                              badge.locked && 'text-muted-foreground'
                          )}>
                            {badge.title}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-bold">{badge.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {badge.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
