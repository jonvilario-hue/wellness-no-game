
'use client';

import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Brain, Zap, HeartPulse, HelpCircle, Wind, Rocket, X, 
  ArrowLeft, ListChecks, Info, Goal, ChevronRight, Sparkles, Clock, ShieldCheck
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { dopamineActivities, feelingOptions, cravingOptions, type FeelingKey, type CravingKey, type DopamineActivity } from '@/data/dopamine-menu';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useRouter } from 'next/navigation';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

type TriageStep = 1 | 2 | 3;

export function DopamineMenu() {
    const [open, setOpen] = useState(false);
    const [isTriage, setIsTriage] = useState(false);
    const [triageStep, setTriageStep] = useState<TriageStep>(1);
    const [triageBodyState, setTriageBodyState] = useState<'still' | 'restless' | null>(null);
    
    const [selectedFeeling, setSelectedFeeling] = useState<FeelingKey | null>(null);
    const [selectedCraving, setSelectedCraving] = useState<CravingKey | null>(null);
    const [viewingActivityId, setViewingActivityId] = useState<string | null>(null);
    
    const router = useRouter();

    const handleFeelingSelect = (feeling: FeelingKey) => {
        setSelectedFeeling(feeling);
    };

    const handleCravingSelect = (craving: CravingKey) => {
        setSelectedCraving(craving);
    };

    const handleReset = () => {
        setIsTriage(false);
        setTriageStep(1);
        setTriageBodyState(null);
        setSelectedFeeling(null);
        setSelectedCraving(null);
        setViewingActivityId(null);
    };
    
    const handleAction = (activity: DopamineActivity) => {
        setOpen(false);
        if (activity.link) {
            router.push(activity.link);
        }
        setTimeout(handleReset, 300);
    }

    const filteredActivities = useMemo(() => {
        if (!selectedFeeling || !selectedCraving) return [];
        return dopamineActivities
            .filter(a => a.feelingState === selectedFeeling && a.craving === selectedCraving)
            .sort((a, b) => {
                if (a.isSkillBuilding && !b.isSkillBuilding) return 1;
                if (!a.isSkillBuilding && b.isSkillBuilding) return -1;
                return a.difficultyWeight - b.difficultyWeight;
            });
    }, [selectedFeeling, selectedCraving]);

    const activeActivity = useMemo(() => 
        dopamineActivities.find(a => a.id === viewingActivityId),
    [viewingActivityId]);

    const triageResult = useMemo(() => {
        if (selectedFeeling && selectedCraving) {
            const feeling = feelingOptions.find(f => f.key === selectedFeeling);
            const craving = cravingOptions.find(c => c.key === selectedCraving);
            return { feeling: feeling?.label, craving: craving?.label };
        }
        return null;
    }, [selectedFeeling, selectedCraving]);

    const renderTriage = () => {
        const variants = {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 }
        };

        if (triageStep === 1) {
            return (
                <motion.div key="t1" {...variants} className="space-y-6">
                    <DialogHeader className="text-center">
                        <DialogTitle>Physical Check-in</DialogTitle>
                        <DialogDescription>Is your body more still or more restless right now?</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => { setTriageBodyState('still'); setTriageStep(2); }}>
                            <Anchor className="w-6 h-6 text-primary" />
                            <span className="font-bold">Still / Heavy</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => { setTriageBodyState('restless'); setTriageStep(2); }}>
                            <Wind className="w-6 h-6 text-primary" />
                            <span className="font-bold">Restless / Activated</span>
                        </Button>
                    </div>
                </motion.div>
            );
        }

        if (triageStep === 2) {
            return (
                <motion.div key="t2" {...variants} className="space-y-6">
                    <DialogHeader className="text-center">
                        <DialogTitle>Mental Check-in</DialogTitle>
                        <DialogDescription>
                            {triageBodyState === 'still' ? "Is your mind more blank or more cloudy?" : "Are your thoughts more racing or more scattered?"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-2">
                        {triageBodyState === 'still' ? (
                            <>
                                <Button variant="outline" className="justify-start h-14 px-6" onClick={() => { setSelectedFeeling('numb'); setTriageStep(3); }}>Blank / Empty</Button>
                                <Button variant="outline" className="justify-start h-14 px-6" onClick={() => { setSelectedFeeling('mentally-foggy'); setTriageStep(3); }}>Cloudy / Slow</Button>
                                <Button variant="outline" className="justify-start h-14 px-6" onClick={() => { setSelectedFeeling('physically-tired'); setTriageStep(3); }}>My body hurts or is exhausted</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" className="justify-start h-14 px-6" onClick={() => { setSelectedFeeling('anxious'); setTriageStep(3); }}>Racing / Looping</Button>
                                <Button variant="outline" className="justify-start h-14 px-6" onClick={() => { setSelectedFeeling('scattered'); setTriageStep(3); }}>Scattered / Bouncing</Button>
                                <Button variant="outline" className="justify-start h-14 px-6" onClick={() => { setSelectedFeeling('emotionally-overloaded'); setTriageStep(3); }}>Everything is too much at once</Button>
                            </>
                        )}
                    </div>
                </motion.div>
            );
        }

        return (
            <motion.div key="t3" {...variants} className="space-y-6">
                <DialogHeader className="text-center">
                    <DialogTitle>Desired Outcome</DialogTitle>
                    <DialogDescription>What do you want right now?</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start h-14 px-6 gap-4" onClick={() => { handleCravingSelect('relief'); setIsTriage(false); }}>
                        <Wind className="w-5 h-5" /> I want to feel less of this
                    </Button>
                    <Button variant="outline" className="justify-start h-14 px-6 gap-4" onClick={() => { handleCravingSelect('energy'); setIsTriage(false); }}>
                        <Zap className="w-5 h-5" /> I want to feel more alive
                    </Button>
                    <Button variant="outline" className="justify-start h-14 px-6 gap-4" onClick={() => { handleCravingSelect('progress'); setIsTriage(false); }}>
                        <Rocket className="w-5 h-5" /> I want to feel like I did something
                    </Button>
                </div>
            </motion.div>
        );
    };

    const renderSelection = () => {
        if (!selectedFeeling) {
            return (
                <div className="w-full space-y-6">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Emotional Triage</DialogTitle>
                        <DialogDescription>How do you feel right now?</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {feelingOptions.map((opt) => (
                            <Card 
                                key={opt.key} 
                                onClick={() => handleFeelingSelect(opt.key)} 
                                className="p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/5 hover:border-primary/20 transition-all aspect-square border-primary/5 group"
                            >
                                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{opt.icon}</span>
                                <p className="font-bold text-[10px] uppercase tracking-widest leading-tight">{opt.label}</p>
                            </Card>
                        ))}
                    </div>
                    <div className="pt-4 border-t text-center">
                        <Button variant="ghost" className="text-xs font-bold uppercase text-primary gap-2" onClick={() => setIsTriage(true)}>
                            I'm not sure how I feel
                        </Button>
                    </div>
                </div>
            );
        }

        if (!selectedCraving) {
            return (
                <div className="w-full space-y-6">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Choose Your Craving</DialogTitle>
                        <DialogDescription>What would help most in this state?</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        {cravingOptions.map((opt) => (
                            <Button 
                                key={opt.key} 
                                onClick={() => handleCravingSelect(opt.key)} 
                                size="lg" 
                                variant="outline" 
                                className="w-full h-16 text-lg justify-start gap-4 border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                            >
                                <opt.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform"/>
                                <span className="font-bold">{opt.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            );
        }

        if (viewingActivityId && activeActivity) {
            return (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-6">
                    <div className="text-center space-y-2">
                        <Badge variant="secondary" className="uppercase text-[9px] font-black tracking-widest">{activeActivity.category}</Badge>
                        <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{activeActivity.name}</h3>
                        <p className="text-sm font-bold text-muted-foreground">{activeActivity.subtitle}</p>
                    </div>

                    <ScrollArea className="h-64 pr-4">
                        <div className="space-y-6">
                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <p className="text-xs leading-relaxed font-medium text-foreground">{activeActivity.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl bg-muted/30 border border-primary/5">
                                    <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Time Investment</p>
                                    <p className="text-xs font-bold flex items-center gap-1.5"><Clock className="w-3 h-3" /> {activeActivity.timeEstimate}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-muted/30 border border-primary/5">
                                    <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Mobility</p>
                                    <p className="text-xs font-bold uppercase">{activeActivity.mobilityRequired}</p>
                                </div>
                            </div>

                            {activeActivity.needsSupplies && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-1.5"><ListChecks className="w-3 h-3" /> Equipment</p>
                                    <ul className="text-xs space-y-1">
                                        {activeActivity.suppliesList.map((s, i) => <li key={i} className="flex items-center gap-2">• {s}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="flex gap-2 pt-4 border-t">
                        <Button variant="outline" className="flex-1" onClick={() => setViewingActivityId(null)}>Back to List</Button>
                        <Button className="flex-1 shadow-lg" onClick={() => handleAction(activeActivity)}>
                            {activeActivity.link ? 'Launch Module' : 'Mark as Done'} <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </motion.div>
            );
        }

        return (
            <div className="w-full space-y-6">
                <DialogHeader className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Badge className="bg-primary text-white border-none uppercase text-[9px] font-black">
                            {triageResult?.feeling}
                        </Badge>
                        <ChevronRight className="w-3 h-3 opacity-30" />
                        <Badge variant="outline" className="uppercase text-[9px] font-black border-primary/20">
                            {triageResult?.craving}
                        </Badge>
                    </div>
                    <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Recommended Protocols</DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-80 pr-4">
                    <div className="space-y-2">
                        {filteredActivities.map((act) => (
                            <button 
                                key={act.id} 
                                onClick={() => setViewingActivityId(act.id)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border border-primary/5 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group flex items-center justify-between",
                                    act.isSkillBuilding && "bg-primary/5 border-primary/10"
                                )}
                            >
                                <div className="flex-1 min-w-0 mr-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-sm truncate">{act.name}</h4>
                                        {act.isSkillBuilding && <Badge className="bg-primary text-white border-none text-[8px] h-4">SKILL</Badge>}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground truncate">{act.subtitle}</p>
                                </div>
                                <div className="shrink-0 flex items-center gap-3">
                                    <span className="text-[10px] font-black opacity-40 uppercase">{act.timeEstimate}</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>

                <div className="pt-4 border-t flex justify-center">
                    <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold text-muted-foreground" onClick={handleReset}>
                        Change Feeling or Craving
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if(!o) handleReset(); }}>
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
            <DialogContent className="sm:max-w-xl overflow-hidden max-h-[90vh]">
                 <div className="min-h-[400px] flex flex-col justify-center py-4">
                    <AnimatePresence mode="wait">
                        {isTriage ? renderTriage() : renderSelection()}
                    </AnimatePresence>
                 </div>
                 <div className="absolute top-4 left-4">
                    {(selectedFeeling || isTriage) && (
                        <Button variant="ghost" size="icon" onClick={handleReset}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    )}
                 </div>
            </DialogContent>
        </Dialog>
    );
}
