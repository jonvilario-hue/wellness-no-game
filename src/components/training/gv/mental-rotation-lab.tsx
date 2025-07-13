
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { View } from "lucide-react";

const shapes = [
  // L-shape
  [[1,0,0], [1,0,0], [1,1,0]],
  // T-shape
  [[1,1,1], [0,1,0], [0,1,0]],
  // S-shape
  [[0,1,1], [1,1,0], [0,0,0]],
  // Plus-shape
  [[0,1,0], [1,1,1], [0,1,0]],
  // Asymmetric U
  [[1,0,1], [1,1,1], [0,0,0]],
  // Skew shape
  [[1,1,0], [0,1,1], [0,0,0]],
];

type Grid = number[][];
type Puzzle = { baseShape: Grid; answer: Grid; options: Grid[] };

const rotateGrid = (grid: Grid): Grid => {
  const n = grid.length;
  const newGrid = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      newGrid[i][j] = grid[n - 1 - j][i];
    }
  }
  return newGrid;
};

const flipGridHorizontal = (grid: Grid): Grid => {
  return grid.map(row => [...row].reverse());
};

const areGridsEqual = (grid1: Grid, grid2: Grid) => {
  return JSON.stringify(grid1) === JSON.stringify(grid2);
};

const generatePuzzle = (): Puzzle => {
  const baseShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  let targetShape = baseShape;
  const rotations = Math.floor(Math.random() * 4);
  for (let i = 0; i < rotations; i++) {
    targetShape = rotateGrid(targetShape);
  }

  const options = [targetShape];
  
  // Add a mirror image distractor
  let mirrorImage = flipGridHorizontal(baseShape);
  const mirrorRotations = Math.floor(Math.random() * 4);
  for (let i = 0; i < mirrorRotations; i++) {
    mirrorImage = rotateGrid(mirrorImage);
  }
  options.push(mirrorImage);

  // Add different shape distractors
  while (options.length < 4) {
    let distractor = shapes[Math.floor(Math.random() * shapes.length)];
    // Ensure distractor is not the same as the base shape
    if (areGridsEqual(distractor, baseShape)) continue;
    
    const distractorRotations = Math.floor(Math.random() * 4);
     for (let i = 0; i < distractorRotations; i++) {
        distractor = rotateGrid(distractor);
    }
    
    // Ensure we don't accidentally create the answer or a duplicate
    const isDuplicate = options.some(opt => areGridsEqual(opt, distractor));
    if (!isDuplicate) {
        options.push(distractor);
    }
  }
  
  options.sort(() => Math.random() - 0.5);
  
  return { baseShape, answer: targetShape, options: options.slice(0, 4) };
};

const ShapeGrid = ({ grid }: { grid: Grid }) => (
  <div className="grid grid-cols-3 gap-1">
    {grid.flat().map((cell, index) => (
      <div 
        key={index} 
        className={cn(
          "w-6 h-6 rounded-sm transition-colors", 
          cell ? 'bg-primary' : 'bg-muted/50'
        )} 
      />
    ))}
  </div>
);

export function MentalRotationLab() {
  const [puzzleKey, setPuzzleKey] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Grid | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');
  
  const puzzle = useMemo(() => generatePuzzle(), [puzzleKey]);

  const handleSelectOption = (option: Grid) => {
    if (feedback) return;
    setSelectedOption(option);
    if (areGridsEqual(option, puzzle.answer)) {
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
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
            <View />
            Mental Rotation Lab
        </CardTitle>
        <CardDescription>Which of the shapes below is a rotated version of the target shape?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div>
          <h3 className="text-center font-semibold mb-2">Target Shape</h3>
          <div className="p-4 bg-muted rounded-lg inline-block">
             <ShapeGrid grid={puzzle.baseShape} />
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-center font-semibold mb-3">Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {puzzle.options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleSelectOption(option)}
                className={cn(
                  "p-4 rounded-lg flex items-center justify-center transition-all border-2",
                  selectedOption === option ? 'border-primary scale-105 bg-muted' : 'border-transparent hover:border-muted-foreground/50 bg-muted/50',
                  feedback && areGridsEqual(option, puzzle.answer) && 'bg-green-500/20 border-green-500',
                  feedback === 'incorrect' && selectedOption === option && !areGridsEqual(option, puzzle.answer) && 'bg-destructive/20 border-destructive',
                )}
                disabled={!!feedback}
              >
                <ShapeGrid grid={option} />
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="flex flex-col items-center gap-4 mt-4 text-center">
             {feedback === 'correct' && <p className="text-lg font-bold text-green-500">Correct! Perfect rotation.</p>}
            {feedback === 'incorrect' && <p className="text-lg font-bold text-destructive">That's not a pure rotation. It might be a mirror image.</p>}
            <Button onClick={handleNextPuzzle}>Next Puzzle</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
