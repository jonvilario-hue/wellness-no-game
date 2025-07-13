
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/use-theme';
import { themes } from '@/data/themes';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export function AppearanceSettings() {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of the app. Select a theme that best suits your training style.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map((theme) => {
                const isActive = activeTheme.key === theme.key;
                const Icon = theme.icon;
                return (
                 <Tooltip key={theme.key} delayDuration={100}>
                    <TooltipTrigger asChild>
                        <div
                            onClick={() => setTheme(theme)}
                            className={cn(
                                'rounded-lg border-2 p-4 cursor-pointer transition-all relative',
                                isActive ? 'border-primary shadow-lg' : 'border-muted hover:border-muted-foreground/50'
                            )}
                            style={{ backgroundColor: theme.colorScheme.background }}
                        >
                            {isActive && (
                                <div className="absolute top-2 right-2 p-1 bg-primary rounded-full text-primary-foreground">
                                    <Check className="h-4 w-4" />
                                </div>
                            )}
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-2 rounded-md" style={{ backgroundColor: theme.colorScheme.accentBars, color: theme.colorScheme.isDark ? '#000' : '#fff' }}>
                                        <Icon className="w-5 h-5"/>
                                    </div>
                                    <h3 className="font-bold text-lg" style={{ color: theme.colorScheme.successProgressText }}>
                                        {theme.name}
                                    </h3>
                                </div>
                                <p className="text-sm flex-grow" style={{ color: isActive ? theme.colorScheme.successProgressText : '#A0AEC0' }}>
                                    {theme.idealFor}
                                </p>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-bold">{theme.name}</p>
                        <p className="text-sm max-w-xs">{theme.scientificRationale}</p>
                    </TooltipContent>
                 </Tooltip>
                );
            })}
            </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
