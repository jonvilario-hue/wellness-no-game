
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, BoxSelect, Palette, Image, ArrowRight } from "lucide-react";

export function EffectiveMindMappingGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-primary"/>
            Effective Mind Mapping
        </CardTitle>
        <CardDescription>Visually organize information to see connections, stimulate creativity, and improve memory recall.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><BoxSelect className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Centralize Topic:</span> Start with your main idea in the center of the page.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Palette className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Branch Out:</span> Create branches for major subtopics, then smaller branches for details. Use keywords, not long sentences.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Image className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Use Visuals:</span> Add colors and images to make the map more memorable and engaging.</div>
                </li>
            </ul>
        </div>
        <Button className="w-full" disabled>
            Try the Mind Map Tool <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
