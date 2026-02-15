'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain, Zap, HeartPulse, HelpCircle, Wind, Rocket, X, ArrowLeft, Utensils, Package, ListChecks, Info, Goal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { dopamineWizardData, type Feeling, type Craving } from '@/data/dopamine-menu';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useRouter } from 'next/navigation';
import { kits } from '@/data/wellness-kits';
import { movementExercises, mindfulnessPractices } from '@/data/exercises';
import { ScrollArea } from './ui/scroll-area';

type Step = 1 | 2 | 3;

const feelings: { id: Feeling; label: string; icon: React.ElementType }[] = [
    { id: 'Mentally foggy', label: 'Mentally Foggy', icon: Brain },
    { id: 'Emotionally overloaded', label: 'Overloaded', icon: HeartPulse },
    { id: 'Physically tired', label: 'Physically Tired', icon: Zap },
    { id: 'Numb or bored', label: 'Bored / Numb', icon: HelpCircle },
    { id: 'Scattered/restless', label: 'Restless', icon: Wind },
    { id: 'Unsure', label: 'Unsure', icon: HelpCircle },
];

const cravings: { id: Craving; label: string; icon: React.ElementType }[] = [
    { id: 'Relief', label: 'Relief', icon: Wind },
    { id: 'Energy', label: 'Energy', icon: Zap },
    { id: 'Progress', label: 'Progress', icon: Rocket },
];

