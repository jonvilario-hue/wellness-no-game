

'use client';

import { useState } from 'react';
import { wellnessLibrary, type LibraryTag, type LibraryItem } from '@/data/wellness-library';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Waves, HeartPulse, Zap, Brain, Shield, Moon, Palette, type LucideIcon, Target } from 'lucide-react';
import type { MiniKit } from '@/data/wellness-kits';
import type { WellnessPlan } from '@/data/wellness-plans';
import type { Exercise, MindfulnessPractice } from '@/data/exercises';

const intentFilters: { label: LibraryTag, icon: React.ElementType, tags: LibraryTag[] }[] = [
    { label: 'Calm', icon: Waves, tags: ['Calm', 'Anxiety Relief'] },
    { label: 'Focus', icon: Brain, tags: ['Focus', 'Clarity'] },
    { label: 'Energy', icon: Zap, tags: ['Energy', 'High Energy', 'ADHD-Friendly'] },
    { label: 'Creativity', icon: Palette, tags: ['Creativity'] },
    { label: 'Emotional Relief', icon: Shield, tags: ['Grounding', 'Self-Compassion'] },
    { label: 'Sleep / Recovery', icon: Moon, tags: ['Sleep', 'Recovery'] },
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
    
    const getGroupedItems = (groupTags: LibraryTag[], excludeTags: LibraryTag[] = []): LibraryItem[] => {
        const items = wellnessLibrary.filter(item => 
            item.type === 'Kit' && 
            groupTags.some(tag => item.tags.includes(tag)) &&
            !excludeTags.some(tag => item.tags.includes(tag))
        );
        // Deduplicate items that match multiple tags in the same group
        return Array.from(new Map(items.map(item => [item.id, item])).values());
    };
    
    const adhdKits = wellnessLibrary.filter(item => item.tags.includes('ADHD-Friendly'));

    return (
        <div className="space-y-10">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold">Wellness Library</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    Explore practices, kits, and plans based on your needs. Select an intent below to find the right tool for this moment.
                </p>
            </div>
            
            <nav className="p-4 border rounded-lg bg-muted/50">
                 <h2 className="text-lg font-semibold text-center mb-3">Table of Contents</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
                    {intentFilters.map(({ label, icon: Icon }) => (
                         <li key={label}>
                            <a href={`#tag-${label.toLowerCase().replace(/ /g, '-')}`} className="flex flex-col items-center p-2 rounded-lg hover:bg-background transition-colors">
                                <Icon className="w-6 h-6 mb-1"/>
                                <span className="text-sm font-medium">{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {intentFilters.map(({ label, icon: Icon, tags }) => {
                const regularKits = getGroupedItems(tags, ['ADHD-Friendly']);
                
                return (
                    <details key={label} open className="group">
                        <summary className="list-none cursor-pointer">
                             <h2 id={`tag-${label.toLowerCase().replace(/ /g, '-')}`} className="text-2xl font-semibold flex items-center gap-3 mb-4 scroll-mt-24 group-hover:text-primary transition-colors">
                                <Icon className="w-6 h-6" />
                                {label} Kits
                            </h2>
                        </summary>

                        {/* Special section for ADHD-friendly kits under "Energy" */}
                        {label === 'Energy' && adhdKits.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-muted-foreground mb-4 pl-10">ADHD-Friendly Kits for Energy & Momentum</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {adhdKits.map(item => (
                                       <DetailedLibraryCard key={`${item.type}-${item.id}`} item={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {regularKits.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {regularKits.map(item => (
                                   <DetailedLibraryCard key={`${item.type}-${item.id}`} item={item} />
                                ))}
                            </div>
                        )}
                    </details>
                )
            })}
        </div>
    );
}
