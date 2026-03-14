
'use client';

import { JournalModule } from '@/components/dashboard/journal-module';
import { JournalCalendar } from '@/components/journal/journal-calendar';

export default function JournalPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <JournalModule />
            <JournalCalendar />
        </div>
      );
}
