
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { NotebookTabs } from "lucide-react";

export function CornellNotesEditor() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <NotebookTabs className="w-5 h-5 text-primary"/>
                Cornell Notes Editor
            </CardTitle>
            <CardDescription>Use structured Cornell notes to clearly separate concepts.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-2">
        <Textarea placeholder="Main Notes..." rows={4}/>
        <Textarea placeholder="Questions/Keywords..." rows={2}/>
        <Textarea placeholder="Summary..." rows={2}/>
        <Button className="w-full mt-2">Save Notes</Button>
      </CardContent>
    </Card>
  );
}
