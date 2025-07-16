
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { BookOpenText } from "lucide-react";
import { usePerformanceStore } from "@/hooks/use-performance-store";
import { getSuccessFeedback, getFailureFeedback } from "@/lib/feedback-system";

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
  {
    type: 'analogy',
    question: "Oar is to sailboat as pedal is to ____.",
    options: ["Car", "Bicycle", "Boat", "Plane"],
    answer: "Bicycle",
    explanation: "An oar propels a sailboat (traditionally), and a pedal propels a bicycle."
  },
  {
    type: 'context',
    question: "Her ____ nature made her the perfect diplomat; she could find common ground in any disagreement.",
    options: ["conciliatory", "argumentative", "apathetic", "stubborn"],
    answer: "conciliatory",
    explanation: "'Conciliatory' means intended to placate or pacify, which is ideal for a diplomat."
  },
  {
    type: 'inference',
    question: "The ancient text was ____, filled with cryptic symbols that had puzzled scholars for centuries.",
    options: ["lucid", "straightforward", "esoteric", "commonplace"],
    answer: "esoteric",
    explanation: "'Esoteric' means intended for or likely to be understood by only a small number of people with specialized knowledge, which fits the description of a cryptic ancient text."
  },
  {
    type: 'relationship',
    question: "Which word does not belong with the others?",
    options: ["Triangle", "Circle", "Square", "Sphere"],
    answer: "Sphere",
    explanation: "Triangle, Circle, and Square are two-dimensional shapes. A Sphere is a three-dimensional shape."
  },
  {
    type: 'analogy',
    question: "Writer is to pen as painter is to ____.",
    options: ["Canvas", "Studio", "Brush", "Color"],
    answer: "Brush",
    explanation: "A writer uses a pen as their primary tool, and a painter uses a brush."
  },
  {
    type: 'context',
    question: "The politician's speech was full of ____, vague promises that ultimately meant nothing.",
    options: ["platitudes", "specifics", "facts", "data"],
    answer: "platitudes",
    explanation: "'Platitudes' are remarks or statements, especially ones with a moral content, that have been used too often to be interesting or thoughtful."
  },
  {
    type: 'inference',
    question: "After hiking for hours under the hot sun, the explorer was relieved to find a source of ____ water.",
    options: ["brackish", "potable", "stagnant", "turbid"],
    answer: "potable",
    explanation: "'Potable' means safe to drink, which would be a relief for a thirsty explorer."
  },
  {
    type: 'relationship',
    question: "Which word does not belong with the others?",
    options: ["Run", "Swim", "Fly", "Think"],
    answer: "Think",
    explanation: "Run, Swim, and Fly are all forms of physical movement. Think is a mental process."
  },
];

type Puzzle = (typeof neutralPuzzles)[0];

export default function VerbalInference() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [shuffledPuzzles, setShuffledPuzzles] = useState<Puzzle[]>([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState(''); // '', 'correct', 'incorrect'
  const [inlineFeedback, setInlineFeedback] = useState({ message: '', type: '' });
  const [gameState, setGameState] = useState('playing'); // playing, finished
  const { logGameResult } = usePerformanceStore();
  
  const puzzleSet = neutralPuzzles;

  const restartGame = useCallback(() => {
    setShuffledPuzzles([...puzzleSet].sort(() => Math.random() - 0.5));
    setCurrentPuzzleIndex(0);
    setScore(0);
    setStartTime(Date.now());
    setFeedback('');
    setInlineFeedback({ message: '', type: '' });
    setSelectedAnswer(null);
    setGameState('playing');
  }, [puzzleSet]);
  
  useEffect(() => {
    restartGame();
  }, [restartGame]);

  const currentPuzzle = shuffledPuzzles[currentPuzzleIndex];

  const handleAnswer = useCallback((option: string) => {
    if (feedback || !currentPuzzle) return;

    const isCorrect = option === currentPuzzle.answer;
    setSelectedAnswer(option);
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
      setInlineFeedback({ message: getSuccessFeedback('Gc'), type: 'success' });
    } else {
      setFeedback('incorrect');
      setInlineFeedback({ message: getFailureFeedback('Gc'), type: 'failure' });
    }

    const isLastPuzzle = currentPuzzleIndex === shuffledPuzzles.length - 1;

    setTimeout(() => {
        if (isLastPuzzle) {
            const time = (Date.now() - startTime) / 1000;
            const finalScore = isCorrect ? score + 1 : score;
            logGameResult('Gc', 'neutral', { score: finalScore, time });
            setGameState('finished');
        } else {
            setCurrentPuzzleIndex(currentPuzzleIndex + 1);
            setFeedback('');
            setInlineFeedback({ message: '', type: '' });
            setSelectedAnswer(null);
        }
    }, 2500);
  }, [feedback, currentPuzzle, score, currentPuzzleIndex, shuffledPuzzles.length, startTime, logGameResult]);
  
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

  if (shuffledPuzzles.length === 0 || !currentPuzzle) {
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
            (Gc) Verbal Inference
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
             <div className="h-6 text-sm font-semibold">
              {inlineFeedback.message && (
                <p className={cn(
                  "animate-in fade-in",
                  inlineFeedback.type === 'success' ? 'text-green-600' : 'text-amber-600'
                )}>
                  {inlineFeedback.message}
                </p>
              )}
            </div>
              {feedback && !gameState.includes('finished') && (
                <div className="animate-in fade-in">
                    <p className="text-sm text-muted-foreground">{currentPuzzle.explanation}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 animate-in fade-in">
            <CardTitle>Puzzle Set Complete!</CardTitle>
            <p className="text-xl">Your final score is: <span className="font-bold text-primary">{score} out of {shuffledPuzzles.length}</span></p>
            <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-semibold">Last Question Explanation:</p>
                <p className="text-sm text-muted-foreground">{currentPuzzle.explanation}</p>
            </div>
            <Button onClick={restartGame} size="lg">Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
