import type { FaqItem } from '@/types/tool';
import { ChevronDown } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { buildFaqSchema } from '@/lib/schema';

interface Props {
  items: FaqItem[];
  title?: string;
}

export function FaqSection({ items, title = 'Questions fréquentes' }: Props) {
  if (!items?.length) return null;
  return (
    <section id="faq" aria-labelledby="faq-title" className="mt-12">
      <h2 id="faq-title" className="mb-4 text-2xl font-semibold">
        {title}
      </h2>
      <div className="divide-y divide-line rounded-2xl border border-line bg-white">
        {items.map((item, i) => (
          <details key={i} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
              <span>{item.q}</span>
              <ChevronDown
                className="h-4 w-4 shrink-0 transition group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="mt-3 text-base leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={buildFaqSchema(items)} />
    </section>
  );
}
