
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
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
      label: "The Vision",
      title: strategy.prompts.title,
      description: "Define the core destination of this strategy.",
      component: (
        <Input
          placeholder="e.g., Become a Published Author"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg h-12"
          autoFocus
        />
      ),
    },
    {
      label: "The Identity",
      title: strategy.prompts.identity,
      description: "How does this goal change who you are?",
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
      label: "The Plan",
      title: strategy.prompts.description,
      description: "Flesh out the details based on the strategy steps.",
      component: (
        <Textarea
          placeholder="A summary of the vision, obstacles, or key results."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      ),
    },
    {
      label: "Categorization",
      title: "How should we categorize this blueprint?",
      description: "Add tags to keep your Architect Lab organized.",
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
    <Card className="max-w-3xl mx-auto border-primary/20 shadow-xl overflow-hidden">
      <div className="h-1 bg-muted w-full">
        <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
      <CardHeader className="bg-primary/5">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Step {step + 1} of {steps.length}: {currentStep.label}</span>
            <strategy.icon className="w-5 h-5 text-primary opacity-50" />
        </div>
        <CardTitle className="text-2xl">{currentStep.title}</CardTitle>
        <CardDescription>{currentStep.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-8 pb-12 min-h-[300px] flex flex-col justify-center">
        {currentStep.component}
        
        {step === 0 && (
            <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                    <p className="font-bold">Strategy Tip:</p>
                    <p className="text-muted-foreground">{strategy.description}</p>
                </div>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/10 p-6">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4"/>
          {step === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button onClick={nextStep} disabled={step === 0 && !title.trim()}>
          {isLastStep ? 'Create Blueprint' : 'Next'}
          <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardFooter>
    </Card>
  );
}
