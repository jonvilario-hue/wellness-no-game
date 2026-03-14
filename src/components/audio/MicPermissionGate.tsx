
'use client';

import React from 'react';
import { useMicrophone } from '@/hooks/useMicrophone';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, ShieldAlert, Settings } from 'lucide-react';

interface MicPermissionGateProps {
  children: React.ReactNode;
}

export function MicPermissionGate({ children }: MicPermissionGateProps) {
  const { stream, isPermitted, error, requestPermission } = useMicrophone();

  if (isPermitted && stream) {
    return <>{children}</>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-in fade-in duration-500">
      <Card className="border-primary/20 shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/5 text-center pb-8">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Mic className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-black uppercase tracking-tight">Microphone Access</CardTitle>
          <CardDescription>
            This exercise uses your microphone to detect pitch and analyze your vocal performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          {error ? (
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">{error}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Please go to your browser settings to reset microphone permissions for this site.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-center text-muted-foreground px-4">
              Your audio is processed locally in your browser. No data is sent to any servers.
            </p>
          )}
          
          <Button 
            className="w-full h-12 text-lg font-bold shadow-lg" 
            onClick={() => requestPermission()}
            disabled={isPermitted === false && !!error}
          >
            {error ? (
              <><Settings className="mr-2 h-5 w-5" /> Check Browser Settings</>
            ) : (
              <><Mic className="mr-2 h-5 w-5" /> Enable Microphone</>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
