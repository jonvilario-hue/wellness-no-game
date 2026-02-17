'use client';

/**
 * @fileOverview Utilities for importing and exporting flashcard decks.
 * Supports CSV, JSON, Markdown, and TXT. 
 * Anki .apkg support is stubbed for SQLite/ZIP complexity but ready for expansion.
 */

import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import type { Card, Deck } from '@/types/flashcards';

export type ExportFormat = 'anki' | 'csv' | 'json' | 'text' | 'markdown';

export interface ImportPreviewData {
  fileName: string;
  format: ExportFormat;
  decks: {
    name: string;
    description?: string;
    cards: Partial<Card>[];
  }[];
}

/**
 * Parses an imported file and returns a preview of the data.
 */
export async function parseImportFile(file: File): Promise<ImportPreviewData> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const text = await file.text();

  if (extension === 'json') {
    const data = JSON.parse(text);
    return {
      fileName: file.name,
      format: 'json',
      decks: data.decks || [],
    };
  }

  if (extension === 'csv') {
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
    const cards = (parsed.data as any[]).map(row => ({
      front: row.Front || row.front || Object.values(row)[0],
      back: row.Back || row.back || Object.values(row)[1],
      tags: (row.Tags || row.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      type: (row.Type || row.type || 'basic').toLowerCase(),
    }));

    return {
      fileName: file.name,
      format: 'csv',
      decks: [{
        name: file.name.replace('.csv', ''),
        cards
      }]
    };
  }

  if (extension === 'md') {
    // Simple MD parser: ## Header is deck, - Front :: Back is card
    const lines = text.split('\n');
    const decks: ImportPreviewData['decks'] = [];
    let currentDeck: ImportPreviewData['decks'][0] | null = null;

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        currentDeck = { name: line.replace('## ', '').trim(), cards: [] };
        decks.push(currentDeck);
      } else if (line.trim().startsWith('- ') && line.includes('::')) {
        if (!currentDeck) {
          currentDeck = { name: 'Imported Deck', cards: [] };
          decks.push(currentDeck);
        }
        const [front, back] = line.replace('- ', '').split('::');
        currentDeck.cards.push({
          front: front.trim(),
          back: back.trim(),
          type: 'basic'
        });
      }
    });

    return { fileName: file.name, format: 'markdown', decks };
  }

  // Default to Text/Tab
  const rows = text.split('\n').filter(l => l.trim().includes('\t') || l.trim().includes('|'));
  const cards = rows.map(line => {
    const delimiter = line.includes('\t') ? '\t' : '|';
    const [front, back] = line.split(delimiter);
    return { front: front?.trim(), back: back?.trim(), type: 'basic' };
  });

  return {
    fileName: file.name,
    format: 'text',
    decks: [{ name: file.name.replace('.txt', ''), cards }]
  };
}

/**
 * Generates and downloads an export file.
 */
export async function exportDecks(
  format: ExportFormat, 
  decks: Deck[], 
  cards: Card[], 
  options: { includeScheduling?: boolean; includeSettings?: boolean }
) {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = `polymath-export-${timestamp}`;

  switch (format) {
    case 'json':
      const jsonData = JSON.stringify({
        version: "1.0",
        exported: new Date().toISOString(),
        decks: decks.map(d => ({
          ...d,
          settings: options.includeSettings ? d.settings : undefined,
          cards: cards.filter(c => c.deckId === d.id).map(c => ({
            ...c,
            scheduling: options.includeScheduling ? {
              interval: c.interval,
              easeFactor: c.easeFactor,
              repetitions: c.repetitions,
              lapses: c.lapses,
              dueDate: c.dueDate
            } : undefined
          }))
        }))
      }, null, 2);
      saveAs(new Blob([jsonData], { type: 'application/json' }), `${fileName}.json`);
      break;

    case 'csv':
      const csvRows = cards.filter(c => decks.some(d => d.id === c.deckId)).map(c => ({
        Front: c.front,
        Back: c.back,
        Tags: (c.tags || []).join(', '),
        Deck: decks.find(d => d.id === c.deckId)?.name,
        Type: c.type,
        Interval: options.includeScheduling ? c.interval : undefined,
        Ease: options.includeScheduling ? c.easeFactor : undefined,
        DueDate: options.includeScheduling ? c.dueDate : undefined
      }));
      const csv = Papa.unparse(csvRows);
      saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `${fileName}.csv`);
      break;

    case 'markdown':
      let md = `# Polymath Lab Export\n\n`;
      decks.forEach(d => {
        md += `## ${d.name}\n${d.description || ''}\n\n`;
        cards.filter(c => c.deckId === d.id).forEach(c => {
          md += `- ${c.front} :: ${c.back}\n`;
        });
        md += `\n`;
      });
      saveAs(new Blob([md], { type: 'text/markdown' }), `${fileName}.md`);
      break;

    case 'text':
      let txt = '';
      cards.filter(c => decks.some(d => d.id === c.deckId)).forEach(c => {
        txt += `${c.front}\t${c.back}\n`;
      });
      saveAs(new Blob([txt], { type: 'text/plain' }), `${fileName}.txt`);
      break;

    case 'anki':
      // APKG requires SQL.js and complex schema building.
      // For now, we export a ZIP of the JSON data as a high-fidelity placeholder
      // until the full WASM-based Anki generator is implemented.
      // NOTE: Anki fully supports JPG and PNG formats for images.
      const zip = new JSZip();
      zip.file("collection.json", JSON.stringify({ decks, cards }));
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${fileName}.apkg.zip`);
      break;
  }
}
