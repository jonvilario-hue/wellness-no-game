
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Highlighter } from "lucide-react";

export function SmartHighlightExporter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Highlighter className="w-5 h-5 text-primary"/>
            Smart Highlight Exporter
        </CardTitle>
        <CardDescription>Paste text and highlight key points to export or turn into flashcards.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea placeholder="Paste your text here..." rows={6}/>
        <Button className="w-full">Export Highlights</Button>
      </CardContent>
    </Card>
  );
}
