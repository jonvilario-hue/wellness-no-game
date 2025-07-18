
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ActiveRecallGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Recall</CardTitle>
        <CardDescription>The art of retrieving information from memory.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Explanation of benefits...</p>
        <ul>
            <li>Prompt examples...</li>
            <li>Research context...</li>
        </ul>
      </CardContent>
    </Card>
  );
}
