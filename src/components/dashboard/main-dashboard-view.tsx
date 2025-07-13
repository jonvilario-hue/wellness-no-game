
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChcDomainDashboard } from './chc-domain-dashboard';
import { CognitiveEfficiency } from './cognitive-efficiency';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChcProfileOverview } from './chc-profile-overview';

type ViewMode = 'efficiency' | 'profile';

export function MainDashboardView() {
  const [view, setView] = useState<ViewMode>('efficiency');

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <Tabs defaultValue="efficiency" onValueChange={(value) => setView(value as ViewMode)}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
              <CardTitle className="font-headline">
                  {view === 'efficiency' ? 'Cognitive Efficiency' : 'My Strengths'}
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
                      <TabsTrigger value="profile">My Strengths</TabsTrigger>
                  </TooltipTrigger>
                    <TooltipContent>
                    <p>Shows your full range of mental strengths.</p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>
          </TooltipProvider>
        </CardHeader>
        
        <TabsContent value="efficiency">
            <CognitiveEfficiency />
        </TabsContent>
        <TabsContent value="profile">
          <CardContent className="space-y-4">
            <ChcProfileOverview />
            <ChcDomainDashboard />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
