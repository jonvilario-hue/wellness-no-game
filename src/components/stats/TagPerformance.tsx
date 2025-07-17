// components/stats/TagPerformance.tsx
import { Table, TableRow, TableCell, TableHead, TableBody, TableHeader } from "@/components/ui/table"
import type { TagPerformanceData } from "@/types/stats"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TagPerformance({ data }: { data: TagPerformanceData[] }) {
  if (data.length === 0) return <p className="text-muted-foreground text-center p-4">No tagged cards have been reviewed yet.</p>

  return (
    <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
                <TableHead>Tag</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
                <TableHead className="text-right">Lapses</TableHead>
                <TableHead className="text-right">Reviews</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{t.tag}</TableCell>
                <TableCell className="text-right">{t.accuracy}%</TableCell>
                <TableCell className="text-right">{t.lapses}</TableCell>
                <TableCell className="text-right">{t.reviews}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </ScrollArea>
  )
}
