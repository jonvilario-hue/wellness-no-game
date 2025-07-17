
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFlashcardStore } from "@/hooks/use-flashcard-store";
import type { Card as CardType } from "@/types/flashcards";
import { Upload, Download } from "lucide-react";
import { useRef } from "react";
import Papa from "papaparse";
import { useToast } from "@/hooks/use-toast";

export function ImportExport() {
  const { cards, bulkAddCards } = useFlashcardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = () => {
    const headers = ["Front", "Back", "Tags"];
    const rows = cards.map(card => [
      `"${card.front.replace(/"/g, '""')}"`,
      `"${card.back.replace(/"/g, '""')}"`,
      `"${card.tags.join(",")}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "flashcards.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
        title: "Export Complete",
        description: `${cards.length} cards have been exported to flashcards.csv.`
    })
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
            const newCards = results.data.map((row: any) => {
              if (!row.Front || !row.Back) {
                  console.warn("Skipping row with missing Front or Back:", row);
                  return null;
              }
              return {
                front: row.Front,
                back: row.Back,
                tags: row.Tags?.split(",").map((t: string) => t.trim()).filter(Boolean) || [],
                deckId: "default-deck", // Default deck for imported cards
              };
            }).filter(Boolean) as Omit<CardType, 'id' | 'interval' | 'easeFactor' | 'repetitions' | 'dueDate' | 'createdAt' | 'updatedAt' | 'type'>[];

            if (newCards.length > 0) {
              bulkAddCards(newCards);
              toast({
                  title: "Import Successful",
                  description: `${newCards.length} cards have been added to the 'Default' deck.`
              })
            } else {
                 toast({
                  title: "Import Failed",
                  description: "No valid cards found in the file. Ensure 'Front' and 'Back' columns exist.",
                  variant: "destructive"
              })
            }

        } catch (error) {
            console.error("Import error:", error);
             toast({
                title: "Import Error",
                description: "There was an error processing your file. Please check the format.",
                variant: "destructive"
            })
        }
      },
      error: (error) => {
        console.error("PapaParse error:", error);
         toast({
            title: "Parsing Error",
            description: "Could not parse the CSV file. Please check its structure.",
            variant: "destructive"
        })
      }
    });

    // Reset file input
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import & Export</CardTitle>
        <CardDescription>
          Manage your card collection by importing or exporting your data in CSV format.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export All Cards to CSV
        </Button>
        
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".csv"
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Import Cards from CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
