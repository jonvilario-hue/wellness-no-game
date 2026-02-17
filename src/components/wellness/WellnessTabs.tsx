
"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MovementContent from "./MovementContent"
import StillnessContent from "./StillnessContent"
import { FinanceTracker } from "./FinanceTracker"
import { DietTracker } from "./DietTracker"
import { HeartPulse, Waves, Wallet, Utensils } from "lucide-react"
import { AssistantTooltip } from "@/components/assistant-tooltip"

function WellnessTabsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const initialTab = searchParams.get('tab') || 'movement'
  const [activeTab, setActiveTab] = useState(initialTab)

  // Sync state with URL changes (e.g. back/forward buttons)
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['movement', 'stillness', 'finance', 'diet'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Update URL without a full page reload to keep state in sync
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="flex justify-center mb-6 overflow-x-auto no-scrollbar">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl h-auto p-1 bg-muted/50">
            <AssistantTooltip text="Physical activity to restore ease, build strength, or boost energy. Even 1 minute of movement can reset neural pathways and boost dopamine.">
              <TabsTrigger value="movement" className="gap-2 py-2 text-xs sm:text-sm w-full">
                <HeartPulse className="w-4 h-4 hidden sm:inline"/>
                Movement
              </TabsTrigger>
            </AssistantTooltip>
            
            <AssistantTooltip text="Mindfulness and breathwork to regulate your nervous system. These practices switch your system from 'stress' to 'recovery' mode.">
              <TabsTrigger value="stillness" className="gap-2 py-2 text-xs sm:text-sm w-full">
                <Waves className="w-4 h-4 hidden sm:inline"/>
                Stillness
              </TabsTrigger>
            </AssistantTooltip>
            
            <AssistantTooltip text="Resource management to reduce survival stress. Tracking small wins here builds the financial foundation required for deep cognitive focus.">
              <TabsTrigger value="finance" className="gap-2 py-2 text-xs sm:text-sm w-full">
                <Wallet className="w-4 h-4 hidden sm:inline"/>
                Finance
              </TabsTrigger>
            </AssistantTooltip>
            
            <AssistantTooltip text="Optimizing your intake for brain health. Consistent fueling and hydration prevent the glucose drops that cause mental fog and irritability.">
              <TabsTrigger value="diet" className="gap-2 py-2 text-xs sm:text-sm w-full">
                <Utensils className="w-4 h-4 hidden sm:inline"/>
                Nutrition
              </TabsTrigger>
            </AssistantTooltip>
        </TabsList>
      </div>

      <TabsContent value="movement" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <MovementContent />
      </TabsContent>

      <TabsContent value="stillness" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
         <StillnessContent />
      </TabsContent>

      <TabsContent value="finance" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <FinanceTracker />
      </TabsContent>

      <TabsContent value="diet" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <DietTracker />
      </TabsContent>
    </Tabs>
  )
}

export default function WellnessTabs() {
  return (
    <Suspense fallback={<div className="w-full h-48 bg-muted animate-pulse rounded-xl" />}>
      <WellnessTabsContent />
    </Suspense>
  )
}
