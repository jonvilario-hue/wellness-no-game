
'use client';

import { ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FocusView } from '@/components/focus/focus-view';

export default function FocusPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
           <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card sticky top-0 z-10">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <div className="flex-1 flex justify-start">
                  <Button asChild variant="outline">
                      <Link href="/">
                      <ArrowLeft className="mr-2" />
                      Back to Dashboard
                      </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                    <Star className="h-7 w-7 text-primary" />
                    <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
                    Focus Tracker
                    </h1>
                </div>
                 <div className="flex-1 flex justify-end">
                 </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-5xl">
                <FocusView />
            </div>
          </main>
        </div>
      );
}
