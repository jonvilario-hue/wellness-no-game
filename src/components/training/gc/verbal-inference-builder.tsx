
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const puzzles = [
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
    question: "Symphony is to composer as novel is to ____.",
    options: ["Reader", "Publisher", "Author", "Chapter"],
    answer: "Author",
    explanation: "A composer creates a symphony, and an author creates a novel. The relationship is creation to creator."
  },
  {
    type: 'context',
    question: "Her ____ for punctuality was well-known; she was never late for an appointment.",
    options: ["penchant", "distaste", "apathy", "flexibility"],
    answer: "penchant",
    explanation: "'Penchant' means a strong or habitual liking for something. It fits the context of never being late."
  },
    {
    type: 'relationship',
    question: "Which word does not belong with the others?",
    options: ["Jubilant", "Ecstatic", "Melancholy", "Elated"],
    answer: "Melancholy",
    explanation: "Jubilant, ecstatic, and elated are all synonyms for being very happy. Melancholy means sad."
  },
];

export function VerbalInferenceBuilder() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState(''); // '', 'correct', 'incorrect'
  const [gameState, setGameState] = useState('playing'); // playing, finished
  
  // Shuffle puzzles once on initial load
  const shuffledPuzzles = useMemo(() => [...puzzles].sort(() => Math.random() - 0.5), []);

  const currentPuzzle = shuffledPuzzles[currentPuzzleIndex];

  const handleAnswer = (option: string) => {
    if (feedback) return;

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
      }
    }, 2500);
  };
  
  const handleRestart = () => {
    setCurrentPuzzleIndex(0);
    setScore(0);
    setFeedback('');
    setSelectedAnswer(null);
    setGameState('playing');
  };
  
  const getButtonClass = (option: string) => {
    if (!feedback) return "secondary";

    if (option === currentPuzzle.answer) {
      return "bg-green-600 hover:bg-green-700 text-white";
    }
    
    if (option === selectedAnswer && feedback === 'incorrect') {
      return "bg-red-600 hover:bg-red-700 text-white";
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
              {feedback === 'correct' && (
                <div className="animate-in fade-in">
                    <p className="text-lg font-bold text-green-500">Correct!</p>
                    <p className="text-sm text-muted-foreground">{currentPuzzle.explanation}</p>
                </div>
              )}
              {feedback === 'incorrect' && (
                <div className="animate-in fade-in">
                    <p className="text-lg font-bold text-red-500">Not quite.</p>
                    <p className="text-sm text-muted-foreground">The correct answer is <span className="font-bold text-primary">{currentPuzzle.answer}</span>. {currentPuzzle.explanation}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 animate-in fade-in">
            <div className="text-2xl font-bold">Puzzle Set Complete!</div>
            <p className="text-xl">Your final score is: <span className="font-bold text-primary">{score} out of {puzzles.length}</span></p>
            <Button onClick={handleRestart} size="lg">Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
