import type { Pitfall } from '@/types/tool';
import { AlertTriangle } from 'lucide-react';

interface Props {
  items: Pitfall[];
  title?: string;
}

export function Pitfalls({ items, title = 'Erreurs courantes à éviter' }: Props) {
  if (!items?.length) return null;
  return (
    <section id="erreurs" aria-labelledby="erreurs-title" className="mt-12">
      <h2 id="erreurs-title" className="mb-4 text-2xl font-semibold">
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-4 rounded-xl border border-amber-200 bg-amber-50/50 p-4"
          >
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug text-ink">{item.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
