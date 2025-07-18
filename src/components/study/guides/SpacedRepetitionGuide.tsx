
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, Layers, BarChart, Repeat, ArrowRight } from "lucide-react";

export function SpacedRepetitionGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-primary"/>
            Spaced Repetition
        </CardTitle>
        <CardDescription>Combat the "Forgetting Curve" by reviewing information at increasing intervals over time to lock it into long-term memory.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Layers className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Chunk Information:</span> Break down study topics into small, manageable pieces, like flashcards.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><BarChart className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Review at Intervals:</span> Study the chunks at increasing intervals (e.g., 1 day, 3 days, 1 week, 1 month).</div>
                </li>
                 <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Repeat className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Adjust Based on Performance:</span> If you recall easily, increase the interval. If you struggle, decrease it. Our flashcard system handles this automatically!</div>
                </li>
            </ul>
        </div>
         <Button className="w-full">
            Go to Flashcard Decks <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
