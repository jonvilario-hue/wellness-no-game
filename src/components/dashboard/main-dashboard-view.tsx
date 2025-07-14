
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CognitiveEfficiency } from './cognitive-efficiency';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FullStrengthProfile } from './full-strength-profile';
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
            <FullStrengthProfile />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
