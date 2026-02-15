
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSleepProStore, type Chronotype } from '@/hooks/use-sleep-pro-store';
import { Sunrise, Moon, CloudSun, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const chronotypeInfo = {
  Lark: {
    icon: Sunrise,
    title: 'Morning Lark',
    desc: 'You feel most alert in the early morning. Peak cognitive performance occurs before noon.',
    tip: 'Schedule complex Gf reasoning tasks early in the day.'
  },
  Owl: {
    icon: Moon,
    title: 'Night Owl',
    desc: 'Your peak energy and focus arrive in the late afternoon and evening.',
    tip: 'Train your heavy working memory (Gwm) tasks after 4 PM.'
  },
  Bear: {
    icon: CloudSun,
    title: 'Steady Bear',
    desc: 'You follow the solar cycle. High energy midday, tapering in the evening.',
    tip: 'Keep your training sessions consistent between 10 AM and 2 PM.'
  },
  Dolphin: {
    icon: Zap,
    title: 'Wired Dolphin',
    desc: 'Irregular sleep patterns. You often feel most productive in short, intense bursts.',
    tip: 'Use Micro-Pomodoros to prevent burnout during training.'
  }
};

export function ChronotypeAssessment() {
  const { chronotype, setChronotype } = useSleepProStore();
  const [step, setStep] = useState(0);

  const questions = [
    {
      q: "If you had no obligations, what time would you naturally wake up?",
      options: [
        { label: "Before 6:30 AM", type: 'Lark' },
        { label: "7:00 AM - 9:00 AM", type: 'Bear' },
        { label: "After 10:00 AM", type: 'Owl' },
        { label: "It varies wildly", type: 'Dolphin' },
      ]
    },
    {
      q: "When do you feel most 'sharp' for difficult mental work?",
      options: [
        { label: "Immediately upon waking", type: 'Lark' },
        { label: "Midday (11 AM - 2 PM)", type: 'Bear' },
        { label: "Late evening", type: 'Owl' },
        { label: "In random 20-minute bursts", type: 'Dolphin' },
      ]
    }
  ];

  const handleSelect = (type: Chronotype) => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setChronotype(type);
    }
  };

  if (chronotype) {
    const Info = chronotypeInfo[chronotype];
    const Icon = Info.icon;
    return (
      <Card className="border-primary bg-primary/5">
        <CardHeader className="text-center">
          <Icon className="h-12 w-12 mx-auto text-primary mb-2" />
          <CardTitle>You are a {Info.title}</CardTitle>
          <CardDescription>{Info.desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-background rounded-lg border flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-sm font-medium">{Info.tip}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => setChronotype(null)}>Retake Assessment</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Your Chronotype</CardTitle>
        <CardDescription>Align your training with your biological clock.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-center">{questions[step].q}</h3>
          <div className="grid grid-cols-1 gap-2">
            {questions[step].options.map(opt => (
              <Button 
                key={opt.label} 
                variant="outline" 
                className="h-14 justify-start px-6 text-lg"
                onClick={() => handleSelect(opt.type as Chronotype)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-1">
          {questions.map((_, i) => (
            <div key={i} className={cn("h-1.5 w-8 rounded-full", i === step ? "bg-primary" : "bg-muted")} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
