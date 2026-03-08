
"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MovementContent from "./MovementContent"
import StillnessContent from "./StillnessContent"
import CommunicationContent from "./CommunicationContent"
import SpeedReadingContent from "./SpeedReadingContent"
import { HeartPulse, Waves, MessageSquare, Zap } from "lucide-react"
import { AssistantTooltip } from "@/components/assistant-tooltip"

interface WellnessTabsProps {
  filterTags?: string[];
}

function WellnessTabsContent({ filterTags = [] }: WellnessTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const initialTab = searchParams.get('tab') || 'movement'
  const [activeTab, setActiveTab] = useState(initialTab)

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
