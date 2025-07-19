
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotebookTabs, PenLine, FileQuestion, Pilcrow, ArrowRight } from "lucide-react";

export function CornellNotesGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <NotebookTabs className="w-6 h-6 text-primary"/>
            Cornell Three-Section Method
        </CardTitle>
        <CardDescription>A system for taking, organizing, and reviewing notes to significantly improve retention and understanding.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><PenLine className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Take Notes:</span> In the main (right) column, take concise notes during the lecture or from your reading.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><FileQuestion className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Write Cues:</span> Shortly after, pull out main ideas, keywords, or questions from your notes and write them in the left cue column.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Pilcrow className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Summarize:</span> At the bottom of the page, write a one or two-sentence summary of the material on that page.</div>
                </li>
            </ul>
        </div>
        <Button className="w-full" disabled>
            Try the Three Section Notes Editor <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
