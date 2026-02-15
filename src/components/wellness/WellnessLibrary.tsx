'use client';

import { useState } from 'react';
import { wellnessLibrary, type LibraryTag, type LibraryItem } from '@/data/wellness-library';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Waves, HeartPulse, Zap, Brain, Shield, Moon, Palette, ChevronDown, ExternalLink, HelpCircle, Package, ClipboardCheck, Info, BookOpen } from 'lucide-react';
import type { MiniKit } from '@/data/wellness-kits';
import type { WellnessPlan } from '@/data/wellness-plans';
import type { Exercise, MindfulnessPractice } from '@/data/exercises';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
                            <p className="font-semibold flex items-center gap-1.5 text-primary/80"><HelpCircle className="w-3.5 h-3.5"/> Intention:</p>
                            <p className="text-muted-foreground italic line-clamp-3">{practice.intention}</p>
                        </div>
                    </div>
                );
            case 'Kit':
                 const kit = item.content as MiniKit;
                 return (
                    <div className="space-y-3 text-sm">
                        <div className="p-2 bg-primary/5 rounded-md border border-primary/10">
                            <p className="font-bold text-[10px] uppercase text-primary mb-1">Protocol Sequence:</p>
                            <ul className="text-muted-foreground text-[11px] space-y-0.5">
                                {kit.practices.slice(0, 4).map((p, i) => (
                                    <li key={i} className="truncate">• {p.title}</li>
                                ))}
                            </ul>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="details" className="border-none">
                                <AccordionTrigger className="py-1 text-[11px] font-bold uppercase text-muted-foreground hover:no-underline">
                                    Expanded Guidance
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 space-y-2 text-[12px]">
                                    <div>
                                        <p className="font-bold text-foreground">When to Use:</p>
                                        <p className="text-muted-foreground">{kit.whenToUse}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">Rationale:</p>
                                        <p className="text-muted-foreground">{kit.whyItWorks}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">How to Use:</p>
                                        <p className="text-muted-foreground italic">{kit.howToUse}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                 );
            case 'Plan':
                 const plan = item.content as WellnessPlan;
                 return (
                     <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                            <span className="font-semibold text-xs">Duration:</span>
                            <span className="text-xs font-bold text-primary">{plan.steps.length} Days</span>
                        </div>
                        <div>
                            <p className="font-semibold text-xs flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-primary"/> Program Focus:</p>
                            <p className="text-muted-foreground text-xs line-clamp-2">{plan.description}</p>
                        </div>
                    </div>
                 );
        }
    }

    const getButtonText = () => {
        if (item.type === 'Practice') return 'Start Practice';
        if (item.type === 'Kit') return 'Activate Protocol';
        return 'View Full Plan';
    }

    return (
        <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 border-primary/5 h-full" id={item.id}>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-1">
                    <item.icon className="w-5 h-5 text-primary" />
                    <Badge variant={item.type === 'Practice' ? 'secondary' : 'default'} className="text-[10px] h-5">{item.type}</Badge>
                </div>
                <CardTitle className="text-base line-clamp-1">{item.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow pt-0">
                {renderContent()}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 pt-0">
                <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-[9px] uppercase tracking-tighter py-0 h-4">{tag}</Badge>
                    ))}
                </div>
                <Button asChild className="w-full mt-2 text-xs h-8">
                    <Link href={item.actionLink}>
                        {getButtonText()} <ExternalLink className="w-3 h-3 ml-1.5" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default function WellnessLibrary() {
    const getGroupedItems = (groupTags: LibraryTag[]): LibraryItem[] => {
        return wellnessLibrary.filter(item => 
            groupTags.some(tag => item.tags.includes(tag))
        ).sort((a, b) => {
            const typeWeight = { 'Kit': 0, 'Plan': 1, 'Practice': 2 };
            return typeWeight[a.type] - typeWeight[b.type];
        });
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Package className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Protocol Hub</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    Search curated sequences (Kits), structured programs (Plans), and individual exercises (Practices).
                </p>
            </div>
            
            <nav className="p-4 border rounded-xl bg-muted/30 max-w-5xl mx-auto shadow-sm sticky top-24 z-10 backdrop-blur-sm">
                 <h2 className="text-[10px] font-bold text-center uppercase tracking-widest text-muted-foreground mb-4">Jump to Intent</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
                    {intentFilters.map(({ label, icon: Icon }) => (
                         <li key={label}>
                            <a href={`#tag-${label.toLowerCase().replace(/ /g, '-')}`} className="flex flex-col items-center p-3 rounded-lg hover:bg-background transition-all group border border-transparent hover:border-primary/10 hover:shadow-sm">
                                <Icon className="w-6 h-6 mb-1 text-primary group-hover:scale-110 transition-transform"/>
                                <span className="text-[11px] font-bold uppercase tracking-tighter">{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="max-w-7xl mx-auto space-y-20 pb-20 px-4">
                {intentFilters.map(({ label, icon: Icon, tags }) => {
                    const items = getGroupedItems(tags);
                    
                    return (
                        <details key={label} open className="group">
                            <summary className="list-none cursor-pointer flex justify-between items-center border-b border-primary/10 pb-4">
                                <h2 id={`tag-${label.toLowerCase().replace(/ /g, '-')}`} className="text-2xl font-bold flex items-center gap-3 scroll-mt-48 group-hover:text-primary transition-colors flex-grow">
                                    <Icon className="w-7 h-7 text-primary" />
                                    {label} Protocols
                                    <span className="text-sm font-normal text-muted-foreground ml-2">({items.length})</span>
                                </h2>
                                <ChevronDown className="w-6 h-6 ml-4 shrink-0 transition-transform duration-300 group-open:rotate-180 text-muted-foreground" />
                            </summary>

                            <div className="pt-8">
                                {items.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {items.map(item => (
                                            <DetailedLibraryCard key={`${item.type}-${item.id}`} item={item} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-10 text-center border border-dashed rounded-xl opacity-50">
                                        <p className="text-sm">No curated protocols for this intent yet. Check back soon.</p>
                                    </div>
                                )}
                            </div>
                        </details>
                    )
                })}
            </div>
        </div>
    );
}