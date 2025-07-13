
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CognitiveEfficiency } from './cognitive-efficiency';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChcProfileOverview } from './chc-profile-overview';
import { chcDomains } from '@/types';
import { ChcDomainCard } from './chc-domain-card';
import { CalendarView } from '../calendar/calendar-view';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Expand, CalendarDays } from 'lucide-react';


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
                      : 'A holistic overview of your cognitive strengths and history.'}
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
                    <p>Shows your full range of mental strengths and history.</p>
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
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="calendar">
                    <AccordionTrigger>
                        <div className="flex justify-between items-center w-full pr-2">
                             <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold text-muted-foreground">My Cognitive Calendar</span>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="relative">
                            <CalendarView />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                         <Button variant="ghost" size="icon" className="absolute top-2 right-2" asChild>
                                            <Link href="/calendar">
                                                <Expand className="w-4 h-4"/>
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>View Fullscreen Calendar</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
