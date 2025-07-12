'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookMarked, Save } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function WeeklyReflection() {
  const [reflection, setReflection] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, this would save to a database.
    // For now, we just show a confirmation toast.
    if (reflection.trim()) {
      toast({
        title: 'Reflection Saved',
        description: 'Your thoughts have been logged for this week.',
      });
    } else {
        toast({
            title: 'Empty Reflection',
            description: 'Please write something before saving.',
            variant: 'destructive'
        })
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BookMarked className="w-5 h-5 text-primary" />
          Weekly Reflection
        </CardTitle>
        <CardDescription>
          Connect your training to real-life experiences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground">
          What felt sharper this week in your daily life? Any moments where your focus, memory, or problem-solving stood out?
        </p>
        <Textarea
          placeholder="For example: 'I remembered a shopping list without checking my phone' or 'I solved a tricky problem at work faster than usual...'"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Reflection
        </Button>
      </CardContent>
    </Card>
  );
}
