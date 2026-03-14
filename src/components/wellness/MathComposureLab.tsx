
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, Sparkles,
  Gamepad2, UserCheck, Eye
} from 'lucide-react';
import { MentalMathTrainer } from './MentalMathTrainer';
import { AnzanTrainer } from './AnzanTrainer';
import { LunarienMathTrainer } from './LunarienMathTrainer';
import { MathArcade } from './MathArcade';
import { ArithmentorTrainer } from './ArithmentorTrainer';

export function MathComposureLab() {
  const [activeTab, setActiveTab] = useState('mentor');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-muted/50 p-1 h-auto grid grid-cols-3 sm:grid-cols-5 max-w-4xl gap-1">
            <TabsTrigger value="mentor" className="gap-2 px-4 font-bold uppercase text-[10px] py-2">
              <UserCheck className="w-3.5 h-3.5" /> Mentor
            </TabsTrigger>
            <TabsTrigger value="trainer" className="gap-2 px-4 font-bold uppercase text-[10px] py-2">
              <Zap className="w-3.5 h-3.5" /> Velocity
            </TabsTrigger>
            <TabsTrigger value="lunarien" className="gap-2 px-4 font-bold uppercase text-[10px] py-2">
              <Sparkles className="w-3.5 h-3.5" /> Tiers
            </TabsTrigger>
            <TabsTrigger value="arcade" className="gap-2 px-4 font-bold uppercase text-[10px] py-2">
              <Gamepad2 className="w-3.5 h-3.5" /> Blitz
            </TabsTrigger>
            <TabsTrigger value="anzan" className="gap-2 px-4 font-bold uppercase text-[10px] py-2">
              <Eye className="w-3.5 h-3.5" /> Anzan
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="mentor" className="animate-in slide-in-from-bottom-2 duration-500">
          <ArithmentorTrainer />
        </TabsContent>

        <TabsContent value="trainer" className="animate-in slide-in-from-bottom-2 duration-500">
          <MentalMathTrainer />
        </TabsContent>

        <TabsContent value="lunarien" className="animate-in slide-in-from-bottom-2 duration-500">
          <LunarienMathTrainer />
        </TabsContent>

        <TabsContent value="arcade" className="animate-in slide-in-from-bottom-2 duration-500">
          <MathArcade />
        </TabsContent>

        <TabsContent value="anzan" className="animate-in slide-in-from-bottom-2 duration-500">
          <AnzanTrainer />
        </TabsContent>
      </Tabs>
    </div>
  );
}
