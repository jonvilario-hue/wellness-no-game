
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FocusDistractionRatioTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Focus / Distraction Ratio</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">8:1</p>
        <p className="text-sm text-muted-foreground">Focus sessions to distractions logged</p>
      </CardContent>
    </div>
  );
}
