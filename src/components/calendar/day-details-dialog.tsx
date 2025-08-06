
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { CalendarDay } from '@/data/calendar-content';

interface DayDetailsDialogProps {
  dayContent: CalendarDay;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleCompletion: () => void;
}

export function DayDetailsDialog({ dayContent, isOpen, onClose, isCompleted, onToggleCompletion }: DayDetailsDialogProps) {
  const { icon: Icon, prompt, description, toolType, toolContent } = dayContent;

  const renderTool = () => {
    switch (toolType) {
      case 'embed':
        return (
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${toolContent}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg border"
            ></iframe>
          </div>
        );
      case 'link':
        return <Button asChild><a href={toolContent} target="_blank" rel="noopener noreferrer">Open Tool</a></Button>;
      case 'text':
      default:
        return <p className="p-4 bg-muted/50 rounded-lg border text-sm italic">{toolContent}</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-primary" />
            Day {dayContent.day}: {prompt}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
            {renderTool()}
        </div>
        
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <Label htmlFor="task-completed-checkbox" className="font-semibold text-lg cursor-pointer">
            Mark as Complete
          </Label>
          <Checkbox 
            id="task-completed-checkbox" 
            checked={isCompleted} 
            onCheckedChange={onToggleCompletion}
            className="w-6 h-6"
          />
        </div>
        
      </DialogContent>
    </Dialog>
  );
}
