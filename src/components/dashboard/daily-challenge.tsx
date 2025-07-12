import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Archive, BrainCircuit, Goal, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function DailyChallenge() {
    const challenges = [
        { domain: "Glr", icon: Archive, text: "Boosts retrieval speed", link: "/training/Glr" },
        { domain: "Gf", icon: BrainCircuit, text: "Sharpens logical problem-solving", link: "/training/Gf" },
        { domain: "EF", icon: Goal, text: "Improves task-switching", link: "/training/EF" },
        { domain: "Gs", icon: Zap, text: "Increases reaction time", link: "/training/Gs" },
    ];

    const challenge = challenges[new Date().getDate() % challenges.length];
    const Icon = challenge.icon;

    return (
        <Card className="bg-primary/10 border-primary/20 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-foreground">Daily Challenge</h3>
                        <p className="text-muted-foreground">Try a 2-minute {challenge.domain} task — {challenge.text}.</p>
                    </div>
                </div>
                <Button asChild>
                    <Link href={challenge.link}>
                        Start Challenge <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
