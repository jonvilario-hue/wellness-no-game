'use client';

import { useState, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Loader2, BookOpen, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveCustomPassages } from '@/lib/indexedDBUtils';
import type { ReadingPassage, ReadingTier, ReadingDifficulty } from '@/types/speedreading';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: () => void;
}

export function CustomTextImportModal({ open, onOpenChange, onImportComplete }: Props) {
  const [step, setStep] = useState<'upload' | 'config'>('upload');
  const [fileType, setFileType] = useState<'json' | 'txt' | null>(null);
  const [rawData, setRawData] = useState<string>('');
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Configuration state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tier, setTier] = useState<ReadingTier>('Casual');
  const [difficulty, setDifficulty] = useState<ReadingDifficulty>('Intermediate');
  const [previewPassages, setPreviewPassages] = useState<Partial<ReadingPassage>[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStep('upload');
    setFileType(null);
    setRawData('');
    setError(null);
    setTitle('');
    setAuthor('');
    setTier('Casual');
    setDifficulty('Intermediate');
    setPreviewPassages([]);
  };

  const handleFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max file size is 5MB.", variant: "destructive" });
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'json' && extension !== 'txt') {
      toast({ title: "Unsupported format", description: "Only .json and .txt files are allowed.", variant: "destructive" });
      return;
    }

    setIsParsing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text.trim()) {
        toast({ title: "Empty file", description: "The uploaded file contains no text.", variant: "destructive" });
        setIsParsing(false);
        return;
      }

      setRawData(text);
      if (extension === 'json') {
        handleJsonParse(text);
      } else {
        handleTxtParse(text, file.name.replace('.txt', ''));
      }
    };
    reader.readAsText(file);
  };

  const handleJsonParse = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      
      const validated = items.map((item: any, idx: number) => {
        const words = item.content?.split(/\s+/).length || 0;
        if (!item.content) throw new Error(`Item ${idx + 1} is missing content.`);
        
        return {
          id: item.id || crypto.randomUUID(),
          title: item.title || `Untitled Import ${idx + 1}`,
          author: item.author || 'Unknown',
          content: item.content,
          wordCount: item.wordCount || words,
          tier: item.category || item.tier || 'Casual',
          difficulty: item.difficulty || 'Intermediate',
          quiz: Array.isArray(item.comprehensionQuestions) ? item.comprehensionQuestions : undefined,
          isCustom: true
        };
      });

      setPreviewPassages(validated);
      setFileType('json');
      setStep('config');
    } catch (err: any) {
      setError(`JSON Error: ${err.message}`);
    } finally {
      setIsParsing(false);
    }
  };

  const handleTxtParse = (text: string, fileName: string) => {
    // Split by double newline into chunks
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const chunks: string[] = [];
    let currentChunk = "";
    let currentCount = 0;

    paragraphs.forEach(para => {
      const words = para.trim().split(/\s+/).length;
      if (currentCount + words > 550 && currentChunk !== "") {
        chunks.push(currentChunk.trim());
        currentChunk = para;
        currentCount = words;
      } else {
        currentChunk += (currentChunk === "" ? "" : "\n\n") + para;
        currentCount += words;
      }
    });
    if (currentChunk) chunks.push(currentChunk.trim());

    setTitle(fileName);
    setFileType('txt');
    setPreviewPassages(chunks.map((content, i) => ({
      content,
      wordCount: content.split(/\s+/).length
    })));
    setStep('config');
    setIsParsing(false);
  };

  const handleFinalize = async () => {
    const finalPassages: ReadingPassage[] = previewPassages.map((p, i) => ({
      id: p.id || crypto.randomUUID(),
      title: fileType === 'txt' ? `${title} - Part ${i + 1}` : (p.title || title),
      author: author || p.author || 'Unknown',
      content: p.content!,
      wordCount: p.wordCount!,
      tier: tier,
      difficulty: difficulty,
      quiz: p.quiz,
      isCustom: true
    }));

    try {
      await saveCustomPassages(finalPassages);
      toast({ title: "Import Successful", description: `${finalPassages.length} passages added to library.`, variant: "success" });
      onImportComplete();
      onOpenChange(false);
      reset();
    } catch (err) {
      toast({ title: "Storage Error", description: "Could not save to IndexedDB. Check browser permissions.", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if(!o) reset(); }}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader { ... { className: "p-6 bg-primary/5 border-b shrink-0" } }>
          <DialogTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Import Material
          </DialogTitle>
          <DialogDescription>Expand your laboratory with custom text or JSON data.</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {step === 'upload' ? (
            <div className="p-12 flex flex-col items-center justify-center space-y-6">
              <div 
                className={cn(
                  "w-full border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 transition-all cursor-pointer",
                  "border-muted-foreground/20 hover:border-primary/40 hover:bg-primary/[0.02]"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-4 bg-primary/10 rounded-full">
                  {isParsing ? <Loader2 className="w-8 h-8 text-primary animate-spin" /> : <FileText className="w-8 h-8 text-primary" />}
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">Click or drag to upload</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Supports .json and .txt (max 5MB)</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".json,.txt" 
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3 w-full animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive font-medium leading-relaxed">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col flex-1 min-h-0">
              <ScrollArea className="flex-1">
                <div className="p-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Global Identity</Label>
                        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Book or Article Title" className="font-bold" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Author</Label>
                        <Input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Original Author" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Content Category</Label>
                        <Select value={tier} onValueChange={(v: ReadingTier) => setTier(v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Narrative">Narrative</SelectItem>
                            <SelectItem value="Technical">Technical</SelectItem>
                            <SelectItem value="Dense Data">Dense Data</SelectItem>
                            <SelectItem value="Casual">Casual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Cognitive Load</Label>
                        <Select value={difficulty} onValueChange={(v: ReadingDifficulty) => setDifficulty(v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" /> Generated Sequence ({previewPassages.length})
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {previewPassages.map((p, i) => (
                        <Card key={i} className="bg-muted/30 border-primary/5 p-4 flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">{p.title || `${title} - Part ${i + 1}`}</p>
                            <p className="text-[9px] text-muted-foreground uppercase">{p.wordCount} Words</p>
                          </div>
                          <Badge variant="outline" className="text-[8px] font-black">{p.quiz ? 'SCORED' : 'UNSCORED'}</Badge>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        <DialogFooter { ... { className: "p-4 border-t bg-muted/5 shrink-0" } }>
          <div className="flex justify-between items-center w-full">
            <Button variant="ghost" onClick={() => step === 'config' ? setStep('upload') : onOpenChange(false)}>
              {step === 'config' ? 'Back' : 'Cancel'}
            </Button>
            {step === 'config' && (
              <Button onClick={handleFinalize} className="gap-2 font-bold px-8 shadow-lg shadow-primary/20">
                <CheckCircle2 className="w-4 h-4" /> Finalize Import
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
