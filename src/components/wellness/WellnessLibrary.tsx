
'use client';

import { useState } from 'react';
import { wellnessLibrary, type LibraryTag, type LibraryItem } from '@/data/wellness-library';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Waves, HeartPulse, Zap, Brain, Shield, Moon, Palette } from 'lucide-react';

const intentFilters: { label: LibraryTag, icon: React.ElementType }[] = [
    { label: 'Calm', icon: Waves },
    { label: 'Focus', icon: Brain },
    { label: 'Energy', icon: Zap },
    { label: 'Recovery', icon: HeartPulse },
    { label: 'Grounding', icon: Shield },
    { label: 'Sleep', icon: Moon },
    { label: 'Creativity', icon: Palette },
];

const LibraryCard = ({ item }: { item: LibraryItem }) => (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
            <div className="flex justify-between items-start">
                <item.icon className="w-6 h-6 text-primary" />
                <Badge variant={item.type === 'Practice' ? 'secondary' : 'default'}>{item.type}</Badge>
            </div>
            <CardTitle>{item.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{item.description}</p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
            <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
            </div>
            <Button asChild className="w-full mt-2">
                <Link href={item.actionLink}>
                    {item.type === 'Practice' ? 'Try Practice' : 'View ' + item.type}
                </Link>
            </Button>
        </CardFooter>
    </Card>
);

export default function WellnessLibrary() {
    const [activeFilter, setActiveFilter] = useState<LibraryTag | null>(null);

    const filteredItems = activeFilter
        ? wellnessLibrary.filter(item => item.tags.includes(activeFilter))
        : wellnessLibrary;

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold">Wellness Library</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    Explore practices, kits, and plans based on your needs. Select an intent below to find the right tool for this moment.
                </p>
            </div>
            
            <div className="flex justify-center flex-wrap gap-2">
                <Button 
                    variant={activeFilter === null ? 'default' : 'secondary'}
                    onClick={() => setActiveFilter(null)}
                >
                    All
                </Button>
                {intentFilters.map(({ label, icon: Icon }) => (
                    <Button 
                        key={label}
                        variant={activeFilter === label ? 'default' : 'secondary'}
                        onClick={() => setActiveFilter(label)}
                        className="gap-2"
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                    <LibraryCard key={`${item.type}-${item.id}`} item={item} />
                ))}
            </div>
        </div>
    );
}
