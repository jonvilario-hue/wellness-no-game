
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHydratedJournalStore as useJournal } from "@/hooks/use-journal";
import { useMemo } from "react";

export function FocusDistractionRatioTracker() {
  const { entries } = useJournal();
  
  // This is a simplified calculation.
  // In a real app, you would have a separate store for distractions.
  // For now, we'll use a mock number of distractions.
  const focusCount = useMemo(() => entries.filter(e => e.effort > 0).length, [entries]);
  const mockDistractionCount = 3; // Placeholder until DistractionLog is fully state-managed
  const ratio = mockDistractionCount > 0 ? (focusCount / mockDistractionCount).toFixed(1) : focusCount;
  
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Focus / Distraction Ratio</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">{ratio}:1</p>
        <p className="text-sm text-muted-foreground">Focus sessions to distractions logged</p>
      </CardContent>
    </div>
  );
}
