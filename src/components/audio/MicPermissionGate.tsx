
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, ShieldAlert } from 'lucide-react';

export function MicPermissionGate({ 
  onGranted, 
  children 
}: { 
  onGranted: () => void; 
  children: React.ReactNode 
}) {
  const [status, setStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  const request = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatus('granted');
      onGranted();
    } catch (err) {
      setStatus('denied');
    }
  };

  if (status === 'granted') return <>{children}</>;

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 animate-in fade-in duration-500">
      <div className="p-6 bg-primary/10 rounded-full">
        <Mic className="w-12 h-12 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-headline uppercase tracking-tight">Microphone Access Required</h2>
        <p className="text-muted-foreground max-w-sm">
          This drill uses real-time pitch detection to help you sharpen your intonation and vocal control.
        </p>
      </div>
      {status === 'denied' ? (
        <div className="flex items-center gap-2 text-destructive font-bold p-4 bg-destructive/5 rounded-lg border border-destructive/10">
          <ShieldAlert className="w-5 h-5" />
          Access Denied. Please enable microphone permissions in your browser settings to continue.
        </div>
      ) : (
        <Button onClick={request} size="lg" className="px-8 font-bold shadow-lg shadow-primary/20">
          Grant Microphone Access
        </Button>
      )}
    </div>
  );
}
