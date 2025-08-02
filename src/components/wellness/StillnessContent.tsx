
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Brain, Wind, Waves } from 'lucide-react';
import { mindfulnessPractices } from '@/data/exercises';
import { ExerciseCard } from '@/components/exercises/exercise-card';

export default function StillnessContent() {
    const breathing = mindfulnessPractices.filter(p => p.category === 'Breathing');
    const meditation = mindfulnessPractices.filter(p => p.category === 'Meditation');
    const relaxation = mindfulnessPractices.filter(p => p.category === 'Relaxation');

    return (
        <div className="space-y-6">
            <section>
                 <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><Wind className="w-5 h-5 text-primary"/>Breathing</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {breathing.map(practice => <ExerciseCard key={practice.id} exercise={practice} />)}
                </div>
            </section>
             <section>
                 <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><Brain className="w-5 h-5 text-primary"/>Meditation</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {meditation.map(practice => <ExerciseCard key={practice.id} exercise={practice} />)}
                </div>
            </section>
             <section>
                 <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><Waves className="w-5 h-5 text-primary"/>Relaxation</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relaxation.map(practice => <ExerciseCard key={practice.id} exercise={practice} />)}
                </div>
            </section>
        </div>
    );
};
