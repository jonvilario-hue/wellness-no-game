
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from 'react';
import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";
import { useTrainingFocus } from "@/hooks/use-training-focus";
import { useTrainingOverride } from "@/hooks/use-training-override";

// --- Neutral Mode Components ---
const shapes = ['circle', 'square', 'triangle', 'diamond'];
const colors = ['bg-primary', 'bg-accent', 'bg-chart-3', 'bg-chart-4'];
const rotations = [0, 90, 180, 270];
const fills = ['fill', 'outline'];

type NeutralElement = { shape: string; color: string; rotation: number; fill: 'fill' | 'outline' };
const getNextInSequence = <T,>(val: T, collection: T[]) => {
  const currentIndex = collection.indexOf(val);
  return collection[(currentIndex + 1) % collection.length];
};
const generateNeutralElement = (): NeutralElement => ({
  shape: shapes[Math.floor(Math.random() * shapes.length)],
  color: colors[Math.floor(Math.random() * colors.length)],
  rotation: rotations[Math.floor(Math.random() * rotations.length)],
  fill: fills[Math.floor(Math.random() * fills.length)] as 'fill' | 'outline',
});

// --- Math Mode Components ---
type MathElement = { value: number };
const mathOperators = [(a: number) => a + 2, (a: number) => a * 2, (a: number) => a - 3, (a: number) => Math.floor(a / 2)];
const generateMathElement = (): MathElement => ({ value: Math.floor(Math.random() * 10) + 1 });

// --- Unified Puzzle Types ---
type PuzzleElement = NeutralElement | MathElement;
type Grid = (PuzzleElement | null)[];
type Puzzle = { grid: Grid; missingIndex: number; answer: PuzzleElement; options: PuzzleElement[]; size: number, mode: 'neutral' | 'math' };


const generatePuzzle = (mode: 'neutral' | 'math'): Puzzle => {
  const size = 3;
  const grid: Grid = Array(size * size).fill(null);
  const missingIndex = Math.floor(Math.random() * (size * size));

  if (mode === 'neutral') {
    // Row/Column Progression Rule for Neutral Mode
    const rules: ('row_progression' | 'column_progression')[] = ['row_progression', 'column_progression'];
    const rule = rules[Math.floor(Math.random() * rules.length)];
    const progressionProp: keyof Omit<NeutralElement, 'toString'> = ['shape', 'color', 'rotation', 'fill'][Math.floor(Math.random() * 4)] as any;
    const baseElement = generateNeutralElement();
    
    for (let i = 0; i < size * size; i++) {
      const row = Math.floor(i / size);
      const col = i % size;
      let newElement = { ...baseElement };
      const progressionIndex = rule === 'row_progression' ? col : row;
      
      let currentVal: any = newElement[progressionProp];
      const collection = { shape: shapes, color: colors, rotation: rotations, fill: fills }[progressionProp];

      for (let j = 0; j < progressionIndex; j++) {
        currentVal = getNextInSequence(currentVal, collection as any[]);
      }
      (newElement[progressionProp] as any) = currentVal;
      grid[i] = newElement;
    }
  } else { // Math Mode
    // Row/Column Arithmetic Rule for Math Mode
    const rules = ['row_add', 'col_add', 'row_op', 'col_op'];
    const rule = rules[Math.floor(Math.random() * rules.length)];
    
    if (rule === 'row_add' || rule === 'col_add') { // C = A + B
        for (let i = 0; i < size; i++) {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            if(rule === 'row_add') {
                grid[i*size] = { value: a };
                grid[i*size + 1] = { value: b };
                grid[i*size + 2] = { value: a + b };
            } else { // col_add
                grid[i] = { value: a };
                grid[i + size] = { value: b };
                grid[i + 2*size] = { value: a + b };
            }
        }
    } else { // row_op or col_op (A -> B -> C)
        const op = mathOperators[Math.floor(Math.random() * mathOperators.length)];
        for (let i = 0; i < size; i++) {
            const startVal = Math.floor(Math.random() * 10) + 5;
            const secondVal = op(startVal);
            const thirdVal = op(secondVal);
            if (rule === 'row_op') {
                grid[i*size] = { value: startVal };
                grid[i*size + 1] = { value: secondVal };
                grid[i*size + 2] = { value: thirdVal };
            } else { // col_op
                grid[i] = { value: startVal };
                grid[i + size] = { value: secondVal };
                grid[i + 2*size] = { value: thirdVal };
            }
        }
    }
  }

  const answer = grid[missingIndex]!;
  
  const options = [answer];
  while(options.length < 6) {
    let decoy: PuzzleElement;
    if(mode === 'neutral') {
      const tempDecoy = { ...(answer as NeutralElement) };
      const changeProp = ['shape', 'color', 'rotation', 'fill'][Math.floor(Math.random() * 4)] as keyof NeutralElement;
      const collection = { shape: shapes, color: colors, rotation: rotations, fill: fills }[changeProp];
      (tempDecoy[changeProp] as any) = getNextInSequence(tempDecoy[changeProp], collection as any[]);
      decoy = tempDecoy;
    } else { // Math mode decoy
      decoy = { value: (answer as MathElement).value + (Math.floor(Math.random() * 5) - 2) * (Math.random() > 0.5 ? 1 : -1) || 1 };
    }
    
    if (!options.some(o => JSON.stringify(o) === JSON.stringify(decoy))) {
      options.push(decoy);
    }
  }
  
  options.sort(() => Math.random() - 0.5);
  grid[missingIndex] = null;
  return { grid, missingIndex, answer, options, size, mode };
};

