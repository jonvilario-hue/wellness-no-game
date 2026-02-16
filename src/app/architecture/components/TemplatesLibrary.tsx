
'use client';

import { useState } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Rocket, GraduationCap, Briefcase, Heart, User, Filter, CheckCircle2 } from 'lucide-react';
import type { BlueprintTemplate } from '@/types/blueprint';

const categoryIcons = {
  Career: Briefcase,
  Creative: Rocket,
  'Health/Fitness': Heart,
  Learning: GraduationCap,
  Business: Briefcase,
  Personal: User,
};

export default function TemplatesLibrary({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) {
  const { templates, useTemplate } = useBlueprintStore();
  const [search, setSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<BlueprintTemplate | null>(null);

  const filtered = templates.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleUse = (id: string) => {
    useTemplate(id);
    onOpenChange(false);
    setSelectedTemplate(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Blueprint Templates</DialogTitle>
          <DialogDescription>Accelerate your architecture with pre-built frameworks from the community and experts.</DialogDescription>
        </DialogHeader>

        <div className="relative my-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates (e.g. 'Business', 'Learn')..." 
            className="pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(template => (
            <Card key={template.id} className="group cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedTemplate(template)}>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-[9px] uppercase tracking-widest">{template.category}</Badge>
                  {template.isSystemTemplate && <Badge className="text-[9px] bg-primary/10 text-primary border-none">SYSTEM</Badge>}
                </div>
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{template.name}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">{template.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                <span className="flex items-center gap-1.5"><Filter className="w-3 h-3" /> {template.milestones.length} Milestones</span>
                <span>{template.estimatedDuration}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6">
            <Card className="max-w-2xl w-full max-h-[80vh] flex flex-col">
              <CardHeader>
                <CardTitle>{selectedTemplate.name}</CardTitle>
                <CardDescription>{selectedTemplate.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Pre-filled Milestones:</h4>
                  {selectedTemplate.milestones.map((m, i) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-lg border border-primary/5">
                      <p className="font-bold text-sm">{m.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{m.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {m.tasks.map((t, ti) => (
                          <Badge key={ti} variant="outline" className="text-[9px]">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-[10px] font-bold uppercase mb-1">Recommended Strategies:</p>
                  <p className="text-xs italic text-muted-foreground">{selectedTemplate.suggestedStrategies.join(', ')}</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 p-6 border-t">
                <Button variant="ghost" className="flex-1" onClick={() => setSelectedTemplate(null)}>Back to list</Button>
                <Button className="flex-1" onClick={() => handleUse(selectedTemplate.id)}>Use This Template</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
