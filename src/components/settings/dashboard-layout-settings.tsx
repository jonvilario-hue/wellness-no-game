
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardSettings, type DashboardComponent, componentLabels } from '@/hooks/use-dashboard-settings';

export function DashboardLayoutSettings() {
    const { settings, toggleSetting, resetSettings } = useDashboardSettings();

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div>
                    <CardTitle>Customize Dashboard</CardTitle>
                    <CardDescription>
                        Toggle the visibility of components on your main dashboard.
                    </CardDescription>
                </div>
                 <Button variant="ghost" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4"/>
                    Reset Layout
                </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(Object.keys(settings) as DashboardComponent[]).map((key) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <Label htmlFor={`switch-${key}`} className="font-medium">
                        {componentLabels[key] || key}
                      </Label>
                      <Switch
                        id={`switch-${key}`}
                        checked={settings[key]}
                        onCheckedChange={() => toggleSetting(key)}
                      />
                    </div>
                  )
                )}
              </div>
            </CardContent>
        </Card>
    );
}
