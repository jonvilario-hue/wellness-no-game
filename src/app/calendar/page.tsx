
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { calendarPlans } from '@/data/calendar-plans';
import { CalendarPlanCard } from '@/components/calendar/calendar-plan-card';
import { Card, CardContent } from '@/components/ui/card';

export default function CalendarCataloguePage() {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const savedState = localStorage.getItem('calendar-catalogue-collapsible-state');
        if (savedState !== null) {
        setIsOpen(JSON.parse(savedState));
        }
    }, []);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        localStorage.setItem('calendar-catalogue-collapsible-state', JSON.stringify(open));
    };

    return (
        <>
            <div className="sticky top-0 z-20">
                <Header />
                <PageNav />
            </div>
            <MotivationalMessage />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="mx-auto max-w-7xl space-y-6">
                     <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
                        <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <CollapsibleContent>
                                    <div className="flex flex-col items-center text-center pb-4">
                                        <CalendarIcon className="mx-auto h-12 w-12 text-primary mb-2"/>
                                        <h1 className="text-4xl font-bold font-headline">Calendar Catalogue</h1>
                                        <p className="text-lg text-muted-foreground">Curated plans to build powerful routines.</p>
                                    </div>
                                </CollapsibleContent>
                            </div>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                    </Collapsible>

                    <Card>
                        <CardContent className="p-4">
                             <nav>
                                <ul className="flex flex-wrap gap-2 justify-center">
                                    {calendarPlans.map(plan => (
                                        <li key={plan.id}>
                                            <a href={`#${plan.id}`}>
                                                <Button variant="outline" size="sm" className="h-auto py-1 px-3 text-xs font-semibold uppercase tracking-wider">
                                                    {plan.title.replace(/\s*\(\d+-Day\)/, '')}
                                                </Button>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </CardContent>
                    </Card>
                    
                    <div className="space-y-8">
                        {calendarPlans.map(plan => (
                           <div key={plan.id} id={plan.id} className="scroll-mt-24">
                             <CalendarPlanCard plan={plan} />
                           </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
      );
}
