
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dumbbell, HeartPulse, StretchHorizontal, Brain, Wind, Waves, Zap } from 'lucide-react';
import { movementExercises, mindfulnessPractices, type Exercise, type MindfulnessPractice } from '@/data/exercises';
import { ExerciseCard } from '@/components/exercises/exercise-card';

const MovementSection = () => {
    const stretching = movementExercises.filter(e => e.category === 'Stretching');
    const strength = movementExercises.filter(e => e.category === 'Strength');
    const energizers = movementExercises.filter(e => e.category === 'Energizer');
    
    return (
        <Tabs defaultValue="stretching" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stretching"><StretchHorizontal className="mr-2 h-4 w-4"/>Stretch & Mobility</TabsTrigger>
                <TabsTrigger value="strength"><Dumbbell className="mr-2 h-4 w-4"/>Strength & Stability</TabsTrigger>
                <TabsTrigger value="energizers"><Zap className="mr-2 h-4 w-4"/>Quick Energizers</TabsTrigger>
            </TabsList>
            <TabsContent value="stretching" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stretching.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} />)}
            </TabsContent>
            <TabsContent value="strength" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {strength.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} />)}
            </TabsContent>
            <TabsContent value="energizers" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {energizers.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} />)}
            </TabsContent>
        </Tabs>
    );
};

const StillnessSection = () => {
    const breathing = mindfulnessPractices.filter(p => p.category === 'Breathing');
    const meditation = mindfulnessPractices.filter(p => p.category === 'Meditation');
    const relaxation = mindfulnessPractices.filter(p => p.category === 'Relaxation');

    return (
        <Tabs defaultValue="breathing" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="breathing"><Wind className="mr-2 h-4 w-4"/>Breathing</TabsTrigger>
                <TabsTrigger value="meditation"><Brain className="mr-2 h-4 w-4"/>Meditation</TabsTrigger>
                <TabsTrigger value="relaxation"><Waves className="mr-2 h-4 w-4"/>Relaxation</TabsTrigger>
            </TabsList>
            <TabsContent value="breathing" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {breathing.map(practice => <ExerciseCard key={practice.id} exercise={practice} />)}
            </TabsContent>
             <TabsContent value="meditation" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meditation.map(practice => <ExerciseCard key={practice.id} exercise={practice} />)}
            </TabsContent>
             <TabsContent value="relaxation" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relaxation.map(practice => <ExerciseCard key={practice.id} exercise={practice} />)}
            </TabsContent>
        </Tabs>
    );
};

export default function ExercisesPage() {
  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <Tabs defaultValue="movement" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="movement">Movement Lab</TabsTrigger>
                <TabsTrigger value="stillness">Stillness Lab</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="movement">
              <Card>
                <CardHeader>
                  <CardTitle>Movement Lab</CardTitle>
                  <CardDescription>A hub for short, science-backed physical activities that enhance energy, posture, and strength.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MovementSection />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="stillness">
              <Card>
                <CardHeader>
                  <CardTitle>Stillness Lab</CardTitle>
                  <CardDescription>A home for guided non-movement practices rooted in breathing, awareness, and sensory reset.</CardDescription>
                </CardHeader>
                <CardContent>
                  <StillnessSection />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
