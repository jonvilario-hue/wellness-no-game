
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Pen, Group, BookUp, ArrowRight } from "lucide-react";

export function FeynmanTechniqueGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary"/>
            Feynman ELI5 Method
        </CardTitle>
        <CardDescription>A powerful mental model for learning anything by explaining it in simple terms, as if teaching it to someone else.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Pen className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Write it Down:</span> Choose a concept and write an explanation in simple, clear language.</div>
                </li>
                 <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Group className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Teach it:</span> Explain the concept out loud. Pretend you're teaching a beginner. This will quickly reveal where your understanding is weak.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><BookUp className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Review & Refine:</span> Go back to your source material to fill in knowledge gaps. Simplify your explanation until it's crystal clear.</div>
                </li>
            </ul>
        </div>
        <Button className="w-full" disabled>
            Try the Teach-Back Recorder <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
