
'use client'

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Tag, X } from "lucide-react"
import { Input } from "@/components/ui/input"

const defaultTags = ["creative", "career", "fitness", "learning", "finance", "health", "relationships"]

type TagSelectorProps = {
  selected: string[]
  onChange: (tags: string[]) => void
}

export default function TagSelector({ selected, onChange }: TagSelectorProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleTag = (tag: string) => {
    const exists = selected.includes(tag);
    const newTags = exists ? selected.filter(t => t !== tag) : [...selected, tag];
    onChange(newTags);
  };
  
  const handleAddCustomTag = () => {
    const newTag = inputValue.trim().toLowerCase();
    if (newTag && !selected.includes(newTag)) {
        onChange([...selected, newTag]);
    }
    setInputValue('');
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selected.map(tag => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <button onClick={(e) => { e.stopPropagation(); toggleTag(tag); }} className="rounded-full p-0.5 hover:bg-destructive/20">
                <X className="w-3 h-3"/>
            </button>
          </Badge>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs">
                <Tag className="w-3 h-3 mr-1" />
                Add Tags
                <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2 space-y-2">
                <div className="flex gap-1">
                    <Input 
                        placeholder="New tag..." 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCustomTag()}
                        className="h-8"
                    />
                    <Button size="sm" onClick={handleAddCustomTag} className="h-8">Add</Button>
                </div>
                <div className="space-y-1">
                {defaultTags.map(tag => (
                    <label
                    key={tag}
                    className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded-md hover:bg-muted"
                    onClick={() => toggleTag(tag)}
                    >
                    <Checkbox checked={selected.includes(tag)} />
                    <span className="capitalize">{tag}</span>
                    </label>
                ))}
                </div>
            </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
