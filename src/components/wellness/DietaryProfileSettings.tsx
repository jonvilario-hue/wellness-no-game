
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useToast } from '@/hooks/use-toast';
import { Settings2, ShieldCheck, Heart, Users, Save } from 'lucide-react';

export function DietaryProfileSettings() {
    const { dietaryProfile, updateDietaryProfile } = useWellnessData();
    const { toast } = useToast();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast({ title: "Profile Synced", variant: 'success' });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
            <Card className="border-primary/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings2 className="w-5 h-5 text-primary" />
                        Nutritional Architecture
                    </CardTitle>
                    <CardDescription>Define your biological and financial constraints to customize Meal Guides.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Dietary Preference</Label>
                                <Select 
                                    value={dietaryProfile?.dietaryPreference || 'omnivore'} 
                                    onValueChange={(v) => updateDietaryProfile({ dietaryPreference: v as any })}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="omnivore">Omnivore</SelectItem>
                                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                        <SelectItem value="vegan">Vegan</SelectItem>
                                        <SelectItem value="pescatarian">Pescatarian</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Weekly Budget ($)</Label>
                                <Input 
                                    type="number" 
                                    value={dietaryProfile?.weeklyFoodBudget || ''} 
                                    onChange={e => updateDietaryProfile({ weeklyFoodBudget: parseFloat(e.target.value) })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Household Size</Label>
                                <Input 
                                    type="number" 
                                    value={dietaryProfile?.householdSize || 1} 
                                    onChange={e => updateDietaryProfile({ householdSize: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Max Prep Time (Min)</Label>
                                <Input 
                                    type="number" 
                                    value={dietaryProfile?.maxPrepTimeMinutes || 30} 
                                    onChange={e => updateDietaryProfile({ maxPrepTimeMinutes: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <Label className="text-[10px] font-bold uppercase text-muted-foreground">Allergies & Sensitivities</Label>
                            <Input 
                                placeholder="e.g. Gluten, Dairy, Peanuts (comma separated)" 
                                value={dietaryProfile?.allergies?.join(', ') || ''}
                                onChange={e => updateDietaryProfile({ allergies: e.target.value.split(',').map(s => s.trim()) })}
                            />
                        </div>

                        <Button className="w-full font-bold gap-2 h-12" type="submit">
                            <Save className="w-4 h-4" /> Lock in Profile
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                    <p className="text-sm font-bold uppercase tracking-tight">Active Filtering</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Guides that conflict with your allergies or exceed your <b>${dietaryProfile?.weeklyFoodBudget || 100}/week</b> budget will automatically display warnings.
                    </p>
                </div>
            </div>
        </div>
    );
}
