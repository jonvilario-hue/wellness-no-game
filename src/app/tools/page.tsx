
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookMarked, Utensils, Wallet, ChevronUp, ChevronDown } from 'lucide-react';
import { JournalModule } from '@/components/dashboard/journal-module';
import { JournalCalendar } from '@/components/journal/journal-calendar';
import { FinanceTracker } from '@/components/wellness/FinanceTracker';
import { DietTracker } from '@/components/wellness/DietTracker';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { AssistantTooltip } from '@/components/assistant-tooltip';

function ToolsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialTab = searchParams.get('section') || 'notebook';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const section = searchParams.get('section');
    if (section && ['notebook', 'nutrition', 'finance'].includes(section)) {
      setActiveTab(section);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('section', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <CollapsibleContent>
              <div className="flex flex-col items-center text-center pb-4">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <BookMarked className="h-10 w-10 text-primary"/>
                </div>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Reflections Lab</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Synchronize your internal state through thoughtful planning.
                </p>
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

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 h-auto bg-muted/50 p-1">
            <AssistantTooltip text="Optimizing your intake for brain health. Plan meals and track daily macros." className="flex-1" display="block">
              <TabsTrigger value="nutrition" className="w-full gap-2 py-2">
                <Utensils className="w-4 h-4" />
                Nutrition
              </TabsTrigger>
            </AssistantTooltip>

            <AssistantTooltip text="Structured and freeform journaling to build metacognition and emotional regulation." className="flex-1" display="block">
              <TabsTrigger value="notebook" className="w-full gap-2 py-2">
                <BookMarked className="w-4 h-4" />
                Notebook
              </TabsTrigger>
            </AssistantTooltip>
            
            <AssistantTooltip text="Architect your wealth through strategic insight. Monitor assets, manage debt, and optimize utilization." className="flex-1" display="block">
              <TabsTrigger value="finance" className="w-full gap-2 py-2">
                <Wallet className="w-4 h-4" />
                Finance
              </TabsTrigger>
            </AssistantTooltip>
          </TabsList>
        </div>

        <TabsContent value="notebook" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <JournalModule />
          <JournalCalendar />
        </TabsContent>

        <TabsContent value="nutrition" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <DietTracker />
        </TabsContent>

        <TabsContent value="finance" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <FinanceTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="w-full h-48 bg-muted animate-pulse rounded-xl" />}>
      <ToolsPageContent />
    </Suspense>
  );
}
