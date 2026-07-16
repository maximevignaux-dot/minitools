interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
}

export function Toc({ sections }: Props) {
  if (!sections.length) return null;
  return (
    <aside aria-label="Table des matières" className="hidden xl:block">
      <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Sur cette page
        </p>
        <ul className="space-y-1.5 border-l border-line text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="-ml-px block border-l border-transparent py-1 pl-3 text-muted no-underline transition hover:border-accent hover:text-ink"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
