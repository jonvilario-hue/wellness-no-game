import Link from 'next/link';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chcDomains, type CHCDomain } from '@/types';
import { domainIcons } from '@/components/icons';
import { notFound } from 'next/navigation';
import { PatternMatrix } from '@/components/training/gf/pattern-matrix';
import { DynamicSequenceTransformer } from '@/components/training/gwm/dynamic-sequence-transformer';
import { RapidCodeMatch } from '@/components/training/gs/rapid-code-match';
import { MentalRotationLab } from '@/components/training/gv/mental-rotation-lab';
import { ToneGridChallenge } from '@/components/training/ga/tone-grid-challenge';
import { VerbalInferenceBuilder } from '@/components/training/gc/verbal-inference-builder';
import { SemanticFluencyStorm } from '@/components/training/glr/semantic-fluency-storm';
import { FocusSwitchReactor } from '@/components/training/ef/focus-switch-reactor';
import { gameComponents } from '@/components/training/game-components';

export default function TrainingPage({ params }: { params: { domain: CHCDomain } }) {
  const domainInfo = chcDomains.find(d => d.key === params.domain);

  if (!domainInfo) {
    notFound();
  }

  const PageIcon = domainIcons[domainInfo.key];
  const GameComponent = gameComponents[domainInfo.key] || (() => <p>Game not found</p>);
  const gameTitle = domainInfo.gameTitle || domainInfo.name;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Button asChild variant="outline" className="w-40 justify-start">
            <Link href="/">
              <ArrowLeft className="mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <PageIcon className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
              {gameTitle}
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="w-40 justify-end">
            <Settings />
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <GameComponent />
      </main>
    </div>
  );
}
