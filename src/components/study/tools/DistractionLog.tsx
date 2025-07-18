
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldAlert, ListChecks } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export function DistractionLog() {
  const [distractionInput, setDistractionInput] = useState('');
  const [loggedDistractions, setLoggedDistractions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleLogDistraction = () => {
    if (!distractionInput.trim()) return;

    setLoggedDistractions(prev => [distractionInput.trim(), ...prev].slice(0, 5)); // Keep last 5
    toast({
      title: "Distraction Logged",
      description: `"${distractionInput.trim()}" has been recorded.`,
      variant: 'success'
    });
    setDistractionInput('');
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-primary"/>
                Distraction Log
            </CardTitle>
            <CardDescription>Record distractions to identify patterns and mitigate their impact.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
            <Input 
                placeholder="Describe distraction..." 
                value={distractionInput}
                onChange={(e) => setDistractionInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogDistraction()}
            />
            <Button onClick={handleLogDistraction}>Log</Button>
        </div>
        {loggedDistractions.length > 0 && (
            <div className="space-y-2 pt-2">
                 <h4 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground"><ListChecks className="w-4 h-4" />Recent Logs:</h4>
                <div className="flex flex-col-reverse gap-2">
                    {loggedDistractions.map((log, index) => (
                        <Badge key={index} variant="secondary" className="w-full justify-start py-1 text-wrap h-auto">
                            {log}
                        </Badge>
                    ))}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
