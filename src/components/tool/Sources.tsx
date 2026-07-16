import type { SourceRef } from '@/types/tool';
import { ExternalLink } from 'lucide-react';

interface Props {
  items: SourceRef[];
  title?: string;
}

export function Sources({ items, title = 'Sources' }: Props) {
  if (!items?.length) return null;
  return (
    <section id="sources" aria-labelledby="sources-title" className="mt-12">
      <h2 id="sources-title" className="mb-3 text-lg font-semibold">
        {title}
      </h2>
      <ul className="space-y-1.5 text-sm text-muted">
        {items.map((item, i) => (
          <li key={i}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener nofollow"
              className="inline-flex items-center gap-1.5 text-muted underline decoration-line decoration-1 underline-offset-4 transition hover:text-accent hover:decoration-accent"
            >
              {item.label}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
