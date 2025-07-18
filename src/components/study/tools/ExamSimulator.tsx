
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from "lucide-react";

export function ExamSimulator() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary"/>
                Exam Simulator
            </CardTitle>
            <CardDescription>Test your knowledge under timed conditions to reduce anxiety.</CardDescription>
        </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-40