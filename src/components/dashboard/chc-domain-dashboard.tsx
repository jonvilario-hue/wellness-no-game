
import { chcDomains } from '@/types';
import { ChcDomainCard } from './chc-domain-card';

export function ChcDomainDashboard() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {chcDomains.map((domain) => (
          <ChcDomainCard key={domain.key} domain={domain} />
        ))}
      </div>
    </section>
  );
}
