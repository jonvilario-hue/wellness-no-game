
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic } from "lucide-react";

export function TeachBackRecorder() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-primary"/>
                Teach-Back Recorder
            </CardTitle>
            <CardDescription>Explain a topic in simple terms to find knowledge gaps.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <Textarea placeholder="Explain your topic in your own words here..." rows={6}/>
        <Button className="w-full">Record Explanation</Button>
      </CardContent>
    </Card>
  );
}
