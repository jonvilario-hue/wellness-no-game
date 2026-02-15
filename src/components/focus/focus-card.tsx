
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { JournalEntry } from '@/hooks/use-journal';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { journalConfig } from '@/lib/journal-config';

interface FocusCardProps {
    entry: JournalEntry;
    onEdit: (entry: JournalEntry) => void;
}

const effortLevels: { value: number, label: string, color: string, emoji: string }[] = [
    { value: 0, label: 'Not Rated', color: 'text-muted-foreground', emoji: ''},
    { value: 1, label: 'Low Effort', color: 'text-slate-400', emoji: '😮‍💨' },
    { value: 2, label: 'Some Focus', color: 'text-blue-400', emoji: '🤔' },
    { value: 3, label: 'Average Focus', color: 'text-green-500', emoji: '⚖️' },
    { value: 4, label: 'High Focus', color: 'text-orange-500', emoji: '🔥' },
    { value: 5, label: 'Deep Focus', color: 'text-purple-500', emoji: '🎯' },
];

export const FocusCard = ({ entry, onEdit }: FocusCardProps) => {
    const { effort, mood, focusContext, focusTags } = entry;
    const level = effortLevels.find(l => l.value === effort) || effortLevels[0];
    const categoryConfig = journalConfig[entry.category];
    const CategoryIcon = categoryConfig.icon;

    return (
        <Card className="group relative">
            <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onEdit(entry)}>
                <Edit className="w-4 h-4"/>
            </Button>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <span className="text-3xl">{level.emoji}</span>
                    <div className="flex flex-col">
                        <span>Focus: {level.label}</span>
                         <span className="text-sm font-normal text-muted-foreground">
                            {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-us', { month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                    {focusContext && (
                        <div className="flex items-center gap-2">
                             <CategoryIcon className="w-4 h-4 text-muted-foreground"/>
                             <span className="font-semibold">{focusContext}</span>
                        </div>
                    )}
                    {focusTags && focusTags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                           {focusTags.map(tag => (
                             <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                           ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
