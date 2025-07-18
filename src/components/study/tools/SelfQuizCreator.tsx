
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle } from "lucide-react";

export function SelfQuizCreator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary"/>
            Self-Quiz Creator
        </CardTitle>
        <CardDescription>Enter key points from your notes to generate quiz questions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea placeholder="Paste key points here..." rows={6}/>
        <Button className="w-full">Create Quiz</Button>
      </CardContent>
    </Card