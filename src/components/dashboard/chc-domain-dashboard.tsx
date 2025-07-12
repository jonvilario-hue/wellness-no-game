import { chcDomains } from '@/types';
import { ChcDomainCard } from './chc-domain-card';

export function ChcDomainDashboard() {
  return (
    <section>
      <h2 className="text-2xl font-bold font-headline mb-4">Cognitive Domains</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6">
        {chcDomains.map((domain) => (
          <ChcDomainCard key={domain.key} domain={domain} />
        ))}
      </div>
    </section>
  );
}
