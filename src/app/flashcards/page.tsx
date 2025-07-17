
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers } from "lucide-react";

export default function FlashcardsPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Layers />
                AnkiWeb Flashcards
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-4">
          <iframe
            src="https://ankiweb.net"
            title="AnkiWeb"
            className="w-full h-[80vh] border-0 rounded-xl"
          />
        </CardContent>
      </Card>
    </div>
  )
}
