
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Trash2, Save, Image as ImageIcon, Pencil } from 'lucide-react';
import { useScholarStore } from '@/hooks/use-scholar-store';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AddToCalendarDialog } from './add-to-calendar-dialog';
import { useTheme } from '@/hooks/use-theme';

export function VisualPairingTool() {
  const [concept, setConcept] = useState('');
  const { theme } = useTheme();
  // Pull the accent color from the active theme
  const themeAccent = `hsl(${theme.colorScheme.accent})`;
  
  const [color, setColor] = useState(themeAccent);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addVisualPair, visualPairs } = useScholarStore();
  const { toast } = useToast();

  // Reset color when theme changes
  useEffect(() => {
    setColor(themeAccent);
  }, [themeAccent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleSave = () => {
    if (!concept.trim()) {
      toast({ title: "Concept required", description: "Please name the concept before saving.", variant: 'destructive' });
      return;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      addVisualPair({ concept, image });
      toast({ title: "Visual-Verbal pair saved to vault!", variant: "success" });
      setConcept('');
      clearCanvas();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Verbal Description</Label>
            {concept.trim() && (
              <AddToCalendarDialog 
                toolId="Visual Pairing" 
                resourceId="visual-pair" 
                resourceName={concept} 
              />
            )}
          </div>
          <textarea
            className="w-full h-[350px] p-4 rounded-xl border-2 bg-card resize-none focus:ring-2 ring-primary border-primary/10 transition-all text-sm leading-relaxed"
            placeholder="Explain the concept in your own words. Why does it work? What are the key rules?"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Visual Representation</Label>
            <div className="flex gap-2 items-center">
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="w-6 h-6 rounded-full cursor-pointer border-none bg-transparent"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={clearCanvas}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          </div>
          <div className="relative group">
            <canvas
              ref={canvasRef}
              width={600}
              height={350}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
              className="w-full h-[350px] border-2 border-dashed rounded-xl bg-white cursor-crosshair touch-none border-primary/10 group-hover:border-primary/30 transition-colors"
            />
            <div className="absolute top-2 right-2 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
              <Pencil className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button size="lg" className="px-12 h-14 text-sm font-bold shadow-lg gap-2" onClick={handleSave}>
          <Save className="h-4 w-4" /> Save Dual-Coded Pair
        </Button>
      </div>

      <Separator className="bg-primary/5" />

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-black tracking-tight uppercase">Visual Vault</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualPairs.length === 0 ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl opacity-30">
              <p className="text-sm font-bold uppercase tracking-widest italic">No dual-coded pairs yet.</p>
            </div>
          ) : (
            visualPairs.map((pair) => (
              <Card key={pair.id} className="overflow-hidden group hover:shadow-md transition-shadow border-primary/5">
                <div className="aspect-video relative overflow-hidden bg-white border-b border-primary/5">
                  <img src={pair.image} alt={pair.concept} className="w-full h-full object-contain p-4" />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm line-clamp-1 leading-tight">{pair.concept}</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase mt-1">
                    {new Date(pair.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
