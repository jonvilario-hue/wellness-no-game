
'use client';

import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, ArrowRight, DollarSign, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const substitutionMocks = [
    { name: "Lentil Soup", cals: 320, p: 18, c: 45, f: 8, costDelta: -1.20, macroDelta: "Similar Protein" },
    { name: "Tuna Wrap", cals: 380, p: 25, c: 35, f: 12, costDelta: 0.50, macroDelta: "Higher Protein" },
    { name: "Chickpea Curry", cals: 410, p: 15, c: 55, f: 15, costDelta: -0.80, macroDelta: "Higher Carbs" }
];

interface SubstitutionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentMealName: string;
    onSelect: (name: string) => void;
}

export function SubstitutionDialog({ open, onOpenChange, currentMealName, onSelect }: SubstitutionDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-primary" />
                        Smart Substitution
                    </DialogTitle>
                    <DialogDescription>
                        Find a better fit for "{currentMealName}". Rank prioritized by cost and macros.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-4">
                    {substitutionMocks.map(opt => (
                        <div 
                            key={opt.name} 
                            className="p-4 border rounded-xl hover:bg-muted/50 cursor-pointer transition-all flex items-center justify-between group"
                            onClick={() => onSelect(opt.name)}
                        >
                            <div className="space-y-1">
                                <p className="font-bold text-sm">{opt.name}</p>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="text-[8px] h-4 uppercase">{opt.macroDelta}</Badge>
                                    <span className={cn(
                                        "text-[10px] font-bold",
                                        opt.costDelta < 0 ? "text-green-600" : "text-amber-600"
                                    )}>
                                        {opt.costDelta < 0 ? '−' : '+'}${Math.abs(opt.costDelta).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
