
"use client"

import { Card, CardContent } from "@/components/ui/card"

interface CategoryOverviewProps {
  title: string
  icon?: React.ReactNode
  purpose: string
  useWhen: string[]
  includes: string[]
  tagline: string
}

export default function CategoryOverview({
  title,
  icon,
  purpose,
  useWhen,
  includes,
  tagline,
}: CategoryOverviewProps) {
  return (
    <Card className="mb-6">
      <CardContent className="space-y-3 p-6">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-xl">{icon}</span>}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{purpose}</p>
        <div>
          <p className="text-sm font-semibold">Use When:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {useWhen.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Includes:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm italic text-primary">“{tagline}”</p>
      </CardContent>
    </Card>
  )
}
