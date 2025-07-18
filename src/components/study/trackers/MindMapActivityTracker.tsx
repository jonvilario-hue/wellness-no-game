
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MindMapActivityTracker() {
  return (
    <div>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">Mind Map Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-3xl font-bold">28</p>
        <p className="text-sm text-muted-foreground">Mind maps created</p>
      </CardContent>
    </div>
  );
}
