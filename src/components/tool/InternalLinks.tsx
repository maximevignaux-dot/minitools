import Link from 'next/link';
import type { Tool } from '@/types/tool';
import { ArrowRight } from 'lucide-react';
import { getCategory } from '@/lib/site';

interface Props {
  tools: Tool[];
  title?: string;
}

export function InternalLinks({ tools, title = 'Outils similaires' }: Props) {
  if (!tools.length) return null;
  return (
    <section id="outils-similaires" aria-labelledby="outils-similaires-title" className="mt-12">
      <h2 id="outils-similaires-title" className="mb-4 text-2xl font-semibold">
        {title}
      </h2>
      <ul className="grid gap-3 md:grid-cols-2">
        {tools.map((tool) => {
          const category = getCategory(tool.category);
          return (
            <li key={tool.slug}>
              <Link
                href={`/${tool.category}/${tool.slug}`}
                className="group flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4 no-underline transition hover:border-accent hover:bg-accent/5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-paper text-lg"
                >
                  {category?.emoji ?? '🛠️'}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-wider text-muted">
                    {category?.label ?? tool.category}
                  </span>
                  <span className="mt-0.5 block font-medium leading-snug text-ink">{tool.h1}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted">
                    {tool.metaDescription}
                  </span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-accent" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
