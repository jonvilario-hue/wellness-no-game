
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookCheck, CalendarDays, Timer, Wind, ArrowRight } from "lucide-react";

export function ExamPreparationGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BookCheck className="w-6 h-6 text-primary"/>
            Exam Preparation & Anxiety
        </CardTitle>
        <CardDescription>Strategies for efficient exam preparation and managing test-related anxiety.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><CalendarDays className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Plan Ahead:</span> Review the exam scope and schedule specific revision sessions for each topic.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Timer className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Simulate Conditions:</span> Use timed mock exams to practice under pressure and identify weak spots.</div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-1"><Wind className="w-4 h-4 text-primary"/></div>
                    <div><span className="font-semibold">Manage Anxiety:</span> Learn simple relaxation techniques like deep breathing to stay calm during the exam.</div>
                </li>
            </ul>
        </div>
        <Button className="w-full" disabled>
            Try the Exam Simulator <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardContent>
    </Card>
  );
}
