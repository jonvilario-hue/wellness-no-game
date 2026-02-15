
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldAlert, ListChecks, CheckCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";

export function DistractionLog() {
  const [distractionInput, setDistractionInput] = useState('');
  const [loggedDistractions, setLoggedDistractions] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage('');
      }, 2000); // Message visible for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const handleLogDistraction = () => {
    if (!distractionInput.trim()) return;

    setLoggedDistractions(prev => [distractionInput.trim(), ...prev].slice(0, 5)); // Keep last 5
    setFeedbackMessage(`"${distractionInput.trim()}" logged!`);
    setDistractionInput('');
  };

  const handleRemoveDistraction = (indexToRemove: number) => {
    setLoggedDistractions(prev => prev.filter((_, index) => index !== indexToRemove));
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
        <div className="h-6 text-center">
            <AnimatePresence>
                {feedbackMessage && (
                    <motion.p 
                        key="feedback"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm font-semibold text-green-600 flex items-center justify-center gap-2"
                    >
                       <CheckCircle className="w-4 h-4" /> {feedbackMessage}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
        {loggedDistractions.length > 0 && (
            <div className="space-y-2 pt-2">
                 <h4 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground"><ListChecks className="w-4 h-4" />Recent Logs:</h4>
                <div className="flex flex-col-reverse gap-2">
                    {loggedDistractions.map((log, index) => (
                        <div key={index} className="group flex items-center gap-1">
                            <Badge variant="secondary" className="w-full justify-start py-1 text-wrap h-auto flex-grow">
                                {log}
                            </Badge>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveDistraction(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
