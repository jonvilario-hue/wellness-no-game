'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eraser, Pencil, Trash2, Save, Image as ImageIcon, Download } from 'lucide-react';
import { useScholarStore } from '@/hooks/use-scholar-store';
import { useToast } from '@/hooks/use-toast';

export function VisualPairingTool() {
  const [concept, setConcept] = useState('');
  const [color, setColor] = useState('#4f46e5');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addVisualPair, visualPairs } = useScholarStore();
  const { toast } = useToast();

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
      toast({ title: "Concept required", description: "Please name the concept before saving." });
      return;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      addVisualPair({ concept, image });
      toast({ title: "Pair Saved", variant: "success" });
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label>Concept Description</Label>
          <textarea
            className="w-full h-[400px] p-4 rounded-lg border bg-background resize-none focus:ring-2 ring-primary"
            placeholder="Explain the concept in words here..."
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Visual Representation</Label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer"
              />
              <Button variant="outline" size="icon" onClick={clearCanvas}><Trash2 className="h-4 w-4"/></Button>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full h-[400px] border-2 border-dashed rounded-lg bg-white cursor-crosshair touch-none"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button size="lg" className="px-12 h-14 text-lg" onClick={handleSave}>
          <Save className="mr-2 h-5 w-5" /> Save Visual-Verbal Pair
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-indigo-500" />
          Your Visual Vault
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visualPairs.map((pair) => (
            <Card key={pair.id} className="overflow-hidden group">
              <div className="aspect-video relative overflow-hidden bg-white border-b">
                <img src={pair.image} alt={pair.concept} className="w-full h-full object-contain p-2" />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-sm line-clamp-2">{pair.concept}</CardTitle>
                <CardDescription>{new Date(pair.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
