
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, PenSquare, FileQuestion, ArrowRight } from "lucide-react";

export function ActiveReadingStrategiesGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-primary"/>
            Active Reading Strategies
        </CardTitle>
        <CardDescription>Engage with text to deepen comprehension and retention, turning passive reading into an active dialogue.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><PenSquare className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Preview & Annotate:</span> Before reading, skim headings and summaries. While reading, highlight key ideas, ask questions in the margins, and make connections.</div>
                </li>
                 <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><FileQuestion className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Summarize & Quiz:</span> After each section, summarize it in your own words. Convert your highlights and annotations into flashcards or quiz questions to test your understanding.</div>
                </li>
            </ul>
        </div>
         <Button className="w-full" disabled>
            Go to Smart Highlighter <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
