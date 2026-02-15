// components/stats/CardDifficultyIndex.tsx
import { Table, TableRow, TableCell, TableHead, TableBody, TableHeader } from "@/components/ui/table"
import type { CardDifficulty } from "@/types/stats"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CardDifficultyIndex({ cards }: { cards: CardDifficulty[] }) {
  if (cards.length === 0) return <p className="text-muted-foreground text-center p-4">No cards with review history yet.</p>

  return (
    <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
                <TableHead>Card</TableHead>
                <TableHead className="text-right">Ease</TableHead>
                <TableHead className="text-right">Lapses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((c, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium truncate max-w-xs">{c.front}</TableCell>
                <TableCell className="text-right">{c.ease.toFixed(2)}</TableCell>
                <TableCell className="text-right">{c.lapses}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </ScrollArea>
  )
}
