
'use client';

import { useState } from 'react';
import type { BlueprintTemplate, TemplateVariationSettings } from '@/types/blueprint';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Rocket, 
  Users, 
  Zap, 
  Clock, 
  Target, 
  Trophy, 
  ArrowRight,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TemplateCustomizerProps = {
  template: BlueprintTemplate;
  onCancel: () => void;
  onComplete: (settings: TemplateVariationSettings & { title: string; identityGoal: string }) => void;
};

export default function TemplateCustomizer({ template, onCancel, onComplete }: TemplateCustomizerProps) {
  const [settings, setSettings] = useState<TemplateVariationSettings>({
    timeline: 'sprint',
    intensity: 'committed',
    skillLevel: 'intermediate',
    accountability: 'solo',
  });

  const [title, setTitle] = useState(template.title);
  const [identityGoal, setIdentityGoal] = useState(template.defaultIdentityStatement);

  const handleComplete = () => {
    onComplete({
      ...settings,
      title,
      identityGoal
    });
  };

  return (
    <Card className="max-w-4xl mx-auto border-none shadow-none overflow-hidden bg-background h-[90vh] flex flex-col">
      <CardHeader className="bg-primary/5 shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">Architecture Synthesis</span>
            <CardTitle className="text-3xl font-black uppercase tracking-tighter">Customize: {template.title}</CardTitle>
            <CardDescription className="max-w-xl text-base mt-1">Configure your roadmap. Scroll down to review all settings before locking in your blueprint.</CardDescription>
          </div>
          <Badge variant="outline" className="border-primary/20 font-black px-4 py-1">{template.category}</Badge>
        </div>
      </CardHeader>

      <ScrollArea className="flex-grow">
        <CardContent className="py-10 space-y-12 px-8">
          
          {/* Section 1: The Vision & Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-2">
              <div className="p-2 bg-primary/10 rounded-lg"><Target className="w-5 h-5 text-primary" /></div>
              <h3 className="text-xl font-bold uppercase tracking-tight">1. The Vision & Identity</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Blueprint Title</Label>
                <Input 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="e.g. Master the Craft"
                  className="h-12 text-lg font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Identity Statement (Becoming)</Label>
                <Textarea 
                  value={identityGoal} 
                  onChange={e => setIdentityGoal(e.target.value)} 
                  placeholder="I am becoming someone who..."
                  className="h-12 min-h-0 py-3 italic"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Timeline Scale */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-2">
              <div className="p-2 bg-primary/10 rounded-lg"><Clock className="w-5 h-5 text-primary" /></div>
              <h3 className="text-xl font-bold uppercase tracking-tight">2. Timeline Scale</h3>
            </div>
            <div className="p-6 bg-muted/30 rounded-2xl space-y-8 border border-primary/5">
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
                <div className={cn("text-center", settings.timeline === 'ultraSprint' && "text-primary scale-110")}>
                  <p>Ultra-Sprint</p>
                  <p className="font-normal opacity-60">{template.variations.timeline.ultraSprint.weeks}w</p>
                </div>
                <div className={cn("text-center", settings.timeline === 'sprint' && "text-primary scale-110")}>
                  <p>Standard Sprint</p>
                  <p className="font-normal opacity-60">{template.variations.timeline.sprint.weeks}w</p>
                </div>
                <div className={cn("text-center", settings.timeline === 'marathon' && "text-primary scale-110")}>
                  <p>Marathon</p>
                  <p className="font-normal opacity-60">{template.variations.timeline.marathon.weeks}w</p>
                </div>
                <div className={cn("text-center", settings.timeline === 'lifelong' && "text-primary scale-110")}>
                  <p>Lifelong</p>
                  <p className="font-normal opacity-60">Continuous</p>
                </div>
              </div>
              <div className="bg-background/50 p-4 rounded-xl border border-dashed text-center">
                <p className="text-xs italic text-muted-foreground">
                  {template.variations.timeline[settings.timeline].description}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Intensity & Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-2">
              <div className="p-2 bg-primary/10 rounded-lg"><LayoutGrid className="w-5 h-5 text-primary" /></div>
              <h3 className="text-xl font-bold uppercase tracking-tight">3. Challenge Parameters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Intensity Level</Label>
                <RadioGroup 
                  value={settings.intensity} 
                  onValueChange={(v) => setSettings({ ...settings, intensity: v as any })}
                  className="space-y-2"
                >
                  {(['hobby', 'committed', 'professional'] as const).map(id => (
                    <Label key={id} className={cn("flex flex-col p-4 border rounded-xl cursor-pointer hover:bg-muted/50 transition-all", settings.intensity === id && "border-primary bg-primary/5 ring-1 ring-primary/20")}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={id} id={id} />
                        <span className="font-bold">{template.variations.intensity[id].label}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground ml-6 mt-1">{template.variations.intensity[id].description}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experience Level</Label>
                <RadioGroup 
                  value={settings.skillLevel} 
                  onValueChange={(v) => setSettings({ ...settings, skillLevel: v as any })}
                  className="space-y-2"
                >
                  {(['beginner', 'intermediate', 'advanced'] as const).map(id => (
                    <Label key={id} className={cn("flex flex-col p-4 border rounded-xl cursor-pointer hover:bg-muted/50 transition-all", settings.skillLevel === id && "border-primary bg-primary/5 ring-1 ring-primary/20")}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={id} id={id} />
                        <span className="font-bold">{template.variations.skillLevel[id].label}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground ml-6 mt-1">{template.variations.skillLevel[id].description}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Section 4: Accountability Model */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-2">
              <div className="p-2 bg-primary/10 rounded-lg"><Users className="w-5 h-5 text-primary" /></div>
              <h3 className="text-xl font-bold uppercase tracking-tight">4. Accountability Model</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'solo', icon: Rocket, label: 'Solo Quest', desc: 'Focus on self-discipline and internal logs.' },
                { id: 'buddy', icon: Users, label: 'Buddy System', desc: 'Inserts bi-weekly peer check-in tasks.' },
                { id: 'public', icon: Zap, label: 'Public Build', desc: 'Adds community sharing and feedback loops.' },
              ].map(opt => (
                <Card 
                  key={opt.id} 
                  className={cn(
                    "cursor-pointer border-dashed hover:border-primary/50 transition-all group", 
                    settings.accountability === opt.id && "border-solid border-primary bg-primary/5 shadow-sm"
                  )} 
                  onClick={() => setSettings({ ...settings, accountability: opt.id as any })}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <opt.icon className={cn("w-10 h-10 mx-auto transition-transform group-hover:scale-110", settings.accountability === opt.id ? "text-primary" : "text-muted-foreground")} />
                    <div>
                      <p className="font-bold text-sm">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">{opt.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Review & Final Confirmation */}
          <div className="pt-8 mt-12 border-t-2 border-dashed">
            <div className="p-8 bg-primary/5 rounded-3xl text-center space-y-4">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto" />
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Ready to Architect</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">Your adaptive blueprint is ready for generation. This will create a structured, tracked workspace in your lab.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                <Badge variant="secondary" className="uppercase text-[9px] font-black px-3">Timeline: {settings.timeline}</Badge>
                <Badge variant="secondary" className="uppercase text-[9px] font-black px-3">Intensity: {settings.intensity}</Badge>
                <Badge variant="secondary" className="uppercase text-[9px] font-black px-3">Level: {settings.skillLevel}</Badge>
                <Badge variant="secondary" className="uppercase text-[9px] font-black px-3">Model: {settings.accountability}</Badge>
              </div>
            </div>
          </div>

        </CardContent>
      </ScrollArea>

      <CardFooter className="flex justify-between p-6 bg-muted/10 border-t shrink-0">
        <Button variant="ghost" onClick={onCancel} className="font-bold">
          Cancel & Exit
        </Button>
        <Button 
          className="font-bold px-12 h-12 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform" 
          onClick={handleComplete}
        >
          Generate Blueprint <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
