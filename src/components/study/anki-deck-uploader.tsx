'use client';

import { useState, useCallback } from 'react';
import { useFirebase, useMemoFirebase, useDoc } from '@/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, collection, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AnkiDeckUploader() {
  const { user, storage, firestore } = useFirebase();
  const { toast } = useToast();
  
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);

  const { data: profile } = useDoc(userProfileRef);

  const handleUpload = async (file: File) => {
    if (!user || !storage || !firestore) return;

    // 1. Validation
    if (!file.name.endsWith('.apkg')) {
      toast({
        title: "Invalid File",
        description: "Please upload Anki deck files in .apkg format.",
        variant: "destructive"
      });
      return;
    }

    const quota = profile?.storageQuotaBytes || 10485760; // Default 10MB
    const used = profile?.storageUsedBytes || 0;

    if (used + file.size > quota) {
      toast({
        title: "Quota Exceeded",
        description: `You only have ${Math.round((quota - used) / 1024 / 1024)}MB remaining.`,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setProgress(0);

    const deckId = crypto.randomUUID();
    const storageRef = ref(storage, `users/${user.uid}/anki-decks/${deckId}.apkg`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        console.error(error);
        setIsUploading(false);
        toast({ title: "Upload Failed", description: "Storage rejection. Check rules or connection.", variant: "destructive" });
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        
        // 2. Create Metadata
        const deckRef = doc(firestore, 'users', user.uid, 'anki-decks', deckId);
        await setDoc(deckRef, {
          id: deckId,
          userId: user.uid,
          fileName: file.name,
          displayName: file.name.replace('.apkg', ''),
          description: "Uploaded Anki Deck",
          fileSize: file.size,
          downloadUrl,
          uploadedAt: new Date().toISOString()
        });

        // 3. Update User Metrics
        await updateDoc(userProfileRef!, {
          storageUsedBytes: increment(file.size),
          deckCount: increment(1)
        });

        setIsUploading(false);
        toast({ title: "Deck Uploaded!", variant: "success" });
      }
    );
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const usagePercent = profile ? (profile.storageUsedBytes / profile.storageQuotaBytes) * 100 : 0;

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Cloud Anki Vault</CardTitle>
            <CardDescription>Upload .apkg files for voice acting drills.</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Storage Usage</p>
            <Badge variant="outline" className={cn("font-bold", usagePercent > 90 && "text-destructive border-destructive")}>
              {Math.round((profile?.storageUsedBytes || 0) / 1024 / 1024)}MB / 10MB
            </Badge>
          </div>
        </div>
        <Progress value={usagePercent} className="h-1.5 mt-2" />
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-10 transition-all cursor-pointer",
            isDragging ? "bg-primary/5 border-primary" : "border-muted-foreground/20 hover:bg-muted/30"
          )}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
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
              <div className="space-y-1">
                <p className="text-sm font-bold">Syncing with cloud...</p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <p className="font-bold">Drop .apkg here</p>
              <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
