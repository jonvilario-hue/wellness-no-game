
'use client';

import { useState, useMemo } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Rocket, Star, LayoutGrid, Clock, ArrowRight, Filter } from 'lucide-react';
import type { BlueprintTemplate } from '@/types/blueprint';
import TemplateCustomizer from './TemplateCustomizer';

const categories = ['All', 'Creative', 'Technical', 'Academic', 'Career', 'Health', 'Financial', 'My Templates'];

export default function TemplatesLibrary({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) {
  const { templates, addProject } = useBlueprintStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<BlueprintTemplate | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const filtered = useMemo(() => {
    return templates.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                           t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || 
                             (activeCategory === 'My Templates' ? t.createdBy !== 'system' : t.category.toLowerCase() === activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [templates, search, activeCategory]);

  const handleUseTemplate = (customization: any) => {
    if (!selectedTemplate) return;
    
    // We pass the updated Title and Identity Goal from the customizer
    const synthesizedTemplate = {
      ...selectedTemplate,
      title: customization.title || selectedTemplate.title,
      defaultIdentityStatement: customization.identityGoal || selectedTemplate.defaultIdentityStatement
    };

    addProject(synthesizedTemplate, customization);
    onOpenChange(false);
    setSelectedTemplate(null);
    setIsCustomizing(false);
  };

  if (isCustomizing && selectedTemplate) {
    return (
      <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background border-none">
          <TemplateCustomizer 
            template={selectedTemplate} 
            onCancel={() => setIsCustomizing(false)}
            onComplete={handleUseTemplate}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col p-0 overflow-hidden bg-background">
        <DialogHeader className="p-8 bg-primary/5 border-b shrink-0">
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

        <div className="flex-grow flex flex-col min-h-0 overflow-hidden">
          <div className="p-6 border-b space-y-6 shrink-0">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
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
                  <Card key={template.id} className="group hover:border-primary/50 transition-all cursor-pointer flex flex-col" onClick={() => { setSelectedTemplate(template); setIsCustomizing(true); }}>
                    <CardHeader className="p-5 pb-2">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="secondary" className="text-[9px] uppercase tracking-widest bg-primary/10 text-primary border-none">
                          {template.category}
                        </Badge>
                        <span className="text-xl">{template.icon}</span>
                      </div>
                      <CardTitle className="text-lg font-black group-hover:text-primary transition-colors leading-tight">{template.title}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2 mt-1">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-2 flex-grow">
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                          <span className="flex items-center gap-1.5"><LayoutGrid className="w-3 h-3" /> {template.milestones.length} Phases</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {template.baseTimeline} Weeks</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 pt-0 mt-auto flex justify-between border-t border-primary/5 pt-4">
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase">Preview Phases</Button>
                      <Button size="sm" className="h-8 text-[10px] font-black uppercase">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
