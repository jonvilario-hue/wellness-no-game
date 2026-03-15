
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ListenRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/skills?tab=music&sub=listen');
  }, [router]);

  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Relocating to Skill Builder...</p>
      </div>
    </div>
  );
}
