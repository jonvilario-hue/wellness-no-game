
"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MovementContent from "./MovementContent"
import StillnessContent from "./StillnessContent"
import { HeartPulse, Waves, Package, Search } from "lucide-react"
import { MiniKitsContent } from "./MiniKitsContent"
import WellnessLibrary from "./WellnessLibrary"

export default function WellnessTabs() {
  return (
    <Tabs defaultValue="discover" className="w-full">
      <div className="flex justify-center mb-6">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="discover" className="gap-2"><Search className="w-4 h-4"/>Discover</TabsTrigger>
            <TabsTrigger value="movement" className="gap-2"><HeartPulse className="w-4 h-4"/>Movement Paths</TabsTrigger>
            <TabsTrigger value="stillness" className="gap-2"><Waves className="w-4 h-4"/>Stillness Paths</TabsTrigger>
            <TabsTrigger value="packs" className="gap-2"><Package className="w-4 h-4"/>Curated Kits</TabsTrigger>
        </TabsList>
      </div>

       <TabsContent value="discover">
        <WellnessLibrary />
      </TabsContent>

      <TabsContent value="movement">
        <MovementContent />
      </TabsContent>

      <TabsContent value="stillness">
         <StillnessContent />
      </TabsContent>

      <TabsContent value="packs">
          <MiniKitsContent />
      </TabsContent>
    </Tabs>
  )
}
