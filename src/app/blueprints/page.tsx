
'use client';

import { useState } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Archive, List, PlusCircle } from 'lucide-react';
import { ProjectList } from '@/components/blueprints/project-list';

export default function BlueprintsPage() {
    const { projects, addProject } = useBlueprintStore();
    const [newProjectTitle, setNewProjectTitle] = useState('');

    const handleCreateProject = () => {
        if (newProjectTitle.trim()) {
            addProject(newProjectTitle.trim());
            setNewProjectTitle('');
        }
    };

    const activeProjects = projects.filter(p => !p.archived);
    const archivedProjects = projects.filter(p => p.archived);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create a New Blueprint</CardTitle>
                    <CardDescription>
                        A blueprint can be a long-term goal, a learning plan, or any theme you want to track over time.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Input
                        placeholder="e.g., Learn Quantum Physics, Build a Mobile App..."
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                    />
                    <Button onClick={handleCreateProject} disabled={!newProjectTitle.trim()}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Blueprint
                    </Button>
                </CardContent>
            </Card>
            
            <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-2">
                   <TabsTrigger value="active"><List className="mr-2 h-4 w-4" />Active Blueprints ({activeProjects.length})</TabsTrigger>
                   <TabsTrigger value="archived"><Archive className="mr-2 h-4 w-4" />Archived Blueprints ({archivedProjects.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="mt-6">
                    <ProjectList projects={activeProjects} />
                </TabsContent>
                 <TabsContent value="archived" className="mt-6">
                    <ProjectList projects={archivedProjects} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
