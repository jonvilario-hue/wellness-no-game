
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
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
                    <SlidersHorizontal className="h-7 w-7 text-primary" />
                    <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
                    Settings
                    </h1>
                </div>
                 <div className="flex-1"></div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-2xl space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customize Dashboard</CardTitle>
                  <CardDescription>
                    This feature is currently disabled.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Dashboard component visibility will be re-enabled in a future update.</p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      );
}
