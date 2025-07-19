
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, CheckCircle, GraduationCap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export function TeachBackRecorder() {
  const [feedback, setFeedback] = useState(false);

  const handleRecord = () => {
    setFeedback(true);
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary"/>
                Teach Back Technique
            </CardTitle>
            <CardDescription>Explain a topic in simple terms to find knowledge gaps.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <Textarea placeholder="Explain your topic in your own words here..." rows={6}/>
        <div className="flex items-center gap-2">
            <Button className="w-full" onClick={handleRecord} disabled={feedback}>
                <Mic className="w-4 h-4 mr-2" />
                Record Explanation
            </Button>
            <div className="h-10 w-10 flex items-center justify-center">
                <AnimatePresence>
                    {feedback && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
