
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CognitiveEfficiency } from './cognitive-efficiency';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChcProfileOverview } from './chc-profile-overview';
import { chcDomains } from '@/types';
import { ChcDomainCard } from './chc-domain-card';


export function MainDashboardView() {
  const [view, setView] = useState<ViewMode>('efficiency');
  type ViewMode = 'efficiency' | 'profile';

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <Tabs defaultValue="efficiency" onValueChange={(value) => setView(value as ViewMode)}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
              <CardTitle className="font-headline">
                  {view === 'efficiency' ? 'Cognitive Efficiency' : 'My Full Strength'}
              </CardTitle>
              <CardDescription>
                  {view === 'efficiency' 
                      ? 'Your complexity-adjusted performance trend.' 
                      : 'A holistic overview of your cognitive strengths.'}
              </CardDescription>
          </div>
          <TooltipProvider>
              <TabsList>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="efficiency">Cognitive Efficiency</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tracks your speed and accuracy under challenge.</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                      <TabsTrigger value="profile">My Full Strength</TabsTrigger>
                  </TooltipTrigger>
                    <TooltipContent>
                    <p>Shows your full range of mental strengths.</p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>
          </TooltipProvider>
        </CardHeader>
        
        <TabsContent value="efficiency" key="efficiency">
            <CognitiveEfficiency />
        </TabsContent>
        <TabsContent value="profile" key="profile">
          <CardContent className="space-y-4">
            <ChcProfileOverview />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {chcDomains.map((domain) => (
                <ChcDomainCard key={domain.key} domain={domain} />
              ))}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