const ShapeComponent = ({ shape, color, rotation, fill }: NeutralElement) => {
  const baseClasses = "w-10 h-10 transition-all";
  const style = { transform: `rotate(${rotation}deg)` };
  const outlineClasses = `bg-transparent border-4 ${color.replace('bg-','border-')}`;

  switch (shape) {
    case 'circle': return <div className={cn(baseClasses, "rounded-full", fill === 'fill' ? color : outlineClasses)} style={style} />;
    case 'square': return <div className={cn(baseClasses, "rounded-md", fill === 'fill' ? color : outlineClasses)} style={style} />;
    case 'triangle':
        const triangleColorClass = color.replace('bg-', 'border-b-');
        const triangleStyle = { ...style, width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottomWidth: '40px', borderBottomStyle: 'solid' };
        if (fill === 'fill') return <div style={triangleStyle} className={cn("!bg-transparent", triangleColorClass, 'h-auto w-auto')} />;
        return <div className="w-10 h-10" style={style}> <svg viewBox="0 0 100 100" className={`fill-transparent ${color.replace('bg-', 'stroke-')}`} strokeWidth="10"><polygon points="50,10 90,90 10,90" /></svg></div>
    case 'diamond': return <div className={cn(baseClasses, "transform rotate-45 rounded-sm", fill === 'fill' ? color : outlineClasses)} style={{ transform: `rotate(${rotation + 45}deg)` }}/>;
    default: return <div className={cn(baseClasses, color)} />;
  }
};

const MathComponent = ({ value }: MathElement) => {
    return (
        <span className="text-4xl font-bold text-primary font-mono">{value}</span>
    )
}

const ElementDisplay = ({ element }: { element: PuzzleElement }) => {
    if ('value' in element) {
        return <MathComponent {...element} />;
    }
    return <ShapeComponent {...element} />;
};


export function PatternMatrix() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [puzzleKey, setPuzzleKey] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<PuzzleElement | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');
  const { focus: globalFocus, isLoaded: isGlobalFocusLoaded } = useTrainingFocus();
  const { override, isLoaded: isOverrideLoaded } = useTrainingOverride();

  const isLoaded = isGlobalFocusLoaded && isOverrideLoaded;
  const currentMode = isLoaded ? (override || globalFocus) : 'neutral';

  const restartGame = () => {
    setPuzzle(generatePuzzle(currentMode));
    setPuzzleKey(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback('');
  };

  const handleNextPuzzle = () => {
    setPuzzle(generatePuzzle(currentMode));
    setPuzzleKey(prevKey => prevKey + 1);
    setSelectedOption(null);
    setFeedback('');
  };

  useEffect(() => {
    if (isLoaded) {
      restartGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, currentMode]);

  const handleSelectOption = (option: PuzzleElement) => {
    if (feedback || !puzzle) return;
    setSelectedOption(option);
    if (JSON.stringify(option) === JSON.stringify(puzzle.answer)) {
      setFeedback('correct');
      setScore(score + 1);
    } else {
      setFeedback('incorrect');
    }
  };

  if (!puzzle || !isLoaded) {
    return (
      <Card className="w-full max-w-md text-center">
         <CardContent className="flex items-center justify-center h-48">
          <p>Loading puzzle...</p>
        </CardContent>
      </Card>
    );
  }

  const gridClass = "grid-cols-3";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
            <BrainCircuit />
            (Gf) Pattern Matrix
        </CardTitle>
        <CardDescription className="text-center">Identify the logical rule and find the missing piece.</CardDescription>
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
                 feedback === 'correct' ? <ElementDisplay element={puzzle.answer} /> : <span className="text-4xl font-bold text-primary">?</span>
              ) : (
                cell ? <ElementDisplay element={cell} /> : null
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
                  feedback === 'incorrect' && selectedOption === option && 'bg-destructive/20 border-destructive',
                )}
                disabled={!!feedback}
              >
                <ElementDisplay element={option} />
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
