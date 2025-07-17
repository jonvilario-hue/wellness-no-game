
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type Flashcard } from "./FlashcardStudy";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function FlashcardEditor({ onSave }: { onSave: (card: Flashcard) => void }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [type, setType] = useState<'basic' | 'cloze'>('basic');

  const handleSubmit = () => {
    if (!front || !back) return;
    const newCard: Flashcard = {
      id: crypto.randomUUID(),
      front,
      back,
      interval: 1,
      easeFactor: 2.5,
      repetitions: 0,
      dueDate: new Date().toISOString(),
      type,
    };
    onSave(newCard);
    setFront("");
    setBack("");
    setType("basic");
  };

  return (
    <div className="space-y-4">
        <div>
            <Label htmlFor="card-type">Card Type</Label>
            <Select value={type} onValueChange={(value: 'basic' | 'cloze') => setType(value)}>
                <SelectTrigger id="card-type">
                    <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="cloze">Cloze Deletion</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Textarea
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder={type === 'cloze' ? "Example: The capital of France is {{c1::Paris}}." : "Front of card"}
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
