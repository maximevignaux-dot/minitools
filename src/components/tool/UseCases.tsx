import type { UseCase } from '@/types/tool';

interface Props {
  items: UseCase[];
  title?: string;
}

export function UseCases({ items, title = 'Quand utiliser cet outil' }: Props) {
  if (!items?.length) return null;
  return (
    <section id="cas-usage" aria-labelledby="cas-usage-title" className="mt-12">
      <h2 id="cas-usage-title" className="mb-4 text-2xl font-semibold">
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl border border-line bg-white p-4">
            <p className="text-[15px] font-medium leading-snug text-ink">{item.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
