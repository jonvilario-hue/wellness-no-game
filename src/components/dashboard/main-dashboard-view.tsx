
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChcDomainDashboard } from './chc-domain-dashboard';
import { CognitiveEfficiency } from './cognitive-efficiency';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type ViewMode = 'efficiency' | 'profile';

export function MainDashboardView() {
  const [view, setView] = useState<ViewMode>('efficiency');

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
       <CardHeader className="flex flex-row items-center justify-between">
         <div className="space-y-1.5">
            <CardTitle className="font-headline">
                {view === 'efficiency' ? 'Cognitive Efficiency' : 'Full Cognitive Profile'}
            </CardTitle>
            <CardDescription>
                {view === 'efficiency' 
                    ? 'Your complexity-adjusted performance trend.' 
                    : 'A holistic overview of your cognitive strengths.'}
            </CardDescription>
         </div>
        <TooltipProvider>
            <Tabs defaultValue="efficiency" onValueChange={(value) => setView(value as ViewMode)}>
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
                     <TabsTrigger value="profile">Full CHC Profile</TabsTrigger>
                  </TooltipTrigger>
                   <TooltipContent>
                    <p>Shows your full range of mental strengths.</p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>
            </Tabs>
        </TooltipProvider>
       </CardHeader>
        <Tabs value={view}>
            <TabsContent value="efficiency" className="p-0">
                <CognitiveEfficiency />
            </TabsContent>
            <TabsContent value="profile" className="p-0">
                <CardContent>
                    <ChcDomainDashboard />
                </CardContent>
            </TabsContent>
        </Tabs>
    </Card>
  );
}

// Dummy Card components for structure, assuming they exist in ui/card
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
