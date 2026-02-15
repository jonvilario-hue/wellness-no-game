
'use client';

import { useEffect, useState } from 'react';
import { useFlashcardStore } from '@/store/srs-store';
import { applyTheme } from '@/lib/srs-themes';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Layers, Play, MoreVertical, Plus, Edit } from 'lucide-react';
import type { ThemeName } from '@/types/srs-types';
import { SettingsDialog } from '@/components/srs/settings-dialog';
import { DeckDialog } from '@/components/srs/deck-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SRSPage() {
  const { decks, theme, setTheme, getDueCountsForDeck, startStudySession, deleteDeck } = useFlashcardStore();
  
  const [settingsTarget, setSettingsTarget] = useState<{ open: boolean; deckId: string | null }>({
    open: false,
    deckId: null,
  });

  const [deckDialog, setDeckDialog] = useState<{ open: boolean; deckId: string | null }>({
    open: false,
    deckId: null,
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const themes: { name: ThemeName; label: string }[] = [
    { name: 'midnight', label: 'Midnight' },
    { name: 'forest', label: 'Forest' },
    { name: 'ocean', label: 'Ocean' },
    { name: 'crimson', label: 'Crimson' },
    { name: 'minimal', label: 'Minimal' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="text-primary w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">SRS Master</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    theme === t.name ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background/50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSettingsTarget({ open: true, deckId: null })}
              title="Global SRS Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-[var(--srs-primary)]">Your Decks</h2>
            <p className="text-muted-foreground">Manage your knowledge base and start reviewing.</p>
          </div>
          <Button 
            className="font-bold shadow-lg hover:shadow-primary/20 transition-all gap-2"
            onClick={() => setDeckDialog({ open: true, deckId: null })}
          >
            <Plus className="w-4 h-4" /> New Deck
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => {
            const { newCount, reviewCount, learningCount } = getDueCountsForDeck(deck.id);
            const totalDue = newCount + reviewCount + learningCount;

            return (
              <Card key={deck.id} className="group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => setSettingsTarget({ open: true, deckId: deck.id })}
                    title="Deck Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setDeckDialog({ open: true, deckId: deck.id })}>
                        <Edit className="w-4 h-4 mr-2" /> Rename Deck
                      </DropdownMenuItem>
                      {deck.id !== 'default' && (
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => deleteDeck(deck.id)}
                        >
                          Delete Deck
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start pr-16">
                    <CardTitle className="text-xl font-bold">{deck.name}</CardTitle>
                    <Badge variant={totalDue > 0 ? "default" : "secondary"}>
                      {totalDue > 0 ? `${totalDue} due` : 'Complete'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 min-h-[40px]">
                    {deck.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm font-mono">
                    <div className="flex flex-col">
                      <span className="text-blue-400 font-bold">{newCount}</span>
                      <span className="text-[10px] uppercase opacity-50">New</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-red-400 font-bold">{learningCount}</span>
                      <span className="text-[10px] uppercase opacity-50">Learning</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-green-400 font-bold">{reviewCount}</span>
                      <span className="text-[10px] uppercase opacity-50">Review</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary/20 p-4">
                  <Button 
                    className="w-full font-bold gap-2" 
                    disabled={totalDue === 0}
                    onClick={() => {
                      startStudySession(deck.id);
                      window.location.href = '/srs/session';
                    }}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Study Now
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>

      <SettingsDialog 
        open={settingsTarget.open}
        onOpenChange={(open) => setSettingsTarget(prev => ({ ...prev, open }))}
        deckId={settingsTarget.deckId}
      />

      <DeckDialog
        open={deckDialog.open}
        onOpenChange={(open) => setDeckDialog(prev => ({ ...prev, open }))}
        deckId={deckDialog.deckId}
      />
    </div>
  );
}
