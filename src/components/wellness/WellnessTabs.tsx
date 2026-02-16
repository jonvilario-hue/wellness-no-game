
"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MovementContent from "./MovementContent"
import StillnessContent from "./StillnessContent"
import { FinanceTracker } from "./FinanceTracker"
import { DietTracker } from "./DietTracker"
import { HeartPulse, Waves, Wallet, Utensils } from "lucide-react"

function WellnessTabsContent() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') || 'movement'
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['movement', 'stillness', 'finance', 'diet'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-center mb-6 overflow-x-auto no-scrollbar">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="movement" className="gap-2 text-xs sm:text-sm"><HeartPulse className="w-4 h-4 hidden sm:inline"/>Movement</TabsTrigger>
            <TabsTrigger value="stillness" className="gap-2 text-xs sm:text-sm"><Waves className="w-4 h-4 hidden sm:inline"/>Stillness</TabsTrigger>
            <TabsTrigger value="finance" className="gap-2 text-xs sm:text-sm"><Wallet className="w-4 h-4 hidden sm:inline"/>Finance</TabsTrigger>
            <TabsTrigger value="diet" className="gap-2 text-xs sm:text-sm"><Utensils className="w-4 h-4 hidden sm:inline"/>Diet</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="movement">
        <MovementContent />
      </TabsContent>

      <TabsContent value="stillness">
         <StillnessContent />
      </TabsContent>

      <TabsContent value="finance">
        <FinanceTracker />
      </TabsContent>

      <TabsContent value="diet">
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
