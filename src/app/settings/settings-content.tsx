
'use client';

import { User, Palette, ListChecks, Clock, Database, Moon, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrackerSettings } from '@/components/settings/tracker-settings';
import { PlaceholderSettings } from '@/components/settings/placeholder-settings';
import { TimeToolsModule } from '@/components/dashboard/time-tools-module';
import { DataSettings } from '@/components/settings/data-settings';
import { SleepSettings } from '@/components/sleep/sleep-settings';
import { RecommendationSettings } from '@/components/settings/recommendation-settings';

export function SettingsContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'trackers';

    return (
        <Tabs defaultValue={tab} orientation="vertical" className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <TabsList className="flex flex-col h-auto justify-start items-stretch p-2 space-y-1 bg-muted/50 rounded-lg w-full">
                <TabsTrigger value="trackers" className="justify-start gap-2">
                <ListChecks className="h-4 w-4"/> Trackers
                </TabsTrigger>
                <TabsTrigger value="intelligence" className="justify-start gap-2">
                <Sparkles className="h-4 w-4"/> Smart Engine
                </TabsTrigger>
                <TabsTrigger value="appearance" className="justify-start gap-2">
                <Palette className="h-4 w-4"/> Appearance
                </TabsTrigger>
                <TabsTrigger value="data" className="justify-start gap-2">
                <Database className="h-4 w-4"/> Data & Backup
                </TabsTrigger>
                <TabsTrigger value="time" className="justify-start gap-2">
                <Clock className="h-4 w-4"/> Clock Tools
                </TabsTrigger>
                <TabsTrigger value="sleep" className="justify-start gap-2">
                <Moon className="h-4 w-4"/> Sleep Pro
                </TabsTrigger>
                <TabsTrigger value="account" className="justify-start gap-2" disabled>
                <User className="h-4 w-4"/> Account
                </TabsTrigger>
            </TabsList>

            <div className="col-span-1 md:col-span-3">
                <TabsContent value="trackers">
                <TrackerSettings />
                </TabsContent>
                <TabsContent value="intelligence">
                <RecommendationSettings />
                </TabsContent>
                <TabsContent value="appearance">
                <AppearanceSettings />
                </TabsContent>
                <TabsContent value="data">
                <DataSettings />
                </TabsContent>
                <TabsContent value="time">
                    <TimeToolsModule />
                </TabsContent>
                <TabsContent value="sleep">
                    <SleepSettings />
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
