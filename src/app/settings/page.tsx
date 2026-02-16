export const dynamic = "force-dynamic";
'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { Sliders, User, Palette, ListChecks, Clock, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrainingSettings } from '@/components/settings/training-settings';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { TrackerSettings } from '@/components/settings/tracker-settings';
import { PlaceholderSettings } from '@/components/settings/placeholder-settings';
import { TimeToolsModule } from '@/components/dashboard/time-tools-module';

function SettingsContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'training';

    return (
        <Tabs defaultValue={tab} orientation="vertical" className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <TabsList className="flex flex-col h-auto justify-start items-stretch p-2 space-y-1 bg-muted/50 rounded-lg w-full">
                <TabsTrigger value="training" className="justify-start gap-2">
                <Sliders className="h-4 w-4"/> Game Trainer
                </TabsTrigger>
                 <TabsTrigger value="trackers" className="justify-start gap-2">
                <ListChecks className="h-4 w-4"/> Trackers
                </TabsTrigger>
                <TabsTrigger value="appearance" className="justify-start gap-2">
                <Palette className="h-4 w-4"/> Appearance
                </TabsTrigger>
                <TabsTrigger value="time" className="justify-start gap-2">
                <Clock className="h-4 w-4"/> Clock Tools
                </TabsTrigger>
                <TabsTrigger value="account" className="justify-start gap-2" disabled>
                <User className="h-4 w-4"/> Account
                </TabsTrigger>
            </TabsList>

            <div className="col-span-1 md:col-span-3">
                <TabsContent value="training">
                <TrainingSettings />
                </TabsContent>
                 <TabsContent value="trackers">
                <TrackerSettings />
                </TabsContent>
                <TabsContent value="appearance">
                <AppearanceSettings />
                </TabsContent>
                <TabsContent value="time">
                    <TimeToolsModule />
                </TabsContent>
                <TabsContent value="account">
                <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your profile, subscription, and data.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PlaceholderSettings title="Account Management" description="This feature is not yet available."/>
                        </CardContent>
                </Card>
                </TabsContent>
            </div>
        </Tabs>
    );
}

export default function SettingsPage() {
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
