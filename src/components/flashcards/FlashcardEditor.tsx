
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function FlashcardEditor({ onSave }: { onSave: (card: any) => void }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleSubmit = () => {
    const newCard = {
      id: crypto.randomUUID(),
      front,
      back,
      interval: 1,
      easeFactor: 2.5,
      repetitions: 0,
      dueDate: new Date().toISOString(),
    };
    onSave(newCard);
    setFront("");
    setBack("");
  };

  return (
    <div className="space-y-4">
        <Textarea
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Front of card"
        />
        <Textarea
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Back of card"
        />
        <Button onClick={handleSubmit} className="w-full">Save Card</Button>
    </div>
  );
}
