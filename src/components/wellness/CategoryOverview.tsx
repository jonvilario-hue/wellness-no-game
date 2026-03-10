
"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface CategoryOverviewProps {
  title: string
  icon?: LucideIcon
  purpose: string
  useWhen: string[]
  includes: string[]
  tagline: string
}

export default function CategoryOverview({
  title,
  icon: Icon,
  purpose,
  useWhen,
  includes,
  tagline,
}: CategoryOverviewProps) {
  return (
    <Card className="mb-6 border-primary/5 bg-primary/[0.02]">
      <CardContent className="space-y-3 p-6">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="w-6 h-6 text-primary" />}
          <h2 className="text-xl font-bold uppercase tracking-tight">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{purpose}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Use When:</p>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
              {useWhen.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Includes:</p>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
              {includes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm italic text-primary mt-2">“{tagline}”</p>
      </CardContent>
    </Card>
  )
}
