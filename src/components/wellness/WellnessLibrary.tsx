
'use client';

import { useState } from 'react';
import { wellnessLibrary, type LibraryTag, type LibraryItem, type Exercise, type MindfulnessPractice } from '@/data/wellness-library';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Waves, HeartPulse, Zap, Brain, Shield, Moon, Palette } from 'lucide-react';
import type { MiniKit } from '@/data/wellness-kits';
import type { WellnessPlan } from '@/data/wellness-plans';

const intentFilters: { label: LibraryTag, icon: React.ElementType }[] = [
    { label: 'Calm', icon: Waves },
    { label: 'Focus', icon: Brain },
    { label: 'Energy', icon: Zap },
    { label: 'Recovery', icon: HeartPulse },
    { label: 'Grounding', icon: Shield },
    { label: 'Sleep', icon: Moon },
    { label: 'Creativity', icon: Palette },
];

const DetailedLibraryCard = ({ item }: { item: LibraryItem }) => {
    const renderContent = () => {
        switch(item.type) {
            case 'Practice':
                const practice = item.content as Exercise | MindfulnessPractice;
                return (
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="font-semibold">Intention:</p>
                            <p className="text-muted-foreground">{practice.intention}</p>
                        </div>
                         <div>
                            <p className="font-semibold">Steps:</p>
                            <ol className="list-decimal list-inside text-muted-foreground">
                                {practice.steps.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </div>
                    </div>
                );
            case 'Kit':
                 const kit = item.content as MiniKit;
                 return (
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="font-semibold">When to Use:</p>
                            <p className="text-muted-foreground">{kit.whenToUse}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Included Practices:</p>
                            <ul className="list-disc list-inside text-muted-foreground">
                                {kit.practices.map((p, i) => <li key={i}>{p.title} ({p.type})</li>)}
                            </ul>
                        </div>
                    </div>
                 );
            case 'Plan':
                 const plan = item.content as WellnessPlan;
                 return (
                     <div className="space-y-3 text-sm">
                        <div>
                            <p className="font-semibold">Duration:</p>
                            <p className="text-muted-foreground">{plan.steps.length} days</p>
                        </div>
                        <div>
                            <p className="font-semibold">Day 1 Focus:</p>
                            <p className="text-muted-foreground">{plan.steps[0].title}</p>
                        </div>
                    </div>
                 );
        }
    }

    return (
        <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <item.icon className="w-6 h-6 text-primary" />
                    <Badge variant={item.type === 'Practice' ? 'secondary' : 'default'}>{item.type}</Badge>
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                {renderContent()}
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
};

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
                    <DetailedLibraryCard key={`${item.type}-${item.id}`} item={item} />
                ))}
            </div>
        </div>
    );
}
