
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { BookOpenText } from "lucide-react";
import { useTrainingFocus } from "@/hooks/use-training-focus";
import { useTrainingOverride } from "@/hooks/use-training-override";
import { usePerformanceStore } from "@/hooks/use-performance-store";

const neutralPuzzles = [
  {
    type: 'analogy',
    question: "Doctor is to hospital as teacher is to ____.",
    options: ["Book", "Student", "School", "Pencil"],
    answer: "School",
    explanation: "A doctor works in a hospital, and a teacher works in a school. The relationship is person to workplace."
  },
  {
    type: 'context',
    question: "The river, widened by weeks of rain, began to ____ the nearby village with murky water.",
    options: ["evaporate", "inundate", "solidify", "irrigate"],
    answer: "inundate",
    explanation: "'Inundate' means to flood or overwhelm, which fits the context of a widened river and a village."
  },
  {
    type: 'inference',
    question: "Despite the chaos around him, the monk remained ____, a silent anchor in a swirling storm.",
    options: ["agitated", "boisterous", "imperturbable", "volatile"],
    answer: "imperturbable",
    explanation: "'Imperturbable' means unable to be upset or excited; calm. This contrasts with the surrounding chaos."
  },
  {
    type: 'relationship',
    question: "Which word does not belong with the others?",
    options: ["Branch", "Leaf", "Root", "Feather"],
    answer: "Feather",
    explanation: "Branch, leaf, and root are all parts of a tree. A feather is part of a bird."
  },
];

const mathPuzzles = [
  {
    type: 'word-problem',
    question: "A train travels 300 miles in 5 hours. What is its average speed in miles per hour?",
    options: ["50 mph", "60 mph", "70 mph", "55 mph"],
    answer: "60 mph",
    explanation: "Speed is distance divided by time (300 miles / 5 hours = 60 mph)."
  },
  {
    type: 'logic',
    question: "If X > Y and Y > Z, which statement is definitely true?",
    options: ["X < Z", "X = Z", "X > Z", "Y > X"],
    answer: "X > Z",
    explanation: "This is the transitive property of inequality. If X is greater than Y, and Y is greater than Z, then X must be greater than Z."
  },
  {
    type: 'pattern',
    question: "What is the next number in the sequence: 3, 7, 15, 31, __?",
    options: ["45", "55", "63", "71"],
    answer: "63",
    explanation: "The pattern is to multiply by 2 and add 1 (3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63)."
  },
  {
    type: 'analogy',
    question: "Perimeter is to square as circumference is to ____.",
    options: ["Area", "Diameter", "Circle", "Radius"],
    answer: "Circle",
    explanation: "Perimeter is the boundary of a square, and circumference is the boundary of a circle."
  },
];

type Puzzle = (typeof neutralPuzzles)[0];

export function VerbalInferenceBuilder() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [shuffledPuzzles, setShuffledPuzzles] = useState<Puzzle[]>([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState(''); // '', 'correct', 'incorrect'
  const [gameState, setGameState] = useState('playing'); // playing, finished
  const { focus: globalFocus, isLoaded: isGlobalFocusLoaded } = useTrainingFocus();
  const { override, isLoaded: isOverrideLoaded } = useTrainingOverride();
  const { logGameResult } = usePerformanceStore();
  
  const isLoaded = isGlobalFocusLoaded && isOverrideLoaded;
  const currentMode = isLoaded ? (override || globalFocus) : 'neutral';

  const restartGame = useCallback(() => {
    const puzzleSet = currentMode === 'math' ? mathPuzzles : neutralPuzzles;
    setShuffledPuzzles([...puzzleSet].sort(() => Math.random() - 0.5));
    setCurrentPuzzleIndex(0);
    setScore(0);
    setStartTime(Date.now());
    setFeedback('');
    setSelectedAnswer(null);
    setGameState('playing');
  }, [currentMode]);
  
  useEffect(() => {
    if (isLoaded) {
      restartGame();
    }
  }, [isLoaded, restartGame]);

  const currentPuzzle = shuffledPuzzles[currentPuzzleIndex];

  const handleAnswer = (option: string) => {
    if (feedback || !currentPuzzle) return;

    setSelectedAnswer(option);
    if (option === currentPuzzle.answer) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      if (currentPuzzleIndex < shuffledPuzzles.length - 1) {
        setCurrentPuzzleIndex(currentPuzzleIndex + 1);
        setFeedback('');
        setSelectedAnswer(null);
      } else {
        setGameState('finished');
        const time = (Date.now() - startTime) / 1000;
        const finalScore = option === currentPuzzle.answer ? score + 1 : score;
        logGameResult('Gc', currentMode, { score: finalScore, time });
      }
    }, 2500);
  };
  
  const getButtonClass = (option: string) => {
    if (!feedback || !currentPuzzle) return "secondary";

    if (option === currentPuzzle.answer) {
      return "bg-green-600 hover:bg-green-700 text-white";
    }
    
    if (option === selectedAnswer && feedback === 'incorrect') {
      return "bg-destructive hover:bg-destructive/90 text-destructive-foreground";
    }

    return "secondary";
  }

  if (shuffledPuzzles.length === 0 || !currentPuzzle || !isLoaded) {
    return (
      <Card className="w-full max-w-2xl text-center">
        <CardContent className="flex items-center justify-center h-48">
          <p>Loading puzzles...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
            <BookOpenText />
            (Gc) Verbal Inference Builder
        </CardTitle>
        <CardDescription className="text-center">Deduce the meaning or relationship from the context provided.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {gameState === 'playing' ? (
          <>
            <div className="w-full text-right font-mono">Score: {score} / {shuffledPuzzles.length}</div>
            <div className="p-6 bg-muted rounded-lg w-full text-center min-h-[100px] flex items-center justify-center">
              <p className="text-lg md:text-xl font-medium">{currentPuzzle.question}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {currentPuzzle.options.map((option, index) => (
                <Button 
                  key={index} 
                  onClick={() => handleAnswer(option)}
                  disabled={!!feedback}
                  size="lg"
                  className={cn(
                    "h-auto py-3 whitespace-normal transition-all duration-300",
                    getButtonClass(option)
                  )}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="h-16 mt-2 text-center">
              {feedback && (
                <div className="animate-in fade-in">
                    <p className="text-lg font-bold text-green-500">{feedback === 'correct' ? 'Correct!' : 'Not quite.'}</p>
                    <p className="text-sm text-muted-foreground">{currentPuzzle.explanation}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 animate-in fade-in">
            <CardTitle>Puzzle Set Complete!</CardTitle>
            <p className="text-xl">Your final score is: <span className="font-bold text-primary">{score} out of {shuffledPuzzles.length}</span></p>
            <Button onClick={restartGame} size="lg">Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
