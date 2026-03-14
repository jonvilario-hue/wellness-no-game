'use client';

import { useState } from 'react';
import { useSrsUser, srsUploadAnki } from '@/lib/game/srs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, Loader2, Music, ImageIcon, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AnkiDeckUploader() {
  const { user } = useSrsUser();
  const { toast } = useToast();
  
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file: File) => {
    if (!user) {
      toast({ title: "Auth Required", description: "Signing you in anonymously...", variant: 'default' });
      return;
    }

    if (!file.name.endsWith('.apkg')) {
      toast({ title: "Invalid File", description: "Please upload .apkg files.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      await srsUploadAnki(user.uid, file, (p) => setProgress(p));
      toast({ title: "Deck Uploaded!", variant: "success" });
    } catch (err) {
      toast({ title: "Upload Failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Cloud Anki Vault</CardTitle>
        <CardDescription>Upload .apkg files for voice acting drills. Supports embedded audio and images.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-10 transition-all cursor-pointer",
            isDragging ? "bg-primary/5 border-primary" : "border-muted-foreground/20 hover:bg-muted/30"
          )}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if(f) handleUpload(f); }}
          onClick={() => !isUploading && document.getElementById('anki-file-input')?.click()}
        >
          <input
            type="file"
            id="anki-file-input"
            className="hidden"
            accept=".apkg"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
          {isUploading ? (
            <div className="w-full space-y-4 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
              <Progress value={progress} className="h-2" />
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <p className="font-bold">Drop .apkg here</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-xl border flex items-start gap-3">
            <Music className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Audio tags detected and converted into playable controls.
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl border flex items-start gap-3">
            <ImageIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Images extracted and stored as optimized local references.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
