
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MindMapActivityTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mind Map Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">28</p>
        <p className="text-sm text-muted-foreground">Mind maps created</p>
      </CardContent>
    </Card>
  );
}
