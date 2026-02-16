
'use client';

import { useState } from 'react';
import type { BlueprintTemplate, TemplateVariationSettings } from '@/types/blueprint';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Zap, CheckCircle2, Info, Rocket, Shield, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type TemplateCustomizerProps = {
  template: BlueprintTemplate;
  onCancel: () => void;
  onComplete: (settings: TemplateVariationSettings) => void;
};

export default function TemplateCustomizer({ template, onCancel, onComplete }: TemplateCustomizerProps) {
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState<TemplateVariationSettings>({
    timeline: 'sprint',
    intensity: 'committed',
    skillLevel: 'intermediate',
    learningStyle: template.category === 'Academic' ? 'theoryFirst' : undefined,
    accountability: 'solo',
  });

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const totalSteps = 4;

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-primary">Timeline Scale</Label>
              <div className="p-4 bg-muted/30 rounded-xl space-y-6">
                <Slider 
                  value={[settings.timeline === 'ultraSprint' ? 0 : settings.timeline === 'sprint' ? 1 : settings.timeline === 'marathon' ? 2 : 3]} 
                  onValueChange={([v]) => {
                    const t = v === 0 ? 'ultraSprint' : v === 1 ? 'sprint' : v === 2 ? 'marathon' : 'lifelong';
                    setSettings({ ...settings, timeline: t as any });
                  }}
                  max={3}
                  step={1}
                />
                <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground">
                  <span className={cn(settings.timeline === 'ultraSprint' && "text-primary")}>Ultra-Sprint</span>
                  <span className={cn(settings.timeline === 'sprint' && "text-primary")}>Sprint</span>
                  <span className={cn(settings.timeline === 'marathon' && "text-primary")}>Marathon</span>
                  <span className={cn(settings.timeline === 'lifelong' && "text-primary")}>Lifelong</span>
                </div>
                <p className="text-xs italic text-muted-foreground text-center">
                  {settings.timeline === 'ultraSprint' ? "Compresses the goal into half the standard time with high task density." :
                   settings.timeline === 'sprint' ? "Standard pace recommended for most balanced growth." :
                   settings.timeline === 'marathon' ? "Extended timeline with more rest and deeper dives into each phase." :
                   "A cyclical, recurring framework for ongoing improvement."}
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-widest text-primary">Intensity Level</Label>
                <RadioGroup 
                  value={settings.intensity} 
                  onValueChange={(v) => setSettings({ ...settings, intensity: v as any })}
                  className="space-y-2"
                >
                  {[
                    { id: 'hobby', label: 'Hobbyist', desc: 'Relaxed schedule, optional reflections.' },
                    { id: 'committed', label: 'Committed', desc: 'Standard pace, regular tracking.' },
                    { id: 'professional', label: 'Professional', desc: 'High stakes, contingency planning added.' },
                  ].map(opt => (
                    <Label key={opt.id} className={cn("flex flex-col p-3 border rounded-xl cursor-pointer hover:bg-muted/50", settings.intensity === opt.id && "border-primary bg-primary/5")}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={opt.id} id={opt.id} />
                        <span className="font-bold">{opt.label}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground ml-6">{opt.desc}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-widest text-primary">Experience Level</Label>
                <RadioGroup 
                  value={settings.skillLevel} 
                  onValueChange={(v) => setSettings({ ...settings, skillLevel: v as any })}
                  className="space-y-2"
                >
                  {[
                    { id: 'beginner', label: 'Complete Beginner', desc: 'Adds foundational milestones and fine-grained tasks.' },
                    { id: 'intermediate', label: 'Intermediate', desc: 'Standard task granularity.' },
                    { id: 'advanced', label: 'Advanced', desc: 'Removes intros, adds optimization cycles.' },
                  ].map(opt => (
                    <Label key={opt.id} className={cn("flex flex-col p-3 border rounded-xl cursor-pointer hover:bg-muted/50", settings.skillLevel === opt.id && "border-primary bg-primary/5")}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={opt.id} id={opt.id} />
                        <span className="font-bold">{opt.label}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground ml-6">{opt.desc}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-primary">Accountability Model</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'solo', icon: Rocket, label: 'Solo Quest', desc: 'Focus on self-discipline and internal logs.' },
                  { id: 'buddy', icon: Users, label: 'Buddy System', desc: 'Inserts bi-weekly peer check-in tasks.' },
                  { id: 'public', icon: Zap, label: 'Public Build', desc: 'Adds community sharing and feedback loops.' },
                ].map(opt => (
                  <Card key={opt.id} className={cn("cursor-pointer border-dashed hover:border-primary/50 transition-all", settings.accountability === opt.id && "border-solid border-primary bg-primary/5")} onClick={() => setSettings({ ...settings, accountability: opt.id as any })}>
                    <CardContent className="p-4 text-center space-y-2">
                      <opt.icon className={cn("w-8 h-8 mx-auto", settings.accountability === opt.id ? "text-primary" : "text-muted-foreground")} />
                      <p className="font-bold text-sm">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="p-6 border-2 border-dashed rounded-2xl space-y-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <div>
                <h3 className="text-xl font-bold">Architecture Ready</h3>
                <p className="text-sm text-muted-foreground">Your adaptive blueprint has been configured with {template.milestones.length + (settings.skillLevel === 'beginner' ? 1 : 0)} checkpoints.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="uppercase text-[9px]">{settings.timeline}</Badge>
                <Badge variant="secondary" className="uppercase text-[9px]">{settings.intensity}</Badge>
                <Badge variant="secondary" className="uppercase text-[9px]">{settings.skillLevel}</Badge>
                <Badge variant="secondary" className="uppercase text-[9px]">{settings.accountability}</Badge>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="max-w-3xl mx-auto border-primary/20 shadow-2xl overflow-hidden bg-background">
      <div className="h-1.5 w-full bg-muted">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>
      <CardHeader className="bg-primary/5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">Step {step} of {totalSteps}</span>
            <CardTitle className="text-2xl font-black uppercase tracking-tighter">Customize: {template.name}</CardTitle>
            <CardDescription className="max-w-md">Fine-tune the architecture to match your current capacity.</CardDescription>
          </div>
          <Badge variant="outline" className="border-primary/20 font-black">{template.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="min-h-[400px] py-8">
        {renderStepContent()}
      </CardContent>
      <CardFooter className="flex justify-between p-6 bg-muted/10 border-t">
        <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          {step === totalSteps ? (
            <Button className="font-bold px-8 shadow-lg shadow-primary/20" onClick={() => onComplete(settings)}>
              Generate Blueprint <Rocket className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="font-bold px-8" onClick={nextStep}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
