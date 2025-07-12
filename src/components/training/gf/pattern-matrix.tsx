'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from 'react';
import { cn } from "@/lib/utils";

// --- Puzzle Elements ---
const shapes = ['circle', 'square', 'triangle', 'diamond'];
const colors = ['bg-primary', 'bg-accent', 'bg-green-500', 'bg-yellow-500'];
const rotations = [0, 90, 180, 270];

const generateElement = () => ({
  shape: shapes[Math.floor(Math.random() * shapes.length)],
  color: colors[Math.floor(Math.random() * colors.length)],
  rotation: rotations[Math.floor(Math.random() * rotations.length)],
});

// --- Puzzle Generation Logic ---
type Element = { shape: string; color: string; rotation: number; };
type Grid = (Element | null)[];

const rules = [
  'row_progression', 
  'column_progression',
];

const generatePuzzle = () => {
  const size = Math.random() > 0.5 ? 3 : 2; // 3x3 or 2x2 grid
  const grid: Grid = Array(size * size).fill(null);
  const rule = rules[Math.floor(Math.random() * rules.length)];
  const missingIndex = Math.floor(Math.random() * (size * size));

  let progressionProp: 'shape' | 'color' | 'rotation' = 'shape';
  if (Math.random() > 0.66) progressionProp = 'rotation';
  else if (Math.random() > 0.33) progressionProp = 'color';
  
  const baseElement = generateElement();

  const getNextInSequence = (val: any, prop: typeof progressionProp) => {
    let collection = shapes;
    if (prop === 'color') collection = colors as any[];
    if (prop === 'rotation') collection = rotations as any[];
    
    const currentIndex = collection.indexOf(val as never);
    return collection[(currentIndex + 1) % collection.length];
  }

  for (let i = 0; i < size * size; i++) {
    const row = Math.floor(i / size);
    const col = i % size;
    let newElement = { ...baseElement };

    if (rule === 'row_progression') {
      let currentVal = newElement[progressionProp];
      for(let j=0; j < col; j++) {
        currentVal = getNextInSequence(currentVal, progressionProp);
      }
      (newElement[progressionProp] as any) = currentVal;
    } else if (rule === 'column_progression') {
       let currentVal = newElement[progressionProp];
      for(let j=0; j < row; j++) {
         currentVal = getNextInSequence(currentVal, progressionProp);
      }
      (newElement[progressionProp] as any) = currentVal;
    }
    grid[i] = newElement;
  }

  const answer = grid[missingIndex]!;
  
  // Generate decoy options
  const options = [answer];
  while(options.length < 6) {
    const decoy = { ...answer };
    const changeProp = ['shape', 'color', 'rotation'][Math.floor(Math.random()*3)] as 'shape' | 'color' | 'rotation';
    decoy[changeProp] = getNextInSequence(decoy[changeProp], changeProp);
    if (!options.some(o => JSON.stringify(o) === JSON.stringify(decoy))) {
      options.push(decoy);
    }
  }
  
  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  return { grid, missingIndex, answer, options, size };
};

// --- Components ---
const ShapeComponent = ({ shape, color, rotation }: Element) => {
  const baseClasses = "w-10 h-10 transition-all";
  const transformClass = `transform rotate-[${rotation}deg]`;
  
  switch (shape) {
    case 'circle': return <div className={cn(baseClasses, color, "rounded-full")} />;
    case 'square': return <div className={cn(baseClasses, color, "rounded-md", transformClass)} />;
    case 'triangle':
        const triangleColorClass = color.replace('bg-','border-b-');
        return <div style={{width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottomWidth: '40px', borderBottomStyle: 'solid' }} className={cn(baseClasses, transformClass, triangleColorClass, 'bg-transparent')} />;
    case 'diamond': return <div className={cn(baseClasses, color, "transform rotate-45 rounded-sm")} />;
    default: return <div className={cn(baseClasses, color)} />;
  }
};


export function PatternMatrix() {
  const [puzzleKey, setPuzzleKey] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Element | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');

  const puzzle = useMemo(() => generatePuzzle(), [puzzleKey]);

  const handleSelectOption = (option: Element) => {
    if (feedback) return;
    setSelectedOption(option);
    if (JSON.stringify(option) === JSON.stringify(puzzle.answer)) {
      setFeedback('correct');
      setScore(score + 1);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNextPuzzle = () => {
    setPuzzleKey(prevKey => prevKey + 1);
    setSelectedOption(null);
    setFeedback('');
  };

  const gridClass = puzzle.size === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Pattern Matrix</CardTitle>
        <CardDescription>Identify the logical rule and find the missing piece.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="flex justify-between w-full font-mono text-sm">
            <span>Puzzle: {puzzleKey + 1}</span>
            <span>Score: {score}</span>
        </div>
        <div className={cn("grid gap-2 p-3 bg-muted rounded-lg", gridClass)}>
          {puzzle.grid.map((cell, index) => (
            <div key={index} className="w-20 h-20 bg-background/50 rounded-md flex items-center justify-center">
              {index === puzzle.missingIndex ? (
                 feedback === 'correct' ? <ShapeComponent {...puzzle.answer!} /> : <span className="text-4xl font-bold text-primary">?</span>
              ) : (
                <ShapeComponent {...cell!} />
              )}
            </div>
          ))}
        </div>

        <div className="w-full">
          <h3 className="text-center text-sm text-muted-foreground font-semibold mb-3">Choose the correct piece:</h3>
          <div className="grid grid-cols-3 gap-3">
            {puzzle.options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleSelectOption(option)}
                className={cn(
                  "h-24 bg-muted/50 rounded-lg flex items-center justify-center transition-all border-2",
                  selectedOption === option ? 'border-primary scale-105' : 'border-transparent hover:border-muted-foreground/50',
                  feedback && JSON.stringify(option) === JSON.stringify(puzzle.answer) && 'bg-green-500/20 border-green-500',
                  feedback && selectedOption === option && feedback === 'incorrect' && 'bg-destructive/20 border-destructive',
                )}
                disabled={!!feedback}
              >
                <ShapeComponent {...option} />
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="flex flex-col items-center gap-4 mt-4 text-center animate-in fade-in">
             {feedback === 'correct' && <p className="text-lg font-bold text-green-500">Correct!</p>}
            {feedback === 'incorrect' && <p className="text-lg font-bold text-destructive">Not quite. Look for another pattern.</p>}
            <Button onClick={handleNextPuzzle}>Next Puzzle</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
