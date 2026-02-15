
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";

export function MindMapTool() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-primary"/>
                Mind Map Tool
            </CardTitle>
            <CardDescription>Map concepts visually to clearly see connections.</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="h-40 w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
            Mind Map Canvas Area
        </div>
        <Button className="w-full mt-4">Add Node</Button>
      </CardContent>
    </Card>
  );
}
