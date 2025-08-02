
"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import MovementContent from "./MovementContent"
import StillnessContent from "./StillnessContent"
import { HeartPulse, Waves, Package } from "lucide-react"

export default function WellnessTabs() {
  return (
    <Tabs defaultValue="movement" className="w-full">
      <div className="flex justify-center mb-6">
        <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="movement" className="gap-2"><HeartPulse className="w-4 h-4"/>Movement Paths</TabsTrigger>
            <TabsTrigger value="stillness" className="gap-2"><Waves className="w-4 h-4"/>Stillness Paths</TabsTrigger>
            <TabsTrigger value="packs" className="gap-2"><Package className="w-4 h-4"/>Curated Packs</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="movement">
        <MovementContent />
      </TabsContent>

      <TabsContent value="stillness">
         <StillnessContent />
      </TabsContent>

      <TabsContent value="packs">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
                <p>Curated packs and plans are coming soon!</p>
            </CardContent>
          </Card>
      </TabsContent>
    </Tabs>
  )
}
