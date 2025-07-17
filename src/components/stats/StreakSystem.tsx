// components/stats/StreakSystem.tsx
import { Flame, Star } from "lucide-react";
import type { StreakStats } from "@/types/stats";

export function StreakSystem({ streak, longest }: { streak: number, longest: number }) {
  return (
    <div className="flex justify-around items-center text-center h-[300px]">
        <div className="space-y-2">
            <Flame className="w-16 h-16 text-amber-500 mx-auto" />
            <p className="text-4xl font-bold">{streak}</p>
            <p className="text-sm font-semibold text-muted-foreground">Current Streak</p>
        </div>
        <div className="space-y-2">
            <Star className="w-16 h-16 text-yellow-400 mx-auto" />
            <p className="text-4xl font-bold">{longest}</p>
            <p className="text-sm font-semibold text-muted-foreground">Longest Streak</p>
        </div>
    </div>
  )
}