export function DopamineMenu() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<Step>(1);
    const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null);
    const [selectedCraving, setSelectedCraving] = useState<Craving | null>(null);
    const router = useRouter();

    const handleFeelingSelect = (feeling: Feeling) => {
        setSelectedFeeling(feeling);
        setStep(2);
    };

    const handleCravingSelect = (craving: Craving) => {
        setSelectedCraving(craving);
        setStep(3);
    };

    const handleReset = () => {
        setStep(1);
        setSelectedFeeling(null);
        setSelectedCraving(null);
    };
    
    const handleAction = (link: string) => {
        setOpen(false);
        router.push(link);
        setTimeout(handleReset, 300);
    }
    
    const result = selectedFeeling && selectedCraving ? dopamineWizardData[selectedFeeling]?.[selectedCraving] : null;

    const getDetailedContent = () => {
        if (!result) return null;
        const hash = result.link.split('#')[1] || '';
        
        if (hash.startsWith('kit-')) {
            const kitId = hash.replace('kit-', '');
            const kit = kits.find(k => k.title.toLowerCase().replace(/ /g, '-') === kitId);
            return kit ? { type: 'kit', data: kit } : null;
        }
        
        if (hash.startsWith('practice-')) {
            const practiceId = hash.replace('practice-', '');
            const practice = [...movementExercises, ...mindfulnessPractices].find(p => p.id === practiceId);
            return practice ? { type: 'practice', data: practice } : null;
        }
        
        return null;
    };

    const detail = getDetailedContent();

    const renderStepContent = () => {
        const stepTransition = {
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -50 },
            transition: { duration: 0.3, ease: 'easeInOut' }
        };
        
        switch (step) {
            case 1:
                return (
                    <motion.div key={1} {...stepTransition} className="w-full">
                        <DialogHeader className="text-center mb-6">
                            <DialogTitle className="text-2xl font-headline">Emotional Triage</DialogTitle>
                            <DialogDescription>How do you feel right now?</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {feelings.map(({ id, label, icon: Icon }) => (
                                <Card 
                                    key={id} 
                                    onClick={() => handleFeelingSelect(id)} 
                                    className="p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/10 hover:border-primary transition-all aspect-square border-primary/5 group"
                                >
                                    <Icon className="w-8 h-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
                                    <p className="font-bold text-[11px] uppercase tracking-tighter transition-colors group-hover:text-primary">{label}</p>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key={2} {...stepTransition} className="w-full">
                        <DialogHeader className="text-center mb-6">
                            <DialogTitle className="text-2xl font-headline">What do you crave?</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                            {cravings.map(({ id, label, icon: Icon }) => (
                                <Button 
                                    key={id} 
                                    onClick={() => handleCravingSelect(id)} 
                                    size="lg" 
                                    variant="outline" 
                                    className="w-full h-16 text-lg justify-start gap-4 border-primary/10 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all group"
                                >
                                    <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform"/>
                                    <span className="group-hover:translate-x-1 transition-transform">{label}</span>
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                     <motion.div key={3} {...stepTransition} className="w-full flex flex-col h-[500px]">
                        <DialogHeader className="text-center mb-4 flex-shrink-0">
                            <DialogTitle className="text-2xl font-headline">Prescribed Protocol</DialogTitle>
                            <DialogDescription>Read the details below and act when ready.</DialogDescription>
                        </DialogHeader>
                        
                        <ScrollArea className="flex-grow pr-4 -mr-4">
                            {result && (
                                <div className="space-y-6 pb-6">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-primary mb-2">{result.action}</h3>
                                        <p className="text-sm text-muted-foreground italic px-4">{result.reason}</p>
                                    </div>

                                    {detail?.type === 'kit' && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                            <div className="grid grid-cols-1 gap-3">
                                                <div className="p-3 bg-muted/50 rounded-lg border border-primary/5">
                                                    <p className="text-[10px] font-bold uppercase text-primary mb-1 flex items-center gap-1.5"><Info className="w-3 h-3"/> Context</p>
                                                    <p className="text-xs text-foreground font-medium">When: {detail.data.whenToUse}</p>
                                                </div>
                                                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                                                    <p className="text-[10px] font-bold uppercase text-primary mb-1 flex items-center gap-1.5"><Brain className="w-3 h-3"/> Rationale</p>
                                                    <p className="text-xs text-foreground font-medium">{detail.data.whyItWorks}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5"><ListChecks className="w-3 h-3"/> The Sequence</p>
                                                <div className="space-y-2">
                                                    {detail.data.practices.map((p: any, i: number) => (
                                                        <div key={i} className="flex items-start gap-3 p-2 rounded-md bg-muted/30 text-xs">
                                                            <span className="font-bold text-primary">{i+1}.</span>
                                                            <div>
                                                                <span className="font-bold text-[10px] uppercase opacity-60 mr-1">{p.type}:</span>
                                                                <span>{p.title}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {detail?.type === 'practice' && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                            <div className="p-3 bg-muted/50 rounded-lg border border-primary/5">
                                                <p className="text-[10px] font-bold uppercase text-primary mb-1 flex items-center gap-1.5"><Goal className="w-3 h-3"/> Intention</p>
                                                <p className="text-xs text-foreground font-medium">{detail.data.intention}</p>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5"><ListChecks className="w-3 h-3"/> Instructions</p>
                                                <div className="space-y-2">
                                                    {detail.data.steps.map((step: string, i: number) => (
                                                        <div key={i} className="flex items-start gap-3 p-2 rounded-md bg-muted/30 text-xs">
                                                            <span className="font-bold text-primary">{i+1}.</span>
                                                            <p>{step}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>

                        <div className="flex-shrink-0 pt-4 flex gap-2">
                            <Button variant="outline" onClick={handleReset} className="flex-1">Start Over</Button>
                            <Button onClick={() => handleAction(result?.link || '')} className="flex-1">
                                Execute in Lab <Rocket className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                         <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Utensils className="h-5 w-5"/>
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Dopamine Menu (Triage)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-2xl overflow-hidden">
                 <div className="flex items-center justify-between min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {renderStepContent()}
                    </AnimatePresence>
                 </div>
                 <div className="absolute top-4 left-4">
                    {step > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => setStep(prev => Math.max(1, prev - 1) as Step)}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    )}
                 </div>
            </DialogContent>
        </Dialog>
    );
}