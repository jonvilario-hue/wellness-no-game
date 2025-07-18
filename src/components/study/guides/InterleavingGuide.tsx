
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle, Combine, BrainCog, ArrowRight } from "lucide-react";

export function InterleavingGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Shuffle className="w-6 h-6 text-primary"/>
            Interleaving Practice
        </CardTitle>
        <CardDescription>Improve long-term retention by mixing different (but related) topics during a study session, rather than blocking practice by topic.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Combine className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Identify Topics:</span> Choose 2-3 related subjects or problem types you want to study (e.g., algebra and geometry).</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><BrainCog className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Mix Your Practice:</span> Instead of doing all of one topic then all of another, mix them up. This forces your brain to work harder to retrieve the correct strategy.</div>
                </li>
            </ul>
        </div>
        <Button className="w-full" disabled>
            Try the Interleaving Planner <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
