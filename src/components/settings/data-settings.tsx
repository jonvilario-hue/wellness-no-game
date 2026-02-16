
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useSnapshotStore, ALL_STORAGE_KEYS } from '@/hooks/use-snapshot-store';
import { 
  Database, 
  History, 
  Download, 
  Upload, 
  ShieldAlert, 
  Clock, 
  PlusCircle, 
  Undo2, 
  Trash2 
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';

export function DataSettings() {
    const { toast } = useToast();
    const [storageUsage, setStorageUsage] = useState<string>('Checking...');
    
    const { 
      snapshots, 
      maxSnapshots, 
      setMaxSnapshots, 
      createSnapshot, 
      restoreSnapshot, 
      deleteSnapshot 
    } = useSnapshotStore();

    useEffect(() => {
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(estimate => {
                if (estimate.usage !== undefined && estimate.quota !== undefined) {
                    const usageMB = (estimate.usage / (1024 * 1024)).toFixed(2);
                    const quotaMB = (estimate.quota / (1024 * 1024)).toFixed(0);
                    const percent = ((estimate.usage / estimate.quota) * 100).toFixed(1);
                    setStorageUsage(`${usageMB}MB / ${quotaMB}MB (${percent}%)`);
                }
            });
        } else {
            setStorageUsage('Not supported by browser');
        }
    }, []);

    const handleExport = () => {
        const data: Record<string, string | null> = {};
        ALL_STORAGE_KEYS.forEach(key => {
            data[key] = localStorage.getItem(key);
        });
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `polymath-lab-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({ title: "Export Successful", description: "Your data backup has been downloaded.", variant: "success" });
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                
                const keys = Object.keys(data);
                if (keys.length === 0) throw new Error("Empty backup file");

                // 1. Create a snapshot of CURRENT state before overwriting (Safety net)
                createSnapshot('Auto-Save Before Import');

                // 2. Overwrite active data keys
                Object.entries(data).forEach(([key, value]) => {
                    if (typeof value === 'string' && ALL_STORAGE_KEYS.includes(key)) {
                        localStorage.setItem(key, value);
                    }
                });

                toast({ title: "Import Successful", description: "Data restored. The oldest snapshot was rotated to accommodate this state.", variant: "success" });
                
                // 3. Reload to re-hydrate all stores
                setTimeout(() => window.location.reload(), 1500);
            } catch (err) {
                console.error("Import error:", err);
                toast({ title: "Import Failed", description: "The file was invalid or corrupted.", variant: "destructive" });
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="w-5 h-5 text-primary" />
                      Rolling Snapshots
                    </CardTitle>
                    <CardDescription>Automated local backups. The system keeps a weekly cycle of your data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="space-y-1">
                        <Label className="text-sm font-bold">Snapshot Limit</Label>
                        <p className="text-xs text-muted-foreground">Number of historical versions to keep before deleting the oldest.</p>
                      </div>
                      <div className="flex items-center gap-3 w-32">
                        <Input 
                          type="number" 
                          value={maxSnapshots} 
                          onChange={e => setMaxSnapshots(parseInt(e.target.value) || 1)} 
                          className="text-center font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Historical Timestamps</h4>
                        <Button variant="ghost" size="sm" onClick={() => createSnapshot()} className="h-7 text-[10px] font-bold uppercase tracking-tight">
                          <PlusCircle className="w-3 h-3 mr-1.5" /> Manual Snapshot
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {snapshots.length === 0 ? (
                          <div className="py-10 text-center border-2 border-dashed rounded-xl opacity-30 italic text-sm">
                            No snapshots recorded yet.
                          </div>
                        ) : (
                          snapshots.map(snapshot => (
                            <div key={snapshot.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-all group">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-muted rounded-md"><Clock className="w-4 h-4 text-muted-foreground" /></div>
                                <div>
                                  <p className="text-sm font-bold">{snapshot.label}</p>
                                  <p className="text-[10px] text-muted-foreground uppercase font-medium">{format(new Date(snapshot.timestamp), 'PPP p')}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-primary font-bold">
                                      <Undo2 className="w-3.5 h-3.5" /> Restore
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Restore this snapshot?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Your current data will be replaced with the state from {format(new Date(snapshot.timestamp), 'PPP p')}. The app will reload automatically.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => restoreSnapshot(snapshot.id)}>Confirm Restore</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => deleteSnapshot(snapshot.id)}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" />
                        Data Portability
                    </CardTitle>
                    <CardDescription>Backup your entire history as a JSON file. Importing a file automatically creates a safety snapshot of your current state.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-dashed bg-primary/[0.02]">
                        <div className="space-y-1">
                            <Label className="text-sm font-bold">Master Backup</Label>
                            <p className="text-xs text-muted-foreground">One portable file for all local data.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleExport} className="h-9 gap-2 font-bold">
                                <Download className="w-4 h-4" />
                                Export
                            </Button>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    accept=".json" 
                                    onChange={handleImport} 
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                    aria-label="Import Data"
                                />
                                <Button variant="outline" size="sm" className="h-9 gap-2 font-bold">
                                    <Upload className="w-4 h-4" />
                                    Import
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-muted/30 space-y-1">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Local Storage Usage</Label>
                            <p className="text-sm font-bold">{storageUsage}</p>
                        </div>
                    </div>

                    <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20 flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <p className="text-xs text-destructive leading-relaxed">
                            <strong>Note on Safe Import:</strong> Your current local snapshots will be preserved. A new snapshot will be created before the import is applied, allowing you to undo the import if needed.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
