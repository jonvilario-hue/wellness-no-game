
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InterleavingSessionStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interleaving Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">12</p>
        <p className="text-sm text-muted-foreground">Interleaved sessions completed</p>
      </CardContent>
    </Card>
  );
}
