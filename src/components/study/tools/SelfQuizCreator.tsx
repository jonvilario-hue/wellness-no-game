
'use client';

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { generateQuizAction } from "@/app/actions";
import type { QuizOutput } from "@/ai/flows";
import { cn } from "@/lib/utils";

export function SelfQuizCreator() {
  const [notes, setNotes] = useState('');
  const [quiz, setQuiz] = useState<QuizOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCreateQuiz = () => {
    if (!notes.trim()) return;
    setQuiz(null);
    setUserAnswers({});
    setSubmitted(false);
    startTransition(async () => {
      const result = await generateQuizAction({ notes });
      if (result) {
        setQuiz(result);
      }
    });
  };

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };
  
  const handleReset = () => {
      setQuiz(null);
      setUserAnswers({});
      setSubmitted(false);
  }

  if (quiz) {
    let score = 0;
    if (submitted) {
        quiz.questions.forEach((q, i) => {
            if (userAnswers[i] === q.answer) {
                score++;
            }
        });
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                {submitted && (
                    <CardDescription>
                        Quiz Complete! You scored {score} out of {quiz.questions.length}.
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                {quiz.questions.map((q, qIndex) => (
                <div key={qIndex} className="space-y-2">
                    <p className="font-semibold">{qIndex + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((option, oIndex) => {
                        const isSelected = userAnswers[qIndex] === option;
                        const isCorrect = option === q.answer;
                        let buttonVariant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" = "secondary";
                        
                        if (submitted) {
                            if (isCorrect) buttonVariant = "default"; // Green for correct
                            else if (isSelected && !isCorrect) buttonVariant = "destructive";
                        } else if (isSelected) {
                            buttonVariant = "default";
                        }
                        
                        return (
                        <Button
                            key={oIndex}
                            variant={buttonVariant}
                            onClick={() => handleAnswerSelect(qIndex, option)}
                            disabled={submitted}
                            className={cn(
                                "justify-start text-left h-auto py-2",
                                submitted && isCorrect && "bg-green-600 hover:bg-green-700",
                                submitted && !isCorrect && isSelected && "bg-destructive"
                            )}
                        >
                            {option}
                             {submitted && isCorrect && <CheckCircle className="ml-auto h-4 w-4" />}
                             {submitted && !isCorrect && isSelected && <XCircle className="ml-auto h-4 w-4" />}
                        </Button>
                        );
                    })}
                    </div>
                </div>
                ))}
                 <div className="flex justify-between items-center pt-4 border-t">
                    <Button onClick={handleReset} variant="outline">Try a New Quiz</Button>
                    {!submitted && (
                        <Button onClick={handleSubmitQuiz} >
                            Submit Quiz <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    )}
                 </div>
            </CardContent>
        </Card>
    )
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            AI Self-Quiz Creator
          </CardTitle>
          <CardDescription>Paste key points from your notes to generate a self-assessment quiz.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your study notes here..."
            rows={8}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button className="w-full" onClick={handleCreateQuiz} disabled={isPending || !notes.trim()}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              "Create Quiz"
            )}
          </Button>
        </CardContent>
      </Card>
  );
}
