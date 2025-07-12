'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import { useState, useEffect } from "react";

const puzzles = [
  {
    type: 'analogy',
    question: "Doctor is to hospital as teacher is to ____.",
    options: ["Book", "Student", "School", "Pencil"],
    answer: "School"
  },
  {
    type: 'context',
    question: "The archaeologist found a _____, a piece of ancient pottery, at the dig site.",
    options: ["fossil", "relic", "shard", "gemstone"],
    answer: "shard"
  },
  {
    type: 'inference',
    question: "Even though she was exhausted, Maria showed great ____ by finishing the marathon.",
    options: ["apathy", "resilience", "fragility", "haste"],
    answer: "resilience"
  },
  {
    type: 'relationship',
    question: "Which word does not belong with the others?",
    options: ["Branch", "Leaf", "Root", "Feather"],
    answer: "Feather"
  },
];

export function VerbalInferenceBuilder() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(''); // '', 'correct', 'incorrect'
  const [gameState, setGameState] = useState('playing'); // playing, finished
  
  const currentPuzzle = puzzles[currentPuzzleIndex];

  const handleAnswer = (option: string) => {
    if (feedback) return;

    if (option === currentPuzzle.answer) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      if (currentPuzzleIndex < puzzles.length - 1) {
        setCurrentPuzzleIndex(currentPuzzleIndex + 1);
        setFeedback('');
      } else {
        setGameState('finished');
      }
    }, 1500);
  };
  
  const handleRestart = () => {
    setCurrentPuzzleIndex(0);
    setScore(0);
    setFeedback('');
    setGameState('playing');
  };
  
  const getButtonClass = (option: string) => {
    if (!feedback) return "secondary";
    if (option === currentPuzzle.answer) return "success";
    if (option !== currentPuzzle.answer && feedback === 'incorrect') {
        // This highlights the selected wrong answer
        // A more advanced version could show which one was selected
        return "destructive";
    }
    return "secondary";
  }


  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Verbal Inference Builder</CardTitle>
        <CardDescription>Deduce the meaning or relationship from the context provided.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {gameState === 'playing' ? (
          <>
            <div className="w-full text-right font-mono">Score: {score} / {puzzles.length}</div>
            <div className="p-6 bg-muted rounded-lg w-full text-center">
              <p className="text-lg md:text-xl font-medium">{currentPuzzle.question}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {currentPuzzle.options.map((option, index) => (
                <Button 
                  key={index} 
                  onClick={() => handleAnswer(option)}
                  disabled={!!feedback}
                  size="lg"
                  className={`
                    h-auto py-3 whitespace-normal
                    ${feedback && option === currentPuzzle.answer ? 'bg-green-600 hover:bg-green-700' : ''}
                    ${feedback && option !== currentPuzzle.answer ? 'bg-muted hover:bg-muted' : ''}
                  `}
                  variant={feedback && option !== currentPuzzle.answer ? "outline" : "secondary"}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="h-6 mt-2 text-lg font-bold">
              {feedback === 'correct' && <p className="text-green-500">Correct!</p>}
              {feedback === 'incorrect' && <p className="text-red-500">Not quite.</p>}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Puzzle Set Complete!</h2>
            <p className="text-xl">Your final score is: <span className="font-bold text-primary">{score} out of {puzzles.length}</span></p>
            <Button onClick={handleRestart} size="lg">Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
