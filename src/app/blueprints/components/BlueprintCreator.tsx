
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { GoalStrategy } from '@/data/goal-strategies';
import TagSelector from './TagSelector';
import type { Blueprint } from '@/types/blueprint';

type BlueprintCreatorProps = {
  strategy: GoalStrategy;
  onBack: () => void;
  onCreate: (project: Omit<Blueprint, 'id' | 'milestones' | 'archived'>) => void;
};

export function BlueprintCreator({ strategy, onBack, onCreate }: BlueprintCreatorProps) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [identityGoal, setIdentityGoal] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const handleCreate = () => {
    if (!title) return;
    onCreate({
      title,
      description,
      identityGoal,
      tags,
    });
  };

  const steps = [
    {
      title: strategy.prompts.title,
      component: (
        <Input
          placeholder="e.g., Become a Published Author"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg h-12"
        />
      ),
    },
    {
      title: strategy.prompts.identity,
      component: (
         <Input
          placeholder="e.g., A disciplined writer who shares ideas."
          value={identityGoal}
          onChange={(e) => setIdentityGoal(e.target.value)}
          className="text-lg h-12"
        />
      ),
    },
    {
      title: strategy.prompts.description,
      component: (
        <Textarea
          placeholder="A summary of the vision or key results."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      ),
    },
    {
      title: "Categorize your blueprint",
      component: (
        <div className="flex justify-center">
            <TagSelector selected={tags} onChange={setTags} />
        </div>
      )
    }
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const nextStep = () => {
    if (!isLastStep) {
      setStep(s => s + 1);
    } else {
        handleCreate();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(s => s - 1);
    } else {
        onBack();
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <strategy.icon className="w-6 h-6 text-primary" />
          <span>New Blueprint: <span className="text-muted-foreground">{strategy.name}</span></span>
        </CardTitle>
        <CardDescription>
            Follow the prompts to create a new blueprint using the <strong>{strategy.name}</strong> strategy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-center min-h-[250px] flex flex-col justify-center">
        <Label className="text-xl font-semibold">{currentStep.title}</Label>
        <div>
            {currentStep.component}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4"/>
          Back
        </Button>
        <Button onClick={nextStep} disabled={step === 0 && !title.trim()}>
          {isLastStep ? 'Create Blueprint' : 'Next'}
          <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardFooter>
    </Card>
  );
}
