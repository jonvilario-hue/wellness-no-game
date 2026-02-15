"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MovementContent from "./MovementContent"
import StillnessContent from "./StillnessContent"
import { HeartPulse, Waves } from "lucide-react"

function WellnessTabsContent() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') || 'movement'
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && (tab === 'movement' || tab === 'stillness')) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-center mb-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="movement" className="gap-2"><HeartPulse className="w-4 h-4"/>Movement Paths</TabsTrigger>
            <TabsTrigger value="stillness" className="gap-2"><Waves className="w-4 h-4"/>Stillness Paths</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="movement">
        <MovementContent />
      </TabsContent>

      <TabsContent value="stillness">
         <StillnessContent />
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