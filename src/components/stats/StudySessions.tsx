// components/stats/StudySessions.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { StudySession } from "@/types/stats";
import { Clock, CheckCircle, Hash } from "lucide-react";

export function StudySessions({ sessions }: { sessions: StudySession[] }) {
  if (sessions.length === 0) {
    return <Card><CardContent className="p-4 text-center text-muted-foreground">No recent study sessions found.</CardContent></Card>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sessions.map((s, i) => (
        <Card key={i}>
            <CardHeader>
                <CardTitle>{new Date(s.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</CardTitle>
                <CardDescription>{s.deckName}</CardDescription>
            </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2 text-sm">
            <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-muted-foreground"><Hash className="w-4 h-4" /> Cards Studied</span>
                <span className="font-bold">{s.cardsStudied}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-4 h-4" /> Accuracy</span>
                <span className="font-bold">{s.total > 0 ? Math.round(s.correct / s.total * 100) : 0}%</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
