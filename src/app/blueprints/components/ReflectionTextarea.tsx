
'use client'

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Save } from "lucide-react"

type ReflectionTextareaProps = {
  initialText?: string
  onSave: (newText: string) => void
}

export default function ReflectionTextarea({
  initialText = "",
  onSave,
}: ReflectionTextareaProps) {
  const [value, setValue] = useState(initialText);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setValue(initialText);
    setIsDirty(false);
  }, [initialText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setIsDirty(e.target.value !== initialText);
  };
  
  const handleSave = () => {
    onSave(value);
    setIsDirty(false);
  }
  
  const handleBlur = () => {
    if (isDirty) {
      handleSave();
    }
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor="reflection-textarea" className="text-sm font-medium text-muted-foreground">Reflection</Label>
        {isDirty && <Button size="sm" variant="ghost" onClick={handleSave}><Save className="w-4 h-4 mr-1"/>Save</Button>}
      </div>
      <Textarea
        id="reflection-textarea"
        placeholder="What did you learn or feel during this milestone?"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="resize-none"
        rows={4}
      />
    </div>
  )
}
