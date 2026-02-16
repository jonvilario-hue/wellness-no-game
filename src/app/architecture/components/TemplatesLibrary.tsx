
'use client';

import { useState, useMemo } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Rocket, GraduationCap, Briefcase, Heart, User, Filter, CheckCircle2, ChevronDown, Clock, Layers, Star, PlusCircle, LayoutGrid, Info } from 'lucide-react';
import type { BlueprintTemplate } from '@/types/blueprint';
import TemplateCustomizer from './TemplateCustomizer';

const categories = ['All', 'Creative', 'Technical', 'Academic', 'Career', 'Health', 'Financial', 'My Templates'];

export default function TemplatesLibrary({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) {
  const { templates, useTemplate } = useBlueprintStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveTab] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<BlueprintTemplate | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const filtered = useMemo(() => {
    return templates.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                           t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || 
                             (activeCategory === 'My Templates' ? t.createdBy !== 'system' : t.category === activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [templates, search, activeCategory]);

  const handleUseTemplate = (settings: any) => {
    if (!selectedTemplate) return;
    useTemplate(selectedTemplate.id, settings);
    onOpenChange(false);
    setSelectedTemplate(null);
    setIsCustomizing(false);
  };

  if (isCustomizing && selectedTemplate) {
    return (
      <div className="fixed inset-0 z-[70] bg-background flex items-center justify-center p-4">
        <TemplateCustomizer 
          template={selectedTemplate} 
          onCancel={() => setIsCustomizing(false)}
          onComplete={handleUseTemplate}
        />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col p-0 overflow-hidden bg-background">
        <DialogHeader className="p-8 bg-primary/5 border-b">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-3xl font-black uppercase tracking-tighter">Blueprint Lab</DialogTitle>
              <DialogDescription className="text-base">Accelerate your architecture with adaptive, professional roadmaps.</DialogDescription>
            </div>
            <Badge variant="outline" className="h-8 border-primary/20 bg-background px-4">
              <Star className="w-3 h-3 mr-2 text-primary fill-current" />
              {templates.length} Frameworks Available
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-grow flex flex-col min-h-0">
          <div className="p-6 border-b space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <Tabs value={activeCategory} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="bg-muted/50 h-auto p-1 grid grid-cols-2 md:flex md:flex-wrap gap-1">
                  {categories.map(c => (
                    <TabsTrigger key={c} value={c} className="text-[10px] uppercase font-bold px-4 py-2">
                      {c}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search frameworks..." 
                  className="pl-10 h-10"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {filtered.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <Filter className="w-12 h-12 text-muted-foreground opacity-20" />
                <div>
                  <p className="text-xl font-bold">No frameworks found</p>
                  <p className="text-sm text-muted-foreground">Try a different search or category.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(template => (
                  <Card key={template.id} className="group hover:border-primary/50 transition-all cursor-pointer flex flex-col" onClick={() => setSelectedTemplate(template)}>
                    <CardHeader className="p-5 pb-2">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="secondary" className="text-[9px] uppercase tracking-widest bg-primary/10 text-primary border-none">
                          {template.category}
                        </Badge>
                        {template.isSystemTemplate && <Badge className="text-[9px] bg-muted text-muted-foreground uppercase font-black tracking-widest border-none">System</Badge>}
                      </div>
                      <CardTitle className="text-lg font-black group-hover:text-primary transition-colors leading-tight">{template.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2 mt-1">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-2 flex-grow">
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                          <span className="flex items-center gap-1.5"><LayoutGrid className="w-3 h-3" /> {template.milestones.length} Phases</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {template.baseTimelineWeeks} Weeks</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.adaptiveSettings.supportsIntensity && <Badge variant="outline" className="text-[8px] h-4">Adaptive Intensity</Badge>}
                          {template.adaptiveSettings.supportsTimeline && <Badge variant="outline" className="text-[8px] h-4">Flexible Scale</Badge>}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 pt-0 mt-auto flex justify-between border-t border-primary/5 pt-4">
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase">Preview Phases</Button>
                      <Button size="sm" className="h-8 text-[10px] font-black uppercase">Configure Plan</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedTemplate && (
          <div className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6">
            <Card className="max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border-primary/20">
              <CardHeader className="p-8 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter">{selectedTemplate.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">{selectedTemplate.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedTemplate(null)}><Filter className="w-4 h-4 rotate-45" /></Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto p-8 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <LayoutGrid className="w-3 h-3" /> Proposed Architecture ({selectedTemplate.milestones.length} Phases)
                  </h4>
                  <div className="space-y-3">
                    {selectedTemplate.milestones.map((m, i) => (
                      <div key={i} className="p-4 bg-muted/30 rounded-xl border border-primary/5 group hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-sm">{m.title}</p>
                          <span className="text-[9px] font-black text-muted-foreground">PHASE {i + 1}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{m.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {m.tasks.map((t, ti) => (
                            <Badge key={ti} variant="outline" className="text-[8px] bg-background/50 h-4">{t.title}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTemplate.resourcePack && selectedTemplate.resourcePack.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Integrated Resource Pack</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedTemplate.resourcePack.map((res, i) => (
                        <div key={i} className="p-2 bg-primary/5 rounded-lg border border-primary/10 flex items-center gap-2">
                          <Info className="w-3 h-3 text-primary" />
                          <span className="text-[10px] font-bold truncate">{res.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="text-[10px] font-black uppercase mb-2 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> Suggested Strategies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.suggestedStrategies.map(s => (
                      <Badge key={s} variant="secondary" className="text-[9px] font-bold bg-background">{s}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-8 border-t flex gap-3">
                <Button variant="outline" className="flex-1 h-12" onClick={() => setSelectedTemplate(null)}>Back to Library</Button>
                <Button className="flex-1 h-12 font-bold shadow-lg shadow-primary/20" onClick={() => setIsCustomizing(true)}>
                  Customize Architecture <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
