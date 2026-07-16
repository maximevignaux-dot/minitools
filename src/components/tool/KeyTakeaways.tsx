import { Check } from 'lucide-react';

interface Props {
  items: string[];
  title?: string;
}

export function KeyTakeaways({ items, title = 'À retenir' }: Props) {
  if (!items?.length) return null;
  return (
    <section
      id="a-retenir"
      aria-labelledby="a-retenir-title"
      className="mt-10 rounded-2xl border border-line bg-white p-6"
    >
      <h2 id="a-retenir-title" className="mb-4 text-lg font-semibold">
        {title}
      </h2>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/90">
            <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
