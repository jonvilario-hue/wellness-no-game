
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { kits, type MiniKit } from "@/data/wellness-kits";


export function MiniKitsContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {kits.map((kit, index) => (
        <Card key={index} id={`kit-${kit.title.toLowerCase().replace(/ /g, '-')}`} className="hover:shadow-md scroll-mt-20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{kit.emoji}</span>
              <div>
                <h2 className="text-lg font-semibold">{kit.title}</h2>
                <p className="text-sm text-muted-foreground">{kit.description}</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm p-4 bg-muted/50 rounded-lg">
                <div>
                    <p className="font-bold">When to Use:</p>
                    <p className="text-muted-foreground">{kit.whenToUse}</p>
                </div>
                <div>
                    <p className="font-bold">Why it Works:</p>
                    <p className="text-muted-foreground">{kit.whyItWorks}</p>
                </div>
                <div>
                    <p className="font-bold">How to Use:</p>
                    <p className="text-muted-foreground italic">{kit.howToUse}</p>
                </div>
            </div>
            
            <div>
                <p className="font-bold text-sm mb-2">Included Practices:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground pl-2 space-y-1">
                {kit.practices.map((practice, i) => (
                    <li key={i}>
                    <span className="font-medium text-foreground">{practice.type}:</span> {practice.title}
                    </li>
                ))}
                </ul>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline">Save Kit</Button>
              <Button>Try All Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
