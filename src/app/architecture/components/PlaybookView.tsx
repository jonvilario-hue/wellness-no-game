
'use client';

import { usePlaybookStore } from '@/hooks/use-playbook-store';
import { goalStrategies } from '@/data/goal-strategies';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Star, Clock, ArrowUpRight, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortablePlaybookItem({ entry, strategy }: { entry: any, strategy: any }) {
  const { entries, updateNotes, updateStatus, toggleFavorite } = usePlaybookStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: entry.strategyId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={cn("flex flex-col border-primary/10 bg-card", isDragging && "shadow-2xl border-primary ring-2 ring-primary/20")}>
        <CardHeader className="relative pr-12">
          <div 
            {...attributes} 
            {...listeners} 
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded text-muted-foreground"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex justify-between items-start ml-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {strategy.icon ? <strategy.icon className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <CardTitle className="text-lg">{strategy.name}</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(strategy.id, strategy.name)}>
              <Star className="w-4 h-4 fill-primary text-primary" />
            </Button>
          </div>
          <CardDescription className="line-clamp-2 mt-2 ml-6">{strategy.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4 ml-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Status</p>
              <Select value={entry.status} onValueChange={(v) => updateStatus(entry.strategyId, v as any)}>
                <SelectTrigger className="h-7 text-xs bg-transparent border-none p-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Not tried', 'Currently using', 'Used before'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Impact Scale</p>
              <p className="text-xs font-bold text-primary">{entry.timesUsed} Uses</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-primary">Personal Notes & Adaptations</Label>
            <Textarea 
              placeholder="Record how this strategy worked for you..."
              value={entry.personalNotes}
              onChange={e => updateNotes(entry.strategyId, e.target.value)}
              className="text-xs min-h-[100px] bg-muted/20"
            />
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center text-[10px] font-bold text-muted-foreground border-t border-primary/5 p-4 ml-6">
          {entry.lastUsedAt ? (
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last: {new Date(entry.lastUsedAt).toLocaleDateString()}</span>
          ) : (
            <span>Not used yet</span>
          )}
          <Button variant="link" size="sm" className="h-auto p-0 text-primary text-[10px] font-black">
            Open Guide <ArrowUpRight className="w-3 h-3 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function PlaybookView() {
  const { entries, orderedFavoriteIds, reorderFavorites, customStrategies } = usePlaybookStore();
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const favorites = orderedFavoriteIds
    .map(id => entries[id])
    .filter(e => e?.isFavorite);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <Star className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
        <p className="text-lg font-bold text-muted-foreground">Your Playbook is empty.</p>
        <p className="text-sm text-muted-foreground mt-2">Bookmark strategies in the Vision Library to add them here.</p>
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedFavoriteIds.indexOf(active.id as string);
      const newIndex = orderedFavoriteIds.indexOf(over?.id as string);
      reorderFavorites(arrayMove(orderedFavoriteIds, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center space-y-2 mb-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">My Playbook</h2>
        <p className="text-muted-foreground text-sm">Drag cards to prioritize your active protocols.</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedFavoriteIds} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map(entry => {
              // Find matching strategy from either system list or custom list
              const strategy = [...goalStrategies, ...customStrategies].find(s => s.id === entry.strategyId);
              if (!strategy) return null;
              return (
                <SortablePlaybookItem key={entry.strategyId} entry={entry} strategy={strategy} />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
