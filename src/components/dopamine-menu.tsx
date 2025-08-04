
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain, Zap, HeartPulse, HelpCircle, Wind, Rocket, X, ArrowLeft, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { dopamineWizardData, type Feeling, type Craving } from '@/data/dopamine-menu';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

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
    
    const handleClose = () => {
        setOpen(false);
        // Reset on a timer to allow for exit animation
        setTimeout(handleReset, 300);
    }
    
    const result = selectedFeeling && selectedCraving ? dopamineWizardData[selectedFeeling]?.[selectedCraving] : null;

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
                            <DialogTitle className="text-2xl">How do you feel right now?</DialogTitle>
                            <DialogDescription>Select one to find your reset.</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {feelings.map(({ id, label, icon: Icon }) => (
                                <Card key={id} onClick={() => handleFeelingSelect(id)} className="p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/10 hover:border-primary transition-all aspect-square">
                                    <Icon className="w-8 h-8 mb-2 text-primary" />
                                    <p className="font-semibold">{label}</p>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key={2} {...stepTransition} className="w-full">
                        <DialogHeader className="text-center mb-6">
                            <DialogTitle className="text-2xl">What do you crave right now?</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                            {cravings.map(({ id, label, icon: Icon }) => (
                                <Button key={id} onClick={() => handleCravingSelect(id)} size="lg" variant="outline" className="w-full h-16 text-lg justify-start gap-4">
                                    <Icon className="w-6 h-6 text-primary"/>
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                     <motion.div key={3} {...stepTransition} className="w-full">
                        <DialogHeader className="text-center mb-6">
                            <DialogTitle className="text-2xl">Here’s Your Reset</DialogTitle>
                        </DialogHeader>
                        {result ? (
                             <Card className="p-6 text-center space-y-4">
                                <h3 className="text-xl font-bold text-primary">{result.action}</h3>
                                <p className="text-muted-foreground">{result.reason}</p>
                                <Button className="w-full">Try Now</Button>
                            </Card>
                        ) : (
                            <p>No recommendation found.</p>
                        )}
                    </motion.div>
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                         <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5"/>
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Dopamine Menu</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-2xl">
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
                 <div className="absolute bottom-4 left-4">
                     {step === 3 && (
                        <Button variant="link" onClick={handleReset}>Start Over</Button>
                     )}
                 </div>
            </DialogContent>
        </Dialog>
    );
}
