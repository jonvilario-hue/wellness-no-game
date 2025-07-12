import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chcDomains, type CHCDomain } from '@/types';
import { domainIcons } from '@/components/icons';
import { notFound } from 'next/navigation';

export default function TrainingPage({ params }: { params: { domain: CHCDomain } }) {
  const domainInfo = chcDomains.find(d => d.key === params.domain);

  if (!domainInfo) {
    notFound();
  }

  const Icon = domainIcons[domainInfo.key];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
            {domainInfo.name} Training
          </h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Game Area</CardTitle>
            <CardDescription>{domainInfo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                [Game for {domainInfo.name} will be here]
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
