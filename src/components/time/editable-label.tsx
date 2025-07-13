
'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableLabelProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export function EditableLabel({
  initialValue,
  onSave,
  placeholder = 'Click to edit',
  className,
  inputClassName
}: EditableLabelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (value.trim() !== initialValue) {
      onSave(value.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className={cn("flex items-center gap-2 w-full", className)}>
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn("h-8", inputClassName)}
        />
        <Button size="icon" className="h-8 w-8" onClick={handleSave}>
          <Check className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={cn(
        "flex items-center gap-2 group cursor-pointer w-full min-h-[32px] rounded-md px-3 py-1 hover:bg-muted",
        className
      )}
    >
      <span className="font-semibold truncate flex-grow">
        {value || <span className="text-muted-foreground italic">{placeholder}</span>}
      </span>
      <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
