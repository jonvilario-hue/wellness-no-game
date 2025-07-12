'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shapes, Check, X, BrainCircuit } from "lucide-react";
import { useState, useMemo } from 'react';
import { cn } from "@/lib/utils";

// --- Puzzle Generation Logic ---
const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
const transformations = ['rotate-45', 'scale-75', 'opacity-50', ''];

const generateCell = () => ({
  shape: shapes[Math.floor(Math.random() * shapes.length)],
  color: colors[Math.floor(Math.random() * colors.length)],
  transform: transformations[Math.floor(Math.random() * transformations.length)],
});

const generatePuzzle = () => {
  const grid = Array(9).fill(null).map(() => generateCell());
  const missingIndex = Math.floor(Math.random() * 9);
  const answer = grid[missingIndex];
  
  const options = [answer];
  while(options.length < 6) {
    const option = generateCell();
    // Ensure no duplicate options
    if (!options.some(o => o.shape === option.shape && o.color === option.color && o.transform === option.transform)) {
      options.push(option);
    }
  }
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return { grid, missingIndex, answer, options };
};
// --- End Puzzle Generation ---

const ShapeComponent = ({ shape, color, transform }: { shape: string, color: string, transform: string }) => {
  const baseClasses = "w-12 h-12 transition-all";
  const transformClasses = transform;
  
  switch (shape) {
    case 'circle': return <div className={cn(baseClasses, color, transformClasses, "rounded-full")} />;
    case 'square': return <div className={cn(baseClasses, color, transformClasses, "rounded-md")} />;
    case 'triangle': return <div className={cn(baseClasses, transformClasses)} style={{ width: 0, height: 0, backgroundColor: 'transparent', borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: `60px solid var(--triangle-color, ${color.replace('bg-', 'hsl(var(--'))})` }} />;
    case 'diamond': return <div className={cn(baseClasses, color, "rotate-45 rounded-md")} />;
    case 'star': return <div className={cn(baseClasses, transformClasses, "text-yellow-400")}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg></div>;
    default: return <div className={cn(baseClasses, color)} />;
  }
};


export function PatternMatrix() {
  const [puzzleKey, setPuzzleKey] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');

  const puzzle = useMemo(() => generatePuzzle(), [puzzleKey]);

  const handleSelectOption = (option: any) => {
    if (feedback) return;
    setSelectedOption(option);
    if (option.shape === puzzle.answer.shape && option.color === puzzle.answer.color && option.transform === puzzle.answer.transform) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNextPuzzle = () => {
    setPuzzleKey(prevKey => prevKey + 1);
    setSelectedOption(null);
    setFeedback('');
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Pattern Matrix</CardTitle>
        <CardDescription>Identify the logical rule and find the missing piece.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="grid grid-cols-3 gap-2 p-4 bg-muted rounded-lg">
          {puzzle.grid.map((cell, index) => (
            <div key={index} className="w-20 h-20 bg-background/50 rounded-md flex items-center justify-center">
              {index === puzzle.missingIndex ? (
                 feedback === 'correct' ? <ShapeComponent {...puzzle.answer} /> : <span className="text-4xl font-bold text-primary">?</span>
              ) : (
                <ShapeComponent {...cell} />
              )}
            </div>
          ))}
        </div>

        <div className="w-full">
          <h3 className="text-center font-semibold mb-3">Choose the correct piece:</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {puzzle.options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleSelectOption(option)}
                className={cn(
                  "h-24 rounded-lg flex items-center justify-center transition-all border-2",
                  selectedOption === option ? 'border-primary scale-105' : 'border-transparent hover:border-muted-foreground/50',
                  feedback && option === selectedOption && feedback === 'correct' && 'bg-green-500/20 border-green-500',
                  feedback && option === selectedOption && feedback === 'incorrect' && 'bg-red-500/20 border-red-500',
                )}
                disabled={!!feedback}
              >
                <ShapeComponent {...option} />
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="flex flex-col items-center gap-4 mt-4 text-center">
             {feedback === 'correct' && <p className="text-lg font-bold text-green-500">Correct! You found the pattern.</p>}
            {feedback === 'incorrect' && <p className="text-lg font-bold text-red-500">Not quite. Try to see another pattern.</p>}
            <Button onClick={handleNextPuzzle}>Next Puzzle</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
