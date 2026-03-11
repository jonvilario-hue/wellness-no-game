
"use client"

import { useState, useEffect, Suspense, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MovementContent from "./MovementContent"
import StillnessContent from "./StillnessContent"
import CommunicationContent from "./CommunicationContent"
import SpeedReadingContent from "./SpeedReadingContent"
import { HeartPulse, Waves, MessageSquare, Zap, Lightbulb, Play } from "lucide-react"
import { AssistantTooltip } from "@/components/assistant-tooltip"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { movementExercises, mindfulnessPractices } from "@/data/exercises"
import { communicationPractices } from "@/data/communication-practices"
import { readingPassages } from "@/data/speedreading-passages"

interface WellnessTabsProps {
  filterTags?: string[];
}

function WellnessTabsContent({ filterTags = [] }: WellnessTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const initialTab = searchParams.get('tab') || 'movement'
  const [activeTab, setActiveTab] = useState(initialTab)
  const { lowEnergyMode } = useWellnessData();

  // Sync state with URL changes
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['movement', 'stillness', 'communication', 'speedreading'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const mvdRecommendation = useMemo(() => {
    if (!lowEnergyMode) return null;
    
    if (activeTab === 'movement') {
      const rec = movementExercises.find(e => e.tags.includes('quick') || e.tags.includes('low-energy')) || movementExercises[0];
      return { ...rec, type: 'movement' };
    }
    if (activeTab === 'stillness') {
      const rec = mindfulnessPractices.find(e => e.tags.includes('quick') || e.tags.includes('low-energy')) || mindfulnessPractices[0];
      return { ...rec, type: 'stillness' };
    }
    if (activeTab === 'communication') {
      const rec = communicationPractices.find(e => e.tags.includes('quick')) || communicationPractices[0];
      return { ...rec, type: 'communication' };
    }
    if (activeTab === 'speedreading') {
      const rec = readingPassages.find(p => p.tier === 'Casual') || readingPassages[0];
      return { ...rec, type: 'speedreading', name: rec.title, description: `A ${rec.tier} drill to maintain velocity.` };
    }
    return null;
  }, [lowEnergyMode, activeTab]);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="flex justify-start sm:justify-center mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <TabsList className="flex flex-nowrap w-full sm:grid sm:grid-cols-4 sm:w-full sm:max-w-2xl h-auto p-1 bg-muted/50 min-w-max sm:min-w-0">
            <AssistantTooltip text="Physical activity to restore ease, build strength, or boost energy." className="flex-1" display="block">
              <TabsTrigger value="movement" className="w-full gap-2 py-2 text-xs sm:text-sm whitespace-nowrap px-4 sm:px-2">
                <HeartPulse className="w-4 h-4 hidden sm:inline"/>
                Movement
              </TabsTrigger>
            </AssistantTooltip>
            
            <AssistantTooltip text="Mindfulness and breathwork to regulate your nervous system." className="flex-1" display="block">
              <TabsTrigger value="stillness" className="w-full gap-2 py-2 text-xs sm:text-sm whitespace-nowrap px-4 sm:px-2">
                <Waves className="w-4 h-4 hidden sm:inline"/>
                Stillness
              </TabsTrigger>
            </AssistantTooltip>

            <AssistantTooltip text="Evidence-based dialogue and interpersonal practices." className="flex-1" display="block">
              <TabsTrigger value="communication" className="w-full gap-2 py-2 text-xs sm:text-sm whitespace-nowrap px-4 sm:px-2">
                <MessageSquare className="w-4 h-4 hidden sm:inline"/>
                Communication
              </TabsTrigger>
            </AssistantTooltip>

            <AssistantTooltip text="Cognitive processing drills to increase WPM and Effective Reading Rate (ERR)." className="flex-1" display="block">
              <TabsTrigger value="speedreading" className="w-full gap-2 py-2 text-xs sm:text-sm whitespace-nowrap px-4 sm:px-2">
                <Zap className="w-4 h-4 hidden sm:inline"/>
                Speed Reading
              </TabsTrigger>
            </AssistantTooltip>
        </TabsList>
      </div>

      {lowEnergyMode && mvdRecommendation && (
        <div className="mb-8 px-1 animate-in fade-in slide-in-from-top-2 duration-500">
          <Card className="border-amber-500/20 bg-amber-500/5 overflow-hidden shadow-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-left">
                <div className="p-3 bg-amber-500/10 rounded-xl shrink-0">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge className="bg-amber-500 text-white border-none text-[8px] font-black uppercase tracking-widest px-2 h-4">MVD Choice</Badge>
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tighter">Zero Friction Drill</span>
                  </div>
                  <h4 className="font-bold text-sm truncate">{(mvdRecommendation as any).name}</h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 italic">"{(mvdRecommendation as any).description}"</p>
                </div>
              </div>
              <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-9 px-6 rounded-full shrink-0 shadow-sm transition-transform hover:scale-105 active:scale-95">
                <Link href={activeTab === 'speedreading' ? '/exercises?tab=speedreading' : `/exercises?tab=${activeTab}#practice-${mvdRecommendation.id}`}>
                  Execute Now <Play className="ml-2 w-3 h-3 fill-current" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <TabsContent value="movement" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <MovementContent filterTags={filterTags} />
      </TabsContent>

      <TabsContent value="stillness" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
         <StillnessContent filterTags={filterTags} />
      </TabsContent>

      <TabsContent value="communication" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
         <CommunicationContent />
      </TabsContent>

      <TabsContent value="speedreading" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
         <SpeedReadingContent />
      </TabsContent>
    </Tabs>
  )
}

export default function WellnessTabs({ filterTags }: WellnessTabsProps) {
  return (
    <Suspense fallback={<div className="w-full h-48 bg-muted animate-pulse rounded-xl" />}>
      <WellnessTabsContent filterTags={filterTags} />
    </Suspense>
  )
}
