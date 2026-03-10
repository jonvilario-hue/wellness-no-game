'use client';

import { Suspense, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { SettingsContent } from './settings-content';

export default function SettingsPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <>
            <div className="sticky top-0 z-20">
                <Header />
                <PageNav />
            </div>
            <MotivationalMessage />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="mx-auto max-w-5xl">
                    <Suspense fallback={
                        <div className="flex h-[400px] items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    }>
                        <SettingsContent />
                    </Suspense>
                </div>
            </main>
        </>
    );
}
