
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Brain, CheckCircle, Repeat, ArrowRight } from "lucide-react";

export function ActiveRecallGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary"/>
            Active Recall
        </CardTitle>
        <CardDescription>The art of actively retrieving information from memory, which is far more effective for long-term retention than passively reviewing it.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Brain className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Identify Key Topics:</span> After studying, list the main concepts from your notes.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><CheckCircle className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Test Yourself:</span> Ask yourself questions about these topics. Try to answer them from memory without looking at your notes.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Repeat className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Review & Repeat:</span> Check your answers for accuracy. Focus on the areas you struggled with and test yourself on them again later.</div>
                </li>
            </ul>
        </div>
         <Button className="w-full" disabled>
            Try the Self-Quiz Creator <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
