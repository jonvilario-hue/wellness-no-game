
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dumbbell, StretchHorizontal, Zap } from 'lucide-react';
import { movementExercises } from '@/data/exercises';
import { ExerciseCard } from '@/components/exercises/exercise-card';

export default function MovementContent() {
    const stretching = movementExercises.filter(e => e.category === 'Stretching');
    const strength = movementExercises.filter(e => e.category === 'Strength');
    const energizers = movementExercises.filter(e => e.category === 'Energizer');

    return (
        <div className="space-y-6">
            <section>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><StretchHorizontal className="w-5 h-5 text-primary"/>Stretch & Mobility</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stretching.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} />)}
                </div>
            </section>
            <section>
                 <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><Dumbbell className="w-5 h-5 text-primary"/>Strength & Stability</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {strength.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} />)}
                </div>
            </section>
            <section>
                 <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><Zap className="w-5 h-5 text-primary"/>Quick Energizers</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {energizers.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} />)}
                </div>
            </section>
        </div>
    );
};
