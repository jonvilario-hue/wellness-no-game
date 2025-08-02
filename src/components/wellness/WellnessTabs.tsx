
"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import MovementContent from "./MovementContent"
import StillnessContent from "./StillnessContent"
import { HeartPulse, Waves } from "lucide-react"

export default function WellnessTabs() {
  return (
    <Tabs defaultValue="movement" className="w-full">
      <div className="flex justify-center mb-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="movement" className="gap-2"><HeartPulse className="w-4 h-4"/>Movement Lab</TabsTrigger>
            <TabsTrigger value="stillness" className="gap-2"><Waves className="w-4 h-4"/>Stillness Lab</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="movement">
        <Card>
            <CardContent className="pt-6">
                <MovementContent />
            </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stillness">
         <Card>
            <CardContent className="pt-6">
                <StillnessContent />
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
