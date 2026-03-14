
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sigma, BrainCircuit, Scale, Calculator, 
  Activity, History, 
  Plus, Zap, LayoutGrid, Eye
} from 'lucide-react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { format, startOfWeek, isAfter, parseISO } from 'date-fns';
import { MathSessionPlayer } from './MathSessionPlayer';
import { AssistantTooltip } from '../assistant-tooltip';
import { MathAnalytics } from './MathAnalytics';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { MentalMathTrainer } from './MentalMathTrainer';
import { AnzanTrainer } from './AnzanTrainer';
import { cn } from '@/lib/utils';

export type MathDomain = {
  id: string;
  name: string;
  philosophy: string;
  icon: any;
};

export const domains: MathDomain[] = [
  { id: 'sense', name: 'Number Sense & Estimation', philosophy: 'Intuition over exactness.', icon: BrainCircuit },
  { id: 'ratio', name: 'Percentage & Ratio Fluency', philosophy: 'The language of comparison.', icon: Scale },
  { id: 'arithmetic', name: 'Mental Arithmetic Composure', philosophy: 'Calm speed under pressure.', icon: Calculator },
  { id: 'prob', name: 'Probabilistic Thinking', philosophy: 'Navigating uncertainty.', icon: Activity },
  { id: 'logic', name: 'Logical Structure', philosophy: 'The geometry of thought.', icon: Sigma },
];

export function MathComposureLab() {
  const { user, firestore } = useFirebase();
  const [activeSession, setActiveSession] = useState<{ domainId: string; mode: string } | null>(null);
  const [activeTab, setActiveTab] = useState('domains');
  const { addCustomPlan } = useCalendarPlansStore();
  const { toast } = useToast();

  const sessionsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, 'users', user.uid, 'math-sessions'),
      orderBy('timestamp', 'desc')
    );
  }, [firestore, user?.uid]);

  const { data: sessions } = useCollection(sessionsQuery);

  const handleAddDomainToCalendar = (domain: MathDomain) => {
    addCustomPlan({
      id: `math-routine-${domain.id}-${Date.now()}`,
      name: `${domain.name} Practice`,
      description: `Daily mathematical composure training for ${domain.name}.`,
      isPreset: false,
      isActive: true,
      durationType: 'ongoing',
      startDate: new Date().toISOString(),
      categories: ['Math'],
      color: '#22d3ee', // Cyan for math
      activities: [
        {
          id: `act-math-${domain.id}-${Date.now()}`,
          name: domain.name,
          category: 'Math',
          recurrence: 'daily',
          duration: 10,
          reminderEnabled: true,
          linkedTracker: domain.id
        }
      ]
    });

    toast({
      title: "Routine Added",
      description: `"${domain.name}" has been added to your Master Calendar.`,
      variant: 'success'
    });
  };

  if (activeSession) {
    return (
      <MathSessionPlayer 
        domain={domains.find(d => d.id === activeSession.domainId)!} 
        mode={activeSession.mode as any}
        onClose={() => setActiveSession(null)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-muted/50 p-1 h-auto grid grid-cols-3 max-w-xl">
            <TabsTrigger value="domains" className="gap-2 px-6 font-bold uppercase text-[10px] py-2">
              <LayoutGrid className="w-3.5 h-3.5" /> Domains
            </TabsTrigger>
            <TabsTrigger value="trainer" className="gap-2 px-6 font-bold uppercase text-[10px] py-2">
              <Zap className="w-3.5 h-3.5" /> Velocity
            </TabsTrigger>
            <TabsTrigger value="anzan" className="gap-2 px-6 font-bold uppercase text-[10px] py-2">
              <Eye className="w-3.5 h-3.5" /> Anzan
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="domains" className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map(domain => {
              const domainSessions = sessions?.filter(s => s.domainId === domain.id) || [];
              const weekStart = startOfWeek(new Date());
              const weekCount = domainSessions.filter(s => isAfter(parseISO(s.timestamp), weekStart)).length;
              const lastDate = domainSessions[0] ? format(parseISO(domainSessions[0].timestamp), 'MMM d') : 'Never';

              return (
                <Card key={domain.id} className="group hover:border-primary/50 transition-all border-primary/5 overflow-hidden relative">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <AssistantTooltip text="Add this domain as a daily routine to your Master Calendar.">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-primary hover:bg-primary/10"
                        onClick={() => handleAddDomainToCalendar(domain)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </AssistantTooltip>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <domain.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm font-bold truncate pr-6">{domain.name}</CardTitle>
                    </div>
                    <CardDescription className="text-xs italic leading-relaxed h-8">"{domain.philosophy}"</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Sessions this week</p>
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className={cn("w-1.5 h-1.5 rounded-full", i < weekCount ? "bg-primary" : "bg-muted")} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground">Last: {lastDate}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-primary/5 p-0 overflow-hidden">
                    <div className="grid grid-cols-3 w-full h-10">
                      {['Slow Work', 'Steady Rhythm', 'Real Life'].map(mode => (
                        <button 
                          key={mode}
                          onClick={() => setActiveSession({ domainId: domain.id, mode })}
                          className="text-[9px] font-black uppercase hover:bg-primary hover:text-primary-foreground transition-all border-r border-primary/5 last:border-none"
                        >
                          {mode === 'Steady Rhythm' ? 'Steady' : mode}
                        </button>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="trainer" className="animate-in slide-in-from-bottom-2 duration-500">
          <MentalMathTrainer />
        </TabsContent>

        <TabsContent value="anzan" className="animate-in slide-in-from-bottom-2 duration-500">
          <AnzanTrainer />
        </TabsContent>
      </Tabs>

      <div className="space-y-12 pt-8">
        <WellnessActivityCalendar categoryFilter="Math" />
        <MathAnalytics />
      </div>
    </div>
  );
}
