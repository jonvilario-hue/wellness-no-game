
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CognitiveEfficiency } from './cognitive-efficiency';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChcProfileOverview } from './chc-profile-overview';
import { chcDomains } from '@/types';
import { ChcDomainCard } from './chc-domain-card';
import { useTheme } from '@/hooks/use-theme';
import { GrowthDecoration } from '../ui/growth-decoration';

export function MainDashboardView() {
  const [view, setView] = useState<'efficiency' | 'profile'>('efficiency');
  const { organicGrowth } = useTheme();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
      {organicGrowth && <GrowthDecoration />}
      <Tabs defaultValue="efficiency" onValueChange={(value) => setView(value as 'efficiency' | 'profile')}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
              <CardTitle className="font-headline">
                  {view === 'efficiency' ? 'Performance Index' : 'My Full Strength'}
              </CardTitle>
              <CardDescription>
                  {view === 'efficiency' 
                      ? 'Your complexity-adjusted performance trend.' 
                      : 'A holistic overview of your domain strengths and history.'}
              </CardDescription>
          </div>
          <TooltipProvider>
              <TabsList>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="efficiency">
                        Performance Index
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tracks your speed and accuracy under challenge.</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                      <TabsTrigger value="profile">
                        My Full Strength
                      </TabsTrigger>
                  </TooltipTrigger>
                    <TooltipContent>
                    <p>Shows your full range of mental strengths and history.</p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <TabsContent value="efficiency">
              <CognitiveEfficiency />
          </TabsContent>
          <TabsContent value="profile">
            <div className="space-y-4">
              <ChcProfileOverview />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {chcDomains.map((domain) => (
                  <ChcDomainCard key={domain.key} domain={domain} />
                ))}
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
